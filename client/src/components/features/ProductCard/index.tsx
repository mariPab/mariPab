import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../settings/config';
import { Product } from '../../../redux/products/types';
import { addProductToCart } from '../../../redux/cart/actions';
import { connect } from 'react-redux';
import {AddShoppingCart, ArrowForward} from '@material-ui/icons';
import { ProductCardBox, ProductDetails } from './ProductCard.style';
import UI from '../../ui/UI.style';

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
      <div>
        <NavLink exact to={`/product/${product.id}`}>
          <UI.Tooltip title="Przejdź do produktu">
            <UI.Button
              iconButton
              size="large"
              icon={<ArrowForward />}
              noBorder
              noPadding
            >
              {/* Przejdź do produktu */}
            </UI.Button>
          </UI.Tooltip>
        </NavLink>
        <UI.Tooltip title="Dodaj do koszyka">

          <UI.Button
            icon={<AddShoppingCart />}
            iconButton
            size="large"
            noBorder
            onClick={addToCart.bind(null, product, 1)}
          />
        </UI.Tooltip>
      </div>
    </ProductDetails>
  </ProductCardBox>
);

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  addToCart: (product: Product, amount: number) =>
    dispatch(addProductToCart(product, amount)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
