import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        orderAmount: {
            type: Number,
        },
        orderItems: {},
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", OrderSchema);

export { Order };
