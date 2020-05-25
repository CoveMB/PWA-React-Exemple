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

  return fetch(request);

};

const getFetchData = (url, data, store) => {

  if (store === 'messages') {

    return {
      id: data.channel, result: data.messages
    };

  }

  if (store === 'omdbapi') {

    return {
      id: new URL(url).searchParams.get('s'), result: data.Search
    };

  }

  return false;

};

const fetchAndStoreDb = async (request, store) => {

  try {

    const fetchResponse = await fetch(request);

    const data = await fetchResponse.clone().json();

    const dataToStore = getFetchData(request.url, data, store);

    await deleteElementDb(store, dataToStore.id);

    await writeDb(store, dataToStore);

    return fetchResponse;

  } catch (error) {

    console.log(error);

    return error;

  }


};


self.addEventListener('fetch', async (event) => {

  const { request } = event;

  if (!request.url.includes('sock') && request.method === 'GET') {

    const fetchAndStoreUrls = [ 'omdbapi', 'messages' ];
    const isFetAndStoreCandidate = fetchAndStoreUrls.some((url) => request.url.includes(url));

    if (isFetAndStoreCandidate) {

      const store = fetchAndStoreUrls.find((url) => request.url.includes(url));

      event.respondWith(fetchAndStoreDb(request, store));

    } else if (STATIC_FILES.join('.').indexOf(new URL(request.url).pathname) > -1) {

      // This is cache only strategy for static files cached on sw installation
      event.respondWith(caches.match(request));

    } else {

      event.respondWith(cachedWithFetchFallback(request));

    }

  }

});


self.addEventListener('sync', async (event) => {

  console.log('SYNCING YO');

  if (event.tag === 'sync-new-message') {

    console.log('[Service Worker] Syncing Chat..');

    const batch = '329';
    const baseUrl = 'https://wagon-chat.herokuapp.com/';
    const requestUrl = `${baseUrl + batch}/messages`;
    const allData = await readDb('sync-chat');

    console.log(allData);

    allData.forEach(async (data) => {

      try {

        const responseChat = await fetch(requestUrl, {
          method: 'POST',
          body  : JSON.stringify(data.result)
        });

        if (responseChat.ok) {

          await deleteElementDb('sync-chat', data.id);

        }

      } catch (error) {

        console.log(error);

      }

    });

  }

});


self.addEventListener('notificationclick', async (event) => {

  const { notification, action } = event;

  if (action === 'confirm') {

    notification.close();

  } else if (action === 'confused') {

    notification.close();
    clients.openWindow('https://www.computerhope.com/issues/ch001918.htm');

  }

});

self.addEventListener('notificationclose', async (event) => {


});
