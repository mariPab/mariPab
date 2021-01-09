import React from 'react';
import styled from 'styled-components';
import { variables, settings } from '../../../styles/settings';
import { transparentize } from 'polished';

export default {
  Root: styled(({  expanded, ...rest }) => <div {...rest} />)`
    position: fixed;
    height: calc(100vh - ${settings.navHeight});
    top: ${settings.navHeight};
    width: 100vw;
    left: 0;
    content: '';
    z-index: 4;
    transition: ${variables.transitionAll};
    /* animation: viewsFromRight 0.5 ease; */
    ${({ expanded }) => expanded ? `
      margin-right: 0;
      display: flex;
    ` :
    `
      display: none;
    `}
  `,
  Background: styled.div`
    background-color: ${transparentize(0.3, variables.colorEerieBlack)};
    height: 100%;
    width: calc(100% - 450px);
  `,
  Cart: styled.div`
  height: 100%;
  width: 450px;
  transition: ${variables.transitionTransform};
  background-color: ${variables.colorSoftBeige};
  padding: 4rem 2rem;
  box-shadow: 0px 2px 4px 0px ${variables.colorEerieBlack};
  overflow: auto;
  @media (max-width: 576px) {
    width: 100vw;
    padding: 2rem 1rem;
  }
  `,
  ProductsList: styled.ul`
    height: calc(100% - 200px);
    overflow-y: auto;
  `,
  OrderSummary: styled.div`
    height: 200px;
    margin-top: 30px;
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        padding: 3px 0;
        letter-spacing: 0.1rem;
      }
    }
    button {
      float: right;
      margin-top: 40px;
      letter-spacing: 0.1rem;
    }
  `,
};
