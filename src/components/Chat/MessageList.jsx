import React from 'react';
import styled from 'styled-components';
import { lightColor } from '../Shared/Style/colors';
import { scrollbar } from '../Shared/Style/scrollbar';

const MessagesBox = styled.div`
  ${scrollbar}
  width: 100%;
  height: 54vh;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 4px rgba(71,16,122,0.4);
  border-radius: 4px;
  background-color: #fff;
  margin: 10px 0;
`;

const Message = styled.div`
  font-style: normal;
  font-size: 22px;
  line-height: 20px;
  margin: 10px 0 0 0;
  width: 100%;
  border-radius: 4px;
  background: ${lightColor};
  padding: 15px;
  word-wrap: break-word;
`;

const TimeMessage = styled.div`
  font-weight: bold;
  font-size: 14px;
  text-align: right;
  color: rgba(0, 0, 0, 0.6);
`;

const MessageList = ({ messages }) => {

  const getMinutes = (time) => {

    const diff = Math.abs(new Date(time) - new Date());

    return Math.round(((diff % 86400000) % 3600000) / 60000);

  };


  return (
    <>

      <MessagesBox>

        {messages.map((message) => (
          <Message key={message.id}>
            <h4>
              {message.content}
            </h4>
            <TimeMessage>

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
            </TimeMessage>
          </Message>
        ))}

      </MessagesBox>


    </>

  );

};

export default MessageList;
