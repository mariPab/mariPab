import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const ProductsContainer = styled.div`
  justify-content: space-between;
  margin: 2rem auto;
  flex-wrap: wrap;
  display: flex;
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
