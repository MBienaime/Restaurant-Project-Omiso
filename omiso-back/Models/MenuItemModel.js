//Import
const mongoose = require("mongoose");

//Schema defines the shape of the documents in the dataBase collection
const menuItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true }
});

//Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model("MenuItem", menuItemSchema);
