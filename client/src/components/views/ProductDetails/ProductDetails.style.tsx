import styled from 'styled-components';
import { variables } from '../../../styles/settings';

export const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ProductsPageContainer = styled.div`
  padding: 30px 40px;
  display: flex;
  @media (max-width: 576px) {
    .wrapper {
      flex-direction: column;
      padding: 30px 0;
    }
  }
`;

export const Gallery = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 576px) {
    width: 100%;
    align-items: center;
  }
`;

export const DetailsContent = styled.div`
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
`;
