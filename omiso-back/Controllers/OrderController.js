// Import models Data Base

const Order = require('../Models/OrderModel');

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => console.log(err.message));
};

// Post Order

exports.postOrder = (req, res) => {
console.log(req.body.OrderMenu);
  const OrderItem = new Order({
    idUser: req.body.idUser,
    OrderMenu: req.body.OrderMenu
  });

  OrderItem.save()
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => console.log(err.message));
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => console.log(err.message));
};
