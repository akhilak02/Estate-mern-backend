import { Router } from "express";
import test, { deleteUser, updateUser } from "../../controller/user/user-controller.mjs";
import { verifyUser } from "../../middleware/auth.mjs";
//create test api route
const route = Router();

route.get("/test", test);
route.post("/update/:id", verifyUser, updateUser);
route.delete("/delete/:id",verifyUser,deleteUser)

export default route;
