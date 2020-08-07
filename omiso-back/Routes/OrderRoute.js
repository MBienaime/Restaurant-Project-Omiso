// import

const express = require('express');
const checkAuth = require("../Middleware/CheckAuth");
const checkRoles = require('../Middleware/CheckRoles');

const OrderRoute = express.Router();

// import controler

const OrderController = require('../Controllers/OrderController');

// Order Route

OrderRoute.route('/')
  .get(checkAuth,checkRoles(["admin"]),OrderController.getOrder)
  .post(checkAuth,checkRoles(["admin"]),OrderController.postOrder);

OrderRoute.route('/:id',checkAuth)
  .delete(checkAuth,checkRoles(["admin"]),OrderController.deleteOrder)
  .get(checkAuth,checkRoles(["admin"]),OrderController.getOrderById)
  .patch(checkAuth,checkRoles(["admin"]),OrderController.updateOrderById); 

module.exports = OrderRoute;