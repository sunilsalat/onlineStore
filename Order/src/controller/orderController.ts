import { Request, Response } from "express";
import * as IDalOrder from "../dataaccess/orderService";

export const createOrder = async (req: Request, res: Response) => {
  const { data } = req.body;

  const obj = await IDalOrder.createOrder(data);
  res.status(201).json({ data: obj, msg: "Order created" });
};

export const getAllOrder = async (req: Request, res: Response) => {
  const {} = req.body;
  const obj = await IDalOrder.findMultipleOrderByFilter({});
  res.status(201).json({ data: obj, msg: "" });
};
