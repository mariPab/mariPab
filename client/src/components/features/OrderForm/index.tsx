import React from 'react';
import { Form, Input } from 'antd';
import UI from '../../ui/UI.style';

interface Props {
  onOrderSubmission: (customer: Cart.Customer) => void;
}

const OrderForm = ({ onOrderSubmission }: Props) => {
  return (
    <Form
      name="order"
      initialValues={{ remember: true }}
      onFinish={onOrderSubmission}
    >
      <UI.FormItem
        label="Imię"
        name="firstName"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem
        label="Nazwisko"
        name="lastName"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem
        label="e-mail"
        name="email"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem
        label="Adres"
        name="address"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem
        label="Miejscowość"
        name="place"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem
        label="Kod pocztowy"
        name="postCode"
      >
        <Input />
      </UI.FormItem>
      <UI.FormItem>
        <UI.Button floatRight htmlType="submit">
          Złóż zamówienie
        </UI.Button>
      </UI.FormItem>
    </Form>
  );
};

export default OrderForm;

