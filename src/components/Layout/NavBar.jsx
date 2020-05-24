import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor } from '../Shared/Style/colors';

export const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 15px 20px 5px 20px;
  background-color: ${mainColor};
  margin-bottom: 0;
`;

export const Header = styled.h1`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin: 0;
`;

export const NavLink = styled.p`
  color: white;
  font-size: 15px;
`;

const spin = keyframes`
  100% { transform: rotate(360deg);
}`;

export const Icon = styled.img`
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
        <Icon src="/images/icons/app-icon-72x72.png" alt="svg wave" />
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
