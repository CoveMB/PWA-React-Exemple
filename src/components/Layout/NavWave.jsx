import React from 'react';
import styled from 'styled-components';
import { mainColor } from '../Shared/Style/colors';

const Wave = styled.img`
  transform: rotate(180deg);
  width: 101vw;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  z-index: 99;
  margin: -10px 0 0 -2px;
`;

const NavWave = () => (
  <Wave className="header-wave" src="/images/vectorheader.svg" alt="svg wave" />
);

export default NavWave;
