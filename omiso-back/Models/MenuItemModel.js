//Import
const mongoose = require("mongoose");

//Schema defines the shape of the documents in the dataBase collection
const menuItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  status: Boolean,
});


//Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model("MenuItem", menuItemSchema);
