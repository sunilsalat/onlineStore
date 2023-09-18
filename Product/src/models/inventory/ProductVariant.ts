import mongoose from "mongoose";

const ProductVarinatSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product Id required"],
  },
  sku: {
    type: String,
    required: [true, "sku is required"],
  },
  costPrice: { type: Number },
  salePrice: { type: Number },
  offeredPrice: { type: Number },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  weight: {
    type: Number,
  },
  volumetricWeight: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
});

const ProductVariant = mongoose.model("ProductVariant", ProductVarinatSchema);

export { ProductVariant };
