import React, { useState } from 'react';
import Cart from '../../features/Cart';
import Button from '../../common/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { useViewport } from "../../../context/viewport";
import Navi from './Nav.style';

const links = [
  { title: 'Strona główna', path: '/'},
  { title: 'Produkty', path: '/products'},
  { title: `O nas`, path: '/'},
];

const Nav: React.FunctionComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const { viewport } = useViewport();
  return (
    <Navi.Root expanded={expanded}>
      {viewport === 'mobile' ?
        <Button
          variant="fab"
          // className={`${styles.navlink} ${viewport === 'mobile' ? styles.openMenu : ''}`}
          onClick={setExpanded.bind(null, !expanded)}
        >
          <MenuIcon fontSize="large" />
        </Button> : ''}
      <Navi.LinkList
        mobile={viewport === 'mobile'}
        expanded={expanded}
      >
        {links.map((link, idx) =>
          <li key={idx}>
            <Navi.Link
              exact
              to={link.path}
              mobile={viewport === 'mobile'}
              onClick={setExpanded.bind(null, !expanded)}
              activeClassName='active'
            >
              {link.title}
            </Navi.Link>
            </li>
            )}
      </Navi.LinkList>
      <Cart />
  </Navi.Root>
  );
};

export default Nav;
