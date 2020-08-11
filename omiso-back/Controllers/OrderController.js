// Import models Data Base
const mongoose = require("mongoose");
const Order = require('../Models/OrderModel');
const User = require("../Models/UserModel");

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})})};

// Post Order

exports.postOrder = (req, res) => {

  User.findById(req.dataToken.userId)
  .exec()
  .then((user)=>{

    

    const OrderItem = new Order({
      _id: new mongoose.Types.ObjectId(),
      lastName_User:user.lastname,
      firstName_User:user.firstname,
      phoneNumber_User:user.phone_number,
      email_User:user.email,
      date_Order:Date(),
      total_Amount:5,
      order_Menu:req.body.order
    });
  
    OrderItem.save()    
      .then((doc) => { res.status(201).json(doc); })
      .catch((err) => { res.status(500).json({ error: err})});

  })
  .catch((err)=>{res.status(404).json({ error: err})})  

};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})});
};

//Get Order By id

exports.getOrderById = (req,res)=>{
  Order.findById(req.params.id)
  .exec()
  .then((doc)=>{res.status(200).json(doc)})
  .catch((err)=>{res.status(404).json({ error: err})})

};

exports.updateOrderById = (req, res) => {
  Order.findById(req.params.id)
  .then((doc)=>{
    doc.idUser= req.body.idUser;
    doc.OrderMenu= req.body.OrderMenu;      
    doc.save()
      .then((doc) => { res.status(200).json(doc); })
      .catch((err) => { res.status(500).json({ error: err})});
  })
  .catch((err)=>{res.status(404).json({ error: err})})
};