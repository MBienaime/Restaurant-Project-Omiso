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
  const OrderItem = new Orders({
    idUser: req.body.idUser,
  });

  OrderItem.save()
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => console.log(err.message));
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.remove({ _id: req.params.id })
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => console.log(err.message));
};
