import styled from 'styled-components';
// import { variables } from '../../../styles/settings';
import shared from '../../../styles/shared.style';

export default {
  Container: styled.div`
  padding: 30px 40px;
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
    padding: 30px 0;
  }
`,

  Gallery: styled.div`
  ${shared.flexCenter};
  flex-direction: column;
  @media (max-width: 576px) {
    width: 100%;
    align-items: center;
  }
`,

  DetailsContent: styled.div<{ spaceBetween?: boolean; }>`
    padding: 0 20px;
  `,
  ActionsBox: styled.div<{ spaceBetween?: boolean; }>`
    display: flex;
    padding-bottom: 40px;
    justify-content: ${({ spaceBetween}) => spaceBetween ? 'space-between' : 'flex-start'};
  `,
};
