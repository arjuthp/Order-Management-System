const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const { authenticateToken } = require('../auth/auth.middlewares');

// Public routes - anyone can view products
router.get('/', productController.handleGetAllProducts);
router.get('/:id', productController.handleGetAllProductById);
router.get('/category/:name', productController.handleGetByCategory);

// Protected routes - only authenticated users can create/update/delete
router.post('/', authenticateToken, productController.handleCreateProduct);
router.put('/:id', authenticateToken, productController.handleUpdateProduct);
router.delete('/:id', authenticateToken, productController.handleDeleteProductById);

module.exports = router;