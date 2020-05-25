import { openDB } from 'idb';

const createDB = async () => {

  const idb = await openDB('app-store', 1, {

    upgrade(db) {

      if (!db.objectStoreNames.contains('omdbapi')) {

        db.createObjectStore('omdbapi', { keyPath: 'id' });

      }

      if (!db.objectStoreNames.contains('messages')) {

        db.createObjectStore('messages', { keyPath: 'id' });

      }

      if (!db.objectStoreNames.contains('sync-chat')) {

        db.createObjectStore('sync-chat', { keyPath: 'id' });

      }

    }
  });

};


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

const clearDb = async (storeName) => {

  const db = await openDB('app-store', 1,);

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.clear();

  return transaction.complete;

};

const deleteElementDb = async (storeName, id) => {

  const db = await openDB('app-store', 1,);

  const transaction = db.transaction(storeName, 'readwrite');

  const store = transaction.objectStore(storeName);

  store.delete(id);

  return transaction.complete;

};

export { createDB as default, readDb, writeDb, clearDb, deleteElementDb };
