const CACHE_NAME = 'todo-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/favicon.ico',
  '/logo192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const title = 'Ma To-Do List';
  const options = {
    body: event.data.text(),
    icon: 'logo192.png',
    badge: 'logo192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});