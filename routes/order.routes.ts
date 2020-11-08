import express = require('express');
import order from '../controllers/order.controller';

const router = express.Router();
router.post('/submit', order.sendOrder);

export default router;