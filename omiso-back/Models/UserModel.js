const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  lastname: { type: String },
  firstname: { type: String },

  phone_number: { type: String },
  address: { type: String },
  postal_code: { type: Number },
  city: { type: String },
  role: { type: String },
  resetLink: {
    data: String,
    default: '',
  },
});
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('User', userSchema);
