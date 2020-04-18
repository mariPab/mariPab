import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getCart, getTotalPrice, newOrderRequest } from '../../../redux/cartRedux.js';
import { Button } from '../../common/Button/Button';

import './OrderForm.scss';

class Component extends React.Component {

  state = {
    client: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      place: '',
      postCode: '',
    },
    isError: false,
  }

  static propTypes = {
    cart: PropTypes.object,
    total: PropTypes.number,
    sendOrder: PropTypes.func,
  }

  isDataCompleted = (products, client, total) => {

    let isFormValid = true;
    if (!client.firstName && !client.lastName && !client.email && !client.address && !client.place && !client.postCode) isFormValid = false;
    else if (!products.length) isFormValid = false;
    else if (!total) isFormValid = false;

    return isFormValid;
  }

  submitOrder = async (event, products, total) => {
    const { client } = this.state;
    const { sendOrder } = this.props;

    event.preventDefault();
    if (this.isDataCompleted(products, client, total)) {

      const productsData = products.map(product => (
        {
          _id: product._id,
          amount: product.amount,
          notes: product.notes,
        }
      ));

      const payload = {
        products: productsData,
        client: client,
        total: total,
      };
      this.setState({
        client: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          place: '',
          postCode: '',
        },
        isError: false,
      });
      await sendOrder(payload);
      // history.push('/')
    } else {
      this.setState({ isError: true });
    }
  };

  updateTextField = ({ target }) => {
    const { client } = this.state;
    const { value, name } = target;

    this.setState({ client: { ...client, [name]: value } });
  }

  render() {

    const { updateTextField, submitOrder } = this;
    const { client } = this.state;
    const { cart, total } = this.props;

    return (
      <form noValidate onSubmit={e => submitOrder(e, cart.products, total)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <label htmlFor="firstName">Imię</label>
            <input
              type="text"
              value={client.firstName}
              name="firstName"
              onChange={updateTextField}
              id="firstName"
              placeholder="Imię"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="lastName">Nazwisko</label>
            <input
              type="text"
              value={client.lastName}
              name="lastName"
              onChange={updateTextField}
              placeholder="Nazwisko"
              id="lastName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="email">Adres e-mail</label>
            <input
              type="text"
              value={client.email}
              name="email"
              onChange={updateTextField}
              placeholder="Email"
              id="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="address">Adres do wysyłki</label>
            <input
              type="text"
              value={client.address}
              name="address"
              onChange={updateTextField}
              placeholder="Adres do wysyłki"
              id="address"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="place">Miejscowość</label>
            <input
              type="text"
              value={client.place}
              name="place"
              onChange={updateTextField}
              placeholder="Miejscowość"
              id="place"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="postCode">Kod pocztowy</label>
            <input
              type="text"
              value={client.postCode}
              name="postCode"
              onChange={updateTextField}
              placeholder="Kod pocztowy"
              id="postCode"
            />
          </Grid>
        </Grid>
        <Button type="submit">Zamawiam</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrder: data => dispatch(newOrderRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as OrderForm,
  Component as OrderFormComponent,
};
