import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { config } from '../configs/env.js';
import { addressSchema } from './Address.js';

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      match: [/^[a-zA-Z]{2,50}$/, 'Invalid firstname'],
      maxlength: [50, 'Firstname cannot be more than 50 characters'],
      minlength: [2, 'Firstname cannot be less than 2 characters'],
      required: [true, 'Firstname is required'],
      trim: true,
      type: String,
    },
    lastname: {
      match: [/^[a-zA-Z]{2,50}$/, 'Invalid lastname'],
      maxlength: [50, 'Lastname cannot be more than 50 characters'],
      minlength: [2, 'Lastname cannot be less than 2 characters'],
      required: [true, 'Lastname is required'],
      trim: true,
      type: String,
    },
    email: {
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'],
      required: [true, 'Email is required'],
      trim: true,
      type: String,
      unique: true,
    },
    password: {
      maxlength: [32, 'Password cannot be more than 32 characters'],
      minlength: [8, 'Password cannot be less than 8 characters'],
      required: [true, 'Password is required'],
      type: String,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\d{9,10}$/, 'Invalid phone number'],
    },
    address: addressSchema,
    role: {
      default: 'customer',
      enum: {
        message: 'Invalid account role',
        values: ['admin', 'customer'],
      },
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error(error);
  }
});

/** @param {string} candidatePassword */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(String(candidatePassword), this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN },
  );
};

export const User = mongoose.model('User', UserSchema);
