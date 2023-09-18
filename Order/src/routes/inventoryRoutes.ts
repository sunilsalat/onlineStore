import { Router } from "express";
import * as OrderController from "../controller/orderController";
const router = Router();

router.post("/Order/create", OrderController.createOrder);
router.post("/Order/all", OrderController.getAllOrder);

export default router;
