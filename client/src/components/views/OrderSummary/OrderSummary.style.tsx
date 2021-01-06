import styled from 'styled-components';
import { variables } from '../../../styles/settings';
import shared from '../../../styles/shared.style';

const Container = styled.div`
  display: flex;
  & > div {
    width: 50%;
    padding: 20px;
  }
  @media (max-height: 768px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;
const Section = styled.section`
  margin-bottom: 4rem;
`;
const MyProducts = styled.ul`
  max-height: calc(100vh - 200px - 60px - 270px);
  overflow-y: auto;
  margin-bottom: 2rem;
  &::-webkit-scrollbar {
    ${shared.scrollbar};
  }
  &::-webkit-scrollbar-thumb {
    ${shared.srollthumb};
  }
  @media (max-height: 768px) {
    max-height: unset;
    overflow-y: none;
  }
`;
const Total = styled.div`
  ${shared.flexCenter};
  justify-content: space-between;
  padding: 5px 0;
  span {
    letter-spacing: 0.1rem;
    font-size: 1.4rem;
  }
`;
export default {
  Container,
  Section,
  Total,
  MyProducts,
};
