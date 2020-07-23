const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  status: Boolean,
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
