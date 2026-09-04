import React from 'react';
import {
  Sparkles,
  Smartphone,
  Printer,
  Download,
  FileSpreadsheet,
  Layers,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  onOpenPresets: () => void;
  onOpenAndroidModal: () => void;
  onClearForm: () => void;
  onPrint: () => void;
  onDownloadJPG: () => void;
  onDownloadPDF: () => void;
  isPreviewGenerated: boolean;
  isExporting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPresets,
  onOpenAndroidModal,
  onClearForm,
  onPrint,
  onDownloadJPG,
  onDownloadPDF,
  isPreviewGenerated,
  isExporting,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 safe-top">
      <div className="max-w-7xl mx-auto liquid-panel px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-xl">
        
        {/* Brand & App Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 p-[1.5px] shadow-lg shadow-purple-500/25 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-tight truncate">
              Cover Page App
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 font-semibold leading-none truncate">
              Liquid Glass Edition • A4 Lab & Assignment
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Presets Button (Liquid Cyan Pill) */}
          <button
            type="button"
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-800 bg-teal-500/15 hover:bg-teal-500/25 active:scale-95 border border-teal-500/30 rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
            title="Load university sample presets"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Android Project Modal Trigger (Liquid Violet Pill) */}
          <button
            type="button"
            onClick={onOpenAndroidModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-800 bg-purple-500/15 hover:bg-purple-500/25 active:scale-95 border border-purple-500/30 rounded-full transition-all cursor-pointer shadow-sm backdrop-blur-md"
            title="View Kotlin Android Studio project source"
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Android APK</span>
          </button>

          {/* Direct Print (Desktop / Tablet) */}
          <button
            type="button"
            onClick={onPrint}
            disabled={!isPreviewGenerated}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white/70 hover:bg-white/95 disabled:opacity-40 rounded-full border border-white/90 shadow-sm transition-all cursor-pointer backdrop-blur-md"
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
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold liquid-pill-blue cursor-pointer ${
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
