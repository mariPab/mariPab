import React from 'react';
import Nav from '../Nav';
import styles from './Header.module.scss';

const Header: React.FunctionComponent = ({ children }) => (
  <div className={styles.root}>
    <Nav />
    <h1>Natural Beauty Shop</h1>
    {children}
  </div>
);

export default Header;
