import { Router } from "express";
import authController from "../../controller/admin/auth-controller.mjs";

const router = Router();

router.post("/login", authController.login);
router.post("/create",authController.createAdmin)

export default router;
