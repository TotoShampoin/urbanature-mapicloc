var CACHE_NAME = 'mapicloc-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/async-functions.js',
  '/style.css',
  '/icon/icon.svg',
  '/icon/icon.png',
  '/icon/icon512.png',
  '/icon/icon384.png',
  '/icon/icon256.png',
  '/icon/icon128.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});