import { Response, Request } from 'express/index';
import { Document } from 'mongoose';

export type ServerRequest = (req: Request, res: Response) => Promise<void>;
export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  place: string;
  postCode: string;
}

export interface DBProduct extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  tags:   string[];
}
interface ProductOrderData {
  _id: string;
  amount: number;
  notes: string;
}

export interface DBOrder extends Document {
  products: ProductOrderData;
  client: CustomerData;
  total: number;
}


