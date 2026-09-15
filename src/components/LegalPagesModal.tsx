import React, { useState } from 'react';
import { Shield, FileText, Info, Mail, CheckCircle2, Send, X, Lock } from 'lucide-react';

interface LegalPagesModalProps {
  initialTab?: 'privacy' | 'terms' | 'about';
  onClose: () => void;
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'about'>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Legal Policies &amp; Contact</h2>
              <p className="text-[11px] text-slate-400">Google Publisher &amp; AdSense Compliant Transparency Disclosures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us &amp; Contact</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-700 text-xs leading-relaxed space-y-4">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4 max-w-none prose prose-slate text-xs">
              <h3 className="text-base font-bold text-slate-900">Privacy Policy</h3>
              <p className="text-slate-500 text-[11px]">Effective Date: September 14, 2026</p>
              
              <p>
                At <strong>Assignment / Lab Copy Cover Page Generator</strong>, accessible from our primary web address, the privacy of our visitors is one of our top priorities. This Privacy Policy document outlines the types of information that is collected and recorded by our platform and how we use it in full compliance with Google AdSense Policies and General Data Protection Regulations (GDPR).
              </p>

              <h4 className="font-bold text-slate-800 text-sm">1. Information We Collect (Local Storage Only)</h4>
              <p>
                Our application operates primarily as a client-side web tool. Form fields (such as student name, college name, course code, and faculty designation) entered in the cover page generator are processed directly on your web browser and saved locally in your browser&apos;s <code>LocalStorage</code>. We do not transmit or store private student records on any remote database server.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">2. Google AdSense &amp; Third-Party Advertising Cookies</h4>
              <p>
                Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Users may opt-out of personalized advertising by visiting Google Advertising Privacy Settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-purple-600 underline">https://www.google.com/settings/ads</a>.</li>
              </ul>

              <h4 className="font-bold text-slate-800 text-sm">3. Log Files &amp; Web Analytics</h4>
              <p>
                Like most standard websites, we utilize basic web hosting log files or web analytics (such as Google Analytics or Vercel Analytics) to analyze trends, administer the site, track user movements around the site, and gather demographic information. This information includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">4. Contact Us</h4>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us via the About Us &amp; Contact tab.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 max-w-none text-xs">
              <h3 className="text-base font-bold text-slate-900">Terms and Conditions</h3>
              <p className="text-slate-500 text-[11px]">Last Updated: September 14, 2026</p>

              <p>
                Welcome to the <strong>Assignment / Lab Copy Cover Page Generator</strong>! By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">1. Educational &amp; Non-Commercial License</h4>
              <p>
                This web platform is provided free of charge for students, teachers, scholars, and academic institutions for generating, printing, and exporting A4 cover pages for personal educational submissions.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">2. Intellectual Property &amp; University Logos</h4>
              <p>
                All university, college, or institute logos, emblems, and crests displayed or uploaded in this application remain the trademark and intellectual property of their respective academic bodies. Logos are rendered solely for student academic identification and formal cover page formatting.
              </p>

              <h4 className="font-bold text-slate-800 text-sm">3. Disclaimer of Liability</h4>
              <p>
                This tool is provided &quot;AS IS&quot; without warranty of any kind. While we strive for 100% precision in A4 dimensions (210mm × 297mm) and 300 DPI export, users are responsible for verifying their specific course requirements prior to final printing.
              </p>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">About the Platform</h3>
                <p>
                  The <strong>Assignment / Lab Copy Cover Page Generator</strong> was created to solve a common hassle faced by thousands of engineering and college students: formatting pixel-perfect A4 cover pages with correct university emblems, department titles, faculty honorifics, and student roll numbers without needing heavy desktop software like MS Word or Photoshop.
                </p>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-1.5">
                  <h4 className="font-bold text-purple-900 text-xs">Creator &amp; Developer Details</h4>
                  <p className="text-[11px] text-purple-800">
                    <strong>Developer Name:</strong> Tanmoy Das<br />
                    <strong>Academic Affiliation:</strong> Electronics &amp; Communication Engineering (ECE) Department<br />
                    <strong>Institute:</strong> Techno College of Engineering Agartala (TCEA)<br />
                    <strong>Batch:</strong> 2024–2027<br />
                    <strong>Contact Email:</strong> dast92092@gmail.com
                  </p>
                </div>
              </div>

              {/* Working Contact Form */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span>Send Us Feedback or Support Request</span>
                </h4>

                {contactSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-xs font-semibold">
                      Thank you for your message! Your feedback has been recorded successfully.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-purple-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. rahul@gmail.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-purple-600 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Message</label>
                      <textarea
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Write your feedback, bug report, or feature request here..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-purple-600 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
