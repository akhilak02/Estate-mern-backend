import Listing from "../../models/listing-model.mjs";
import User from "../../models/user-model.mjs";


const test = (req, res) => {
  return res.send("iam server Api route is working admin");
};


 const totalUsersCount = async (req, res) => {
  try {
    const totalUsersCount = await User.estimatedDocumentCount(); // Counts all users in the collection
    
    
    return res.status(200).json({ success: true, totalUsersCount });
  } catch (error) {
    console.error("Error fetching total users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const recentUsers=async(req,res)=>{
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10); // Adjust the limit to the number of recent users you want
    return res.status(200).json({ success: true, recentUsers });

    
  } catch (error) {
     console.error("Error fetching recent users:", error);
     return res
       .status(500)
       .json({ success: false, message: "Internal server error" });
    
  }
}

const totalProperties=async(req,res)=>{
  try {
     const totalProperties = await Listing.estimatedDocumentCount(); // Counts all users in the collection
    return res.status(200).json({ success: true, totalProperties });
    
  } catch (error) {
       console.error("Error fetching total users:", error);
       return res
         .status(500)
         .json({ success: false, message: "Internal server error" });
  }
}

const totalUsers=async(req,res)=>{
   try {
     const allUsers = await User.find()
       .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      
     return res.status(200).json({ success: true, allUsers });
   } catch (error) {
     console.error("Error fetching recent users:", error);
     return res
       .status(500)
       .json({ success: false, message: "Internal server error" });
   }

}
const allProperties=async(req,res)=>{
  try {
    const allProperties=await Listing.find().sort({createdAt:-1})
    return res.status(200).json({ success: true, allProperties });
    
  } catch (error) {
     console.error("Error fetching recent users:", error);
     return res
       .status(500)
       .json({ success: false, message: "Internal server error" });
    
  }
}

const totalBookings=async(req,res)=>{
  try {
       const totalBookings = await Listing.estimatedDocumentCount(); // Counts all users in the collection
    return res.status(200).json({ success: true, totalProperties });
    
  } catch (error) {
    
  }

}

export default {
  test, totalUsersCount,recentUsers,totalProperties,totalUsers,allProperties
};
