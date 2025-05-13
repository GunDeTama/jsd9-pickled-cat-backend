import mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema({
  province: {
    type: String,
    required: [true, 'Province is required'],
  },
  sub_district: {
    type: String,
    required: [true, 'Sub district is required'],
  },
  district: {
    type: String,
    required: [true, 'District is required'],
  },
  postal_code: {
    type: String,
    maxlength: [5, 'Postal code cannot be more than 5 characters'],
    match: [/^\d{5}$/, 'Invalid postal code'],
  },
  additional_address: {
    type: String,
    maxlength: [500, 'Additional address cannot exceed 500 characters'],
  },
});

export const Address = mongoose.model('Address', addressSchema);
