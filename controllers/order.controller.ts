import Order from '../models/order.model';
import validateData from '../helpers/validateData';
import { ServerRequest} from '../interfaces';
import { errorCodes } from '../client/src/settings/codes';

class OrderController {
  public sendOrder: ServerRequest = async (req, res) => {
    try {
      console.log(req.body);
      const { client, total, products } = req.body;
      const validationResult = validateData.validate(client);
      if (products.length && total) {
        if (!validationResult.length) {
        const newOrder = new Order({
          products: products.map(product => ({ ...product, _id: product.id })),
          client: client,
          total: total,
        });
        await newOrder.save();
        res.json(newOrder);
      } else {
        res.status(400).json({ error: true, errorCode: errorCodes.VALIDATION_FAILED, validationErrors: validationResult })
      }
    }
    } catch (err) {
      res.status(500).json(err);
    } 
  }

}

export default new OrderController();