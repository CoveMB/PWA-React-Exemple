const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', async () => {

  console.log('[Service Worker] Installing..');

  const staticCache = await caches.open(CACHE_STATIC_NAME);

  await staticCache.addAll([
    '/',
    '/index.html',
    '/offline.html',
    '/images/icons/favicon.ico',
    '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css',
  ]);

});

// Here we disable eslint to enforce a regular function callback (not arrow) to keep the context (self)
self.addEventListener('activate', async function(){ // eslint-disable-line

  console.log('[Service Worker] Activating..');
  const cachesList = await caches.keys();

  Promise.all(cachesList.map(async (cache) => {

    if (cache !== CACHE_STATIC_NAME && cache !== CACHE_DYNAMIC_NAME) {

      console.log('[Service Worker] Removing old cache.', cache);

      return caches.delete(cache);

    }

    return null;

  }));

  return self.clients.claim();

});


const cachedRessources = async (request) => {

  if (!request.url.includes('sock')) {

    try {

      const cacheMatch = await caches.match(request);

      if (cacheMatch) {

        return cacheMatch;

      }

      const fetchResponse = await fetch(request);

      const dynamicCache = await caches.open(CACHE_DYNAMIC_NAME);

      dynamicCache.put(request.url, fetchResponse.clone());


      return fetchResponse;

    } catch (error) {

      console.log(error);
      const staticCache = await caches.open(CACHE_STATIC_NAME);

      return staticCache.match('/offline.html');

    }

  }

  return fetch(request);

};

self.addEventListener('fetch', async (event) => {

  event.respondWith(cachedRessources(event.request));

});
