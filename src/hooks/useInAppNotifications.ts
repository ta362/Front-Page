import { useState, useEffect, useCallback } from 'react';
import { DownloadNotificationItem } from '../types';
import {
  getStoredDownloadNotifications,
  addDownloadNotification,
  markDownloadNotificationAsRead,
  clearAllDownloadNotifications,
  isChromeSilentNotificationsDisabled,
  setChromeSilentNotificationsDisabled
} from '../utils/downloadNotificationStore';

export function useInAppNotifications() {
  const [notifications, setNotifications] = useState<DownloadNotificationItem[]>(() => 
    getStoredDownloadNotifications()
  );
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChromeSilentDisabled, setIsChromeSilentDisabledState] = useState<boolean>(() =>
    isChromeSilentNotificationsDisabled()
  );

  // Sync state with storage changes
  const refreshNotifications = useCallback(() => {
    setNotifications(getStoredDownloadNotifications());
  }, []);

  useEffect(() => {
    const handleAdded = () => refreshNotifications();
    const handleUpdated = () => refreshNotifications();

    window.addEventListener('app_download_notification_added', handleAdded);
    window.addEventListener('app_download_notifications_updated', handleUpdated);

    return () => {
      window.removeEventListener('app_download_notification_added', handleAdded);
      window.removeEventListener('app_download_notifications_updated', handleUpdated);
    };
  }, [refreshNotifications]);

  // Add download log item
  const logDownload = useCallback((
    title: string,
    fileName: string,
    format: 'PDF' | 'JPG' | 'PNG' | 'PRINT',
    fileSize?: string,
    dataUrl?: string
  ) => {
    return addDownloadNotification({
      title,
      fileName,
      format,
      fileSize: fileSize || '~1.2 MB',
      status: 'completed',
      dataUrl
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    const updated = markDownloadNotificationAsRead();
    setNotifications(updated);
  }, []);

  const markAsRead = useCallback((id: string) => {
    const updated = markDownloadNotificationAsRead(id);
    setNotifications(updated);
  }, []);

  const clearAll = useCallback(() => {
    clearAllDownloadNotifications();
    setNotifications([]);
  }, []);

  const toggleChromeSilent = useCallback((disabled: boolean) => {
    setChromeSilentNotificationsDisabled(disabled);
    setIsChromeSilentDisabledState(disabled);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    isDrawerOpen,
    setIsDrawerOpen,
    logDownload,
    markAllAsRead,
    markAsRead,
    clearAll,
    isChromeSilentDisabled,
    toggleChromeSilent,
  };
}
