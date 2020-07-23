const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MenuItem = require("../Models/MenuItemModel");

router.get("/", (req, res, next) => {
  MenuItem.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
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
      res.status(201).json({
        message: "POST request to /menuItem",
        createdMenuItem: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:menuItemId", (req, res, next) => {
  const id = req.params.menuItemId;
  MenuItem.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
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
