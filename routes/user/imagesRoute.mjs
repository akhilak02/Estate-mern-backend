import { Router } from "express";
import { imageUpload } from "../../controller/user/imagesUpload-controller.mjs";


const route = Router();
route.post("/upload-images",imageUpload)

export default route;