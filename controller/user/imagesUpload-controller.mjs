// import imagesUpload from "../../models/imagesUpload-model.mjs"

import multer from "multer";
import { upload } from "../../middleware/multer-middleware.mjs";

// Upload endpoint
export const imageUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({
          success: false,
          message: err.message,
          field: err.field,
          name: err.name,
        });
    } else if (err) {
      return res.status(500).json({ success: false, message: "server Error" });
    }
console.log("path",`/temp/${req.files.filename}`);

    const imageUrls = req.files.map((file) => `/temp/${file.filename}`);
    res.status(200).json({ success: true, imageUrls });
  });
};

// app.use('/uploads', express.static('uploads'));
