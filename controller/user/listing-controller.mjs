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


export const getListing=async(req,res)=>{
    try {
        const listing=await Listing.findById(req.params.id)
         if (!listing) {
           return res.json({ success: false, err_msg: "Listing not found" });
         }
         res.json({success:true,listing})
    } catch (error) {
        
    }
}

export const getListings=async(req,res)=>{
    try {

        const limit=parseInt(req.query.limit)||9
        const startIndex=parseInt(req.query.startIndex)||0
        let offer=req.query.offer

        if(offer===undefined||offer=='false'){
            offer={$in:[false,true]}
        }

        let furnished=req.query.furnished

        if(furnished===undefined||furnished==='false'){
            furnished={$in:[false,true]}
        }

        let parking=req.query.parking

        if(parking===undefined||parking==='false'){
            parking={$in:[false,true]}
        }

        let type=req.query.type

        if(type===undefined||type==='all'){
            type={$in:['sale','rent']}
        }

        const searchTerm=req.query.searchTerm||'';

        const sort=req.query.sort||'createdAt'

        const order=req.query.order||'desc'

        const listings=await Listing.find({
          name:{$regex:searchTerm,$options:'i'},
            offer,furnished,parking,type
        }).sort({[sort]:order}).limit(limit).skip(startIndex)
        return res.json({success:true,listings})
        
    } catch (error) {
    console.log(error);
    res.json({ success: false, err_msg: "internal server error" });
    }
}