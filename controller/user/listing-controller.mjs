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

export const deleteListing=async(req,res)=>{
    const listing= await Listing.findById(req.params.id);
    if(!listing){
        return res.json({success:false,err_msg:"Listing not found"})
    }
    try {

        await Listing.findByIdAndDelete(req.params.id)
        res.json({success:true })
        
    } catch (error) {
        
    }
}

export const updateListing=async(req,res)=>{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.json({ success: false, err_msg: "Listing not found" });
    }
    try {
    const updatedListing= await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
       res.json({success:true,updatedListing}) 
    } catch (error) {
      console.log(error);  
      res.json({success:false,err_msg:"internal server error"})
    }
}
