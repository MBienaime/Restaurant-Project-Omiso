// Import
const mongoose = require('mongoose');

// Schema defines the shape of the documents in the dataBase collection
const menuItemSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: ['Plat', 'Boisson', 'Entree', 'Dessert'] },
  urlImage: { type: String },
});

// Converts menuItemSchema into a Model + exports it
module.exports = mongoose.model('Menu', menuItemSchema);
