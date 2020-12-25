import styled from 'styled-components';
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
  justify-content: flex-start;
  flex-direction: column;
  padding-right: 30px;
  @media (max-width: 576px) {
    width: 100%;
    padding-right: 0;
    align-items: center;
  }
`,
  ActionsBox: styled.div<{ spaceBetween?: boolean; }>`
    display: flex;
    padding-bottom: 40px;
    justify-content: ${({ spaceBetween}) => spaceBetween ? 'space-between' : 'flex-start'};
  `,
};
