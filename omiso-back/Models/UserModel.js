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
  phone_number: { type: String, required: true },
  address: { type: String},
  postal_code: { type: Number},
  city: { type: String},
  role: { type: Boolean, required: true }, 
});
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model("User", userSchema);

