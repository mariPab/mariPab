import React from 'react';
import { FooterRoot } from './Footer.style';

const Footer: React.FunctionComponent = () => (
  <FooterRoot>
    <div>
      <h5>
        Zamówienia indywidualne
      </h5>
      <span>amanda.nowak@natural.pl</span>
    </div>
    <div>
      <h5>
        Wysyłki
      </h5>
      <span>pn. - pt. 8:00 - 16:00</span>
    </div>
  </FooterRoot>
);
export default Footer;
