
import express from "express"
import mongoose from "mongoose";
import  { configDotenv } from 'dotenv'
import userRouter from './routes/user/userRouter.mjs'
import authRoute from'./routes/user/authRoute.mjs'
import listingRoute from './routes/user/listingRoute.mjs'
import imagesRoute from './routes/user/imagesRoute.mjs'
import connectDB from "./connections/mongo-connect.mjs";
import morgan from "morgan";
import cors from  "cors"
import { handleErr } from "./middleware/errorHandle.mjs";
import path from "path";
import { upload } from "./middleware/multer-middleware.mjs";



const app=express()

configDotenv()
connectDB(process.env.DATA_BASE_URI);
app.set("views", path.join(".", "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("dev"))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
// app.use(express.static(path.join( "public")));
app.use('/backend/user',userRouter)
app.use('/backend/auth',authRoute)
app.use('/backend/createlisting',listingRoute)
// app.use("/backend/uploads",imagesRoute);
// app.use(
//   "/backend/uploads/upload-images",
//   upload.array("imageUrls", 6),
//   (req, res) => {
//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, err_msg: "No files were uploaded" });
//     }
//     console.log(req.files);
//       console.log("files uploaded successfully", req.files);
//     res.json({ success: true });
    
//   }
// );

app.post("/backend/uploads/upload-images", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    const filePaths = req.files.map((file) => `/temp/${file.filename}`);
    res.json({success:true, imageUrls: filePaths });
  });
});

app.use(handleErr);


mongoose.connection.once("open",()=>{
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
})

export default app