import React from 'react'
import styled from 'styled-components';
import { variables, settings } from '../../../styles/settings';
import shared from '../../../styles/shared.style';

type Background = { orderProcessing: boolean; children: React.ReactNode; [key: string]: unknown; };

const Container = styled.div`
  display: flex;
  position: relative;
  & > div:not(:first-of-type) {
    width: 50%;
    padding: 20px;
  }
  @media (max-width: 768px), (max-width: 830px) and (max-height: 420px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
  @media (max-width: 300px) {
    & > div {
      padding: 0.5rem;
    }
  }
`;
const TransparentBackground = styled(({ orderProcessing, children, ...rest }: Background) =>
  <div {...rest}>{children}</div>)`
  position: fixed;
  width: 100%;
  height: calc(100% - ${settings.navHeight} - ${settings.footerHeight});
  top: ${settings.navHeight};
  background-color: ${variables.colorSoftBeige};
  opacity: 0;
  z-index: 9;
  display: none;
  ${({ orderProcessing }) => orderProcessing && `
    display: block;
    opacity: 0.8;
    pointer-events: none;
    cursor: not-allowed;
  `};

`;
const Section = styled.section`
  margin-bottom: 4rem;
`;
const MyProducts = styled.ul`
  height: calc(100vh - ${settings.footerHeight} - ${settings.navHeight} - 270px);
  overflow-y: auto;
  margin-bottom: 2rem;
  &::-webkit-scrollbar {
    ${shared.scrollbar};
  }
  &::-webkit-scrollbar-thumb {
    ${shared.srollthumb};
  }
  @media (max-width: 768px), (max-width: 830px) and (max-height: 420px) {
    height: unset;
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
  TransparentBackground,
};
