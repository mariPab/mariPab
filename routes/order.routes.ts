import express = require('express');
import order from '../controllers/order.controller';

const router = express.Router();
router.post('/order', order.sendOrder);

export default router;