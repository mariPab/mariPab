import { keyframes } from 'styled-components';

export const variables = {
  transitionTransform: 'transform 1s ease',
  transitionAll: 'all 0.5s ease',

  fontText: '"Open Sans Condensed", sans-serif',
  fontSupplemental: '"Lora", serif',
  fontDecorator: '"Amatic SC", cursive',

  colorSupplemental: '#fafafa',
  colorBorder: '#757575',
  colorSuccess: '#8bc34a',
  colorDanger: '#a72456',
  colorNeutral: '#01579b',
  colorText: '#212121',

  baseSize: '10px',
};

export const viewsFromRight = keyframes`
  0% {
    margin-left: 150px;
  }
  100% {
    margin-left: 0;
  }
`;
