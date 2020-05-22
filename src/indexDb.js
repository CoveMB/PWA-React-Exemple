import { openDB } from 'idb';

const readDb = async (storeName) => {

  const db = await openDB('app-store', 1,);

  const transaction = db.transaction(storeName, 'readonly');

  const store = transaction.objectStore(storeName);

  return store.getAll();

};


const writeDb = async (storeName, data) => {

  const db = await openDB('app-store', 1,);

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.put(data);

  return transaction.complete;

};

export { readDb, writeDb };
