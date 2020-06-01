const handleNotification = async (event) => {

  const { notification, action } = event;

  if (action === 'confirm') {

    notification.close();

  } else if (action === 'confused') {

    notification.close();
    clients.openWindow('https://www.computerhope.com/issues/ch001918.htm');

  }

  return setTimeout(() => {

    self.registration.showNotification('Hello again from service worker working in the background');

  }, 40000);

};

const handleCloseNotification = async () => {


};

export { handleNotification, handleCloseNotification };
