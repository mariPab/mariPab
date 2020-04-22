import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { getViewportMode } from '../../../redux/viewportRedux.js';
import { connect } from 'react-redux';
import { Cart } from '../../features/Cart/Cart';
import { Button } from '../../common/Button/Button';
import MenuIcon from '@material-ui/icons/Menu';
import manageCartStorageHOC from '../../../HOC/manageCartStorage/manageCartStorage';

const CartWithStorageMngmt = manageCartStorageHOC(Cart);

const Component = ({ mobile }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`${styles.root} ${expanded ? styles.expanded : ''}`} >
      {mobile ?
        <Button
          variant="fab"
          className={`${styles.navlink} ${mobile ? styles.openMenu : ''}`}
          onClick={() => handleExpandClick()}
        >
          <MenuIcon />
        </Button> : ''}
      <div className={`${styles.navLinkList} ${mobile ? styles.mobileOnly : ''} ${expanded ? styles.expandMenu : ''}`}>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          Strona główna
        </NavLink>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          Wyprzedaż
        </NavLink>
        <NavLink className={styles.navlink} exact to='/' onClick={mobile ? () => handleExpandClick('expandMenu') : null}>
          O&nbsp;nas
        </NavLink>
      </div>
      <CartWithStorageMngmt />
    </nav >
  );
};
Component.propTypes = {
  mobile: PropTypes.bool,
};

const mapStateToProps = state => ({
  mobile: getViewportMode(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as Nav,
  Component as NavComponent,
};
