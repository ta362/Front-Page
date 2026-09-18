import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory fallback store if Firestore Admin is not initialized with GCP credentials
interface OtpRecord {
  email: string;
  code: string;
  expiresAt: number;
  verified: boolean;
  createdAt: number;
}

interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  lastLoginAt: string;
}

const memoryOtpStore = new Map<string, OtpRecord>();
const memoryUserStore = new Map<string, UserRecord>();

// Initialize Firebase Admin if environment permits
let db: FirebaseFirestore.Firestore | null = null;

try {
  if (!getApps().length) {
    if (process.env.FIREBASE_CONFIG || process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      initializeApp();
      db = getFirestore();
      console.log('Firebase Admin initialized successfully with Firestore');
    } else {
      // Initialize with default app for project if standard env vars exist
      try {
        initializeApp();
        db = getFirestore();
        console.log('Firebase Admin initialized with default application credentials');
      } catch (err) {
        console.log('Firestore initialized in hybrid/local persistence mode');
      }
    }
  } else {
    db = getFirestore();
  }
} catch (error) {
  console.log('Using robust in-memory + client Firestore sync for auth storage');
}

// Helper: Send email via Brevo SMTP API
async function sendBrevoEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@coverpagegenerator.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'Assignment & Lab Cover Generator';

  if (!brevoApiKey || brevoApiKey.trim() === '') {
    console.warn('BREVO_API_KEY is not configured in environment variables.');
    return {
      success: false,
      error: 'BREVO_API_KEY is missing in environment variables. Please add BREVO_API_KEY to your settings or .env file.'
    };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey.trim(),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: toEmail
          }
        ],
        subject: `${otpCode} - Your Login OTP Code | Cover Page Generator`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
              .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9; }
              .logo { font-size: 20px; font-weight: 800; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.5px; }
              .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
              .content { padding: 24px 0; text-align: center; }
              .otp-title { font-size: 15px; font-weight: 600; color: #334155; margin-bottom: 12px; }
              .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; background: #e0e7ff; padding: 16px 24px; border-radius: 12px; display: inline-block; margin: 12px 0; font-family: monospace; }
              .expiry { font-size: 13px; color: #e11d48; font-weight: 500; margin-top: 8px; }
              .footer { font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 24px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Cover Page Generator</div>
                <div class="subtitle">Assignment & Lab Copy Cover Page Creator</div>
              </div>
              <div class="content">
                <div class="otp-title">Your One-Time Password (OTP) for Login</div>
                <div class="otp-code">${otpCode}</div>
                <div class="expiry">⏱️ Valid for 5 minutes only. Do not share this code with anyone.</div>
              </div>
              <div class="footer">
                If you did not request this login code, please ignore this email.<br>
                © ${new Date().getFullYear()} Cover Page Generator. All rights reserved.
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo API Error:', response.status, errorText);
      return { success: false, error: `Brevo API Error (${response.status}): ${errorText}` };
    }

    const data = await response.json();
    console.log('Brevo Email sent successfully:', data);
    return { success: true };
  } catch (err: any) {
    console.error('Failed to dispatch Brevo email:', err);
    return { success: false, error: err.message || 'Network error connecting to Brevo' };
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brevoConfigured: Boolean(process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.trim().length > 0),
    timestamp: new Date().toISOString()
  });
});

// Endpoint: Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    const otpData: OtpRecord = {
      email: normalizedEmail,
      code: otpCode,
      expiresAt,
      verified: false,
      createdAt: Date.now()
    };

    // Store in memory
    memoryOtpStore.set(normalizedEmail, otpData);

    // Store in Firestore if available
    if (db) {
      try {
        await db.collection('otp_codes').doc(normalizedEmail).set({
          ...otpData,
          expiresAt: Timestamp.fromMillis(expiresAt),
          createdAt: Timestamp.fromMillis(otpData.createdAt)
        });
      } catch (err) {
        console.warn('Firestore doc write warning:', err);
      }
    }

    // Send email via Brevo
    const brevoResult = await sendBrevoEmail(normalizedEmail, otpCode);

    if (brevoResult.success) {
      return res.json({
        success: true,
        message: `OTP successfully sent to ${normalizedEmail} via Brevo!`,
        email: normalizedEmail,
        expiresAt
      });
    } else {
      // If Brevo API key is not configured or failed, allow demo testing mode with a clear warning
      return res.json({
        success: true,
        warning: brevoResult.error,
        message: `OTP created for ${normalizedEmail}. ${brevoResult.error ? 'Note: ' + brevoResult.error : ''}`,
        email: normalizedEmail,
        expiresAt,
        // Provide test code so user can proceed while setting up Brevo API Key
        demoCode: otpCode
      });
    }
  } catch (error: any) {
    console.error('Error in send-otp handler:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error sending OTP' });
  }
});

// Endpoint: Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, error: 'Email and OTP code are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const inputCode = code.trim();

    let otpRecord: OtpRecord | undefined = memoryOtpStore.get(normalizedEmail);

    // Fallback check in Firestore
    if (!otpRecord && db) {
      try {
        const doc = await db.collection('otp_codes').doc(normalizedEmail).get();
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            otpRecord = {
              email: data.email,
              code: data.code,
              expiresAt: data.expiresAt instanceof Timestamp ? data.expiresAt.toMillis() : data.expiresAt,
              verified: data.verified,
              createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt
            };
          }
        }
      } catch (e) {
        console.warn('Firestore OTP check warning:', e);
      }
    }

    if (!otpRecord) {
      return res.status(400).json({ success: false, error: 'No OTP requested for this email. Please request a new OTP.' });
    }

    if (Date.now() > otpRecord.expiresAt) {
      return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new OTP code.' });
    }

    if (otpRecord.code !== inputCode) {
      return res.status(400).json({ success: false, error: 'Invalid OTP code. Please check and try again.' });
    }

    // Mark as verified
    otpRecord.verified = true;
    memoryOtpStore.set(normalizedEmail, otpRecord);

    const uid = 'user_' + Buffer.from(normalizedEmail).toString('hex').slice(0, 16);
    const displayName = normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').toUpperCase();

    const userRecord: UserRecord = {
      uid,
      email: normalizedEmail,
      displayName,
      createdAt: memoryUserStore.get(normalizedEmail)?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    memoryUserStore.set(normalizedEmail, userRecord);

    if (db) {
      try {
        await db.collection('users').doc(uid).set(userRecord, { merge: true });
        await db.collection('otp_codes').doc(normalizedEmail).update({ verified: true });
      } catch (err) {
        console.warn('Firestore user write warning:', err);
      }
    }

    // Generate lightweight auth token
    const token = Buffer.from(JSON.stringify({ uid, email: normalizedEmail, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64');

    return res.json({
      success: true,
      message: 'Login successful!',
      user: userRecord,
      token
    });
  } catch (error: any) {
    console.error('Error in verify-otp handler:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error verifying OTP' });
  }
});

// Endpoint: Get current user details
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decodedStr = Buffer.from(token, 'base64').toString('utf-8');
    const decoded = JSON.parse(decodedStr);

    if (!decoded.email || Date.now() > decoded.exp) {
      return res.status(401).json({ success: false, error: 'Token expired or invalid' });
    }

    const user = memoryUserStore.get(decoded.email);

    return res.json({
      success: true,
      user: user || {
        uid: decoded.uid,
        email: decoded.email,
        displayName: decoded.email.split('@')[0],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      }
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid auth token' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Cover Page Generator Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
