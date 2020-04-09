
import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Component = ({ variant = '', ...otherProps }) => (
  <button
    {...otherProps}
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
  />
);

Component.propTypes = {
  variant: PropTypes.string,
};

export {
  Component as Button,
  // Container as Button,
  Component as ButtonComponent,
};
