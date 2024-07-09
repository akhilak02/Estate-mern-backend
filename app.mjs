
import express from "express"
import mongoose from "mongoose";
import  { configDotenv } from 'dotenv'
import userRouter from './routes/user/userRouter.mjs'
import authRoute from'./routes/user/authRoute.mjs'
import listingRoute from './routes/user/listingRoute.mjs'
import connectDB from "./connections/mongo-connect.mjs";
import morgan from "morgan";
import cors from  "cors"
import { handleErr } from "./middleware/errorHandle.mjs";
import path from "path";
import { upload } from "./middleware/multer-middleware.mjs";
import imagesUpload from "./models/imagesUpload-model.mjs";


import { v2 as cloudinary } from "cloudinary";


const app=express()

configDotenv()
connectDB(process.env.DATA_BASE_URI);
app.set("views", path.join(".", "views"));
app.set("view engine", "ejs");
app.use(cors())
app.use(morgan("dev"))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:false}))
app.use('/backend/user',userRouter)
app.use('/backend/auth',authRoute)
app.use('/backend/listing',listingRoute)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});
app.post('/backend/upload-images',upload.array('imageUrls',12),async(req,res)=>{
  console.log(req.body);
  console.log(req.files);
  // let result= imagesUpload.create({
  // imageUrls:req.files
  // })
  // if(result){
   
  //   res.json({success:true,message:"uploaded successfully"})
  // }else{
  //    res.json({ success: false, message: " uploaded Error " });
  // }
     

})
app.use(handleErr);


mongoose.connection.once("open",()=>{
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
})

export default app