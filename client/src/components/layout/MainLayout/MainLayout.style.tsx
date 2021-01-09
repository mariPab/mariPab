import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  margin: 7rem auto 0 auto;
  height: calc(100vh - 270px);
  max-width: 900px;
  @media (max-width: 567px), (max-width: 830px) and (max-height: 420px) {
    margin: 7rem 2rem 0rem 2rem;
    height: calc(100% - 210px);
  }
  @media (max-width: 300px) {
    margin: 7rem 0.5rem 0rem 0.5rem;
  }
`;
