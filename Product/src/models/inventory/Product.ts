import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "first name is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: [true, "category id is required"],
  },
  description: {
    type: String,
  },
  images: [
    {
      fileName: String,
      uri: String,
    },
  ],
  isActive: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export { Product };
