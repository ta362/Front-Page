import { DownloadNotificationItem } from '../types';

const DB_KEY = 'app_download_notifications_db_v1';
const SILENT_NOTIF_PREF_KEY = 'disable_chrome_silent_notifications_v1';

/**
 * Retrieves stored download notifications database
 */
export function getStoredDownloadNotifications(): DownloadNotificationItem[] {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load download notifications from storage:', err);
    return [];
  }
}

/**
 * Saves a new download notification item to the in-app database
 */
export function addDownloadNotification(
  item: Omit<DownloadNotificationItem, 'id' | 'timestamp' | 'read'>
): DownloadNotificationItem {
  const newNotif: DownloadNotificationItem = {
    ...item,
    id: `dl_notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    read: false,
  };

  const existing = getStoredDownloadNotifications();
  // Keep up to 30 recent notification logs
  const updated = [newNotif, ...existing].slice(0, 30);

  try {
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save download notification to database:', err);
  }

  // Dispatch custom event for real-time reactivity across components
  window.dispatchEvent(new CustomEvent('app_download_notification_added', { detail: newNotif }));

  return newNotif;
}

/**
 * Marks all or a specific download notification as read
 */
export function markDownloadNotificationAsRead(id?: string): DownloadNotificationItem[] {
  const existing = getStoredDownloadNotifications();
  const updated = existing.map((n) => {
    if (!id || n.id === id) {
      return { ...n, read: true };
    }
    return n;
  });

  try {
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update read state:', err);
  }

  window.dispatchEvent(new CustomEvent('app_download_notifications_updated'));
  return updated;
}

/**
 * Clears all download notifications from in-app database
 */
export function clearAllDownloadNotifications(): void {
  try {
    localStorage.removeItem(DB_KEY);
  } catch (err) {
    console.error('Failed to clear download notifications:', err);
  }
  window.dispatchEvent(new CustomEvent('app_download_notifications_updated'));
}

/**
 * Toggle or check silent Chrome notification suppression preference
 */
export function isChromeSilentNotificationsDisabled(): boolean {
  try {
    const pref = localStorage.getItem(SILENT_NOTIF_PREF_KEY);
    return pref !== 'false'; // Default to true (disabled Chrome silent notifications)
  } catch {
    return true;
  }
}

export function setChromeSilentNotificationsDisabled(disabled: boolean): void {
  try {
    localStorage.setItem(SILENT_NOTIF_PREF_KEY, String(disabled));
  } catch (err) {
    console.error('Failed to save Chrome silent notification preference:', err);
  }
}
