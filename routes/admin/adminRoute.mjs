import { Router } from "express";
import adminController from "../../controller/admin/admin-controller.mjs"

const router = Router();
router.get("/test", adminController.test);
router.get("/total-user",adminController.totalUsersCount)
router.get("/recent-users",adminController.recentUsers)
router.get("/total-properties", adminController.totalProperties);
router.get("/total-usersdet", adminController.totalUsers);
router.get("/all-properties", adminController.allProperties);
export default router;
