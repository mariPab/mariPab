import styled from 'styled-components';
import { variables } from '../../../styles/settings';
import shared from '../../../styles/shared.style';

export default {
  Container: styled.div`
  padding: 30px 40px;
  display: flex;
  @media (max-width: 576px) {
    .wrapper {
      flex-direction: column;
      padding: 30px 0;
    }
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

  DetailsContent: styled.div`
    padding: 0 20px;
  h3 {
    font-family: ${variables.fontSupplemental};
    letter-spacing: 0.1rem;
  }

  p {
    text-align: justify;
    font-family: ${variables.fontText};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
  }
  button {
    float: right;
  }
`,

  TagsContainer: styled.div`
  display: flex;
  justify-content: flex-start;
`,
};
