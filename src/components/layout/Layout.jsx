import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { scrollbar } from 'Style/scrollbar';
import NavWave from './NavWave';
import NavBar from './NavBar';
import PageHeader from './PageHeader';


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
    background-color: white;
  }

  a {
    text-decoration: none;
  }
`;


const Container = styled.div`
  margin: 0 8vw;
  font-family: 'Roboto', serif;
`;


const Layout = ({ children, header, animation }) => (
  <>
    <GlobalStyle />
    <NavBar />
    <NavWave />
    <Container>
      <PageHeader text={header} animation={animation} />
      {children}
    </Container>
  </>
);

export default Layout;
