import { Request, Response } from "express";
import * as IDalInventory from "../dataaccess/inventoryService";

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
  const obj = await IDalInventory.getProduct({});
  res.status(201).json({ data: obj, msg: "" });
};

export const createCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  const obj = await IDalInventory.createCategory(data);
  res.status(201).json({ data: obj, msg: "" });
};

export const getAllCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  const obj = await IDalInventory.findMultipleCategoryByFilter(data);
  res.status(201).json({ data: obj, msg: "" });
};
