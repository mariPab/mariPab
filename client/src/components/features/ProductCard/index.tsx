import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../settings/config';
import Button from '../../common/Button';
import { Product } from '../../../redux/products/types';
import { addProductToCart } from '../../../redux/cart/actions';
import { connect } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ProductCardBox, ProductDetails } from './ProductCard.style';

interface MapDispatchToProps {
  addToCart: (product: Product, amount: number) => void;
}
interface Props extends MapDispatchToProps {
  product: Product;
}
export const ProductCard: React.FunctionComponent<Props> = ({ product, addToCart }: Props) => (
  <ProductCardBox>
    <img src={`${IMAGES_URL}/${product.images[0]}`} alt={product.name} />
    <ProductDetails>
      <h3>
        {product.name}
      </h3>
      <Button>
        <NavLink exact to={`/product/${product.id}`}>
            Pokaż opis
        </NavLink>
      </Button>
      <Button variant="fab" onClick={addToCart.bind(null, product, 1)}><AddShoppingCartIcon color="secondary" /></Button>
    </ProductDetails>
  </ProductCardBox>
);

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  addToCart: (product: Product, amount: number) =>
    dispatch(addProductToCart(product, amount)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
