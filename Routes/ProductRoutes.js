const express = require('express');
const { addProduct } = require('../Controllers/ProductControllers');

const router = express.Router();


router.post('/products', addProduct); 

module.exports = router;