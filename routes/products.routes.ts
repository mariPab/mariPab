import express = require('express');
import product from '../controllers/products.controller';

const router = express.Router();
router.get('/all', product.loadAll);
router.get('/product/:id', product.loadProductById);

export default router;