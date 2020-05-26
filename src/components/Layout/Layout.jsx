import React from 'react';
import styled from 'styled-components';
import NavWave from './NavWave';
import NavBar from './NavBar';
import PageHeader from './PageHeader';

export const Body = styled.div`
  width: 100%; 
  overflow: hidden;
`;

export const Container = styled.div`
  margin: 0 6vw
`;


const Layout = ({ children, header }) => (
  <Body>
    <NavBar />
    <NavWave />
    <Container>
      <PageHeader text={header} />
      {children}
    </Container>
  </Body>
);

export default Layout;
