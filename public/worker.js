self.addEventListener('install', async (event) => {

  console.log('[Service Worker] Installing..');

  const staticCache = await caches.open('static');
  const addToCache = await staticCache.addAll([ '/', '/images/icons/favicon.ico' ]);

  event.waitUntil(addToCache);

});

self.addEventListener('activate', function(){ // eslint-disable-line

  console.log('[Service Worker] Activating..');

  return self.clients.claim();

});

self.addEventListener('fetch', (event) => {

  // console.log('[Service Worker] Fetching..', event);

  event.respondWith(caches.match(event.request)
    .then(((cacheResponse) => (cacheResponse || fetch(event.request)
      .then((fetchResponse) => {

        caches.open('dynamic').then((dynamicCache) => {

          dynamicCache.put(event.request.url, fetchResponse.clone());

          return fetchResponse;

        });

      })))));

});
