// Service Worker for Academic Cover Page Generator PWA
const CACHE_NAME = 'cover-page-generator-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Explicitly suppress/block browser silent notifications and push prompts
self.addEventListener('push', (event) => {
  event.preventDefault();
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
});

self.addEventListener('fetch', (event) => {
  // Let network handle regular requests, fallback gracefully
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

