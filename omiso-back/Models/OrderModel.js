const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  idUser: { type: String, required: true },
  OrderMenu: {type : Object,}
  });

module.exports = mongoose.model('Order', oderSchema);