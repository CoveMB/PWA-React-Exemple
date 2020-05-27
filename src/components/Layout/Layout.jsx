import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavWave from './NavWave';
import NavBar from './NavBar';
import PageHeader from './PageHeader';
import { scrollbar } from '../Shared/Style/scrollbar';


const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }

  body {
    ${scrollbar}
    margin:0;
    padding:0;
    width: 100%;
    padding-bottom: 20px;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  }
`;


const Container = styled.div`
  margin: 0 8vw;
  font-family: 'Roboto', serif;
`;


const Layout = ({ children, header }) => (
  <>
    <GlobalStyle />
    <NavBar />
    <NavWave />
    <Container>
      <PageHeader text={header} />
      {children}
    </Container>
  </>
);

export default Layout;
