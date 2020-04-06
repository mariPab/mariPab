const Order = require('../models/order.model');
const validateInputs = require('../utils/validateInputs.js');

exports.sendOrder = async (req, res) => {
  try {
    const { client, total, products } = req.body;
    if (validateInputs(client)) {
      const newOrder = new Order({
        products: products,
        client: { ...client },
        total: total,
      });
      console.log(validateInputs(client));
      await newOrder.save();
      res.json(newOrder.populate());
    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
};