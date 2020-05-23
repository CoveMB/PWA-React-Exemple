import React from 'react';
import { Link } from 'react-router-dom';
import { Div, Header, NavLink, Icon } from './LayoutStyle';


const NavBar = () => (
  <Div>
    <Link to="/chat">
      <NavLink>
        Chat
      </NavLink>
    </Link>
    <Header>
      <Icon src="/images/icons/app-icon-72x72.png" alt="svg wave" />
      PWA
    </Header>
    <Link to="/">
      <NavLink>
        Movies
      </NavLink>
    </Link>
  </Div>
);

export default NavBar;
