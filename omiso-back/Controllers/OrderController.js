/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
// Import models Data Base
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const Order = require('../Models/OrderModel');
const User = require('../Models/UserModel');
const Menu = require('../Models/OrderModel');

// Configuration paypal
paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYMENT_CLIENT_ID,
  client_secret: process.env.PAYMENT_CLIENT_SECRET,
});

// Get Order

exports.getOrder = (req, res) => {
  Order.find()
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// Post Order

exports.postOrder = (req, res) => {
  const OrderItem = new Order({
    _id: new mongoose.Types.ObjectId(),
    id_User: req.dataToken.userId,
    date_Order: Date(),
    // total_Price,
    total_Items: req.body.order_Menu.length,
    order_Menu: req.body.order_Menu,
  });

  OrderItem
    .save()
    .then((o) => {
      Order.findById(o._id)
        .populate('id_User')
        .populate('order_Menu.menu')
        .then((e) => {
          const total_Price = e.order_Menu.map((selection) => selection.Number_MenuItem * selection.menu.price)
            .reduce((total, number) => total + number, 0).toFixed(2);

          const create_payment_json = {
            intent: 'sale',
            payer: {
              payment_method: 'paypal',
            },
            redirect_urls: {
              return_url: 'https://omiso.com/commande/checkout-success',
              cancel_url: 'https://omiso.com/commande/cancel',
            },
            transactions: [{

              amount: {
                currency: 'EUR',
                total: total_Price,
              },
              description: 'Sushi',
            }],
          };

          paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
              throw error;
            } else {
              Order.findByIdAndUpdate(e._id, { payment_id: payment.id })
                .then()
                .catch((err) => { res.status(500).json({ error: err }); });

              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                  res.status(302).redirect(payment.links[i].href);
                }
              }
            }
          });
        })
        .catch((err) => { res.status(500).json({ error: err }); });
    })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// chekout success

exports.checkout_success = (req, res) => {
  const payerId = req.query.PayerID;
  const { paymentId } = req.query;

  Order.find({ payment_id: paymentId })
    .exec()
    .then((doc) => {
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [{
          amount: {
            currency: 'EUR',
            total: doc[0].total_Price,
          },
        }],
      };

      paypal.payment.execute(paymentId, execute_payment_json, (error) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json({ message: 'success' });
        }
      });
    })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// checkout cancel

exports.checkout_cancel = (req, res) => {
  res.redirect('/');
};

// Delete Order

exports.deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// Get Order By id

exports.getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .exec()
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(404).json({ error: err }); });
};

exports.updateOrderById = (req, res) => {
  Order.findById(req.params.id)
    .then((doc) => {
      doc.idUser = req.body.idUser;
      doc.OrderMenu = req.body.OrderMenu;
      doc.save()
        .then((doc) => { res.status(200).json(doc); })
        .catch((err) => { res.status(500).json({ error: err }); });
    })
    .catch((err) => { res.status(404).json({ error: err }); });
};
