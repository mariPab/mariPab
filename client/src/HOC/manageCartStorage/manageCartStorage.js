/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { loadCartRequest, saveCartRequest } from '../../redux/cartRedux';
import { compose } from 'redux';
import { connect } from 'react-redux';

export function manageCartStorage(Component) {
  return class extends React.Component {

    static propTypes = {
      loadCart: PropTypes.func,
      saveCart: PropTypes.func,
    }

    componentDidMount() {
      this.props.loadCart();
    }
    componentDidUpdate() {
      this.props.saveCart();
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  };
}

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartRequest()),
  saveCart: data => dispatch(saveCartRequest(data)),
});

const manageCartStorageHOC = compose(
  connect(null, mapDispatchToProps), manageCartStorage
);

export default manageCartStorageHOC;
