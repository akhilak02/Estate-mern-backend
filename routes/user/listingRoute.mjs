import { Router } from "express";
import { createListing } from "../../controller/user/listing-controller.mjs";
import { verifyUser } from "../../middleware/auth.mjs";

const route= Router()
route.post('/create',verifyUser,createListing)

export default route