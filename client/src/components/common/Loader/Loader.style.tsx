
import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Loader from 'react-loader-spinner';
import { variables } from '../../../styles/settings';

interface LoaderProps  {
  position: 'center' | 'inline';
  color: string;
  [key: string]: unknown;
}
const positionLoader = (position: string): FlattenSimpleInterpolation => {
  switch (position) {
    case 'center':
      return css`
        position: absolute;
        top: 50%;
        left: 50%;
      `;
    default:
      return css``;
  }
}
const CustomLoader = styled(({ position = 'inline', ...props }: LoaderProps) =>
  <Loader
    {...props}
    type='ThreeDots'
    color={props.color ? props.color : variables.colorDanger}
  />)`
  ${({ position }): FlattenSimpleInterpolation => positionLoader(position)}
`;
export default CustomLoader;
