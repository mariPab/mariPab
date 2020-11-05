import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FunctionComponent = () => (
  <div className={styles.root}>
    <div className={styles.contact}>
      <h4>
        Zamówienia indywidualne
      </h4>
      <span>amanda.nowak@natural.pl</span>
    </div>
    <div className={styles.contact}>
      <h4>
        Wysyłki
      </h4>
      <span>pn. - pt. 8:00 - 16:00</span>
    </div>
  </div>
);
export default Footer;
