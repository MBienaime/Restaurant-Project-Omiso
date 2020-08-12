const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
   id_User: { type: String,  },
  lastName_User: { type: String,  },
  firstName_User: { type: String,  },
  phoneNumber_User: { type: String,  },
  email_User: { type: String,  },
  date_Order : { type: Date,  },
  total_Price: { type : Number, },
  total_Items: { type : Number, },
  order_Menu: {type : Array},
  validatedOrder : { type : Boolean},
  payment_id:{ 
    type: String,
  default :'' }
  });

module.exports = mongoose.model('Order', oderSchema);