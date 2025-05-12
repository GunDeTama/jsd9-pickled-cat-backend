import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  additional: {
    type: String,
    maxlength: 500,
  },
  sub_district: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    maxlength: 5,
    validate: {
      validator: (v) => /^\d{5}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid postal code! Must be 5 digits`,
    },
  },
});

export const Address = mongoose.model('Address', addressSchema);
export { addressSchema };
