// import
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema defines the shape of the documents in the dataBase collection
const oderSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  id_User: { type: Schema.ObjectId, ref: 'User', required: true },
  date_Order: { type: Date, required: true },
  total_Price: { type: Number },
  total_Items: { type: Number },
  order_Menu: [{ menu: { type: Schema.ObjectId, ref: 'Menu', required: true }, Number_MenuItem: { type: Number } }],
  payment_id: { type: String, default: '' },
  statusArchive: { type: Boolean, default: 'false' },
  comment: { type: String, default: '' },
});

// Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model('Order', oderSchema);
