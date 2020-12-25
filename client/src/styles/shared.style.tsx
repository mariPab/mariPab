import {css} from 'styled-components';
import { variables } from "./settings";
import { lighten } from 'polished';

export default {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  scrollbar: css`
    -webkit-appearance: none;
    width: 4px;
    height: 4px;
    background: ${variables.colorSupplemental};
    `,
  srollthumb: css`
    background: ${lighten(0.1, variables.colorBorder)};
  `,
}
