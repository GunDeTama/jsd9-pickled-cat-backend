/** @type {import('mongoose').SchemaTypeOptions} */
import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'order_id',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ['QR Code', 'บัตรเครดิต', 'โอนเงิน', 'เก็บเงินปลายทาง'],
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  payment_date: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = model('Payment', PaymentSchema);
