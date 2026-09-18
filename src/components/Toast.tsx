import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full px-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isProcessing = toast.text.toLowerCase().includes('processing');

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto p-3.5 rounded-2xl bg-white/98 text-slate-900 border border-slate-200/90 shadow-2xl shadow-slate-900/15 flex items-center justify-between gap-3 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* App Icon */}
                <div className="relative shrink-0">
                  <img
                    src="/golden_emblem_logo.jpg"
                    alt="App Icon"
                    className="w-8 h-8 rounded-xl object-cover border border-amber-500/30 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Indicator Badge */}
                  <span className={`absolute -bottom-1 -right-1 p-0.5 rounded-full text-white ${
                    toast.type === 'success' ? 'bg-emerald-500' :
                    toast.type === 'error' ? 'bg-rose-500' :
                    toast.type === 'warning' ? 'bg-amber-500' : 'bg-purple-600'
                  }`}>
                    {toast.type === 'success' && <CheckCircle2 className="w-2.5 h-2.5" />}
                    {toast.type === 'error' && <AlertCircle className="w-2.5 h-2.5" />}
                    {toast.type === 'warning' && <AlertTriangle className="w-2.5 h-2.5" />}
                    {toast.type === 'info' && (
                      isProcessing ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Info className="w-2.5 h-2.5" />
                    )}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                    Cover Page App
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug flex items-center gap-1.5">
                    {isProcessing && <RefreshCw className="w-3.5 h-3.5 text-purple-600 animate-spin shrink-0" />}
                    {toast.text}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
