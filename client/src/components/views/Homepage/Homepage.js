import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll, getLoadingState, loadProductsRequest } from '../../../redux/productsRedux.js';
import { ProductCard } from '../../features/ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import styles from './Homepage.module.scss';
import { getViewportMode } from '../../../redux/viewportRedux.js';
import { Splash } from '../../views/Splash/Splash';

class Component extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    loadProducts: PropTypes.func,
    mobile: PropTypes.bool,
    loading: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products, mobile, loading } = this.props;
    return (
      loading.active ? <Splash /> : (
        <div className={styles.root}>
          <section className={`${styles.motto} ${mobile ? styles.mobileOnly : ''}`}>
            <p>
              Kosmetyki Natural Beauty zostały stworzone z myślą o naturze.
              Składniki dobrane z najwyższą starannością dbają nie tylko o Twoją skórę, ale również o nasze otoczenie.
            </p>
          </section>
          <Grid classes={{ container: styles.container }} container >
            {products.map(product => (
              <ProductCard key={product._id} {...product} />
            ))}
          </Grid>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  products: getAll(state),
  mobile: getViewportMode(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
