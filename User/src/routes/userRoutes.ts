import { Router } from "express";
import * as UserController from "../controller/userController";
const router = Router();

router.post("/create", UserController.createUser);
router.post("/all", UserController.getAllUser);

export default router;
