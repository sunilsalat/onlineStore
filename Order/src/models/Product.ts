import mongoose, { Types } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "first name is required"],
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    productId: { type: Types.ObjectId },
    sku: { type: Number },
    productType: { type: String },
    price: { type: Number },
    seller: { type: String },
    thumbnail: { name: String, uri: String },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model("Product", ProductSchema);

export { Product };
