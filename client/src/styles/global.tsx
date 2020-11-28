import { createGlobalStyle } from 'styled-components';
import { variables } from './settings';

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
    margin: 0;
  }
`;
