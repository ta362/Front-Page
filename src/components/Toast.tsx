import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icon = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
            info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
          }[toast.type];

          const borderColors = {
            success: 'border-emerald-500/40 bg-slate-900/95 text-slate-100',
            error: 'border-rose-500/40 bg-slate-900/95 text-slate-100',
            warning: 'border-amber-500/40 bg-slate-900/95 text-slate-100',
            info: 'border-sky-500/40 bg-slate-900/95 text-slate-100',
          }[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${borderColors}`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <p className="text-sm font-medium leading-snug">{toast.text}</p>
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
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
