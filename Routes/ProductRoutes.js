const express = require('express');
const { addProduct, addProducts, getProducts } = require('../Controllers/ProductControllers');

const router = express.Router();


router.post('/product', addProduct); 
router.post('/products', addProducts); 
router.get('/products', getProducts)

module.exports = router;