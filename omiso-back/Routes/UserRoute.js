// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const checkAuth = require('../Middleware/CheckAuth');
const checkRoles = require('../Middleware/CheckRoles');

// User controllers
const UserController = require('../Controllers/UserController');

// Find all users
router.get('/', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_all);

// Find user by id
router.get('/:userId', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_user);

// Sign Up route : creates a new user
router.post('/inscription', UserController.user_signup);

// User login route
router.post('/login', UserController.user_login);

// Forgotten password
router.put('/mdp-oublie', UserController.forget_password);

// Reset password
router.get('/mdp-reset/:token', UserController.reset_password);

// Delete user by its id
router.delete('/:userId', checkAuth, checkRoles(['admin']), UserController.user_delete);

module.exports = router;
