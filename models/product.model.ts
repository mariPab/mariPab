import mongoose = require('mongoose');
import { DBProduct } from '../interfaces';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
  tags: { type: Array },
},
  { versionKey: false }
);

export default mongoose.model<DBProduct>('Product', productSchema);