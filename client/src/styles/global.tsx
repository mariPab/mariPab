import { createGlobalStyle } from 'styled-components';
import { variables } from './settings';
import { lighten } from 'polished';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    font-size: 10px;
    /* @media (max-width: 576px) {
      font-size: 5px;
    } */
  }

  body {
    font: 100 1.4rem ${variables.fontText};
    color: ${variables.colorText};
    margin: 0;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 4px;
      height: 4px;
      background: ${variables.colorSupplemental};
    }
    &::-webkit-scrollbar-thumb {
      background: ${lighten(0.1, variables.colorBorder)};
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  h2, h3, h4, h5, h6, span, p {
    color: ${variables.colorText};
  }
  h4 {
    font: 700 1.6rem ${variables.fontSupplemental};
    letter-spacing: 0.3rem;
    border-bottom: 1px solid ${variables.colorText};
    padding-bottom: 10px;
  }
  h5 {
    color: ${variables.colorSupplemental};
    font-size: 1.2rem;
    margin: 10px 0;
    letter-spacing: 0.1rem;
  }
  span {
    font-size: 1.2rem;
  }

`;
