const Order = require('../models/order.model');
const validateInputs = require('../utils/validateInputs.js');

exports.sendOrder = async (req, res) => {
  try {
    const { client, total, products } = req.body;
    if (validateInputs(client) && products.length && total) {
      const newOrder = new Order({
        products: products,
        client: { ...client },
        total: total,
      });
      await newOrder.save();
      res.json(newOrder);
    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
};