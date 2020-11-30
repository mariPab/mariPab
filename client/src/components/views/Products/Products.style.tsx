import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import {
  // Select,
  Chip,
  // MenuItem,
  // Input,
  // InputLabel
} from '@material-ui/core';
import { variables } from '../../../styles/settings';

interface ProductsContainerProps {
  loading: boolean;
  [key: string]: unknown;
}
export const ProductsContainer = styled(({ loading, ...props }: ProductsContainerProps) => <div {...props} />)`
  justify-content: space-between;
  margin: 2rem auto;
  flex-wrap: wrap;
  display: flex;
  opacity: ${({ loading }: ProductsContainerProps): string => loading ? '0.2' : '1'};
  cursor: ${({ loading }: ProductsContainerProps): string => loading ? 'not-allowed' : 'auto'};
  pointer-events: ${({ loading }: ProductsContainerProps): string => loading ? 'none' : 'auto'};
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    flex: 0 0 30%;
  }
`;

export const SearchField = styled(TextField)`
  .MuiFormLabel-root,
  .MuiInputBase-input,
  .MuiInputBase-inputMuiInputBase-adornedEnd {
    font-size: 2rem;
  }
`;

const CustomChip = styled(Chip)`
  border: 1px solid ${variables.colorDanger};
`;

export {
  CustomChip as Chip,
};
