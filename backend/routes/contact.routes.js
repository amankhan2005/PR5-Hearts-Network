 // routes/contact.routes.js
import express from "express";
import {
  createInquiry,
  getAllInquiry,        // simple (back-compat) -> { ok, list }
  getInquiryById,
  deleteInquiry,

  // Admin power endpoints
  getAllInquiryAdmin,
  updateInquiry,
  bulkUpdateInquiry,
  exportInquiryCsv,
  getInquiryStats,
} from "../controllers/contact.controllers.js";

const router = express.Router();

/* ---------- PUBLIC (website form) ---------- */
router.post("/save", createInquiry);

/* ---------- ADMIN: powerful list + tools (static paths FIRST) ---------- */
router.get("/admin/list", getAllInquiryAdmin);     // ?page&limit&q&status&from&to...
router.get("/list", getAllInquiryAdmin);           // alias for frontend hitting /list
router.post("/bulk/update", bulkUpdateInquiry);
router.get("/admin/export.csv", exportInquiryCsv);
router.get("/admin/stats", getInquiryStats);
router.patch("/:id", updateInquiry);               // id-based (keep below static admin paths)
router.delete("/:id", deleteInquiry);              // id-based

/* ---------- SIMPLE LIST/DETAIL (backward compatible) ---------- */
router.get("/", getAllInquiry);                    // { ok, list }
router.get("/:id", getInquiryById);                // keep this LAST so it doesn't swallow /admin/*

export default router;
