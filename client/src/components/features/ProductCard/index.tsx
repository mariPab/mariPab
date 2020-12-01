import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../settings/config';
import styles from './ProductCard.module.scss';
import Button from '../../common/Button';
import { Product } from '../../../redux/products/types';
import { addProductToCart } from '../../../redux/cart/actions';
import { connect } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
interface MapDispatchToProps {
  addToCart: (product: Product, amount: number) => void;
}
interface Props extends MapDispatchToProps {
  product: Product;
}
export const ProductCard: React.FunctionComponent<Props> = ({ product, addToCart }: Props) => (
  <div className={styles.root}>
    <img src={`${IMAGES_URL}/${product.images[0]}`} alt={product.name} />
    <div className={styles.productDetails}>
      <h3>
        {product.name}
      </h3>
      <Button>
        <NavLink exact to={`/product/${product.id}`}>
            Pokaż opis
        </NavLink>
      </Button>
      <Button variant="fab" onClick={addToCart.bind(null, product, 1)}><AddShoppingCartIcon color="secondary" /></Button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  addToCart: (product: Product, amount: number) =>
    dispatch(addProductToCart(product, amount)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
