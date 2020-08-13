// imports

const express = require('express');
const checkAuth = require('../Middleware/CheckAuth');
const checkRoles = require('../Middleware/CheckRoles');

const OrderRoute = express.Router();

// import controler

const OrderController = require('../Controllers/OrderController');

// Order Routes

OrderRoute.route('/')
// Find all Order
  .get(checkAuth, checkRoles(['admin', 'employé']), OrderController.getOrder)
// Create newOrder
  .post(checkAuth, checkRoles(['admin']), OrderController.postOrder);

OrderRoute.route('/:id', checkAuth)
// Delete order by id
  .delete(checkAuth, checkRoles(['admin']), OrderController.deleteOrder)
// Find order by id
  .get(checkAuth, checkRoles(['admin', 'employé']), OrderController.getOrderById)
// Update an existing order by its id
  .patch(checkAuth, checkRoles(['admin', 'employé']), OrderController.updateOrderById);

// Payment routes
OrderRoute.route('/paiement-reussi').get(OrderController.checkout_success);
OrderRoute.route('/annulation').get(OrderController.checkout_cancel);

module.exports = OrderRoute;
