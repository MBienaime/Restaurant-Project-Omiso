//Imports
const express = require("express");
const router = express.Router();
const MenuController = require("../Controllers/MenuController");
const checkAuth = require('../Middleware/CheckAuth');
const upload = require('../Middleware/multer-config');
const checkRoles = require('../Middleware/CheckRoles');

// Find all menu items
router.get("/", MenuController.menuItems_get_all);

// Create new menu item
router.post("/",checkAuth,checkRoles(["admin"]),upload.single('image'), MenuController.menuItems_create_item);

// Find menu item by id
router.get("/:menuItemId",checkAuth,checkRoles(["admin"]), MenuController.menuItems_get_item);

// Update an existing menu item by its id
router.patch("/:menuItemId",checkAuth,checkRoles(["admin"]), MenuController.menuItems_update_item);

// Delete menu item by id
router.delete("/:menuItemId",checkAuth,checkRoles(["admin"]), MenuController.menuItems_delete_item);

module.exports = router;
