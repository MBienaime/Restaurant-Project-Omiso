const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idUser: { type: String, required: true },
  OrderMenu: {type : Object}
  });

module.exports = mongoose.model('Order', oderSchema);