import { createGlobalStyle } from 'styled-components';
import { variables } from './settings';
import shared from './shared.style';
import 'antd/dist/antd.css';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    font-size: 10px;
  }

  body {
    font: 100 1.4rem ${variables.fontText};
    color: ${variables.colorEerieBlack};
    margin: 0;
    &::-webkit-scrollbar {
      ${shared.scrollbar};
    }
    &::-webkit-scrollbar-thumb {
      ${shared.srollthumb};
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  h2, h3, h4, h6, span, p {
    color: ${variables.colorEerieBlack};
  }
  h3 {
    font-size: 1.8rem;
    font-family: ${variables.fontSupplemental};
    letter-spacing: 0.1rem;
  }
  h4 {
    font: 700 1.6rem ${variables.fontSupplemental};
    letter-spacing: 0.3rem;
    border-bottom: 1px solid ${variables.colorEerieBlack};
    padding-bottom: 10px;
  }
  h5 {
    color: ${variables.colorSoftBeige};
    font-size: 1.2rem;
    margin: 10px 0;
    letter-spacing: 0.1rem;
  }
  p {
    text-align: justify;
  }
  span {
    font-size: 1.2rem;
  }
  svg {
    fill: ${variables.colorEerieBlack};
  }
`;
