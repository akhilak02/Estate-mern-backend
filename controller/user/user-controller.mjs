
import User from "../../models/user-model.mjs";

const test=(req,res)=>{
    return res.send("iam server Api route is working")
}
export default test


export const updateUser=async(req,res,next)=>{
    // if (req.user.id !== req.params.id)
    //   return res.json({
    //     success: false,
    //     err_msg: "you can only update your own account",
    //   });
     
    try {
        
       
       await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            avatar:req.body.avatar,

        }
       },{new:true})
       const validUser=await User.findById(req.params.id).select('-password')
       res.json({
        success:true,validUser
       })
        
    } catch (error) {
       console.log(error); 
           return res.json({
             success: false,
             err_msg: "internal server error",
           });
    }
}

export const deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id,{
            $deleteOne:{
                avatar:req.body.avatar,
              username:req.body.username,
              email:req.body.email

            }
        })
        res.json({success:true ,})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,err_msg:"internal server error"})
    }

}