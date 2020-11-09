import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  getProducts,
  getTotalPrice,
  getCustomerData,
} from "../../../redux/cart/reducer";
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
  updateTextField = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = target;
    this.props.updateOrderData(value, name);
  };
  submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.sendOrder();
  };
  render() {
    const { updateTextField } = this;
    const { customer } = this.props;
    return (
      <form noValidate onSubmit={this.submit}>
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

