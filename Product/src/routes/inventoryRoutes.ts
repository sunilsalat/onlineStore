import { Router } from "express";
import * as ProductController from "../controller/inventoryController";
const router = Router();

router.post("/product/create", ProductController.createProduct);
router.post("/product/all", ProductController.getAllProduct);
router.post("/category/all", ProductController.createCategory);
router.post("/category/create", ProductController.getAllProduct);

export default router;
