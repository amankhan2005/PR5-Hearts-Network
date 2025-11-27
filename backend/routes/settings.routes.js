 import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controllers.js";
import { uploadLogo } from "../middleware/uploadLogo.js";

const router = express.Router();

router.get("/", getSettings);

router.post(
  "/update",
  uploadLogo.single("logo"),   // multer logo upload
  updateSettings
);

export default router;