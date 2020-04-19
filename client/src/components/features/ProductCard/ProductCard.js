import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';
import Grid from '@material-ui/core/Grid';
import styles from './ProductCard.module.scss';
import { Button } from '../../common/Button/Button';

const Component = ({ _id, name, images }) => (
  <Grid item xs={10} sm={5} lg={3} className={styles.root}>
    <div className={styles.root}>
      <img src={`${IMAGES_URL}/${images[0]}`} alt={name} />
      <div className={styles.productDetails}>
        <h3>
          {name}
        </h3>
        <Button>
          <NavLink exact to={`/product/${_id}`}>
            Pokaż opis
          </NavLink>
        </Button>
      </div>
    </div>
  </Grid>
);

Component.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  images: PropTypes.array,
  price: PropTypes.number,
  className: PropTypes.string,
};

export {
  Component as ProductCard,
  Component as ProductCardComponent,
};
