import styled from 'styled-components';
import { variables } from '../../../styles/settings';

export const ProductDetails = styled.div`
  background-color: rgba(75, 75, 75, 0.76);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 1;
  text-align: center;
`;

export const ProductCardBox = styled.div`
  background-color: ${variables.colorSupplemental};
  margin: 10px;
  transition: ${variables.transitionAll};
  position: relative;
  flex: 0 0 45%;
  width: 48%;
  &:hover ${ProductDetails} {
    opacity: 1;
  }
  h3 {
    font-size: 1.1rem;
    margin: 40px 0;
    font-family: ${variables.fontSupplemental};
    color: ${variables.colorSupplemental};
    letter-spacing: 0.1rem;
  }

  img {
    object-fit: cover;
    overflow: hidden;
    height: 250px;
    width: 100%;
  }

  a,
  a:hover {
    font-weight: 600;
    text-decoration: none;
    color: ${variables.colorSupplemental};
  }

  button {
    background-color: transparent;
    border-color: ${variables.colorSupplemental};
    &:hover {
      background-color: rgba(0,0,0, 0.5);
      border-color: ${variables.colorSupplemental};
    }
  }
  span {
    opacity: 0.7;
  }
    @media (max-width: 568px) {
    flex: 0 0 90%;
  }
`;


