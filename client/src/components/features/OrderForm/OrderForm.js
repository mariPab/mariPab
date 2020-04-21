import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getCart, getTotalPrice, newOrderRequest } from '../../../redux/cartRedux.js';
import { Button } from '../../common/Button/Button';
import { unmountAfterDelay } from '../../../HOC/unmountAfterDelay/unmountAfterDelay';
import { withRouter } from 'react-router-dom';

import './OrderForm.scss';
import { Popup } from '../../common/Popup/Popup.js';

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
    error: null,
  }

  static propTypes = {
    cart: PropTypes.object,
    total: PropTypes.number,
    sendOrder: PropTypes.func,
    history: PropTypes.object,
  }

  submitOrder = (event, products, total) => {
    const { firstName, lastName, email, address, place, postCode } = this.state.client;
    const { sendOrder } = this.props;
    event.preventDefault();

    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
    const validPostCode = /[0-9]{2}-[0-9]{3}/;

    let error = null;
    if (!firstName || !lastName || !email || !address || !place || !postCode) error = 'Brakuje wymaganych danych';
    else if (!products.length) error = 'Twój koszyk jest pusty';
    else if (!total) error = 'Twój koszyk jest pusty';
    else if (!validEmail.test(email)) error = 'Adres e-mail jest nieprawidłowy';
    else if (!validAddress.test(address)) error = 'Adres wysyłki jest nieprawidłowy';
    else if (!validPostCode.test(postCode)) error = 'Kod pocztowy jest nieprawidłowy';

    if (!error) {

      const productsData = products.map(product => (
        {
          _id: product._id,
          amount: product.amount,
          notes: product.notes,
        }
      ));

      const payload = {
        products: productsData,
        client: this.state.client,
        total: total,
      };
      sendOrder(payload);
      this.setState({
        client: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          place: '',
          postCode: '',
        },
        error: null,
      });
      this.props.history.push('/');

    } else {
      this.setState({ error });
    }
  };

  updateTextField = ({ target }) => {
    const { client } = this.state;
    const { value, name } = target;

    this.setState({ client: { ...client, [name]: value }, error: null });
  }

  render() {
    const DelayedPopup = unmountAfterDelay(Popup);
    const { updateTextField, submitOrder } = this;
    const { client, error } = this.state;
    const { cart, total } = this.props;
    return (
      <form noValidate onSubmit={e => submitOrder(e, cart.products, total)}>
        {error ? <DelayedPopup variant='danger'>{error}</DelayedPopup> : null}

        <Grid container>
          <Grid item xs={12} md={6}>
            <label htmlFor="firstName">Imię</label>
            <input
              type="text"
              value={client.firstName}
              name="firstName"
              onChange={updateTextField}
              id="firstName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="lastName">Nazwisko</label>
            <input
              type="text"
              value={client.lastName}
              name="lastName"
              onChange={updateTextField}
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

const Container = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

export {
  Container as OrderForm,
  Component as OrderFormComponent,
};
