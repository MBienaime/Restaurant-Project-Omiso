// Imports
const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

// Middlewares
const checkAuth = require('../Middleware/CheckAuth');
const checkRoles = require('../Middleware/CheckRoles');

// User controllers
const UserController = require('../Controllers/UserController');

// Find all users
router.get('/', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_all);
// Check Token from front

router.get('/verifier-token', UserController.CheckToken);

// Find user by id
router.get('/:userId', checkAuth, checkRoles(['admin', 'employé']), UserController.user_get_user);

// Sign Up route : creates a new user
router.post('/inscription', [body('firstname').trim().escape(), body('lastname').trim().escape(), body('password').trim().escape()], UserController.user_signup);

// User login route
router.post('/login', UserController.user_login);

// Forgotten password
router.put('/mdp-oublie', UserController.forget_password);

// Reset password
router.post('/mdp-reset/', UserController.reset_password);

router.get('/mdp-reset-mail/:token', UserController.reset_password_mail);

// Delete user by its id
router.delete('/:userId', checkAuth, checkRoles(['admin']), UserController.user_delete);



module.exports = router;
