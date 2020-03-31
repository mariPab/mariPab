const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true },
},
  { versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);