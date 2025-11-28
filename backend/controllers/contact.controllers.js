 // controllers/contact.controllers.js
import { sendMail } from "../utils/sendMail.js";
import ContactLead from "../models/contact.models.js";
import User from "../models/User.models.js";
import { Parser as Json2csvParser } from "json2csv";

/* ----------------------------------------------------------- */
/* SAFE HTML                                                   */
/* ----------------------------------------------------------- */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ----------------------------------------------------------- */
/* ENUM NORMALIZATION → Match your MongoDB Schema              */
/* ----------------------------------------------------------- */
const SERVICE_MAP = {
  "Respite Care (RC)": "RC",
  "Individual Support Services (ISS)": "ISS",
  "Family Consultation (FC)": "FC",
  "General Support Inquiry": "GENERAL",
  Other: "OTHER",
};

const LEAD_SOURCE_MAP = {
  Website: "website",
  "Google Search": "google",
  Facebook: "facebook",
  Referral: "referral",
  Other: "other",
};

/* ----------------------------------------------------------- */
/* CREATE INQUIRY                                              */
/* ----------------------------------------------------------- */
export const createInquiry = async (req, res) => {
  try {
    let {
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

    // Fix bad enum values
    serviceInterest = SERVICE_MAP[serviceInterest] || "OTHER";
    leadSource = LEAD_SOURCE_MAP[leadSource] || "other";

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
      leadSource,
      utm: utm || {},
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "N/A",
      userAgent: req.get("User-Agent") || "N/A",
      status: "new",
    });

    /* ----------------------------------------------------------- */
    /* ADMIN EMAIL (PR5-Hearts Network)                            */
    /* ----------------------------------------------------------- */
    const adminHtml = `
      <h2 style="color:#064e3b;">📩 New Inquiry — PR5-Hearts Network</h2>

      <p><strong>Parent/Guardian:</strong> ${escapeHtml(saved.parentName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(saved.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(saved.phone)}</p>

      <p><strong>Child Name:</strong> ${escapeHtml(saved.childName || "N/A")}</p>
      <p><strong>Child Age:</strong> ${escapeHtml(saved.childAge || "N/A")}</p>

      <p><strong>Service Interested:</strong> ${escapeHtml(saved.serviceInterest)}</p>
      <p><strong>Preferred Contact:</strong> ${escapeHtml(saved.preferredContact)}</p>
      <p><strong>Best Time To Reach:</strong> ${escapeHtml(saved.bestTimeToReach || "N/A")}</p>

      <p><strong>Location:</strong>
        ${escapeHtml(saved.city || "")}, 
        ${escapeHtml(saved.state || "")} 
        ${escapeHtml(saved.zipCode || "")}
      </p>

      <p><strong>Message:</strong><br>${escapeHtml(saved.message)}</p>

      <hr/>
      <p><small>
        Lead Source: ${escapeHtml(saved.leadSource)}<br/>
        IP: ${escapeHtml(saved.ipAddress)}<br/>
        User Agent: ${escapeHtml(saved.userAgent)}
      </small></p>
    `;

    /* ----------------------------------------------------------- */
    /* USER EMAIL — PR5-Hearts Network (Green Theme)               */
    /* ----------------------------------------------------------- */
    const userHtml = `
      <div style="font-family: Arial; color: #333;">
        <h2 style="color:#047857;">Thank You for Contacting PR5-Hearts Network</h2>

        <p>Hello ${escapeHtml(saved.parentName)},</p>

        <p>
          Thank you for reaching out to PR5-Hearts Network.  
          Our support team has received your request and will reach out shortly.
        </p>

        <p>
          PR5-Hearts Network is committed to offering guidance, compassion, 
          and essential support services tailored to every individual's needs.
        </p>

        <p>
          We help families navigate medical care, educational planning, 
          daily challenges, and developmental support with empathy and reliability.
        </p>

        <p>Warm regards,<br/><strong>PR5-Hearts Network Team</strong></p>
      </div>
    `;

    await Promise.all([
      sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: "📩 New Inquiry — PR5-Hearts Network",
        html: adminHtml,
      }),
      sendMail({
        to: saved.email,
        subject: "Thank You — PR5-Hearts Network",
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
/* GET ALL (Public)                                            */
/* ----------------------------------------------------------- */
export const getAllInquiry = async (_req, res) => {
  try {
    const list = await ContactLead.find().sort({ createdAt: -1 });
    return res.json({ ok: true, list });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* Helpers */
const rx = (s) =>
  new RegExp(String(s).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
const clamp = (n, min, max) =>
  Math.min(Math.max(parseInt(n || 0), min), max);

/* ----------------------------------------------------------- */
/* GET ALL (ADMIN — filters + pagination)                      */
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
      assigned,
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
      filter.assignedStaff =
        String(assigned).toLowerCase() === "true" ? { $ne: null } : null;
    }

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const pageNum = clamp(page, 1, 999999999);
    const perPage = clamp(limit, 1, 100);

    const [items, total] = await Promise.all([
      ContactLead.find(filter)
        .populate("assignedStaff", "name email")
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
/* GET BY ID                                                   */
/* ----------------------------------------------------------- */
export const getInquiryById = async (req, res) => {
  try {
    const item = await ContactLead.findById(req.params.id)
      .populate("assignedStaff", "name email")
      .lean();

    if (!item)
      return res.status(404).json({ ok: false, message: "Not found" });

    return res.json({ ok: true, item });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* UPDATE INQUIRY                                              */
/* ----------------------------------------------------------- */
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    if (body.serviceInterest)
      body.serviceInterest = SERVICE_MAP[body.serviceInterest] || "OTHER";

    if (body.leadSource)
      body.leadSource = LEAD_SOURCE_MAP[body.leadSource] || "other";

    if (body.email)
      body.email = String(body.email).toLowerCase();

    const updated = await ContactLead.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )
      .populate("assignedStaff", "name email")
      .lean();

    if (!updated)
      return res.status(404).json({ ok: false, message: "Not found" });

    return res.json({ ok: true, item: updated });
  } catch (err) {
    console.error("updateInquiry error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* BULK UPDATE                                                 */
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

    const result = await ContactLead.updateMany(
      { _id: { $in: ids } },
      update
    );

    return res.json({ ok: true, result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* DELETE INQUIRY                                              */
/* ----------------------------------------------------------- */
export const deleteInquiry = async (req, res) => {
  try {
    const deleted = await ContactLead.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ ok: false, message: "Not found" });

    return res.json({ ok: true, message: "Deleted", deleted });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ----------------------------------------------------------- */
/* EXPORT CSV                                                  */
/* ----------------------------------------------------------- */
export const exportInquiryCsv = async (req, res) => {
  try {
    const data = await getAllInquiryAdmin(
      { ...req, query: { ...req.query, page: 1, limit: 100000 } },
      { json: (d) => d }
    );

    const items = data.items || [];

    const flat = items.map((it) => ({
      ...it,
      assignedStaff:
        typeof it.assignedStaff === "object" && it.assignedStaff
          ? it.assignedStaff.email ||
            it.assignedStaff.name ||
            it.assignedStaff._id
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
/* DASHBOARD STATS                                             */
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
