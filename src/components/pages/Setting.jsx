import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import { Checkbox } from 'semantic-ui-react';
import Layout from '../layout/Layout';

const Setting = () => {

  const [ enableNotification, setEnableNotification ] = useState(false);

  useEffect(() => {

    // (async () => {

    //   const notification = 'Notification enabled';
    //   const notificationOptions = {
    //     body    : 'You can turn them off in your settings',
    //     badge   : '/images/icons/app-icon-72x72.png',
    //     icon    : '/images/icons/app-icon-72x72.png',
    //     renotify: true,
    //     tag     : 'confirm-notification',
    //     vibrate : [
    //       100,
    //       50,
    //       20
    //     ],
    //     actions: [
    //       {
    //         action: 'confirm', title: 'Noted!'
    //       },
    //       {
    //         action: 'confused', title: 'What?'
    //       }
    //     ]
    //   };

    //   if ('serviceWorker' in navigator) {


    //     // If the service worker is available in the the browser use it to show notification
    //     const sw = await navigator.serviceWorker.ready;

    //     sw.showNotification(notification, notificationOptions);

    //   } else {

    //     // Else use regular notification API
    //     new Notification(notification, notificationOptions);

    //   }

    // })();

  }, []);

  const toggleNotification = async () => {

    if (Notification.permission !== 'granted') {

      const permission = await Notification.requestPermission();

      if (permission === 'granted') {

        setEnableNotification(true);

        const notification = 'Notification enabled';
        const notificationOptions = {
          body    : 'You can turn them off in your settings',
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
              action: 'confirm', title: 'Noted!'
            },
            {
              action: 'confused', title: 'What?'
            }
          ]
        };


        if ('serviceWorker' in navigator) {

          // If the service worker is available in the the browser use it to show notification
          const sw = await navigator.serviceWorker.ready;

          sw.showNotification(notification, notificationOptions);

        } else {

          // Else use regular notification API
          new Notification(notification, notificationOptions);

        }

      }

    }


  };

  return (
    <Layout header="Setting Page" animation="settings">
      {/* { ('Notification' in window) && <Checkbox toggle label="Enable notification" onChange={toggleNotification} checked={Notification.permission === 'granted' || enableNotification} />} */}
    </Layout>
  );

};

export default Setting;
