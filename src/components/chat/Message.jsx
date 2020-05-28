import React from 'react';
import styled from 'styled-components';
import { lightColor } from 'Style/colors';
import { Animated } from 'react-animated-css';

const MessageWrapper = styled.div`
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

const Message = ({
  id, content, author, updatedAt
}) => {

  const getMinutes = (time) => {

    const diff = Math.abs(new Date(time) - new Date());

    return Math.round(((diff % 86400000) % 3600000) / 60000);

  };

  return (
    <Animated animationIn="fadeIn" isVisible>
      <MessageWrapper>
        <MessageText>
          {content}
        </MessageText>
        <TimeMessage>
          posted
          {' '}
          <span>
            {getMinutes(updatedAt)}
            {' '}
            minutes ago
          </span>
          {' '}
          by
          {' '}
          {author}
        </TimeMessage>
      </MessageWrapper>
    </Animated>
  );

};

export default Message;
