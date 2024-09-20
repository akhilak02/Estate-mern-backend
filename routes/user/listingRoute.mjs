import { Router } from "express";
import { booking, createListing, deleteListing, getListing,getListings, updateListing } from "../../controller/user/listing-controller.mjs";
import { verifyUser } from "../../middleware/auth.mjs";



const route= Router()
route.post('/create',verifyUser,createListing)
route.delete('/delete/:id',verifyUser,deleteListing)
route.post('/update/:id',verifyUser,updateListing)
route.get('/get/:id',getListing)
route.get('/get',getListings)
route.post('/book/:id',booking)
export default route