import React from 'react';
import styled from 'styled-components';
// import { Select } from 'antd';
import { variables } from '../../styles/settings';
import { lighten, transparentize, darken } from 'polished';
import { ButtonProps } from 'antd/lib/button/button';
import { Button as AntdButton, Tooltip } from 'antd';
import shared from '../../styles/shared.style';

interface ButtonType extends ButtonProps {
  iconButton?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
  floatRight?: boolean;
}

export default {
  Button: styled(({ iconButton, noPadding, noBorder, floatRight, ...props }: ButtonType) =>
    <AntdButton shape={iconButton ? 'circle' : undefined} {...props} />)`
      ${shared.flexCenter};
      border: 2px solid ${variables.colorText};
      padding: 8px 16px;
      height: unset;
      border-radius: 0;
      span:not(.ant-tag) {
        ${shared.flexCenter};
        font: 400 1.6rem ${variables.fontText};
        letter-spacing: 0.1rem;
      }
      span.anticon {
        font-size: 1.6rem;
        margin-left: ${props => props.iconButton ? '0' : '10px' };
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
        border-color: ${variables.colorSupplemental};
        &:hover {
          border-color: ${variables.colorSupplemental};
          color: ${darken(0.2, variables.colorSupplemental)};
        }
      `};
  `,
  Tooltip: styled(Tooltip)``,
};
