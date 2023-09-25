import { Request, Response } from "express";
import * as IDalInventory from "../dataaccess/inventoryService";
import { ProductVariant } from "../models/inventory/ProductVariant";
import mongoose from "mongoose";

/* Product */
export const createProduct = async (req: Request, res: Response) => {
  let { categoryId, name, description } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const categoryObj = await IDalInventory.findCategoryByFilter({
        _id: categoryId,
      });

      if (!categoryObj) {
        throw new Error("Please select valid category to add product");
      }

      const obj: any = await IDalInventory.createProduct(
        [
          {
            categoryId,
            name,
            description,
          },
        ],
        session
      );

      if (obj) {
        await IDalInventory.createProductVariant(
          [
            {
              productId: obj[0]._id,
              productName: obj[0].name,
              parentProductId: null,
            },
          ],
          session
        );
      }

      await session.commitTransaction();
      res.status(201).json({ data: obj, msg: "Product created" });
    });
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId, data } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const obj = await IDalInventory.updateProduct({ _id: productId }, data);
      if (obj) {
        await IDalInventory.updateProductVariant(
          { productId },
          { productName: data.name }
        );
      }
      await session.commitTransaction();
      res.status(200).json({ data: obj, msg: "Product updated" });
    });
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }
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
  const data = req.body;
  const obj = await IDalInventory.createCategory(data);
  res.status(201).json({ data: obj, msg: "Category created" });
};

export const getAllCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  const obj = await IDalInventory.findMultipleCategoryByFilter({});
  res.status(201).json({ data: obj, msg: "" });
};

/* Attribute */
export const createAttribute = async (req: Request, res: Response) => {
  const data = req.body;
  const obj = await IDalInventory.createAttribute(data);
  res.status(201).json({ data: obj, msg: "Attribute created" });
};

export const getAllAttribute = async (req: Request, res: Response) => {
  const {} = req.body;
  const obj = await IDalInventory.getAllAttributeByFilter({});
  res.status(201).json({ data: obj, msg: "" });
};

/* Attribute Options */
export const createAttributeOptions = async (req: Request, res: Response) => {
  const data = req.body;
  const obj = await IDalInventory.createAttributeOption(data);
  res.status(201).json({ data: obj, msg: "Attribute Option Created" });
};

export const getAllAttributeOptions = async (req: Request, res: Response) => {
  const { attributeId } = req.body;
  const obj = await IDalInventory.getAllAttributeOptionsByFilter({
    attributeId,
  });
  res.status(201).json({ data: obj, msg: "" });
};
