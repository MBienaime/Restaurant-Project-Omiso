const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lastName_User: { type: String, required: true },
  firstName_User: { type: String, required: true },
  phoneNumber_User: { type: String, required: true },
  email_User: { type: String, required: true },
  date_Order : { type: Date, required: true },
  total_Amount: { type : Number, required: true},
  order_Menu: {type : Array}
  });

module.exports = mongoose.model('Order', oderSchema);