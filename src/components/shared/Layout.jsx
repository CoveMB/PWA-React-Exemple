import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

const Layout = ({ children }) => (
  <Container>
    <Link to="/">
      <Header as="h1">
        This is the navbar
      </Header>
    </Link>
    {children}
    <Divider />
    <p>
      Made with
      {' '}
      <Icon name="heart" color="red" />
    </p>
  </Container>
);

export default Layout;
