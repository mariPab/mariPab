import styled from 'styled-components';
import { variables, settings } from '../../../styles/settings';
import headerImage from '../../../images/header_46sh2j5sg3.jpg';

export const HeaderRoot = styled.header`
  position: fixed;
  background: url(${headerImage}) center bottom no-repeat fixed;
  height: calc(100vh - ${settings.navHeight});
  width: 100vw;
  top: 60px;
  left: 0;
  h1 {
  padding: 40px 0;
  margin-top: 0;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-35%, -50%);
  }
`;
