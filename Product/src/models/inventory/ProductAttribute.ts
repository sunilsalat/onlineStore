import mongoose, { Schema } from "mongoose";

const ProductAttributeSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id required"],
    },
    sku: {
      type: Number,
      required: [true, "SKU id is required"],
    },
    attributeId: {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
    },
    attribute: {
      type: String,
    },
    attributeOptionId: {
      type: Schema.Types.ObjectId,
      ref: "AttributeOptions",
    },
    attributeOption: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductAttributeSchema.index(
  { sku: 1, attributeOptionId: 1 },
  { unique: true }
);

const ProductAttribute = mongoose.model(
  "ProductAttribute",
  ProductAttributeSchema
);

export { ProductAttribute };
