import { model, Schema, SchemaTypes } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const OrderItemSchema = new Schema({
  product_id: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: SchemaTypes.Int32,
    min: 1,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  product_option: {
    type: SchemaTypes.Int32,
    min: 0,
    max: 2,
    required: true,
  },
  product_size: {
    type: SchemaTypes.Int32,
    min: 0,
    max: 2,
    required: true,
  },
  discount: {
    type: Number,
    min: 0,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
});

const OrderSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      ref: 'User',
      required: false,
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
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      required: true,
    },
    order_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: 'order_at', updatedAt: 'updated_at' },
  },
);

const Order = model('Order', OrderSchema);

export { Order, OrderItemSchema };
