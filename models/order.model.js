const mongoose = require('mongoose');

const orderedProductsSchema = new mongoose.Schema({
  id: { type: ObjectId, required: true, ref: 'Product' },
  amount: { type: Number, required: true },
});

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  postCode: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  products: [orderedProductsSchema],
  client: { clientSchema },
  total: { type: Number, required: true },
},
  { versionKey: false }
);

module.exports = mongoose.model('Order', orderSchema);