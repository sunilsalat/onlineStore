import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  orderDate: {
    type: Date,
  },
  address: {
    type: String,
    required: [true, "phone is required"],
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
    enum: [
      "CREATED",
      "APPROVED_By_SELLER",
      "DISPATCHED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
    ],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export { Order };
