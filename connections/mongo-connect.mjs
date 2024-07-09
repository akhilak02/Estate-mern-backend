import mongoose from "mongoose";

const connectDB=async(URI)=>{
    try{
        await mongoose.connect(URI)
        console.log('database connected successfully');
    }catch(err){
        console.log(err);
    }

}

export default connectDB