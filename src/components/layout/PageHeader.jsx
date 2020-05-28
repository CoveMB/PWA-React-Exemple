import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react-web';
import searchAnimation from 'Images/animatedIcons/search.json';
import phoneAnimation from 'Images/animatedIcons/phone.json';
import settingsAnimation from 'Images/animatedIcons/settings.json';

const Header = styled.p`
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  font-family: 'Lato', serif;
`;

const LottieWrapper = styled.div`
  margin: 25px 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto
`;


const PageHeader = ({ text, animation }) => {

  let lottieAnimation = null;

  if (animation === 'search') {

    lottieAnimation = searchAnimation;

  } else if (animation === 'phone') {

    lottieAnimation = phoneAnimation;

  } else if (animation === 'settings') {

    lottieAnimation = settingsAnimation;

  }


  return (
    <Div>
      <Header>{text}</Header>
      {lottieAnimation && (
        <LottieWrapper>
          <Lottie
            options={{
              animationData   : lottieAnimation,
              loop            : false,
              rendererSettings: {
                preserveAspectRatio: 'none'
              }
            }}
            width="30px"
            height="30px"
          />
        </LottieWrapper>
      )}
    </Div>
  );

};

export default PageHeader;
