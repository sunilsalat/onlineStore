import mongoose from "mongoose";

const StoreProductSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Types.ObjectId,
        ref: "Store",
        required: [true, "Store id is required"],
    },
    productVariantId: {
        type: mongoose.Types.ObjectId,
        ref: "ProductVariant",
        required: [true, "Product variant id is required"],
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required"],
    },
    availableQty: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
    },
});

const StoreProduct = mongoose.model("StoreProduct", StoreProductSchema);

export { StoreProduct };
