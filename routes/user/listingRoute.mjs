import { Router } from "express";
import { createListing, deleteListing, updateListing } from "../../controller/user/listing-controller.mjs";
import { verifyUser } from "../../middleware/auth.mjs";



const route= Router()
route.post('/create',verifyUser,createListing)
route.delete('/delete/:id',verifyUser,deleteListing)
route.post('/update/:id',verifyUser,updateListing)
export default route