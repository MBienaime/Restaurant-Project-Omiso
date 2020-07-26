// import

const express = require('express');

const OrderRoute = express.Router();

// import controler

const OrderController = require('../Controllers/OrderController');

// Order Route

OrderRoute.route('/')
  .get(OrderController.getOrder)
  .post(OrderController.postOrder);

OrderRoute.route('/:id')
  .delete(OrderController.deleteOrder)
  .get(OrderController.getOrderById);
 

module.exports = OrderRoute;