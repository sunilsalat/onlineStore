import { Router } from "express";
import * as OrderController from "../controller/orderController";
const router = Router();

router.post("/create", OrderController.createOrder);
router.post("/all", OrderController.getAllOrder);

export default router;
