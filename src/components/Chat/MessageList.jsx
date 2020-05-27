import React from 'react';
import styled from 'styled-components';
import { lightColor } from '../Shared/Style/colors';
import { scrollbar } from '../Shared/Style/scrollbar';

const MessagesBox = styled.div`
  ${scrollbar}
  width: 100%;
  height: 54vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: inset 0 0 4px rgba(71,16,122,0.4);
  border-radius: 4px;
  background-color: #fff;
  margin: 10px 0;
`;

const Message = styled.div`
  font-style: normal;
  font-size: 1.2rem;
  line-height: 20px;
  margin: 10px 2%;
  width: 92%;
  border-radius: 4px;
  background: ${lightColor};
  padding: 2%;
  word-wrap: break-word;
`;

const MessageText = styled.p`
  width: 100%
`;

const TimeMessage = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
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
            <MessageText>
              {message.content}
            </MessageText>
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
