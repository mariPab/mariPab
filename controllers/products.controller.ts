import Product from '../models/product.model';
import { ServerRequest, DBProduct } from '../interfaces';

class ProductsController {
  public loadAll: ServerRequest = async (req, res) => {
    try {
      if (req.query.search) {
        const products: DBProduct[] = await Product.find({
          name: { $regex: req.query.search as string, $options: 'i' }
        });
        res.json(products);
      } else { 
        const products = await Product.find();
        if (!products) res.status(404).json({ product: 'Not Found' });
        else res.json(products);
      }
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