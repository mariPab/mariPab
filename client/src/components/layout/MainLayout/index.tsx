import React, { useEffect } from 'react';
import Header from '../Header';
import { Footer } from '../Footer/Footer';
import { changeViewport } from '../../../redux/viewportRedux';
import { connect } from 'react-redux';
import styles from './MainLayout.module.scss';

interface MapDispatchToProps {
  changeViewportMode: (newMode: boolean) => void;
}
type Props = MapDispatchToProps;

const isMobileViewport = (): boolean => {
  const mobile = '(max-width: 576px)';
  if (window.matchMedia(`${mobile}`).matches) return true;
  else return false;
};

const MainLayout: React.FunctionComponent<Props> = ({ children, changeViewportMode }) => {
  useEffect(() => {
    changeViewportMode(isMobileViewport());
    window.addEventListener('resize', () => changeViewportMode(isMobileViewport()));
  });

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  changeViewportMode: newMode => dispatch(changeViewport(newMode)),
});

export default connect(null, mapDispatchToProps)(MainLayout);
