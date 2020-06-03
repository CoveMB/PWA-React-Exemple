const handleNotification = async (event) => {

  const { notification, action } = event;

  if (action === 'confirm') {

    notification.close();

  } else if (action === 'confused') {

    notification.close();
    clients.openWindow('https://www.computerhope.com/issues/ch001918.htm');

  }

  return setTimeout(() => {

    const notification = 'Hello again from service worker!';
    const notificationOptions = {
      body    : 'This event happened in the background',
      badge   : '/images/icons/app-icon-72x72.png',
      icon    : '/images/icons/app-icon-72x72.png',
      renotify: true,
      tag     : 'confirm-notification',
      vibrate : [
        100,
        50,
        20
      ],
      actions: [
        {
          action: 'confirm', title: 'So cool'
        },
        {
          action: 'confused', title: 'Stop now'
        }
      ]
    };

    self.registration.showNotification(notification, notificationOptions);

  }, 400000);

};

const handleCloseNotification = async () => {


};

export { handleNotification, handleCloseNotification };
