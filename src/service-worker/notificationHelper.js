const handleNotification = async (event) => {

  const { notification, action } = event;

  if (action === 'confirm') {

    notification.close();

  } else if (action === 'confused') {

    notification.close();
    clients.openWindow('https://www.computerhope.com/issues/ch001918.htm');

  }

};

const handleCloseNotification = async () => {


};

export { handleNotification, handleCloseNotification };
