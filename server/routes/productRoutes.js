const express = require('express');
const router = express.Router();
const { getProducts, getProductByIdentifier } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:identifier', getProductByIdentifier);

module.exports = router;
