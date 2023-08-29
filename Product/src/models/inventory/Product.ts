import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "first name is required"],
  },
  category: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export { Product };
