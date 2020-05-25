import { deleteElementDb, writeDb } from './indexDb';

const CACHE_STATIC_PAGES = 'static-pages';

const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
];


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

const cacheStatic = async () => {

  console.log('[Service Worker] Installing..');

  const staticCache = await caches.open(CACHE_STATIC_PAGES);

  await staticCache.addAll(STATIC_FILES);

};

const dynamicCacheWithOfflineFallback = async ({ request }) => {

  try {

    const cacheMatch = await caches.match(request);

    if (cacheMatch) {

      return cacheMatch;

    }

    const fetchResponse = await fetch(request);

    const dynamicCache = await caches.open(CACHE_STATIC_PAGES);

    dynamicCache.put(request, fetchResponse.clone());

    return fetchResponse;

  } catch (error) {

    return caches.match('/offline.html');

  }

};


export { fetchAndStoreDb, cacheStatic, dynamicCacheWithOfflineFallback };
