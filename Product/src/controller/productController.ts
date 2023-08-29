import { Request, Response } from "express";
import * as IDalProduct from "../dataaccess/productService";

export const createProduct = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, dob } = req.body;
  const obj = await IDalProduct.createProduct({
    firstName,
    lastName,
    email,
    phone,
    dob,
  });

  res.status(201).json({ data: obj, msg: "User created" });
};

export const getAllProduct = async (req: Request, res: Response) => {
  const {} = req.body;
  const obj = await IDalProduct.getProduct({});
  res.status(201).json({ data: obj, msg: "" });
};
