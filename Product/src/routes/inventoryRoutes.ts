import { Router } from "express";
import * as ProductController from "../controller/inventoryController";
const router = Router();

router.post("/product/create", ProductController.createProduct);
router.post("/product/all", ProductController.getAllProduct);

router.post("/product/variant/create", ProductController.addProductVariant);

router.post("/category/all", ProductController.createCategory);
router.post("/category/create", ProductController.getAllProduct);

router.post("/att/create", ProductController.createAttribute);
router.post("/att/all", ProductController.getAllAttribute);

router.post("/attopt/create", ProductController.createAttributeOptions);
router.post("/attopt/all", ProductController.getAllAttributeOptions);

export default router;
