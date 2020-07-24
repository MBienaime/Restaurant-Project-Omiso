// import

const express = require('express');

const OrderRoute = express.Router();

// import controler

const OrderControleur = require('../Controllers/OrderController');

// Order Route

OrderRoute.route('/')
  .get(OrderControleur.getOrder)
  .post(OrderControleur.postOrder);

OrderRoute.route('/:id')
  .delete(OrderControleur.deleteOrder)
  .get(OrderControleur.getOrder);
 

module.exports = OrderRoute;