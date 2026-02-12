const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/register', userController.handleUserRegister);
router.post('/login', userController.handleUserLogin);

router.get('/list', userController.handleGetUserList);
router.get('/:id', userController.handleGetUserById);

module.exports = router;