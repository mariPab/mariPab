import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
// import ProductCard from '../../features/ProductCard';
// import Grid from '@material-ui/core/Grid';
import styles from './Homepage.module.scss';
// import { getViewportMode } from '../../../redux/viewportRedux.js';
import { Splash } from '../Splash/Splash';
import { RootState } from '../../../redux/store';
import { Product } from '../../../redux/products/types';
import Header from '../../layout/Header';

interface MapStateToProps {
  products: Product[];
  loading: boolean;
}
interface MapDispatchToProps {
  getProductsList: () => void;
}

type Props = MapStateToProps &
  MapDispatchToProps;

export class Homepage extends React.Component<Props> {
  componentDidMount() {
    // this.props.getProductsList();
  }
  render() {
    const { products, /* mobile, */ loading } = this.props;
    console.log(products);
    return (
      <>
        <Header />
        {loading ? <Splash /> : (
          <div className={styles.root}>
            <section className={`${styles.motto} ${ /* mobile ? styles.mobileOnly : */ ''}`}>
              <p>
                Kosmetyki Natural Beauty zostały stworzone z myślą o naturze.
                Składniki dobrane z najwyższą starannością dbają nie tylko o Twoją skórę, ale również o nasze otoczenie.
              </p>
            </section>
            {/*             <Grid classes={{ container: styles.container }} container >
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid> */}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: getAll(state),
  // mobile: getViewportMode(state),
  loading: getLoadingState(state),
});
const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  getProductsList: () => dispatch(getProductsListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
