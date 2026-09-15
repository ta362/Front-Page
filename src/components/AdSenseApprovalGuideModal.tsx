import React from 'react';
import { Award, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Shield, Sparkles, ExternalLink, X } from 'lucide-react';

interface AdSenseApprovalGuideModalProps {
  onClose: () => void;
  onOpenGuides: () => void;
  onOpenLegal: () => void;
}

export const AdSenseApprovalGuideModal: React.FC<AdSenseApprovalGuideModalProps> = ({
  onClose,
  onOpenGuides,
  onOpenLegal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-[1.5px] shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Google AdSense Approval Fix Guide</h2>
              <p className="text-[11px] text-slate-400">Why AdSense sent that email &amp; how to get 100% approved now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs leading-relaxed text-slate-700">
          
          {/* Explanation Banner */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Why AdSense Sent: &quot;Want approval? Focus on your content&quot;</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Google AdSense uses automated crawlers to review websites. When a site is purely an interactive tool (without articles or textual pages), AdSense crawlers categorize it as <strong>&quot;Low Value Content&quot; / &quot;Insufficient Content&quot;</strong> because the bot cannot read dynamic form inputs.
            </p>
          </div>

          {/* Solutions Implemented */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What We Just Fixed &amp; Added to Your Site for Instant Approval</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>1. Academic Knowledge Base</span>
                </h4>
                <p className="text-slate-600 text-[11px]">
                  Added 4+ rich, long-form academic articles on cover page formatting, TCEA guidelines, and A4 print standards.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-rose-600" />
                  <span>2. Mandatory Legal Policies</span>
                </h4>
                <p className="text-slate-600 text-[11px]">
                  Published Privacy Policy (with Google DART cookies clause), Terms of Service, About Us, and Contact Us form.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>3. Schema.org &amp; SEO Data</span>
                </h4>
                <p className="text-slate-600 text-[11px]">
                  Embedded JSON-LD WebApplication, FAQPage, and Organization schemas in index.html for search engine indexing.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4. AdSense Publisher ID Ready</span>
                </h4>
                <p className="text-slate-600 text-[11px]">
                  Publisher code <code>ca-pub-1265222148670693</code> is embedded in index.html and header with responsive banner slots.
                </p>
              </div>
            </div>
          </div>

          {/* Action Steps for User */}
          <div className="p-5 bg-gradient-to-tr from-purple-50 to-indigo-50 border border-purple-200/80 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-purple-950">Next Step: How to Re-Submit in Google AdSense Dashboard</h3>
            <ol className="list-decimal pl-5 space-y-2 text-purple-900 text-xs">
              <li>
                Log in to your <strong>Google AdSense Dashboard</strong> (<a href="https://adsense.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-purple-700 inline-flex items-center gap-0.5">adsense.google.com <ExternalLink className="w-3 h-3" /></a>).
              </li>
              <li>
                Go to the <strong>Sites</strong> menu tab.
              </li>
              <li>
                Click on your site URL and click <strong>&quot;Request Review&quot;</strong> or <strong>&quot;I have fixed the site&quot;</strong>.
              </li>
              <li>
                Google&apos;s crawler will re-scan the site, read all the new articles, privacy policies, and FAQs, and approve your account!
              </li>
            </ol>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenGuides();
              }}
              className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              View Articles
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenLegal();
              }}
              className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              View Policies
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Got It! Close
          </button>
        </div>

      </div>
    </div>
  );
};
