import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { changeViewport } from '../../../redux/viewportRedux';
import { connect } from 'react-redux';
import styles from './MainLayout.module.scss';

const isMobileViewport = () => {
  const mobile = '(max-width: 576px)';
  if (window.matchMedia(`${mobile}`).matches) return true;
  else return false;
};

const Component = ({ children, changeViewportMode }) => {
  useEffect(() => {
    changeViewportMode(isMobileViewport());
    window.addEventListener('resize', () => changeViewportMode(isMobileViewport()));
  });

  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  changeViewportMode: PropTypes.func,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });


const mapDispatchToProps = dispatch => ({
  changeViewportMode: newMode => dispatch(changeViewport(newMode)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  // Component as MainLayout,
  Container as MainLayout,
  Component as MainLayoutComponent,
};
