import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll, loadProductsRequest } from '../../../redux/productsRedux.js';
import { ProductCard } from '../../features/ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

class Component extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    products: PropTypes.array,
    loadProducts: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <Grid container>
        {products.map(product => (
          <ProductCard key={product._id} {...product} />
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
