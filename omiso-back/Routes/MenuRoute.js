const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MenuItem = require("../Models/MenuItemModel");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET request to /menu-tems",
  });
});

router.post("/", (req, res, next) => {
  const menuItem = new MenuItem({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    status: req.body.status,
  });
  menuItem
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "POST request to /menuItem",
        createdMenuItem: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:menuItemId", (req, res, next) => {
  const id = req.params.menuItemId;
  MenuItem.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:menuId", (req, res, next) => {
  res.status(200).json({
    message: "Updated menu",
  });
});

router.delete("/:menuId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted menu",
  });
});

module.exports = router;
