import { upload } from "./multer-middleware.mjs";

export const imageUpload=(req, res) => {
  upload.array("imageUrls", 6),
    (req, res) => {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ success: false, err_msg: "No files were uploaded" });
      }
      console.log(req.files);
      console.log("files uploaded successfully", req.files);
      res.json({ success: true });
    };
     };