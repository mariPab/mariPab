import styled from 'styled-components';
import { variables } from '../../../styles/settings';
import { darken } from 'polished';

export const FooterRoot = styled.footer`
  background-color: ${variables.colorText};
  display: flex;
  justify-content: flex-start;
  height: 200px;
  letter-spacing: 0.1rem;
  font-size: 0.8rem;
  & > div {
    padding: 30px;
  }
  span {
    color: ${darken(0.3, variables.colorSupplemental)};
  }
  @media (max-width: 567px){
    height: 140px;
    & > div {
    padding: 15px;
    }
  }
`;
