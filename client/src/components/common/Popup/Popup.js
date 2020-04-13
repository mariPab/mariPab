
import React from 'react';
import styles from './Popup.module.scss';
import PropTypes from 'prop-types';

const Component = ({ variant = '', text, ...otherProps }) => (
  <div
    {...otherProps}
    className={styles.component + variant.split(' ').map(name => ' ' + (styles[name] || name)).join('')}
  >
    {text}
  </div>
);

Component.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string,
};

export {
  Component as Popup,
  // Container as Popup,
  Component as PopupComponent,
};
