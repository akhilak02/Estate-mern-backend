import Listing from "../../models/listing-model.mjs";

export const createListing=async(req,res)=>{
    try {
      
          
    const listing = await Listing.create(req.body);
   
    res.json({success:true,listing})
    } catch (error) {
       console.log(error); 
       res.json({success:false,err_msg:"internal server error"})
    }

}
