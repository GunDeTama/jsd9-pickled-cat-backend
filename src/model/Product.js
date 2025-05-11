import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  description: { type: String, minlength: 20, maxlength: 300, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  category: {
    type: String,
    enum: [
      'อาหารแมวพรีเมียม',
      'ของเล่นแมว',
      'ที่นอนแมว',
      'เสื้อแมว',
      'ของตกแต่งบ้าน',
      'ของขวัญแมวดองเกลือ',
    ],
    required: true,
  },
  option: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) =>
        arr.length >= 1 &&
        arr.length <= 3 &&
        arr.every((url) =>
          /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url),
        ),
      message:
        'Each image must be a valid image URL and total must be between 1 and 3.',
    },
  },
});

export const Product = model('Product', ProductSchema);
