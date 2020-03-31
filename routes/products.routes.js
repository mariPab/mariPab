const express = require('express');
const router = express.Router();

const product = require('../controllers/products.controller');

router.get('/products', product.loadAll);
router.get('/products/:id', product.loadProductById);

module.exports = router;