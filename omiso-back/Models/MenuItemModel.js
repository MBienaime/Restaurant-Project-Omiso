//Import
const mongoose = require("mongoose");

//Schema defines the shape of the documents in the dataBase collection
const menuItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  quantity: { type: Number },
  status: { type: String},
  image: { type: String, required: true }
});

//Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model("MenuItem", menuItemSchema);
