import styled from 'styled-components';
import { variables } from '../../../styles/settings';

export const ProductDetails = styled.div`
  background-color: rgba(75, 75, 75, 0.76);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  transition: ${variables.transitionAll};
  & > div {
    display: flex;
  }
`;

export const ProductCardBox = styled.div`
  background-color: ${variables.colorSoftBeige};
  margin: 10px;
  position: relative;
  flex: 0 0 45%;
  width: 48%;
  max-height: 250px;
  &:hover ${ProductDetails} {
    opacity: 1;
  }
  h3 {
    color: ${variables.colorSoftBeige};
    text-align: center;
  }

  img {
    object-fit: cover;
    overflow: hidden;
    height: 250px;
    width: 100%;
  }

  button {
    margin: 1rem 2rem;
  }
  span {
    opacity: 0.7;
  }
    @media (max-width: 568px) {
    flex: 0 0 90%;
  }
`;


