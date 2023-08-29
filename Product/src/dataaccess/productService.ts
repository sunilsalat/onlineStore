import { Product } from "../models/inventory/Product";
import { ProductVariant } from "../models/inventory/ProductVariant";
import { StoreProduct } from "../models/inventory/StoreProduct";

export const createProduct = async (data) => {
  const productObj = await Product.create(data);
  return productObj;
};

export const getProduct = async (filters: any) => {
  const productObj = await Product.find();
  return productObj;
};
