// import
const mongoose = require('mongoose');

// Schema defines the shape of the documents in the dataBase collection
const oderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_User: { type: String },
  lastName_User: { type: String, required: true },
  firstName_User: { type: String, required: true },
  phoneNumber_User: { type: String, required: true },
  email_User: { type: String, required: true },
  date_Order: { type: Date, required: true },
  total_Price: { type: Number, required: true },
  total_Items: { type: Number, required: true },
  order_Menu: { type: Array, required: true },
  validatedOrder: { type: Boolean, required: true },
  payment_id: { type: String, default: '', required: true },
});

// Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model('Order', oderSchema);
