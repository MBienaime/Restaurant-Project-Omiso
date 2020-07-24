const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  phone_number: { type: Number, required: true },
  address: { type: String, required: true },
  postal_code: { type: Number, required: true },
  city: { type: String, required: true },
  orders: mongoose.Schema.Types.ObjectId,
  role: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
