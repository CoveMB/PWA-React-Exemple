import React from 'react';

const MessageList = ({ messages }) => {

  const getMinutes = (time) => {

    const diff = Math.abs(new Date(time) - new Date());

    return Math.round(((diff % 86400000) % 3600000) / 60000);

  };


  return (
    <>

      <br />

      {messages.map((message) => (
        <h4 key={message.id}>
          {message.content}
          <br />
          posted
          {' '}
          <span>
            {getMinutes(message.updated_at)}
            {' '}
            minutes ago
          </span>
          {' '}
          by
          {' '}
          {message.author}
        </h4>
      ))}

      <br />
    </>

  );

};

export default MessageList;
