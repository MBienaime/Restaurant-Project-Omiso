// Import models Data Base
const mongoose = require("mongoose");
const Order = require('../Models/OrderModel');

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => { res.status(500).json({error: err.message}); });
};

// Get Order by id

exports.getOrderById = (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => { res.status(500).json({error: err.message}); });
};

// Post Order

exports.postOrder = (req, res) => {
  
  const OrderItem = new Order({
    _id: new mongoose.Types.ObjectId(),
    idUser: req.body.idUser,
    OrderMenu: req.body.OrderMenu
  });

  OrderItem.save()
    .then((docs) => { res.status(201).json(docs); })
    .catch((err) => { res.status(500).json({error: err.message}); });
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => { res.status(500).json({ error: err.message }); });
};
