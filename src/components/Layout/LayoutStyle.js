import styled, { keyframes } from 'styled-components';

export const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px 20px 5px 20px;
  background-color: #47107a;
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

export const Wave = styled.img`
  transform: rotate(180deg);
  padding: 0;
  width: 102%;
  overflow-x: hidden;
  z-index: 99;
  margin: -5px 0 20px -1%;
`;

const spin = keyframes`
  100% { transform: rotate(360deg);
}`;

export const Icon = styled.img`
  width:26px;
  margin-right: 10px;
  animation: ${spin} 16s linear infinite;
`;
