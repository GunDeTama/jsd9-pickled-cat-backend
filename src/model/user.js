import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addressSchema } from './Address.js';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: true,
  },
  email: {
    type: String,
    maxlength: 100,
    minlength: 5,
    required: true,
    validate: {
      validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => /^\d{9,10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: addressSchema,
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const User = mongoose.model('User', UserSchema);
