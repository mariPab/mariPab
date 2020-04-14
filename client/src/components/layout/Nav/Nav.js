import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { getTotalPrice } from '../../../redux/cartRedux.js';
import { getViewportMode } from '../../../redux/viewportRedux.js';
import { connect } from 'react-redux';
import { Cart } from '../../features/Cart/Cart';
import { Button } from '../../common/Button/Button';
import MenuIcon from '@material-ui/icons/Menu';

const Component = ({ total, mobile }) => {
  const [expanded, setExpanded] = useState({ expandMenu: false, expandCart: false });

  const handleExpandClick = name => {
    setExpanded({ ...expanded, [name]: !expanded[name] });
  };

  return (
    <nav className={`${styles.root} ${expanded.expandCart || expanded.expandMenu ? styles.expanded : ''}`} >
      {mobile ?
        <Button
          variant="fab"
          className={`${styles.navlink} ${mobile ? styles.openMenu : ''}`}
          onClick={() => handleExpandClick('expandMenu')}
        >
          <MenuIcon />
        </Button> : ''}
      <div className={`${styles.navLinkList} ${mobile ? styles.mobileOnly : ''} ${expanded.expandMenu ? styles.expandMenu : ''}`}>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          Strona główna
        </NavLink>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          Wyprzedaż
        </NavLink>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          O nas
        </NavLink>
      </div>
      <div className={styles.cartlink}>
        <span>
          {total} zł
        </span>
        <Button
          variant="fab"
          onClick={() => handleExpandClick('expandCart')}
        >
          <LocalMallIcon color="primary" />
        </Button>
        {expanded.expandCart ? <Cart expanded={expanded.expandCart} /> : null}
      </div>
    </nav >
  );
};
Component.propTypes = {
  total: PropTypes.number,
  mobile: PropTypes.bool,
};

const mapStateToProps = state => ({
  total: getTotalPrice(state),
  mobile: getViewportMode(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as Nav,
  Container as Nav,
  Component as NavComponent,
};
