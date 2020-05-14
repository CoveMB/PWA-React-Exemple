if (typeof idb === 'undefined') {

  self.importScripts('storageJs/idb.js');

}

if (typeof indexDb === 'undefined') {

  self.importScripts('storageJs/utility.js');

}


const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/storageJs/idb.js',
  '/offline.html',
  '/favicon.ico',
  '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css',
];


self.addEventListener('install', async () => {

  console.log('[Service Worker] Installing..');

  const staticCache = await caches.open(CACHE_STATIC_NAME);

  await staticCache.addAll(STATIC_FILES);

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


const cachedWithFetchFallback = async (request) => {

  if (!request.url.includes('sock')) {

    try {

      const cacheMatch = await caches.match(request);

      if (cacheMatch) {

        return cacheMatch;

      }

      const fetchResponse = await fetch(request);

      const dynamicCache = await caches.open(CACHE_DYNAMIC_NAME);

      dynamicCache.put(request, fetchResponse.clone());

      return fetchResponse;

    } catch (error) {

      console.log(error);

      if (request.headers.get('accept').includes('text/html')) {

        return caches.match('/offline.html');

      }

    }

  }

  return fetch(request);

};

const fetchAndStoreDb = async (request) => {

  try {

    const fetchResponse = await fetch(request);

    const data = await fetchResponse.clone().json();

    const movieSearch = new URL(request.url).searchParams.get('s');

    await writeDb('movies', movieSearch, data.Search);

    return fetchResponse;

  } catch (error) {

    console.log(error);

    return error;

  }


};

self.addEventListener('fetch', async (event) => {

  const { request } = event;

  if (request.url.indexOf('omdbapi') > -1) {

    event.respondWith(fetchAndStoreDb(request));

  } else if (STATIC_FILES.join('.').indexOf(new URL(request.url).pathname) > -1) {

    // This is cache only strategy for static files cached on sw installation
    event.respondWith(caches.match(request));

  } else {

    event.respondWith(cachedWithFetchFallback(request));

  }

});
