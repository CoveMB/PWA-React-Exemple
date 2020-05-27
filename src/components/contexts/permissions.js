import React from 'react';

const evaluateBackgroundSync = async () => {

  try {

    const sw = await navigator.serviceWorker.ready;

    await sw.sync.register('sync-new-message');

    return true;

  } catch {

    return false;

  }

};


const evaluatePermissions = async () => {

  console.log('Evaluating permissions');

  const permissions = {};

  permissions.backgroundSync = await evaluateBackgroundSync();

  return permissions;

};

const PermissionContext = React.createContext(evaluatePermissions());

export { PermissionContext as default };
