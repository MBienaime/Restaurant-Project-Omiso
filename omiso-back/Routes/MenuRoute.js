const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MenuItem = require("../Models/MenuItemModel");

// Find all menu items
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

// Create new menu item
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

  // Save MenuItem in the database
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

// Find menu item by id
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

// Update an existing menu item by its id
router.patch("/:menuItemId", (req, res, next) => {
  const id = req.params.menuItemId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  MenuItem.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Product updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete menu item by id
router.delete("/:menuItemId", (req, res, next) => {
  const id = req.params.menuItemId;
  MenuItem.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
