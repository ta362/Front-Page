// Helper for triggering device system notifications with custom app icon
export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    try {
      await Notification.requestPermission();
    } catch (e) {
      console.error('Notification permission error', e);
    }
  }
};

export const sendDeviceSystemNotification = async (title: string, body: string) => {
  try {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration && registration.showNotification) {
          await registration.showNotification(title, {
            body,
            icon: '/pwa-192x192.png',
            badge: '/favicon.png',
            tag: 'cover-page-download',
            data: { url: window.location.href },
          } as NotificationOptions);
          return;
        }
      }

      // Fallback
      new Notification(title, {
        body,
        icon: '/pwa-192x192.png',
        badge: '/favicon.png',
        tag: 'cover-page-download',
      });
    }
  } catch (err) {
    console.error('Failed to trigger device notification', err);
  }
};
