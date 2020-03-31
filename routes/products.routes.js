const express = require('express');
const router = express.Router();

const product = require('../controllers/products.controller');

router.get('/products', product.loadAll);

module.exports = router;