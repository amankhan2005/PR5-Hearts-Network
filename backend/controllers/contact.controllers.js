// controllers/contact.controllers.js
import { sendMail } from "../utils/sendMail.js";
import ContactLead from "../models/contact.models.js";
import User from "../models/User.models.js"; // <-- IMPORTANT: register "User" model
import { Parser as Json2csvParser } from "json2csv";

/** Escape HTML for safe email display */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ----------------------------------------------------------- */
/*  CREATE INQUIRY (Save → Send Admin Mail → Send User Mail)   */
/* ----------------------------------------------------------- */
export const createInquiry = async (req, res) => {
  try {
    const {
      parentName,
      email,
      phone,
      childName,
      childAge,
      city,
      state,
      zipCode,
      message,
      serviceInterest,
      preferredContact,
      bestTimeToReach,
      leadSource,
      utm,
    } = req.body || {};

    if (!parentName || !email || !phone || !message) {
      return res.status(400).json({
        ok: false,
        message: "Parent name, email, phone, and message are required.",
      });
    }

    const saved = await ContactLead.create({
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),

      childName,
      childAge,

      city,
      state,
      zipCode,

      message,
      serviceInterest,
      preferredContact,
      bestTimeToReach,

      leadSource: leadSource || "Website",
      utm: utm || {},

      ipAddress: req.ip || req.headers["x-forwarded-for"] || "N/A",
      userAgent: req.get("User-Agent") || "N/A",

      status: "new",
    });

    const adminHtml = `
      <h2>📩 New Inquiry - Autism ABA Partners</h2>
      <p><strong>Parent:</strong> ${escapeHtml(saved.parentName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(saved.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(saved.phone)}</p>
      <p><strong>Child:</strong> ${escapeHtml(saved.childName || "N/A")} (Age: ${escapeHtml(saved.childAge || "N/A")})</p>
      <p><strong>Service Interest:</strong> ${escapeHtml(saved.serviceInterest)}</p>
      <p><strong>Preferred Contact:</strong> ${escapeHtml(saved.preferredContact)}</p>
      <p><strong>Best Time:</strong> ${escapeHtml(saved.bestTimeToReach)}</p>
      <p><strong>Location:</strong> ${escapeHtml(saved.city)}, ${escapeHtml(saved.state)} ${escapeHtml(saved.zipCode)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(saved.message)}</p>
      <hr/>
      <small>IP: ${escapeHtml(saved.ipAddress)}<br>User Agent: ${escapeHtml(saved.userAgent)}</small>
    `;

    const userHtml = `
      <div style="font-family: Arial; color: #333;">
        <h2 style="color:#ff7a00;">Thank You for Contacting Autism ABA Partners</h2>
        <p>Hello ${escapeHtml(saved.parentName)},</p>
        <p>We’ve received your message. Our team will reach out within 24 hours.</p>
        <p><strong>Your Message:</strong><br>${escapeHtml(saved.message)}</p>
        <p>Warm regards,<br/>Autism ABA Partners</p>
      </div>
    `;

    await Promise.all([
      sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: "📩 New Inquiry - Autism ABA Partners",
        html: adminHtml,
      }),
      sendMail({
        to: saved.email,
        subject: "Thank You — Autism ABA Partners",
        html: userHtml,
      }),
    ]);

    return res.status(201).json({
      ok: true,
      message: "Inquiry saved & emails sent.",
      inquiry: saved,
    });
  } catch (err) {
    console.error("Inquiry Error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to create inquiry.",
      error: err.message,
    });
  }
};

