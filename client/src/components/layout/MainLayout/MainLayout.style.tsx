import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  margin: 7rem auto 0 auto;
  height: calc(100vh - 270px);
  max-width: 900px;
  @media (max-width: 567px){
    margin: 7rem 2rem 0 2rem;
    height: calc(100vh - 210px);
  }
`;
