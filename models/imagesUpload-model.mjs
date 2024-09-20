import mongoose from "mongoose";

const imageSchema =new mongoose.Schema(
  {
    imageUrls: [
      {
        type: Array,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const imagesUpload = mongoose.model("imagesuploads", imageSchema);
export default imagesUpload;
