import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IMAGES_URL } from '../../../config';
import { NotFound } from '../../views/NotFound/NotFound';
import { GalleryPic } from '../../features/GalleryPic/GalleryPic';
import { connect } from 'react-redux';
import { getProductById, loadProductByIdRequest } from '../../../redux/productsRedux.js';
import { addProductToCart } from '../../../redux/cartRedux.js';

import styles from './Product.module.scss';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    product: PropTypes.array,
    loadProduct: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    addToCart: PropTypes.func,
  }

  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id);
  }

  render() {
    const { product, addToCart } = this.props;
    return (
      product && product._id ? (
        <div className={styles.wrapper}>
          <div className={styles.gallery}>
            {product.images.map(image => (
              <GalleryPic key={image} alt={product.name} src={`${IMAGES_URL}/${image}`} />
            ))}
          </div>
          <div className={styles.content}>
            <h3>
              <small>{product.manufacturer}</small>
              &nbsp;{product.name}
            </h3>
            <span>{product.price} zł</span>
            <Fab onClick={() => addToCart(product)}>
              <ShoppingCartIcon />
            </Fab>
            <p>{product.description}</p>
          </div>
        </div>
      ) :
        (
          <NotFound />
        )
    );
  }
}

const mapStateToProps = state => ({
  product: getProductById(state),
});

const mapDispatchToProps = dispatch => ({
  loadProduct: id => dispatch(loadProductByIdRequest(id)),
  addToCart: data => dispatch(addProductToCart(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};
