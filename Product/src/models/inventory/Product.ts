import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "first name is required"],
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: [true, "category id is required"],
        },
        description: {
            type: String,
        },
        avgRatings: { type: Number, default: 0 },
        countOfReviews: { type: Number, default: 0 },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export { Product };
