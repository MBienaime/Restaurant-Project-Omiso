//Import
const express = require("express");
const router = express.Router();

// User controllers
const UserController = require("../Controllers/UserController");

//Sign Up route : creates a new user
router.post("/signup", UserController.user_signup);

//User login route 
router.post("/login", UserController.user_login);

//Delete user by its id
router.delete("/:userId", UserController.user_delete);

module.exports = router;
