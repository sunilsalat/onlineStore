import { Types } from "mongoose";
import { Attribute } from "../models/inventory/Attribute";
import { AttributeOption } from "../models/inventory/AttributeOptions";
import { Category } from "../models/inventory/Category";
import { Product } from "../models/inventory/Product";
import { ProductAttribute } from "../models/inventory/ProductAttribute";
import { ProductVariant } from "../models/inventory/ProductVariant";
import { StoreProduct } from "../models/inventory/StoreProduct";

/* Product */
export const createProduct = async (data: any, session?: any) => {
  const productObj = await Product.create(data, { session: session });
  return productObj;
};

export const updateProduct = async (filter: any, data: any) => {
  const productObj = await Product.findOneAndUpdate(filter, data);
  return productObj;
};

export const findProductByFilter = async (filters: any) => {
  const productObj = await Product.findOne(filters);
  return productObj;
};

export const findProductMultipleProductByFilter = async (filters: any) => {
  const productObj = await Product.find(filters);
  return productObj;
};

/* Product Variants */
export const createProductVariant = async (data: any, session?: any) => {
  const productObj = await ProductVariant.create(data, { session: session });
  return productObj;
};

export const getProductVariants = async (filter: any) => {
  const { productId } = filter;
  let pipeline = [
    { $match: { parentProductId: new Types.ObjectId(productId) } },
    {
      $lookup: {
        from: "productattributes",
        localField: "sku",
        foreignField: "sku",
        as: "attribute_detail",
      },
    },
    // { $project: {} },
  ];

  const obj = await ProductVariant.aggregate(pipeline);
  return obj;
};

export const createProductAttributes = async (data: any, session?: any) => {
  const productAttribute = await ProductAttribute.create(data, {
    session: session,
  });
  return productAttribute;
};

export const updateSingleProductvariant = async (
  filter: any,
  data: any,
  session?: any
) => {
  const productAttribute = await ProductVariant.findOneAndUpdate(filter, data, {
    session: session,
  });
  return productAttribute;
};

export const updateProductVariant = async (
  filter: any,
  data: any,
  session?: any
) => {
  const productObj = await ProductVariant.updateMany(filter, data, { session });
  return productObj;
};

/*  Category  */
export const createCategory = async (data: any) => {
  const obj = await Category.create(data);
  return obj;
};

export const findCategoryByFilter = async (filter: any) => {
  const obj = await Category.findOne(filter);
  return obj;
};

export const findMultipleCategoryByFilter = async (filter: any) => {
  const obj = await Category.find(filter);
  return obj;
};

/* Attribute */
export const createAttribute = async (data: any) => {
  const obj = await Attribute.create(data);
  return obj;
};

export const getAllAttributeByFilter = async (filter: any) => {
  const obj = await Attribute.find(filter);
  return obj;
};

/* Attribute Options */
export const createAttributeOption = async (data: any) => {
  const obj = await AttributeOption.create(data);
  return obj;
};

export const getAttributeOption = async (filter: any) => {
  const obj = await AttributeOption.findOne(filter).populate([
    { path: "attributeId" },
  ]);
  return obj;
};

export const getAllAttributeOptionsByFilter = async (filter: any) => {
  const obj = await AttributeOption.find(filter);
  return obj;
};
