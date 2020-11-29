import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

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
  text-align: right;
`;

export const SearchField = styled(TextField)`
  .MuiFormLabel-root,
  .MuiInputBase-input,
  .MuiInputBase-inputMuiInputBase-adornedEnd {
    font-size: 2rem;
  }
`;
