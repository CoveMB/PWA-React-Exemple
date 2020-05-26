import React, { useState, useEffect } from 'react';
import SingleInputForm from '../Shared/Form/SingleInputForm';
import SingleInput from '../Shared/Form/SingleInput';
import { writeDb, readDb } from '../../service-worker/indexDb';
import MessageList from '../Chat/MessageList';
import Layout from '../Layout/Layout';

const Chat = () => {

  const [ newMessage, setNewMessage ] = useState('');
  const [ author, setAuthor ] = useState('theUndefinedPerson');
  const [ chat, setChat ] = useState([]);
  const batch = '329';
  const baseUrl = 'https://wagon-chat.herokuapp.com/';

  const postNewMessage = async () => {

    await fetch(`${baseUrl + batch}/messages`, {
      method: 'POST',
      body  : JSON.stringify(newMessage)
    });

  };

  const syncData = async () => {

    try {

      const sw = await navigator.serviceWorker.ready;

      await sw.sync.register('sync-new-message');

    } catch (error) {

      console.log('The sync where not registered do to a permission denied error');

      if (newMessage) {

        await postNewMessage();

      }

    }

  };

  const addMessageSyncDB = async () => {

    const postData = {
      id    : new Date().toISOString(),
      result: {
        content: newMessage, author
      }
    };

    await writeDb('sync-chat', postData);

  };

  const fetchChat = async () => {

    try {

      try {

        const responseChat = await fetch(`${baseUrl + batch}/messages`);

        const chatData = await responseChat.json();

        setChat(chatData.messages || []);

      } catch {

        const historyMessages = await readDb('messages');

        if (historyMessages) {

          const foundHistoric = historyMessages.find((historic) => historic.id === batch);

          setChat(foundHistoric.result || []);

        }

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    (async () => {

      if (newMessage) {

        if ('SyncManager' in window) {

          await addMessageSyncDB();

        } else {

          await postNewMessage();

        }

      }

      // Sync data for new message if any messages where sent offline
      await syncData();

      // Fetch new messages (the timeout insure that new messages sent through service worker would have reach the server)
      const timer = setTimeout(async () => {

        await fetchChat();

      }, 50);

      return () => clearTimeout(timer);

    })();

  }, [ newMessage ]);


  return (
    <Layout header="Chat Room">
      <p>This page was loaded asynchronously!</p>
      <MessageList messages={chat} />
      <SingleInput
        name="message"
        element={author}
        setElement={setAuthor}
        label="Set your name:"
      />
      <SingleInputForm
        element={newMessage}
        setElement={setNewMessage}
        label="POST a new message:"
      />
    </Layout>
  );

};

export default Chat;
