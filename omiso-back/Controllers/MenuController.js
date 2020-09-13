/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
// Imports
const mongoose = require('mongoose');
const MenuItem = require('../Models/MenuItemModel');

// Routes logic
exports.menuItems_get_all = (req, res) => {
  MenuItem.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        menuItems: docs.map((doc) => ({
          _id: doc._id,
          name: doc.name,
          description: doc.description,
          price: doc.price,
          category: doc.category,
          quantity: doc.quantity,
          status: doc.status,
          urlImage: doc.urlImage,
          request: {
            type: 'GET',
            url: `https://omiso.com/menu/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.menuItems_create_item = (req, res) => {
  const menuItem = new MenuItem({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  });
  // check image
  if (typeof req.file === 'undefined') {
    menuItem.urlImage = ' ';
  } else {
    menuItem.urlImage = `https://omiso.com/images/menus/${req.file.filename}`;
  }

  // Saves MenuItem in the database
  menuItem
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Item created successfully',
        createdMenuItem: {
          _id: result.id,
          name: result.name,
          description: result.description,
          price: result.price,
          category: result.category,
          urlImage: result.urlImage,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Get MenuItem by id in the database
exports.menuItems_get_item = (req, res) => {
  const id = req.params.menuItemId;
  MenuItem.findById(id)
    .select('_id name description price category quantity status')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          menuItem: doc,
          request: {
            type: 'GET',
            description: '',
            url: `https://omiso.com/menu/${doc._id}`,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Update MenuItem by id in the database
exports.menuItems_update_item = (req, res) => {
  const id = req.params.menuItemId;
  const updateObj = {};

  for (const key of Object.keys(req.body)) {
    updateObj[key.propName] = key.value;
  }

  MenuItem.update({ _id: id }, { $set: updateObj })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Item updated',
        request: {
          type: 'GET',
          url: `https://omiso.com/menu/${result._id}`,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

// Delete MenuItem by id in the database
exports.menuItems_delete_item = (req, res) => {
  const id = req.params.menuItemId;
  MenuItem.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Item deleted',
        // gives the possibility to create a new item
        request: {
          type: 'POST',
          url: 'https://omiso.com/menu/',
          body: {
            name: String,
            description: String,
            price: Number,
            category: String,
            quantity: Number,
            status: String,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
