import Admin from "../../models/admin-model.mjs";
import bcrypt from "bcrypt"



 const createAdmin = async (req, res) => {
  const { email, passsword } = req.body;

  try {
    // Check if the admin already exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.json({ success: false, err_msg: "Admin already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passsword, salt);

    // Create a new admin with the hashed password
    admin = new Admin({
      email,
      passsword: hashedPassword,
    });

    await admin.save();

    return res.json({ success: true, msg: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, err_msg: "Server error" });
  }
};


 const login = async (req, res) => {
    const {email,password}=req.body;

  try {
      const admin = await Admin.findOne({ email });
    if (admin) {
      // Compare the entered password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, admin.passsword);
      if (isMatch) {
       return res.json({
          success: true,
          admin: {
            email: admin.email,
          },
        });
      } else {
        res.json({ success: false, err_msg: "incorrect password" });
      }
    } else {
      res.json({ success: false, err_msg: "admin not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default{
  createAdmin,login
}

