import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { getTotalPrice } from '../../../redux/cartRedux.js';
import { connect } from 'react-redux';
import { Cart } from '../../features/Cart/Cart';
import { Button } from '../../common/Button/Button';

const Component = ({ total }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={styles.root}>
      <div className={styles.navLinkList}>
        <NavLink className={styles.navlink} exact to='/'>
          Strona główna
        </NavLink>
        <NavLink className={styles.navlink} exact to='/'>
          Wyprzedaż
        </NavLink>
        <NavLink className={styles.navlink} exact to='/'>
          O nas
        </NavLink>
      </div>
      <div className={styles.cartlink}>
        <span>
          {total} zł
        </span>
        <Button
          variant="fab"
          onClick={handleExpandClick}
        >
          <LocalMallIcon color="primary" />
        </Button>
        <Cart expanded={expanded} />
      </div>
    </nav >
  );
};
Component.propTypes = {
  total: PropTypes.number,
};

const mapStateToProps = state => ({
  total: getTotalPrice(state),
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
