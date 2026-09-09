import React from 'react';
import { RotateCcw, Trash2, X, Sparkles } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmResetBlank: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmResetBlank,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/80 overflow-hidden text-slate-800 transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 rounded-full transition-colors cursor-pointer active:scale-90"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon & Heading */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center shrink-0 text-rose-600 shadow-inner">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="pr-6">
            <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
              Reset All Details?
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
              Are you sure you want to clear the form? All entered details (College, Course, Faculty, Student Name, Roll, Registration, Semester, and Logo) will be completely cleared.
            </p>
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-2.5 pt-1">
          {/* Option 1: Clear All to Blank */}
          <button
            type="button"
            onClick={onConfirmResetBlank}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Yes, Clear Everything (Blank Page)</span>
          </button>

          {/* Option 2: Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 font-semibold text-xs rounded-2xl transition-all cursor-pointer active:scale-[0.99]"
          >
            Cancel (Keep Current Details)
          </button>
        </div>
      </div>
    </div>
  );
};
