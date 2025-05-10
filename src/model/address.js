const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  additional: {
    type: String,
    maxlength: 500
  },
  sub_district: {
    type: String
  },
  district: {
    type: String
  },
  province: {
    type: String
  },
  postal_code: {
    type: String,
    maxlength: 5,
    validate: {
      validator: v => /^\d{5}$/.test(v),
      message: props => `${props.value} is not a valid postal code!`
    }
  }
});

module.exports = AddressSchema; 