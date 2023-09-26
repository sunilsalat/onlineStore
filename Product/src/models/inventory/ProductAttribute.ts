import mongoose, { Schema } from "mongoose";

const ProductAttributeSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id required"],
    },
    sku: {
      type: String,
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

ProductAttributeSchema.index({ skdId: 1, valueId: 1 }, { unique: true });

const ProductAttribute = mongoose.model(
  "ProductAttribute",
  ProductAttributeSchema
);

export { ProductAttribute };
