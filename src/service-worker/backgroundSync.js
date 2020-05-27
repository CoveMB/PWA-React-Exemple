export const syncData = async (syncStore) => {

  const sw = await navigator.serviceWorker.ready;

  await sw.sync.register(syncStore);

};
