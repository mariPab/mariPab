import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  getProducts,
  getTotalPrice,
  getCustomerData,
} from "../../../redux/cart/reducer";
// import { submitOrder } from '../../../redux/cart/saga';
import { updateOrderData, submitOrderStart } from '../../../redux/cart/actions';
import { Customer } from '../../../redux/cart/types';
import Button from "../../common/Button";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { CartProduct } from '../../../redux/cart/types';
import "./OrderForm.scss";

interface MapDispatchToProps {
  sendOrder: () => void;
  updateOrderData: (value: string, field: string)  => void;
}
interface Props extends MapDispatchToProps, RouteComponentProps {
  products: CartProduct[];
  total: number;
  customer: Customer;
}

class OrderForm extends React.Component<Props> {
  // state = {
  //   customer: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     address: "",
  //     place: "",
  //     postCode: "",
  //   },
  //   error: null,
  // };

  submitOrder = (products: CartProduct[], total: number) => {
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   address,
    //   place,
    //   postCode,
    // } = this.state.customer;

    // const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // const validAddress = /^([^\\u0000-\u007F]|\w)+,?\s\d+[A-z]?(\/\d+[A-z]?)?$/;
    // const validPostCode = /[0-9]{2}-[0-9]{3}/;

    // let error = null;
    // if (!firstName || !lastName || !email || !address || !place || !postCode)
    //   error = "Brakuje wymaganych danych";
    // else if (!products.length) error = "Twój koszyk jest pusty";
    // else if (!total) error = "Twój koszyk jest pusty";
    // else if (!validEmail.test(email)) error = "Adres e-mail jest nieprawidłowy";
    // else if (!validAddress.test(address))
    //   error = "Adres wysyłki jest nieprawidłowy";
    // else if (!validPostCode.test(postCode))
    //   error = "Kod pocztowy jest nieprawidłowy";

    // if (!error) {
      // const productsData = products.map((product) => ({
      //   _id: product.id,
      //   amount: product.amount,
      //   notes: product.notes,
      // }));

      // const payload = {
      //   products: productsData,
      //   customer: this.state.customer,
      //   total: total,
      // };
      this.props.sendOrder();
      // this.setState({
      //   customer: {
      //     firstName: "",
      //     lastName: "",
      //     email: "",
      //     address: "",
      //     place: "",
      //     postCode: "",
      //   },
      //   error: null,
      // });
      this.props.history.push("/");
    // } else {
    //   this.setState({ error });
    // }
  };

  updateTextField = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    this.props.updateOrderData(value, name);
    // this.setState({ customer: { ...this.state.customer, [name]: value }, error: null });
  };

  render() {
    const { updateTextField } = this;
    const { customer } = this.props;
    return (
      <form noValidate onSubmit={this.props.sendOrder}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <label htmlFor="firstName">Imię</label>
            <input
              type="text"
              value={customer.firstName}
              name="firstName"
              onChange={updateTextField}
              id="firstName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="lastName">Nazwisko</label>
            <input
              type="text"
              value={customer.lastName}
              name="lastName"
              onChange={updateTextField}
              id="lastName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="email">Adres e-mail</label>
            <input
              type="text"
              value={customer.email}
              name="email"
              onChange={updateTextField}
              id="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="address">Adres do wysyłki</label>
            <input
              type="text"
              value={customer.address}
              name="address"
              onChange={updateTextField}
              id="address"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="place">Miejscowość</label>
            <input
              type="text"
              value={customer.place}
              name="place"
              onChange={updateTextField}
              id="place"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="postCode">Kod pocztowy</label>
            <input
              type="text"
              value={customer.postCode}
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
  customer: getCustomerData(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  sendOrder: () => dispatch(submitOrderStart()),
  updateOrderData: (value: string, field: string) => dispatch(updateOrderData(value, field)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderForm));

