import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Check, 
  Copy, 
  ExternalLink, 
  Share2, 
  Sparkles,
  Monitor
} from 'lucide-react';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onTriggerNativeInstall: () => void;
  onAddToast: (type: 'success' | 'error' | 'info' | 'warning', text: string) => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onTriggerNativeInstall,
  onAddToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'pc'>('android');

  if (!isOpen) return null;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      onAddToast('success', 'App link copied to clipboard! Share it with friends.');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onAddToast('info', 'Please copy URL from browser address bar.');
    }
  };

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 text-slate-800 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Download className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              Install Cover Page App
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Use as a fast Android / Mobile App without browser controls
            </p>
          </div>
        </div>

        {/* Quick Native Install Button (if browser prompt is ready) */}
        {deferredPrompt && (
          <div className="mb-4 shrink-0">
            <button
              type="button"
              onClick={() => {
                onTriggerNativeInstall();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer animate-pulse"
            >
              <Download className="w-5 h-5" />
              <span>Click Here to Install App Now</span>
            </button>
          </div>
        )}

        {/* Device Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'android'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android (Mobile)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>iPhone (iOS)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pc')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop / PC</span>
          </button>
        </div>

        {/* Step-by-Step Instructions Body */}
        <div className="overflow-y-auto pr-1 space-y-3.5 text-xs text-slate-600">
          {activeTab === 'android' && (
            <div className="space-y-2.5">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">
                    Open in Chrome on Android Phone
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Open this app link directly in Google Chrome on your smartphone.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">
                    Tap the Three Dots Menu (⋮)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tap the 3-dot menu at the top-right corner of Google Chrome.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">
                    Tap "Install app" or "Add to Home screen"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Select <strong>"Install app"</strong> and confirm. The app icon will appear on your phone home screen and app drawer!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-2.5">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Open in Safari Browser</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    PWA installation on iPhone / iPad requires Apple Safari.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Tap the Share Icon (⎋)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tap the Share square button with arrow pointing up at the bottom toolbar.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Tap "Add to Home Screen"</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Scroll down and tap <strong>"Add to Home Screen" (+)</strong>, then tap <strong>"Add"</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pc' && (
            <div className="space-y-2.5">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">
                    Address Bar Install Icon
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    In Google Chrome or Microsoft Edge, look at the right side of the address bar for the computer monitor / download icon (circled in red in your picture) and click it!
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200/60 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Or via Browser Menu</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Click browser menu (⋮) &rarr; "Cast, save, and share" &rarr; <strong>"Install Cover Page App"</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy App Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNewTab}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            title="Open in new browser window for direct installation"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in Full Browser</span>
          </button>
        </div>
      </div>
    </div>
  );
};
