import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
import styles from './Homepage.module.scss';
// import { getViewportMode } from '../../../redux/viewportRedux.js';
// import { Splash } from '../Splash/Splash';
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
    return (
      <>
        <Header />
        {
          <div className={styles.root}>
            <section className={`${styles.motto} ${ /* mobile ? styles.mobileOnly : */ ''}`}>
              <p>
                Kosmetyki Natural Beauty zostały stworzone z myślą o naturze.
                Składniki dobrane z najwyższą starannością dbają nie tylko o Twoją skórę, ale również o nasze otoczenie.
              </p>
            </section>
          </div>
        }
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
