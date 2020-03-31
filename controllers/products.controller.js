const Product = require('../models/product.model');

exports.loadAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) res.status(404).json({ product: 'Not Found' });
    else res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};