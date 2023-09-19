import { Request, Response } from "express";
import * as IDalInventory from "../dataaccess/inventoryService";
import { ProductVariant } from "../models/inventory/ProductVariant";

/* Product */
export const createProduct = async (req: Request, res: Response) => {
  const { data } = req.body;
  const categoryObj = await IDalInventory.findCategoryByFilter({
    _id: data.category_id,
  });
  if (!categoryObj) {
    throw new Error("Please select valid category to add product");
  }
  const obj = await IDalInventory.createProduct(data);
  res.status(201).json({ data: obj, msg: "User created" });
};

export const getAllProduct = async (req: Request, res: Response) => {
  const {} = req.body;
  const obj = await IDalInventory.findProductMultipleProductByFilter({});
  res.status(201).json({ data: obj, msg: "" });
};

/* Product Varinat */
export const addProductVariant = async (req: Request, res: Response) => {
  const { data } = req.body;
  const productObj = await IDalInventory.findProductByFilter({
    _id: data.productId,
  });
  if (productObj) {
    throw new Error("Please select valid prodouct to add variant");
  }
  const obj = await IDalInventory.createProductVariant(data);
  res.status(201).json({ data: "", msg: "Product variant added" });
};

/* Category */
export const createCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  const obj = await IDalInventory.createCategory(data);
  res.status(201).json({ data: obj, msg: "Category created" });
};

export const getAllCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  const obj = await IDalInventory.findMultipleCategoryByFilter({});
  res.status(201).json({ data: obj, msg: "" });
};
