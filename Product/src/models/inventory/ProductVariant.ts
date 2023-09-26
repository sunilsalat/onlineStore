import mongoose, { Models, Schema } from "mongoose";

const ProductVariantSchema: Schema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product Id required"],
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    parentProductId: {
      type: Schema.Types.Mixed,
    },
    sku: {
      type: Number,
      // required: [true, "sku is required"],
    },
    costPrice: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    volumetricWeight: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

ProductVariantSchema.index({ sku: 1 }, { unique: true });

ProductVariantSchema.pre("save", async function () {
  // find last sku and inc by one
  const lastSku = await this.model("ProductVariant")
    .find({})
    .sort({ createdAt: -1 })
    .limit(1);
  if (lastSku && lastSku[0]?.sku !== undefined) {
    this.sku = lastSku[0].sku + 1;
  }
  this.sku = 0;
});

const ProductVariant = mongoose.model("ProductVariant", ProductVariantSchema);

export { ProductVariant };
