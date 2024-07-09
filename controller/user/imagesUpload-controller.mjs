// import imagesUpload from "../../models/imagesUpload-model.mjs"

// const cloudinary=require("../../utils/cloudinary.mjs")

// export const uploadOnCloudinary=async(req,res,next)=>{

//     try {

//         let images=[...req.body.images]
//         let imagesBuffer=[]

//         for(let i=0;i<images.length;i++){
//             const result=await cloudinary.uploader.upload(images[i],{
//                 folder:"uploadimages"
//             })

//             imagesBuffer.push({

//             })
//         }
       

//         // const imagesupload=await imagesUpload.create();
//         res.status(201).json({
//             success:true,

//         })

//     } catch (error) {
        
//     }
// }