import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passsword: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.model("admins", userSchema);
export default Admin;
