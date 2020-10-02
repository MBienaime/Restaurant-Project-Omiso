/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
// Imports
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
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
        message: 'Élément créé avec succès',
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
        });
      } else {
        res
          .status(404)
          .json({ message: 'Aucune entrée trouvée ' });
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
        message: 'Élément mis à jour',
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
        message: 'Élément supprimé',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
