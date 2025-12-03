 import multer from "multer";
import path from "path";
import fs from "fs";

// ---- Ensure folder exists ----
const uploadPath = "uploads/settings";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ---- Multer storage ----
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "logo-" + Date.now() + ext);
  }
});

// ---- File Filter ----
function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only images allowed"), false);
  }
  cb(null, true);
}

export const uploadLogo = multer({
  storage,
  fileFilter
});
