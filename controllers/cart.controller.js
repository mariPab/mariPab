exports.getCart = async (req, res) => {
  console.log(req.session.cart.products);
  try {
    if (!req.session || !req.session.cart || !req.session.cart.products) res.json([]);
    else if (!req.session.cart.products.length) res.json([]);
    else res.json(req.session.cart.products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.saveCart = async (req, res) => {
  try {
    const { products } = req.body;
    req.session.cart = {
      products: products,
    };
    req.session.save();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};