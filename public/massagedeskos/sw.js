const CACHE_NAME = 'massagedeskos-v1';
const APP_SHELL = [
  '/massagedeskos/',
  '/massagedeskos/index.html',
  '/massagedeskos/manifest.webmanifest',
  '/massagedeskos/icons/icon-192.svg',
  '/massagedeskos/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isAppRequest = requestUrl.pathname.startsWith('/massagedeskos/');

  if (!isSameOrigin || !isAppRequest) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => cached || caches.match('/massagedeskos/index.html'));

      return cached || networkFetch;
    })
  );
});
