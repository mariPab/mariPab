import React from 'react';
import styled from 'styled-components';
import { TextField, Chip } from '@material-ui/core';
import {
// Select,
// MenuItem,
// Input,
// InputLabel
} from '@material-ui/core';
import { variables } from '../../../styles/settings';
import shared from '../../../styles/shared.style';

interface ProductsContainerProps {
  loading: boolean;
  [key: string]: unknown;
}
export const ProductsContainer = styled(({ loading, ...props }: ProductsContainerProps) => <div {...props} />)`
  justify-content: space-between;
  margin: 2rem auto;
  flex-wrap: wrap;
  display: flex;
  height: calc(100vh - 200px - 60px - 90px);
  overflow-y: auto;
  opacity: ${({ loading }: ProductsContainerProps): string => loading ? '0.2' : '1'};
  cursor: ${({ loading }: ProductsContainerProps): string => loading ? 'not-allowed' : 'auto'};
  pointer-events: ${({ loading }: ProductsContainerProps): string => loading ? 'none' : 'auto'};
  &::-webkit-scrollbar {
    ${shared.scrollbar};
  }
  &::-webkit-scrollbar-thumb {
    ${shared.srollthumb};
  }
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
