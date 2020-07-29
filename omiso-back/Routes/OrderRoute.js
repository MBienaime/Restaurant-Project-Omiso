// import

const express = require('express');
const checkAuth = require("../Middleware/CheckAuth");

const OrderRoute = express.Router();

// import controler

const OrderController = require('../Controllers/OrderController');

// Order Route

OrderRoute.route('/')
  .get(checkAuth,OrderController.getOrder)
  .post(checkAuth,OrderController.postOrder);

OrderRoute.route('/:id',checkAuth)
  .delete(checkAuth,OrderController.deleteOrder)
  .get(checkAuth,OrderController.getOrderById)
  .patch(checkAuth,OrderController.updateOrderById); 

module.exports = OrderRoute;