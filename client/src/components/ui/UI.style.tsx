import React from 'react';
import styled from 'styled-components';
import { variables } from '../../styles/settings';
import { lighten, transparentize, darken } from 'polished';
import { ButtonProps } from 'antd/lib/button/button';
import { Button as AntdButton, Tooltip, InputNumber, Input, Form } from 'antd';
import shared from '../../styles/shared.style';
import { NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';

interface ButtonType extends ButtonProps {
  iconButton?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
  floatRight?: boolean;
}

interface LoaderProps  {
  color: string;
  centered: boolean;
  [key: string]: unknown;
}

const { Item } = Form;

export default {
  Button: styled(({ iconButton, noPadding, noBorder, floatRight, ...props }: ButtonType) =>
    <AntdButton shape={iconButton ? 'circle' : undefined} {...props} />)`
      ${shared.flexCenter};
      // border: 2px solid ${variables.colorEerieBlack};
      border: none;
      padding: 8px 16px;
      height: unset;
      border-radius: 0;
      background-color: inherit;
      box-shadow: none;
      &:hover,
      &:focus {
        box-shadow: none;
        background-color: inherit;
        color: ${variables.colorOxfordBlue};
        border: none;
      }
      &::after {
        box-shadow: none;
        border: none;
      }
      span:not(.ant-tag) {
        ${shared.flexCenter};
        font: 400 1.6rem ${variables.fontText};
        letter-spacing: 0.1rem;
      }
      span.anticon {
        font-size: 1.6rem;
        margin-left: ${props => props.iconButton ? '0' : '10px'};
      }
      ${({ floatRight }) => floatRight && `
        float: right;
        margin-top: 20px;
      `};
      ${({ noPadding }) => noPadding && `
        padding: 0;
      `};
      ${({ noBorder }) => noBorder && `
        border: none;
      `};
      ${({ ghost }) => ghost && `
        border-color: ${variables.colorSoftBeige};
        &:hover {
          border-color: ${variables.colorSoftBeige};
          color: ${darken(0.2, variables.colorSoftBeige)};
        }
      `};
  `,
  Tooltip: styled(Tooltip)``,
  InputNumber: styled(InputNumber)`
    background-color: inherit;
    border: none;
    width: 60px;
    &:hover {
      box-shadow: none;
    }
  `,
  InlineLink: styled(NavLink)`
    color: ${variables.colorEerieBlack};
    opacity: 0.6;
    text-decoration: none;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    margin: 30px 0;
    &:hover {
      opacity: 1;
    }
  `,
  Input: styled(Input)`

  `,
  FormItem: styled(Item)`
    flex-direction: column;
    justify-content: flex-start;
    .ant-form-item-label {
      text-align: left;
    }
    label {
      font-weight: 100;
      letter-spacing: 0.1rem;
      text-transform: capitalize;

    }
  `,
  Loader: styled(({ centered, ...props }: LoaderProps) =>
    <Loader
      {...props}
      type='ThreeDots'
      color={props.color ? props.color : variables.colorLightSky}
  />)`
  ${({ centered }) => centered && `
    position: absolute;
    top: 50%;
    left: 50%;
  `};
`
};
