// Import
const mongoose = require("mongoose");

// Schema defines the shape of the documents in the dataBase Collection
const menuItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: ["plat", "boisson", "entree", "dessert"],
  },
  urlImage: { type: String },
});

// Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model("Menu", menuItemSchema);
