import React from 'react';
import PropTypes from 'prop-types';
import { IMAGES_URL } from '../../../config';
import styles from './CartItem.module.scss';

import { connect } from 'react-redux';
import { getProductFromOrderData } from '../../../redux/orderRedux.js';

const Component = ({ product }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img
          src={`${IMAGES_URL}/${product.images[0]}`}
          alt={product.name}
        />
      </div>
      <div className={styles.productData}>
        <span>{product.name}</span>
        <small>{product.price} zł</small>
      </div>
    </div>
  );
};
Component.propTypes = {
  id: PropTypes.string,
  product: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  product: getProductFromOrderData(state, props.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as CartItem,
  Container as CartItem,
  Component as CartItemComponent,
};
