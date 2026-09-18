import React, { useState, useEffect, useRef } from 'react';
import { AuthUser } from '../types';
import { Mail, ShieldCheck, KeyRound, ArrowRight, Loader2, RefreshCw, X, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser, token: string) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', text: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  addToast
}) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email || !email.includes('@')) {
      addToast('error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setWarningMessage(null);
    setDemoCode(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        setStep('otp');
        setResendCooldown(60);
        addToast('success', data.message || 'OTP sent successfully!');
        if (data.warning) {
          setWarningMessage(data.warning);
        }
        if (data.demoCode) {
          setDemoCode(data.demoCode);
        }
      } else {
        addToast('error', data.error || 'Failed to send OTP email.');
      }
    } catch (err: any) {
      addToast('error', 'Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      otpInputs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const fullCode = otp.join('');
    if (fullCode.length !== 6) {
      addToast('error', 'Please enter full 6-digit OTP code.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode })
      });

      const data = await res.json();

      if (data.success) {
        addToast('success', 'Logged in successfully!');
        onLoginSuccess(data.user, data.token);
        onClose();
        // Reset state
        setStep('email');
        setOtp(['', '', '', '', '', '']);
      } else {
        addToast('error', data.error || 'Invalid OTP code.');
      }
    } catch (err) {
      addToast('error', 'Failed to verify OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Email & Brevo OTP Login</h3>
          <p className="text-xs text-indigo-100 mt-1">
            Secure login & automatic database user record creation
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Enter Your Email ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu.in"
                    className="w-full pl-11 pr-4 py-3 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium transition-all outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-700 flex items-start space-x-2.5">
                <Send className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Brevo SMTP Service:</span> We send a 6-digit verification code directly to your email address.
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending OTP via Brevo...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="ml-1 text-indigo-600 hover:underline font-semibold"
                  >
                    Change
                  </button>
                </div>
              </div>

              {warningMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Notice:</span> {warningMessage}
                  </div>
                </div>
              )}

              {demoCode && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 text-center">
                  <div className="font-semibold text-emerald-900 mb-1 flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Test OTP Available</span>
                  </div>
                  Enter OTP: <strong className="font-mono text-base text-emerald-700 tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-md">{demoCode}</strong>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 text-center mb-3">
                  Enter 6-Digit OTP Code
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 text-center text-xl font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendCooldown > 0 || loading}
                  onClick={() => handleSendOtp()}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Verify & Login</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
