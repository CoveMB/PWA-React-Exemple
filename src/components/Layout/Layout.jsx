import React from 'react';
import { Container } from 'semantic-ui-react';
import NavWave from './NavWave';
import NavBar from './NavBar';


const Layout = ({ children }) => (
  <>
    <NavBar />
    <NavWave />
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;
