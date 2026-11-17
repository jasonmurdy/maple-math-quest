const CACHE_NAME = 'maple-math-quest-v2';
const OFFLINE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/audio.js',
  './js/curriculum.js',
  './js/topics.js',
  './js/hero.js',
  './js/manipulatives.js',
  './js/app.js',
  './assets/icon-maple.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
