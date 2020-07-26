// Import models Data Base

const Order = require('../Models/OrderModel');

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})})};

// Post Order

exports.postOrder = (req, res) => {
console.log(req.body.OrderMenu);
  const OrderItem = new Order({
    idUser: req.body.idUser,
    OrderMenu: req.body.OrderMenu
  });

  OrderItem.save()
    .exec()
    .then((doc) => { res.status(201).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})});
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err})});
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