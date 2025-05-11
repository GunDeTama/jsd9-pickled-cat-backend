import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const OrderItemSchema = new Schema({
  product_id: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  price_option: {
    type: String,
    enum: ["option1", "option2", "option3"],
    required: true,
  },
  product_size: {
    type: String,
    enum: ["option1", "option2", "option3"],
    required: true,
  },
});

const OrderSchema = new Schema({
  order_id: {
    type: ObjectId,
    unique: true,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  order_items: {
    type: [OrderItemSchema],
    required: true,
  },
  total_price: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    required: true,
  },
  order_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, {
  timestamps: { createdAt: 'order_at', updatedAt: 'updated_at' },
});


const Order = model("Order", OrderSchema);

export default {Order, OrderItemSchema };

