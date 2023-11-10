import { Router } from "express";
import * as OrderController from "../controller/orderController";
import { Order } from "../models/Order";
const router = Router();

router.post("/create", OrderController.createOrder);
router.post("/all", OrderController.getAllOrder);
router.post("/update", OrderController.updateOrderStatus);

export default router;
