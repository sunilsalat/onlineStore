import { Attribute } from "../models/inventory/Attribute";
import { AttributeValue } from "../models/inventory/AttributeValue";
import { Category } from "../models/inventory/Category";
import { Product } from "../models/inventory/Product";
import { ProductVariant } from "../models/inventory/ProductVariant";
import { StoreProduct } from "../models/inventory/StoreProduct";

/* Product */
export const createProduct = async (data: any) => {
  const productObj = await Product.create(data);
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
export const createProductVariant = async (data: any) => {
  const productObj = await ProductVariant.create(data);
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
  const obj = await AttributeValue.create(data);
  return obj;
};

export const getAllAttributeOptionsByFilter = async (filter: any) => {
  const obj = await AttributeValue.find(filter);
  return obj;
};
