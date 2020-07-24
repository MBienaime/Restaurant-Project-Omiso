const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  idUser: { type: String, required: true }});

module.exports = mongoose.model('Order', oderSchema);