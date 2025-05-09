import { Schema, model } from "mongoose";

const OrderSchema = new Schema({});

export const Order = model("Order", OrderSchema);
