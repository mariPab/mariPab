import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import styles from './Header.module.scss';

const Component = ({ children }) => (
  <div className={styles.root}>
    <Nav />
    <h1>Natural Beauty Shop</h1>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
