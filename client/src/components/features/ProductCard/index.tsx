import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';
import Grid from '@material-ui/core/Grid';
import styles from './ProductCard.module.scss';
import { Button } from '../../common/Button/Button';
import { Product } from '../../../redux/products/types';

interface Props {
  product: Product;
}
export const ProductCard: React.FunctionComponent<Props> = ({ product }: Props) => (
  <Grid item xs={10} sm={5} lg={4} className={styles.root}>
    <div className={styles.root}>
      <img src={`${IMAGES_URL}/${product.images[0]}`} alt={name} />
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
  </Grid>
);

export default ProductCard;
