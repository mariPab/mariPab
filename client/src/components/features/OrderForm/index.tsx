import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  getProducts,
  getTotalPrice,
} from "../../../redux/cart/reducer";
import { submitOrder } from '../../../redux/cart/thunks';
import Button from "../../common/Button";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { CartProduct } from '../../../redux/cart/types';

import "./OrderForm.scss";

interface MapDispatchToProps {
  sendOrder: (data: any) => void;
}
interface Props extends MapDispatchToProps, RouteComponentProps {
  products: CartProduct[];
  total: number;
}

class OrderForm extends React.Component<Props> {
  state = {
    client: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      place: "",
      postCode: "",
    },
    error: null,
  };

  submitOrder = (products: CartProduct[], total: number) => {
    const {
      firstName,
      lastName,
      email,
      address,
      place,
      postCode,
    } = this.state.client;

    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
    const validPostCode = /[0-9]{2}-[0-9]{3}/;

    let error = null;
    if (!firstName || !lastName || !email || !address || !place || !postCode)
      error = "Brakuje wymaganych danych";
    else if (!products.length) error = "Twój koszyk jest pusty";
    else if (!total) error = "Twój koszyk jest pusty";
    else if (!validEmail.test(email)) error = "Adres e-mail jest nieprawidłowy";
    else if (!validAddress.test(address))
      error = "Adres wysyłki jest nieprawidłowy";
    else if (!validPostCode.test(postCode))
      error = "Kod pocztowy jest nieprawidłowy";

    if (!error) {
      const productsData = products.map((product) => ({
        _id: product.id,
        amount: product.amount,
        notes: product.notes,
      }));

      const payload = {
        products: productsData,
        client: this.state.client,
        total: total,
      };
      this.props.sendOrder(payload);
      this.setState({
        client: {
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          place: "",
          postCode: "",
        },
        error: null,
      });
      this.props.history.push("/");
    } else {
      this.setState({ error });
    }
  };

  updateTextField = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    this.setState({ client: { ...this.state.client, [name]: value }, error: null });
  };

  render() {
    const { updateTextField } = this;
    const { client } = this.state;
    return (
      <form noValidate onSubmit={this.submitOrder.bind(null, this.props.products, this.props.total)}>
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

const mapStateToProps = (state: RootState) => ({
  products: getProducts(state),
  total: getTotalPrice(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  sendOrder: (data: any) => dispatch(submitOrder(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderForm));

