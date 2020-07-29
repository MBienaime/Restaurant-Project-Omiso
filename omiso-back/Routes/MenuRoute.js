//Imports
const express = require("express");
const router = express.Router();
const MenuController = require("../Controllers/MenuController");
const checkAuth = require('../Middleware/CheckAuth');
const upload = require('../Middleware/multer-config');

// Find all menu items
router.get("/", MenuController.menuItems_get_all);

// Create new menu item
router.post("/",checkAuth,upload.single('image'), MenuController.menuItems_create_item);

// Find menu item by id
router.get("/:menuItemId",checkAuth, MenuController.menuItems_get_item);

// Update an existing menu item by its id
router.patch("/:menuItemId",checkAuth, MenuController.menuItems_update_item);

// Delete menu item by id
router.delete("/:menuItemId",checkAuth, MenuController.menuItems_delete_item);

module.exports = router;
