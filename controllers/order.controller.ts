import Order from '../models/order.model';
import validateData from '../helpers/validateData';
import { ServerRequest} from '../interfaces';
import { codes, errorCodes } from '../client/src/settings/codes';

class OrderController {
  public sendOrder: ServerRequest = async (req, res) => {
    try {
      const { customer, total, products } = req.body;
      const validationResult = validateData.validate(customer);
      if (!products.length || total === 0 ) res.status(400).json({ error: true, errorCode: errorCodes.NO_PRODUCTS_IN_CART });
      else if (validationResult.length) res.status(400).json({ error: true, errorCode: errorCodes.VALIDATION_FAILED, validationErrors: validationResult });
      else  {
        const newOrder = new Order({
          products,
          client: customer,
          total,
        });
        await newOrder.save();
        res.status(200).json({ status: 'success', code: codes.SUCCESSFUL_ORDER_SUBMISSION });
      } 
    } catch (err) {
      res.status(500).json(err);
    } 
  }

}

export default new OrderController();