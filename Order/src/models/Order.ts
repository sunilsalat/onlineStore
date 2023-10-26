import mongoose, { Schema } from "mongoose";

const OrderItems = new mongoose.Schema({
    productId: Schema.Types.ObjectId,
    variantId: Schema.Types.ObjectId,
    sku: Number,
    itemName: String,
    itemPrice: Number,
    itemQty: Number,
});

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
        required: [true, "address is required"],
    },
    phone: {
        type: Number,
    },
    status: {
        type: String,
        enum: [
            "CREATED",
            "APPROVED_BY_SELLER",
            "DISPATCHED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED",
        ],
        default: "CREATED",
    },
    items: [OrderItems],
    isPaid: {
        type: Boolean,
        default: false,
    },
});

const Order = mongoose.model("Order", OrderSchema);

export { Order };
