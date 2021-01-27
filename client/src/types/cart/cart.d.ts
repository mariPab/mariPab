declare namespace Cart {
  interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    place: string;
    postCode: string;
  }
  interface CartProduct extends Product.Product {
    amount: number;
    notes: string;
  }
  interface Store {
    products: CartProduct[];
    orderProcessing: boolean;
    total: number;
  }
  interface OrderPayload {
    products: CartProduct[];
    customer: Customer;
    total: number;
  }
}
