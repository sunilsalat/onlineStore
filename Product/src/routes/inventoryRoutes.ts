import { Router } from "express";
import * as ProductController from "../controller/inventoryController";
import * as ReviewController from "../controller/reviewController";
const router = Router();

router.post("/product/create", ProductController.createProduct);
router.post("/product/all", ProductController.getAllProduct);
router.post("/product/update", ProductController.updateProduct);

router.post("/product/variant/create", ProductController.addProductVariant);
router.post("/product/variant/update", ProductController.updateProductVariant);
router.post("/product/variant/all", ProductController.getAllProductVariants);

router.post("/category/all", ProductController.getAllCategory);
router.post("/category/create", ProductController.createCategory);

router.post("/att/create", ProductController.createAttribute);
router.post("/att/all", ProductController.getAllAttribute);

router.post("/attopt/create", ProductController.createAttributeOptions);
router.post("/attopt/all", ProductController.getAllAttributeOptions);

router.post("/add", ProductController.addInventory);

router.post("/store/add", ProductController.addStore);
router.post("/review/add", ReviewController.addProductReview);

export default router;
