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
  }

  body {
    font: 100 1.4rem ${variables.fontText};
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
`;
