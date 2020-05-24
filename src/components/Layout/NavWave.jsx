import React from 'react';
import styled from 'styled-components';

export const Wave = styled.img`
  transform: rotate(180deg);
  padding: 0;
  width: 101%;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 99;
  margin: -5px 0 20px -1px;
`;

const NavWave = () => (
  <Wave className="header-wave" src="/images/vectorheader.svg" alt="svg wave" />
);

export default NavWave;
