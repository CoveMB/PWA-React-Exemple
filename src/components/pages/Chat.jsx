import React, { useState, useEffect, useContext } from 'react';
import SingleInputForm from 'Shared/Form/SingleInputForm';
import SingleInput from 'Shared/Form/SingleInput';
import PermissionContext from 'Contexts/permissions';
import { writeDb, readDb } from 'Sw/indexDb';
import { syncData } from 'Sw/backgroundSync';
import MessageList from '../chat/MessageList';
import Layout from '../layout/Layout';


const Chat = () => {

  const permissions = useContext(PermissionContext);
  const [ newMessage, setNewMessage ] = useState('');
  const [ sender, setSender ] = useState('Incognito');
  const [ chat, setChat ] = useState([]);
  const batch = '329';
  const baseUrl = 'https://wagon-chat.herokuapp.com/';
  const chatUrl = `${baseUrl + batch}/messages`;


  const postNewMessage = async (content, author, url) => {

    await fetch(url, {
      method: 'POST',
      body  : JSON.stringify({
        content, author
      })
    });

  };

  const addMessageSyncDB = async (content, author) => {

    try {

      const postData = {
        id    : new Date().toISOString(),
        result: {
          content, author
        }
      };

      await writeDb('sync-chat', postData);

    } catch {

      await postNewMessage(newMessage, sender, chatUrl);

    }

  };

  const fetchChat = async (url, content, author) => {

    try {

      try {

        const responseChat = await fetch(url);

        const chatData = await responseChat.json();

        setChat(chatData.messages || []);

      } catch {

        const historyMessages = await readDb('messages');

        if (historyMessages) {

          const foundHistoric = historyMessages.find((historic) => historic.id === batch);

          if (content) {

            setChat([
              ...foundHistoric.result,
              {
                id        : 'new',
                author,
                content,
                created_at: new Date()
              }
            ]);

          } else {

            setChat(foundHistoric.result || []);

          }

        }

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    (async () => {

      const { backgroundSync } = await permissions;


      if (newMessage) {

        if (('SyncManager' in window) && backgroundSync) {

          await addMessageSyncDB(newMessage, sender);

        } else {

          await postNewMessage(newMessage, sender, chatUrl);

        }

      }

      if (backgroundSync) {

        console.log('Sync instruction');

        // Sync data for new message if any messages where sent offline
        await syncData('sync-new-message');

      }

      // Fetch new messages (the timeout insure that new messages sent through service worker would have reach the server)
      const timer = setTimeout(async () => {

        await fetchChat(chatUrl, newMessage, sender);

      }, 80);

      return () => clearTimeout(timer);


    })();

  }, [ newMessage ]);


  return (
    <Layout header="Chat Room" animation="phone">
      <SingleInput
        name="message"
        element={sender}
        setElement={setSender}
        label="Set your name:"
      />
      <MessageList messages={chat} />
      <SingleInputForm
        name="author"
        element={newMessage}
        setElement={setNewMessage}
      />
    </Layout>
  );

};

export default Chat;
