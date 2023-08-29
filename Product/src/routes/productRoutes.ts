import { Router } from "express";
import * as ProductController from "../controller/productController";
const router = Router();

router.post("/create", ProductController.createProduct);
router.post("/all", ProductController.getAllProduct);

export default router;
