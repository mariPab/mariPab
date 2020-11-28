import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../settings/config';
// import Grid from '@material-ui/core/Grid';
import styles from './ProductCard.module.scss';
import Button from '../../common/Button';
import { Product } from '../../../redux/products/types';

interface Props {
  product: Product;
}
export const ProductCard: React.FunctionComponent<Props> = ({ product }: Props) => (
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
    </div>
  </div>
);

export default ProductCard;
