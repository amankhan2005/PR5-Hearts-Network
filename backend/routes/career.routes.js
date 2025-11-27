 // src/routes/career.routes.js
import express from "express";
import uploadResume from "../middleware/uploadResume.js";
import {
  applyCareerForm,
  listApplications,
  deleteApplication,
  downloadResume,
} from "../controllers/career.controllers.js";

const router = express.Router();

/* ----------------- helper admin auth ----------------- */
/**
 * Simple header-based admin auth for these admin routes.
 * It checks either ADMIN_USER / ADMIN_PASS or VITE_ADMIN_USER / VITE_ADMIN_PASS
 */
function requireAdmin(req, res, next) {
  const user = (req.headers["x-admin-user"] || "").toString();
  const pass = (req.headers["x-admin-pass"] || "").toString();

  const validUser = process.env.ADMIN_USER || process.env.VITE_ADMIN_USER || "admin";
  const validPass = process.env.ADMIN_PASS || process.env.VITE_ADMIN_PASS || "secret123";

  if (!user || !pass) return res.status(403).json({ error: "Missing admin credentials" });
  if (user !== validUser || pass !== validPass) return res.status(403).json({ error: "Invalid admin credentials" });

  next();
}

/* ------------------ APPLY (public) ------------------ */
router.post(
  "/apply",
  (req, res, next) => {
    uploadResume.single("resume")(req, res, function (err) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message || "Resume upload failed" });
      }
      next();
    });
  },
  applyCareerForm
);

/* ------------------ LIST (admin) ------------------ */
router.get("/list", requireAdmin, listApplications);

/* ------------------ DELETE (admin) ------------------ */
router.delete("/delete/:id", requireAdmin, deleteApplication);

/* ------------------ DOWNLOAD (admin) ------------------ */
router.get("/download/:id", requireAdmin, downloadResume);

export default router;
