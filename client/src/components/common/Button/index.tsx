
import React, { FunctionComponent } from 'react';
import styles from './Button.module.scss';

interface Props {
  variant?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}
const Button: FunctionComponent<Props> = ({ variant = '', ...otherProps }) => (
  <button
    {...otherProps}
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
  />
);

export default Button;
