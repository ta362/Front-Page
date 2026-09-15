import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'editor' | 'guides' | 'faq' | 'privacy' | 'terms' | 'about' | 'adsense-guide') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="w-full bg-slate-900/90 border-t border-slate-800 text-slate-400 py-6 mt-12 px-4 safe-bottom">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Brand Copyright */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200">Cover Page App</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">© 2026 All rights reserved</span>
        </div>

        {/* Minimal Subtle Links (Fully readable by AdSense crawlers!) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-medium text-slate-400">
          <button
            onClick={() => onNavigateTab('guides')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Guides
          </button>
          <button
            onClick={() => onNavigateTab('faq')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigateTab('privacy')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigateTab('terms')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            Terms
          </button>
          <button
            onClick={() => onNavigateTab('about')}
            className="hover:text-purple-300 transition-colors cursor-pointer"
          >
            About &amp; Contact
          </button>
          <button
            onClick={() => onNavigateTab('adsense-guide')}
            className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
          >
            AdSense Status
          </button>
        </div>

        {/* Developer Credit */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>By</span>
          <strong className="text-slate-200">Tanmoy Das</strong>
          <span className="text-slate-600">•</span>
          <span>ECE • TCEA</span>
        </div>

      </div>
    </footer>
  );
};
