import Order from '../models/order.model';
import validateData from '../helpers/validateData';
import { ServerRequest} from '../interfaces';
import { codes, errorCodes } from '../client/src/settings/codes';

class OrderController {
  public sendOrder: ServerRequest = async (req, res) => {
    try {
      const { client, total, products } = req.body;
      const validationResult = validateData.validate(client);
      if (products.length && total) {
        if (!validationResult.length) {
        const newOrder = new Order({
          products: products,
          client: client,
          total: total,
        });
        await newOrder.save();
        res.status(200).json({ status: 'success', code: codes.SUCCESSFUL_ORDER_SUBMISSION });
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