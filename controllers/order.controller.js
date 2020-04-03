const Order = require('../models/order.model');

exports.sendOrder = async (req, res) => {
  const { client, total, products } = req.body;
  console.log(req.body.products);
  console.log(req.body);
  try {
    const newOrder = new Order({
      products: products,
      client: { ...client },
      total: total,
    });

    await (await newOrder.save());
    res.json(newOrder.populate());
  } catch (err) {
    res.status(500).json(err);
  }
};