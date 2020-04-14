exports.getCart = async (req, res) => {
  console.log(req.session.id);
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
    // localStorage.setItem('sessionId', req.session.id);
    req.session.cart = {
      products: req.body,
    };
    req.session.save(err => {
      console.log(err);
    });
    // console.log(req.session.cart);
    res.json(req.session.cart.products);
  } catch (err) {
    res.status(500).json(err);
  }
};