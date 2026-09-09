import React from 'react';
import {
  Sparkles,
  Printer,
  Download,
  FileSpreadsheet,
  ArrowDownToLine,
  RotateCcw,
  Smartphone
} from 'lucide-react';

interface NavbarProps {
  onOpenPresets: () => void;
  onClearForm: () => void;
  onPrint: () => void;
  onDownloadJPG: () => void;
  onDownloadPDF: () => void;
  isPreviewGenerated: boolean;
  isExporting: boolean;
  installPrompt: any;
  onTriggerInstall: () => void;
  onOpenInstallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPresets,
  onClearForm,
  onPrint,
  onDownloadJPG,
  onDownloadPDF,
  isPreviewGenerated,
  isExporting,
  installPrompt,
  onTriggerInstall,
  onOpenInstallModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 safe-top">
      <div className="max-w-7xl mx-auto liquid-panel px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 shadow-xl">
        
        {/* Brand & App Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 p-[1.5px] shadow-lg shadow-purple-500/25 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
          </div>
          <div className="min-w-0 flex-1 max-w-[190px] xs:max-w-[240px] sm:max-w-xs md:max-w-md lg:max-w-xl">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-tight truncate">
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

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Always Visible Install App Button (Identical to user's reference screenshot) */}
          <button
            type="button"
            onClick={() => {
              if (installPrompt) {
                onTriggerInstall();
              } else {
                onOpenInstallModal();
              }
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-extrabold text-emerald-900 bg-emerald-500/20 hover:bg-emerald-500/30 active:scale-95 border border-emerald-500/40 rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
            title="Install Cover Page App on Android / Phone"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-700 animate-bounce" />
            <span>Install App</span>
          </button>

          {/* Quick Presets Button (Liquid Cyan Pill) */}
          <button
            type="button"
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-teal-800 bg-teal-500/15 hover:bg-teal-500/25 active:scale-95 border border-teal-500/30 rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
            title="Load university sample presets"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Header Reset Button */}
          <button
            type="button"
            onClick={onClearForm}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-bold text-rose-700 bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 border border-rose-500/25 rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
            title="Reset and clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          {/* Direct Print (Desktop / Tablet) */}
          <button
            type="button"
            onClick={onPrint}
            disabled={!isPreviewGenerated}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white/70 hover:bg-white/95 disabled:opacity-40 rounded-full border border-white/90 shadow-sm transition-all cursor-pointer backdrop-blur-md"
            title="Print directly"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          {/* Quick Download JPG (Liquid Blue Pill) */}
          <button
            type="button"
            onClick={onDownloadJPG}
            disabled={!isPreviewGenerated || isExporting}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold liquid-pill-blue cursor-pointer ${
              isPreviewGenerated && !isExporting
                ? 'opacity-100 active:scale-95'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Save JPG'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
