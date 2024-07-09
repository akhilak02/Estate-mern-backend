import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
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

const imagesUpload = mongoose.model("imagesupload", imageSchema);
export default imagesUpload;
