// Imports
const express = require("express");

const MenuRouter = express.Router();

const { body } = require("express-validator");
const MenuController = require("../Controllers/MenuController");
const checkAuth = require("../Middleware/CheckAuth");
const upload = require("../Middleware/multer-config");
const checkRoles = require("../Middleware/CheckRoles");

//Find all menu items
MenuRouter.route("/")
  .get(MenuController.menuItems_get_all)
  .post(
    checkAuth,
    checkRoles(["admin"]),
    [
      body("image").trim().escape(),
      body("name").trim().escape(),
      body("description").trim().escape(),
    ],
    upload.single("image"),
    MenuController.menuItems_create_item
  );

//Find menu item by id
MenuRouter.route("/:menuItemId")
  .get(checkAuth, checkRoles(["admin"]), MenuController.menuItems_get_item)
  .patch(checkAuth, checkRoles(["admin"]), MenuController.menuItems_update_item)
  .delete(
    checkAuth,
    checkRoles(["admin"]),
    MenuController.menuItems_delete_item
  );

//Export
module.exports = MenuRouter;
