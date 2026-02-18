//auth- only routes

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);
router.post('/logout', authController.handleLogout);
router.post('/token', authController.handleRefreshToken);

module.exports = router;

