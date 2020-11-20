/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
// Import models Data Base
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const { validationResult } = require('express-validator');
const Order = require('../Models/OrderModel');

// Configuration paypal
paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYMENT_CLIENT_ID,
  client_secret: process.env.PAYMENT_CLIENT_SECRET,
});

// Get all Order
exports.getOrder = (req, res) => {
  Order.find()
    .populate('id_User')
    .populate('order_Menu.menu')
    .then((doc) => { res.status(200).json(doc); })
    .catch((err) => { res.status(500).json({ error: err }); });
};

// Post Order
exports.postOrder = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const OrderItem = new Order({
    _id: new mongoose.Types.ObjectId(),
    id_User: req.dataToken.userId,
    date_Order: Date(),
    total_Items: req.body.Orders.menus.length,
    order_Menu: req.body.Orders.menus,
    comment: req.body.Orders.comment,
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
              return_url: 'https://omiso.com/',
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
              Order.findByIdAndUpdate(e._id, { payment_id: payment.id, total_Price })
                .then()
                .catch((err) => { res.status(500).json({ error: err }); });

              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                  res.json({ forwardLink: payment.links[i].href });
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
          res.status(200).json({ message: 'Paiement effectué avec succès' });
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

// Update Order
exports.updateOrderById = (req, res) => {
  Order.findById(req.params.id)
    .then((doc) => {
      doc.status = !doc.status;

      doc.save()
        .then((doc) => { res.status(200).json(doc); })
        .catch((err) => { res.status(500).json({ error: err }); });
    })
    .catch((err) => { res.status(404).json({ error: err }); });
};
