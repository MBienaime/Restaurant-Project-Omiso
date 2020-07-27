//Import
const multer = require("multer");
const Image = multer({dest : '../Images'})

// Mime types of the files
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//storing files to disk
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../Images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//Exports multer
module.exports = multer({ storage: storage }).single("Image");
