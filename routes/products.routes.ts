import express = require('express');
import product from '../controllers/products.controller';

const router = express.Router();
router.get('/products', product.loadAll);
router.get('/products/:id', product.loadProductById);

export default router;