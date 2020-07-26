// Import models Data Base
const mongoose = require("mongoose");
const Order = require('../Models/OrderModel');

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})})};

// Post Order

exports.postOrder = (req, res) => {
  
  const OrderItem = new Order({
    _id: new mongoose.Types.ObjectId(),
    idUser: req.body.idUser,
    OrderMenu: req.body.OrderMenu
  });

  OrderItem.save()
<<<<<<< HEAD
    .then((docs) => { res.status(201).json(docs); })
    .catch((err) => { res.status(500).json({error: err.message}); });
=======
    .exec()
    .then((doc) => { res.status(201).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})});
>>>>>>> updateOrder
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
<<<<<<< HEAD
    .then((docs) => { res.status(200).json(docs); })
    .catch((err) => { res.status(500).json({ error: err.message }); });
=======
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})});
>>>>>>> updateOrder
};

//Update Order by id

exports.updateOrderById = (req, res) => {    
  Order.findById(req.params.id,(err,doc)=>{
      if (err){res.status(404).json({ error: err})}
        else{  

        doc.idUser= req.body.idUser;
        doc.OrderMenu= req.body.OrderMenu;
        
        doc.save()
          .then((docs) => { res.status(200).json(doc); })
          .catch((err) => { res.status(500).json({ error: err})});
        }
  })
   
};