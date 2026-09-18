import React, { useState, useRef, useEffect } from 'react';
import { AuthUser } from '../types';
import {
  Printer,
  FileSpreadsheet,
  Share2,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award,
  MoreVertical,
  Shield,
  Info,
  UserCheck,
  LogOut,
  User
} from 'lucide-react';

interface NavbarProps {
  onOpenPresets?: () => void;
  onClearForm: () => void;
  onPrint: () => void;
  onDownloadJPG?: () => void;
  onDownloadPDF: () => void;
  isPreviewGenerated: boolean;
  isExporting: boolean;
  onShareApp: () => void;
  activeView: 'editor' | 'guides' | 'faq';
  onNavigateTab: (tab: 'editor' | 'guides' | 'faq') => void;
  onOpenAdSenseGuide: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'about') => void;
  user: AuthUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onClearForm,
  onPrint,
  isPreviewGenerated,
  onShareApp,
  activeView,
  onNavigateTab,
  onOpenAdSenseGuide,
  onOpenLegal,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 safe-top">
      <div className="max-w-7xl mx-auto liquid-panel px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 shadow-xl">
        
        {/* Brand & App Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div 
            onClick={() => onNavigateTab('editor')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-teal-400 p-[1.5px] shadow-lg shadow-amber-500/25 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
          >
            <img 
              src="/golden_emblem_logo.jpg" 
              alt="Golden Emblem Logo" 
              className="w-full h-full object-cover rounded-[14px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1 max-w-[190px] xs:max-w-[240px] sm:max-w-xs md:max-w-md lg:max-w-xl">
            <h1 
              onClick={() => onNavigateTab('editor')}
              className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-tight truncate cursor-pointer hover:text-purple-700 transition-colors"
            >
              Cover Page App
            </h1>
            <div className="overflow-hidden whitespace-nowrap relative mask-marquee-fade py-0.5" title="Liquid Glass Edition • A4 Lab & Assignment • By Tanmoy Das • ECE Department • Batch no 2024-27 • Techno College Of Engineering Agartala">
              <div className="animate-marquee-readable text-[10px] sm:text-xs text-slate-500 font-semibold leading-none">
                <span className="inline-block px-4">
                  Liquid Glass Edition • A4 Lab &amp; Assignment • By Tanmoy Das • ECE Department • Batch no 2024-27 • Techno College Of Engineering Agartala
                </span>
                <span className="inline-block px-4">
                  Liquid Glass Edition • A4 Lab &amp; Assignment • By Tanmoy Das • ECE Department • Batch no 2024-27 • Techno College Of Engineering Agartala
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Action Buttons (Clean & Minimal) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Back to App button if in Guide or FAQ mode */}
          {activeView !== 'editor' && (
            <button
              type="button"
              onClick={() => onNavigateTab('editor')}
              className="px-3 py-1 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-full transition-all cursor-pointer shadow-sm"
            >
              Generator Tool
            </button>
          )}

          {/* User Auth Button */}
          {user ? (
            <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-200/80 rounded-full py-0.5 pl-1.5 pr-2.5 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                {user.email.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-[11px] font-semibold text-indigo-900 truncate max-w-[90px] sm:max-w-[130px]" title={user.email}>
                {user.email.split('@')[0]}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="p-1 hover:text-rose-600 text-slate-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-full transition-all cursor-pointer shadow-sm"
              title="Login with Email & Brevo OTP"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Icon-only Share App Button */}
          <button
            type="button"
            onClick={onShareApp}
            className="p-1.5 text-indigo-900 bg-indigo-500/20 hover:bg-indigo-500/30 active:scale-95 border border-indigo-500/35 rounded-full transition-all cursor-pointer shadow-xs backdrop-blur-md flex items-center justify-center"
            title="Share App"
          >
            <Share2 className="w-4 h-4 text-indigo-700" />
          </button>

          {/* Compact Header Reset Button */}
          <button
            type="button"
            onClick={onClearForm}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 border border-rose-500/20 rounded-full transition-all cursor-pointer shadow-xs backdrop-blur-md"
            title="Reset and clear all fields"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          {/* Direct Print */}
          <button
            type="button"
            onClick={onPrint}
            disabled={!isPreviewGenerated}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white/70 hover:bg-white/95 disabled:opacity-40 rounded-full border border-white/90 shadow-sm transition-all cursor-pointer backdrop-blur-md"
            title="Print directly"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          {/* More Menu (Subtle 3-dots dropdown for Guides, AdSense, Policy) */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all cursor-pointer border border-transparent hover:border-slate-200"
              title="More Options & Legal Pages"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-1.5 z-50 animate-fade-in text-xs">
                <a
                  href="#adsense-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    onOpenAdSenseGuide();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-800 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>AdSense Approval Guide</span>
                </a>

                <div className="my-1 border-t border-slate-100" />

                <a
                  href="#guides"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    onNavigateTab('guides');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Academic Formatting Guides</span>
                </a>

                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    onNavigateTab('faq');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>User Guide &amp; FAQ</span>
                </a>

                <div className="my-1 border-t border-slate-100" />

                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    onOpenLegal('privacy');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Privacy Policy</span>
                </a>

                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    onOpenLegal('about');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>About &amp; Contact</span>
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

