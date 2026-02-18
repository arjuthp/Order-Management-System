const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const {authenticateToken} = require('../auth/auth.middlewares');


router.post('/',authenticateToken, orderController.handleCreateOrder); //auth used here
router.get('/',authenticateToken, orderController.handleGetAllOrders);
router.get('/:id',authenticateToken, orderController.handleGetOrderById);
router.put('/:id',authenticateToken, orderController.handleupdateStatus);
router.delete('/:id',authenticateToken, orderController.handleCancelOrderById);

module.exports = router; 