/* ----------------------------------------------------------- */
/* GET ALL (Simple) */
/* ----------------------------------------------------------- */
export const getAllInquiry = async (_req, res) => {
  try {
    const list = await ContactLead.find().sort({ createdAt: -1 });
    return res.json({ ok: true, list });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* Helpers for Admin list */
/* ----------------------------------------------------------- */
const rx = (s) =>
  new RegExp(String(s).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
const clamp = (n, min, max) =>
  Math.min(Math.max(parseInt(n || 0, 10), min), max);

/* ----------------------------------------------------------- */
/* GET ALL (Admin — pagination + filters + populate)           */
/* ----------------------------------------------------------- */
export const getAllInquiryAdmin = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      q = "",
      status,
      city,
      state,
      zip,
      service,
      contact,
      source,
      from,
      to,
      assigned, // true/false
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    if (q) {
      const r = rx(q);
      filter.$or = [
        { parentName: r },
        { email: r },
        { phone: r },
        { childName: r },
        { city: r },
        { state: r },
        { zipCode: r },
        { message: r },
      ];
    }

    if (status) filter.status = status;
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (zip) filter.zipCode = zip;
    if (service) filter.serviceInterest = service;
    if (contact) filter.preferredContact = contact;
    if (source) filter.leadSource = source;

    if (typeof assigned !== "undefined") {
      const yes = String(assigned).toLowerCase() === "true";
      filter.assignedStaff = yes ? { $ne: null } : null;
    }

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const pageNum = clamp(page, 1, 1e9);
    const perPage = clamp(limit, 1, 100);

    const [items, total] = await Promise.all([
      ContactLead.find(filter)
        .populate("assignedStaff", "name email") // now safe because User is imported
        .sort(sort)
        .skip((pageNum - 1) * perPage)
        .limit(perPage)
        .lean(),
      ContactLead.countDocuments(filter),
    ]);

    return res.json({
      ok: true,
      page: pageNum,
      limit: perPage,
      total,
      pages: Math.ceil(total / perPage),
      items,
    });
  } catch (err) {
    console.error("getAllInquiryAdmin error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* GET BY ID (Admin)                                           */
/* ----------------------------------------------------------- */
export const getInquiryById = async (req, res) => {
  try {
    const item = await ContactLead.findById(req.params.id)
      .populate("assignedStaff", "name email")
      .lean();
    if (!item) return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, item });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* UPDATE (Admin)                                              */
/* ----------------------------------------------------------- */
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      assignedStaff,
      preferredContact,
      bestTimeToReach,
      serviceInterest,
      city, state, zipCode,
      parentName, email, phone,
      childName, childAge,
      message,
      leadSource,
    } = req.body || {};

    const update = {};
    if (status) update.status = status;
    if (typeof assignedStaff !== "undefined") update.assignedStaff = assignedStaff || null;
    if (preferredContact) update.preferredContact = preferredContact;
    if (typeof bestTimeToReach !== "undefined") update.bestTimeToReach = bestTimeToReach || "";

    if (serviceInterest) update.serviceInterest = serviceInterest;
    if (typeof city !== "undefined") update.city = city || "";
    if (typeof state !== "undefined") update.state = state || "";
    if (typeof zipCode !== "undefined") update.zipCode = zipCode || "";

    if (parentName) update.parentName = parentName;
    if (email) update.email = String(email).toLowerCase();
    if (phone) update.phone = phone;
    if (typeof childName !== "undefined") update.childName = childName || "";
    if (typeof childAge !== "undefined") update.childAge = childAge;
    if (message) update.message = message;
    if (leadSource) update.leadSource = leadSource;

    const updated = await ContactLead.findByIdAndUpdate(id, { $set: update }, { new: true })
      .populate("assignedStaff", "name email")
      .lean();

    if (!updated) return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, item: updated });
  } catch (err) {
    console.error("updateInquiry error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* BULK UPDATE (Admin)                                         */
/* ----------------------------------------------------------- */
export const bulkUpdateInquiry = async (req, res) => {
  try {
    const { ids = [], action = "", value } = req.body || {};
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ ok: false, message: "ids[] required" });
    }

    let update;
    if (action === "status") update = { status: value };
    else if (action === "assign") update = { assignedStaff: value || null };
    else return res.status(400).json({ ok: false, message: "Invalid action" });

    const result = await ContactLead.updateMany({ _id: { $in: ids } }, update);
    return res.json({ ok: true, result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* DELETE (Admin)                                              */
/* ----------------------------------------------------------- */
export const deleteInquiry = async (req, res) => {
  try {
    const deleted = await ContactLead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, message: "Not found" });
    return res.json({ ok: true, message: "Deleted", deleted });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* EXPORT CSV (Admin)                                          */
/* ----------------------------------------------------------- */
export const exportInquiryCsv = async (req, res) => {
  try {
    // Reuse admin listing with big limit and get the returned object
    const data = await getAllInquiryAdmin(
      { ...req, query: { ...req.query, page: 1, limit: 100000 } },
      { json: (d) => d } // fake res -> returns payload object
    );
    const items = data.items || [];

    const flat = items.map((it) => ({
      ...it,
      assignedStaff:
        typeof it.assignedStaff === "object" && it.assignedStaff
          ? (it.assignedStaff.email || it.assignedStaff.name || it.assignedStaff._id)
          : it.assignedStaff || "",
    }));

    const fields = [
      "_id",
      "createdAt",
      "parentName",
      "email",
      "phone",
      "childName",
      "childAge",
      "city",
      "state",
      "zipCode",
      "message",
      "serviceInterest",
      "preferredContact",
      "bestTimeToReach",
      "leadSource",
      "status",
      "assignedStaff",
      "ipAddress",
      "userAgent",
    ];

    const parser = new Json2csvParser({ fields, defaultValue: "" });
    const csv = parser.parse(flat);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="inquiries.csv"`);
    return res.status(200).send(csv);
  } catch (err) {
    console.error("exportInquiryCsv error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* DASHBOARD STATS (Admin)                                     */
/* ----------------------------------------------------------- */
export const getInquiryStats = async (_req, res) => {
  try {
    const [total, byStatus, bySource, byService, today] = await Promise.all([
      ContactLead.countDocuments(),
      ContactLead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      ContactLead.aggregate([{ $group: { _id: "$leadSource", count: { $sum: 1 } } }]),
      ContactLead.aggregate([{ $group: { _id: "$serviceInterest", count: { $sum: 1 } } }]),
      ContactLead.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
    ]);

    return res.json({
      ok: true,
      total,
      today,
      byStatus,
      bySource,
      byService,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
