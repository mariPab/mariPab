import React from 'react';
import styles from './Splash.module.scss';
import icon from '../../../images/icon-144x144.png';

const Component = () => (

  <div className={styles.root}>
    <img
      src={icon}
      alt="natural-beauty-shop"
    />
  </div>
);

export {
  Component as Splash,
  Component as SplashComponent,
};
