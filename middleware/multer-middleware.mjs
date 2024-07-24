import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";



//set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const random=uuidv4()
    cb(null,random+""+file.originalname);
  },
});


//initialize upload
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array("imageUrls", 6);

function checkFileType(file, cb) {
  const filetypes = "/jpeg|jpg|png/";
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}


