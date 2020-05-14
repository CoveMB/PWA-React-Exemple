// idb will promisify the indexDb
const indexDb = idb.open('app-store', 1, (db) => {

  if (!db.objectStoreNames.contains('movies')) {

    db.createObjectStore('movies', { keyPath: 'movieSearch' });

  }

});

const writeDb = async (storeName, key, data) => {

  const db = await indexDb;

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.put({
    movieSearch: key, results: data
  });

  return transaction.complete;

};

const readDb = async (storeName) => {

  const db = await indexDb;

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  return store.getAll();

};

const clearDb = async (storeName) => {

  const db = await indexDb;

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.clear();

  return transaction.complete;

};

const deleteElementDb = async (storeName, id) => {

  const db = await indexDb;

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.delete(id);

  return transaction.complete;

};
