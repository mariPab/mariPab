import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IMAGES_URL } from '../../../config';
import { Button } from '../../common/Button/Button';
import { NumberInput } from '../../common/NumberInput/NumberInput';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './CartItem.module.scss';
import { connect } from 'react-redux';
import { getProductFromCart, changeProductAmount, removeFromCart, addOrderNotes } from '../../../redux/cartRedux.js';
import EditIcon from '@material-ui/icons/Edit';

const Component = ({ product, changeAmount, removeProduct, addNotes }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.root}>
      <div className={styles.productItem}>
        <div className={styles.image}>
          <img
            src={`${IMAGES_URL}/${product.images[0]}`}
            alt={product.name}
          />
        </div>
        <div className={styles.productData}>
          <div className={styles.productInfo}>
            <span>{product.name}</span>
            <small>{product.price} zł</small>
          </div>
          <div>
            Ilość:&nbsp;
            <NumberInput
              value={product.amount}
              onChange={e => changeAmount({ id: product._id, amount: parseInt(e.target.value) })}
            />
            <Button
              onClick={handleExpandClick}
              variant="fab"
              aria-label="add-notes"
            >
              <EditIcon color="primary" />
            </Button>
            <Button
              onClick={() => removeProduct(product)}
              variant="fab"
              aria-label="delete"
            >
              <DeleteIcon color="primary" />
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.notes} ${expanded ? styles.expanded : ''}`}>
        <textarea
          value={product.notes}
          onChange={e => addNotes({ id: product._id, notes: e.target.value })}
          placeholder="Jeśli masz uwagi do zamówienia - umieść je tutaj"
        >
        </textarea>
      </div>
    </div>
  );
};

Component.propTypes = {
  id: PropTypes.string,
  product: PropTypes.object,
  changeAmount: PropTypes.func,
  removeProduct: PropTypes.func,
  addNotes: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  product: getProductFromCart(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  changeAmount: (id, amount) => dispatch(changeProductAmount(id, amount)),
  removeProduct: data => dispatch(removeFromCart(data)),
  addNotes: (id, notes) => dispatch(addOrderNotes(id, notes)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as CartItem,
  Container as CartItem,
  Component as CartItemComponent,
};
