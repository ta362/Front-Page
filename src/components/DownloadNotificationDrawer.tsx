import React from 'react';
import { DownloadNotificationItem } from '../types';
import {
  X,
  Bell,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Printer,
  Trash2,
  Download,
  BellOff,
  Clock,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

interface DownloadNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DownloadNotificationItem[];
  onClearAll: () => void;
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onRedownload: (item: DownloadNotificationItem) => void;
  isChromeSilentDisabled: boolean;
  onToggleChromeSilent: (disabled: boolean) => void;
}

export const DownloadNotificationDrawer: React.FC<DownloadNotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onMarkAllRead,
  onMarkRead,
  onRedownload,
  isChromeSilentDisabled,
  onToggleChromeSilent,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTime = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 30) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFormatIcon = (format: DownloadNotificationItem['format']) => {
    switch (format) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'JPG':
      case 'PNG':
        return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      case 'PRINT':
        return <Printer className="w-5 h-5 text-purple-500" />;
      default:
        return <Download className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-white/10 text-amber-300">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                In-App Download Center
              </h2>
              <p className="text-xs text-indigo-200/80">
                All file downloads logged in app • Chrome Silent Alerts Blocked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chrome Silent Notification Toggle Switch */}
        <div className="p-3.5 bg-amber-50/80 border-b border-amber-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2 min-w-0">
            <BellOff className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">Chrome Silent Notifications</span>
              <span className="text-[11px] text-slate-600 leading-tight block">
                {isChromeSilentDisabled
                  ? 'Disabled. Notifications appear strictly inside this app.'
                  : 'Enabled. Standard browser alerts will display.'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onToggleChromeSilent(!isChromeSilentDisabled)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shrink-0 cursor-pointer shadow-sm ${
              isChromeSilentDisabled
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {isChromeSilentDisabled ? 'OFF (In-App Only)' : 'ON'}
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>
            {notifications.length} Download Log{notifications.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer font-bold"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-300">
                <Download className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-700">No In-App Downloads Yet</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                When you download or export A4 Cover Pages as PDF, JPG, or PNG, your notifications will appear directly right here!
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onMarkRead(item.id)}
                className={`p-3.5 rounded-2xl border transition-all relative group cursor-pointer ${
                  item.read
                    ? 'bg-white border-slate-200 hover:border-indigo-300'
                    : 'bg-indigo-50/50 border-indigo-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/80 shrink-0 mt-0.5">
                    {getFormatIcon(item.format)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black text-slate-800 truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(item.timestamp)}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 truncate mb-1">
                      📄 {item.fileName}
                    </div>

                    <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Saved In-App</span>
                        {item.fileSize && (
                          <span className="text-slate-400 font-medium">({item.fileSize})</span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRedownload(item);
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-indigo-700 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Download className="w-3 h-3" />
                        Re-download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Client-side Offline Storage</span>
          </div>
          <span className="font-bold text-slate-400">PWA Hook Active</span>
        </div>
      </div>
    </div>
  );
};
