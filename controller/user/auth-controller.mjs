import User from "../../models/user-model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res,next) => {
  try {
    const userWithEmail = await User.findOne({ email: req.body.email });

    

    if (userWithEmail) {
      return res.json({ success: false, err_msg: "email already exit " });
    }
    const validUser = await User.create({
     avatar:req.body.avatar,
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
  
    const token = jwt.sign(
      {
        UserInfo: {
          id: validUser._id,
          username: validUser.username,
          
        
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );
   

    return res.json({ success: true, validUser,token });
    
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err_msg: "internal server error" });
  
  }
};

export const signIn = async (req, res,next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) {
      return res.json({success:false ,err_msg:"user not found"});
    }
    if (await bcrypt.compare(req.body.password, validUser.password)) {
      
      const token = jwt.sign(
        {
          UserInfo: {
            id: validUser._id,
            username: validUser.username,
            email: validUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "3d",
        }
      );

      res.json({
        success: true,
        validUser: {
          avatar:validUser.avatar,
          _id: validUser._id,
          email: validUser.email,
          username: validUser.username,
         
        },
        token
      });
    } else {
     
      res.json({ success: false, err_msg: "Incorrect password" });
      
    }
  } catch (error) {
  next(error)
  }
};
