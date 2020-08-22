// import
const mongoose = require('mongoose');

// Schema defines the shape of the documents in the dataBase collection
const userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

  },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String },
  postal_code: { type: String },
  city: { type: String },
  role: { type: String, required: ['admin', 'client', 'employé'], default: 'client' },
  resetLinkToken: { type: String, default: ' ' },
});

mongoose.set('useCreateIndex', true);
// Converts UserSchema into a Model + exports it
module.exports = mongoose.model('User', userSchema);
