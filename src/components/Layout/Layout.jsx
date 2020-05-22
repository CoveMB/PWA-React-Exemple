import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Icon } from 'semantic-ui-react';
import { Div, Header, NavLink } from './LayoutStyle';


const Layout = ({ children }) => (
  <>
    <Div>
      <Link to="/chat">
        <NavLink>
          Chat
        </NavLink>
      </Link>
      <Header>
        The PWA Boilerplate
      </Header>
      <Link to="/">
        <NavLink>
          Movies
        </NavLink>
      </Link>
    </Div>
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;
