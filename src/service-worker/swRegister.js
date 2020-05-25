const isLocalhost = Boolean(
  window.location.hostname === 'localhost'

    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'

    // 127.0.0.0/8 are considered localhost for IPv4.
    || window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const registerSW = async (swPath, config) => {

  try {

    const registration = await navigator
      .serviceWorker
      .register(swPath);

    registration.onupdatefound = () => {

      const installingWorker = registration.installing;

      if (installingWorker == null) {

        return;

      }
      installingWorker.onstatechange = () => {

        if (installingWorker.state === 'installed') {

          if (navigator.serviceWorker.controller) {


            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.log(
              'New content is available and will be used when all '
                  + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
            );

            // Execute callback
            if (config && config.onUpdate) {

              config.onUpdate(registration);

            }

          } else {


            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.');

            // Execute callback
            if (config && config.onSuccess) {

              config.onSuccess(registration);

            }

          }

        }

      };

    };


  } catch (error) {

    console.error('Error during service worker registration:', error);

  }

};

const checkValidServiceWorker = async (swPath, config) => {

  try {

    // Check if the service worker can be found. If it can't reload the page.
    const swResponse = await fetch(swPath, {
      headers: { 'Service-Worker': 'script' },
    });

    if (swResponse.status === 404) {

      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready;

      await registration.unregister();

      window.location.reload();

    } else {

      registerSW(swPath, config);

    }

  } catch (error) {

    console.log(
      'No internet connection found. App is running in offline mode.'
    );

  }

};

const checkSW = async (config) => {

  const swPath = '/sw.js';

  if (isLocalhost) {

    checkValidServiceWorker(swPath, config);

  } else {

    registerSW(swPath, config);

  }

};

export const register = async (config) => {

  window.addEventListener('load', checkSW(config));

};

export const unregister = async () => {

  if ('serviceWorker' in navigator) {

    try {

      const registration = await navigator.serviceWorker.ready;

      registration.unregister();

    } catch (error) {

      console.error(error.message);

    }


  }

};
