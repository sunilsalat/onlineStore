import mongoose, { Types } from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        paymentMethod: {
            type: String,
        },
        amount: {
            type: Number,
        },
        paymentStatus: {
            type: String,
            enum: ["CREATED", "CAPTURED", "REFUNDED", "TRANSFER"],
            default: "CREATED",
        },
        response: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export { Payment };
