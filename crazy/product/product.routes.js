const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

router.get('/', productController.handleGetAllProducts);
router.get('/:id', productController.handleGetAllProductById);
router.get('/products/category/:name', productController.handleGetByCategory);
router.post('/', productController.handleCreateProduct);

module.exports = router;