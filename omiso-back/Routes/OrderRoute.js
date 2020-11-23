//import

const express = require("express");
const { body } = require("express-validator");
const checkAuth = require("../Middleware/CheckAuth");
const checkRoles = require("../Middleware/CheckRoles");

const OrderRoute = express.Router();

//import controler

const OrderController = require("../Controllers/OrderController");

//Order Route

OrderRoute.route("/")
  .get(checkAuth, checkRoles(["admin", "employé"]), OrderController.getOrder)
  .post(
    checkAuth,
    checkRoles(["admin", "client"]),
    [body("comment").trim().escape(), body("order_Menu").trim().escape()],
    OrderController.postOrder
  );

OrderRoute.route("/:id")
  .delete(checkAuth, checkRoles(["admin"]), OrderController.deleteOrder)
  .get(
    checkAuth,
    checkRoles(["admin", "employé"]),
    OrderController.getOrderById
  )
  .patch(
    checkAuth,
    checkRoles(["admin", "employé"]),
    OrderController.updateOrderById
  );

module.exports = OrderRoute;
