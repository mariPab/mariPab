const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
  tags: { type: Array },
},
  { versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);