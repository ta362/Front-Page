import React from 'react';
import { SAMPLE_PRESETS } from '../utils/academicPresets';
import { CoverPageFormData } from '../types';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (data: Partial<CoverPageFormData>) => void;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in">
      <div className="liquid-panel w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/90">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-tr from-amber-400 to-orange-400 text-white rounded-2xl shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                Academic Template Presets
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Click any preset to automatically populate the form with sample information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards List */}
        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto flex-1">
          {SAMPLE_PRESETS.map((preset, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectPreset(preset.data);
                onClose();
              }}
              className={`group p-4 bg-white/60 hover:bg-white/95 border rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                index === 0
                  ? 'border-indigo-400/80 bg-indigo-50/50 hover:bg-indigo-50/90'
                  : 'border-white/80 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="text-2xl p-2.5 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  {preset.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                      {preset.name}
                    </h4>
                    {index === 0 && (
                      <span className="px-2.5 py-0.5 bg-indigo-500/15 text-indigo-700 text-[10px] font-extrabold rounded-full border border-indigo-500/30">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{preset.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="text-slate-600 font-semibold">{preset.data.courseCode}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-bold">{preset.data.submissionType}</span>
                  </div>
                </div>
              </div>

              <div className="p-2 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/40 border-t border-slate-200/80 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-full transition-all cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
