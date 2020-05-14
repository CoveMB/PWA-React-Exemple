import { openDB } from 'idb';

const readDb = async (storeName) => {

  const db = await openDB('app-store', 1,);

  const transaction = db.transaction(storeName, 'readonly');

  const store = transaction.objectStore(storeName);

  return store.getAll();

};

export { readDb };
