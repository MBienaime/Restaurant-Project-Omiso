// Import models Data Base
const mongoose = require("mongoose");
const Order = require('../Models/OrderModel');
const User = require("../Models/UserModel");
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', 
  'client_id': process.env.PAYMENT_CLIENT_ID,
  'client_secret': process.env.PAYMENT_CLIENT_SECRET
});

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
      id_User:req.dataToken.userId,
      lastName_User:user.lastname,
      firstName_User:user.firstname,
      phoneNumber_User:user.phone_number,
      email_User:user.email,
      date_Order:Date(),
      total_Price:5,
      total_Items:4,
      order_Menu:req.body.order
    });
  
    OrderItem.save()    
      .then((doc) => { 

        /////

        const create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": "https://omiso.com/order/checkout-success",
              "cancel_url": "https://omiso.com/cancel"
          },
          "transactions": [{

              "amount": {
                  "currency": "EUR",
                  "total": doc.total_Price
              },
              "description": "Sushi"
          }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
          console.log(payment.links);          
          for(let i = 0; i < payment.links.length; i++){
            if (payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href);
            }
          }
        }
    });

        /////

      })
      .catch((err) => { res.status(500).json({ error: err})});
    
    

  })
  .catch((err)=>{res.status(404).json({ error: err})})  



};

//chekout success

exports.checkout_success = (req,res)=>{  

 const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "EUR",
            "total": "5.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {        
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
  });
}


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