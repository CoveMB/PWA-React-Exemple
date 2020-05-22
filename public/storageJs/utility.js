// idb will promisify the indexDb
const indexDb = idb.open('app-store', 1, (db) => {

  if (!db.objectStoreNames.contains('omdbapi')) {

    db.createObjectStore('omdbapi', { keyPath: 'id' });

  }

  if (!db.objectStoreNames.contains('messages')) {

    db.createObjectStore('messages', { keyPath: 'id' });

  }

  if (!db.objectStoreNames.contains('sync-chat')) {

    db.createObjectStore('sync-chat', { keyPath: 'id' });

  }

});

const writeDb = async (storeName, data) => {

  const db = await indexDb;

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.put(data);

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
