const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { authenticateToken } = require('../auth/auth.middlewares');



router.get('/list',authenticateToken, userController.handleGetUserList);
router.get('/:id',authenticateToken, userController.handleGetUserById);
router.put('/:id', authenticateToken,userController.handleUpdateUser);
router.delete('/:id',authenticateToken, userController.handleDeleteUserById);

module.exports = router;