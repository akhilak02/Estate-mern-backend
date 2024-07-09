import Listing from "../../models/listing-model.mjs";

export const createListing=async(req,res)=>{
    try {
    const listing=await Listing.create({
        name:req.body.name,
        description:req.body.description,
        address:req.body.address,
        regularPrice:req.body.regularPrice,
        discountPrice:req.body.discountPrice,
        offer:req.body.offer,
        bathrooms:req.body.bathrooms,
        bedrooms:req.body.bedrooms,
        parking:req.body.parking,
        type:req.body.type,
        furnished:req.body.furnished,
        userRef:req.body.userRef,
        imageUrls:req.body.imageUrls,

    })
    res.json({success:true,listing})
    } catch (error) {
       console.log(error); 
       res.json({success:false,err_msg:"internal server error"})
    }

}