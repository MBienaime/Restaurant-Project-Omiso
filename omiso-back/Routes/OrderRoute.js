// import

const express = require('express');
const checkAuth = require("../Middleware/CheckAuth");
const checkRoles = require('../Middleware/CheckRoles');

const OrderRoute = express.Router();

// import controler

const OrderController = require('../Controllers/OrderController');

// Order Route

OrderRoute.route('/').get(OrderController.getOrder);

OrderRoute.route('/').post(checkAuth,checkRoles(["admin"]),OrderController.postOrder);

 OrderRoute.route('/checkout-success')
  .get(OrderController.checkout_success);

OrderRoute.route('/:id',checkAuth)
  .delete(checkAuth,checkRoles(["admin"]),OrderController.deleteOrder)
  .get(checkAuth,checkRoles(["admin","employé"]),OrderController.getOrderById)
  .patch(checkAuth,checkRoles(["admin","employé"]),OrderController.updateOrderById); 


  OrderRoute.route('/checkout-cancel')
module.exports = OrderRoute;