const cacheName = 'improvement-roll';
const filesToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
];

self.addEventListener('install', function (event) {
  const promiseChain = Promise.resolve()
      .then(() => caches.delete(cacheName))
      .then(() => caches.open(cacheName))
      .then((cache) => cache.addAll(filesToCache));

  event.waitUntil(promiseChain);
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
