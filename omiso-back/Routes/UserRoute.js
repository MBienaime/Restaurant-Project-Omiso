// Import
const express = require('express');

const router = express.Router();
const checkAuth = require('../Middleware/CheckAuth');
const checkRoles = require('../Middleware/CheckRoles');

// User controllers
const UserController = require('../Controllers/UserController');

// Find all users
router.get('/', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_all);

// Find user by id
router.get('/:userId', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_user);

// Sign Up route : creates a new user
router.post('/signup', UserController.user_signup);

// User login route
router.post('/login', UserController.user_login);

// Forgotten password
router.put('/forget-password', UserController.forget_password);

// Reset password
router.put('/reset-password', UserController.reset_password);

// Delete user by its id
router.delete('/:userId', checkAuth, checkRoles(['admin']), UserController.user_delete);

module.exports = router;
