import Product from '../models/product.model';
import { ServerRequest, DBProduct } from '../interfaces';
import { errorCodes } from '../client/src/settings/codes';

class ProductsController {
  public loadAll: ServerRequest = async (req, res) => {
    try {
      if (Object.getOwnPropertyNames(req.query).length) {
        if (req.query.search && req.query.activeTags) {
          const products: DBProduct[] = await Product.find({
            name: { $regex: req.query.search as string, $options: 'i' },
            tags: { $in: req.query.activeTags as string[] },
          });
          res.json(products);
        } else if (!req.query.search && req.query.activeTags) {
          const products: DBProduct[] = await Product.find({
            tags: { $in: req.query.activeTags as string[] },
          });
          res.json(products);
        } else if (req.query.search && !req.query.activeTags) {
          const products: DBProduct[] = await Product.find({
            name: { $regex: req.query.search as string, $options: 'i' },
          });
          res.json(products);
        } else res.status(400).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
      } else { 
        const products = await Product.find();
        res.json(products);
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