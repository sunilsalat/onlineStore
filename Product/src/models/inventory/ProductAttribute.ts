import mongoose, { Schema } from "mongoose";

const ProductAttributeSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id required"],
    },
    skuId: {
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
    valueId: {
      type: Schema.Types.ObjectId,
      ref: "AttributeValue",
    },
    value: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductAttributeSchema.index({ skdId: 1, valueId: 1 }, { unique: true });

const AttributeValue = mongoose.model("AttributeValue", ProductAttributeSchema);

export { AttributeValue };
