const Product = require('../models/product.model');
import { ServerRequest} from '../interfaces';

class ProductsController {
  public loadAll: ServerRequest = async (_req, res) => {
  try {
    const products = await Product.find();
    if (!products) res.status(404).json({ product: 'Not Found' });
    else res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
  }
  public loadProductById: ServerRequest = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) res.status(404).json({ product: 'Not Found' });
      else res.json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new ProductsController();