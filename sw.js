const CACHE_NAME = 'nash-mir-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов (чтобы работало быстро)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если файл есть в кеше - возвращаем его, если нет - качаем из интернета
        return response || fetch(event.request);
      })
  );
});