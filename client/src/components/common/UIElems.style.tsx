import styled from 'styled-components';
import {
  // InputAdornment,
  Button,
  IconButton,
  Chip,
  // Select,
  // Input,
  // InputLabel,
  // MenuItem,
} from '@material-ui/core';
import { variables } from '../../styles/settings';

export const Btn = styled(Button)`
  background: ${variables.colorSupplemental};
  border: 3px solid ${variables.colorText};
  text-align: center;
  line-height: 1.3;
  padding: 1rem;
  cursor: pointer;
  font-weight: 900;
  text-transform: uppercase;
  transition: ${variables.transitionAll};
  outline: none;
`;

export const IconBtn = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }

  .MuiChip-label {
    font-size: 1.2rem;
    &:hover {
      color: ${variables.colorNeutral};
    }
  }
`;

export const Tag = styled(Chip)`
  &.MuiChip-root {
    cursor: pointer;
  }
`;
