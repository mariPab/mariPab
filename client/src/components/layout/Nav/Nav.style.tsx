import React from 'react';
import styled from 'styled-components';
import { variables, settings } from '../../../styles/settings';
import shared from '../../../styles/shared.style';
import { NavLink } from 'react-router-dom';

export default {
  Root: styled(({  expanded, ...rest }) => <nav {...rest} />)`
    position: fixed;
    background-color: ${variables.colorSoftBeige};
    height: ${settings.navHeight};
    top: 0;
    width: 100vw;
    padding: 0 20px;
    ${shared.flexCenter};
    justify-content: space-between;
    z-index: 2;
    box-shadow: 0px 0px 5px 0px ${variables.colorBorder};
  `,
  LinkList: styled(({ mobile, expanded, ...rest }) => <ul {...rest} />)`
    ${shared.flexCenter};
    justify-content: flex-start;
    cursor: pointer;
    text-transform: uppercase;
    list-style: none;
    padding-left: 0;
    width: calc(100% - 140px);
    margin: 0;

    ${({ mobile }) => mobile && `
      left: 0;
      background-color: rgba(0,0,0,0.3);
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      transition: ${variables.transitionAll};
      display: none;
      flex-direction: column;
      li {
        width: 100%;
      }
    `}
    ${({ expanded }) => expanded && `
      display: flex;
      top: ${settings.navHeight};
    `}
  `,
  Link: styled(({ mobile, ...rest }) => <NavLink {...rest} />)`
    padding: calc((${settings.navHeight} - 1.4rem) / 2) 30px;
    text-decoration: none;
    font-weight: 200;
    color: ${variables.colorEerieBlack};
    letter-spacing: 0.4rem;
    display: inline-block;
    height: 100%;
    position: relative;
    line-height: 1;
    &.active::after {
      width: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
      height: 3px;
      content:'';
      background-color: ${variables.colorOxfordBlue};
    }
    &:hover {
      color: ${variables.colorOxfordBlue};
    }
    ${({ mobile }) => mobile && `
      background-color: ${variables.colorSoftBeige};
      width: 100%;
      &.active {
        font-weight: 600;
        color: ${variables.colorOxfordBlue};
        &::after {
          content: none;
        }
      }
    `}
    @media (max-width: 768px) {
      padding: calc((${settings.navHeight} - 1.4rem) / 2) 15px;
    }
    @media (max-width: 567px) {
      padding: 15px 20px;
    }
  `,
  CartNav: styled.div`
    ${shared.flexCenter};
    button {
      padding: calc((${settings.navHeight} - 25px) / 2);
    }
  `,
};
