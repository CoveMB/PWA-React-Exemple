import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import { scrollbar } from 'Style/scrollbar';
import Message from './Message';

const MessagesBox = styled.div`
  ${scrollbar}
  width: 100%;
  height: 54vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: inset 0 0 4px rgba(71,16,122,0.4);
  border-radius: 4px;
  background-color: #fff;
  margin: 10px 0;
`;


const MessageList = ({ messages }) => {

  const messageBox = useRef(null);

  const scrollBottom = (ref) => {

    animateScroll.scrollToBottom({
      containerId: ref.current.id,
      smooth     : true
    });

  };

  useEffect(() => {

    const timer = setTimeout(() => {

      scrollBottom(messageBox);

    }, 400);

    return () => clearTimeout(timer);

  }, [ messages ]);

  return (
    <>

      <MessagesBox id="messageBox" ref={messageBox}>

        {messages.map(({
          id, content, updated_at, author
        }) => (
          <Message key={id} id={id} content={content} updatedAt={updated_at} author={author} />
        ))}

      </MessagesBox>


    </>

  );

};

export default MessageList;
