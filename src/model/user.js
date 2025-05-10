const mongoose = require('mongoose');
const AddressSchema = require('./address');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true
  },
  lastname: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true
  },
  email: {
    type: String,
    maxlength: 100,
    minlength: 5,
    required: true,
    validate: {
      validator: v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: v => /^\d{9,10}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: AddressSchema,
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema); 