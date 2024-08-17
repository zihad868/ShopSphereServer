const express = require('express');
const { addProduct, addProducts } = require('../Controllers/ProductControllers');

const router = express.Router();


router.post('/product', addProduct); 
router.post('/products', addProducts); 

module.exports = router;