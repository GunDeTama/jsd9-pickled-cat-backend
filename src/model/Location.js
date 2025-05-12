import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    sub_district: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    postal_code: { type: String, required: true },
  },
  { versionKey: false },
);

const Location = mongoose.model('Location', LocationSchema);
export default Location;
