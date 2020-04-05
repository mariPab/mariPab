import React from 'react';
import PropTypes from 'prop-types';
import { IMAGES_URL } from '../../../config';
import styles from './CartItem.module.scss';
import { connect } from 'react-redux';
import { getProductFromCart, changeProductAmount } from '../../../redux/cartRedux.js';

const Component = ({ product, changeAmount }) => {

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
        <input
          defaultValue="1"
          type="number"
          min="1"
          max="10"
          onChange={e => changeAmount({ id: product._id, amount: e.target.value })}
        />
      </div>

    </div>
  );
};
Component.propTypes = {
  id: PropTypes.string,
  product: PropTypes.object,
  changeAmount: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  product: getProductFromCart(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  changeAmount: (id, amount) => dispatch(changeProductAmount(id, amount)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as CartItem,
  Container as CartItem,
  Component as CartItemComponent,
};
