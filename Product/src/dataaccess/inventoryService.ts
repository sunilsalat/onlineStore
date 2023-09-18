import { Category } from "../models/inventory/Category";
import { Product } from "../models/inventory/Product";
import { ProductVariant } from "../models/inventory/ProductVariant";
import { StoreProduct } from "../models/inventory/StoreProduct";

export const createProduct = async (data: any) => {
  const productObj = await Product.create(data);
  return productObj;
};

export const getProduct = async (filters: any) => {
  const productObj = await Product.find();
  return productObj;
};

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
