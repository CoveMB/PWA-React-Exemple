import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor } from 'Style/colors';
import { bodyFont } from 'Style/fonts';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 15px 20px 5px 20px;
  background-color: ${mainColor};
  margin-bottom: 0;
  font-family: ${bodyFont};
`;

const Header = styled.h1`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin: 0;
`;

const NavLink = styled.p`
  color: white;
  font-size: 15px;
`;

const spin = keyframes`
  100% { transform: rotate(360deg);
}`;

const Icon = styled.img`
  width:26px;
  margin-right: 10px;
  animation: ${spin} 16s linear infinite;
`;

const NavBar = () => (
  <Div>
    <Link to="/chat">
      <NavLink>
        Chat
      </NavLink>
    </Link>
    <Link to="/settings">
      <Header>

        <picture>
          <source type="image/webp" srcSet="/images/icons/app-icon-72x72.webp" />
          <source type="image/png" srcSet="/images/icons/app-icon-72x72.png" />
          <Icon src="/images/icons/app-icon-72x72.png" alt="svg wave" />
        </picture>

        PWA
      </Header>
    </Link>
    <Link to="/">
      <NavLink>
        Movies
      </NavLink>
    </Link>
  </Div>
);

export default NavBar;
