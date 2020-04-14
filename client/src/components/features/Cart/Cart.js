import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, getTotalPrice, loadCartRequest, saveCartRequest } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import styles from './Cart.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import { Button } from '../../common/Button/Button';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    cart: PropTypes.object,
    total: PropTypes.number,
    expanded: PropTypes.bool,
  }
  // componentDidMount() {
  //   this.props.loadCart();
  // }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.cart.products && nextProps.cart.products.length !== this.props.cart.products.length
  // };

  // componentDidUpdate() {
  //   // console.log(this.shouldComponentUpdate);
  //   this.props.saveCart(this.props.cart.products);
  // }

  render() {
    const { total, cart, expanded } = this.props;
    return (
      <div className={`${styles.root} ${expanded ? styles.expanded : ''}`}>
        <div className={`${styles.cart}`}>
          <div className={styles.items}>
            {cart.products.length ? (cart.products.map(product => (
              <CartItem id={product._id} key={product._id} />
            ))) :
              (
                <small className={styles.noProducts}>
                  <i>Brak produktów w koszyku</i>
                </small>
              )
            }
          </div>
          <div className={styles.summary}>
            <p>
              Podsumowanie zamówienia
            </p>
            <div>
              <span>ilość produktów:</span>
              <span>{countProductsInCart(cart.products)}</span>
            </div>
            <div>
              <span>Wartość zamówienia: </span>
              <span>{total} zł</span>
            </div>
            <Button disabled={cart.products.length ? false : true}>
              <NavLink className={styles.link} exact to="/order">
                Kontynuuj zamówienie
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


// Component.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
//   cart: PropTypes.object,
//   total: PropTypes.number,
//   expanded: PropTypes.bool,
// };

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartRequest()),
  saveCart: data => dispatch(saveCartRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};
