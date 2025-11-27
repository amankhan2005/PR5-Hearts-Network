 // src/controllers/career.controllers.js
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Application from "../models/Application.models.js";

/* ------------------ VALIDATIONS ------------------ */
const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || ""));
const isValidPhone = (s) => /^[0-9]{7,15}$/.test(String(s || ""));

/* ------------------ EMAIL CONFIG ------------------ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

/* ------------------ EMAIL TEMPLATES ------------------ */
const emailWrapper = (content) => `
  <div style="background:#f9fafb;padding:40px 0;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="600" align="center" style="background:#fff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#f97316;padding:16px;text-align:center;color:#fff;font-size:22px;">Autism ABA Partners</td></tr>
      <tr><td style="padding:32px;">${content}</td></tr>
    </table>
  </div>
`;

const adminEmailTemplate = (data) =>
  emailWrapper(`
    <h3>New Application Received</h3>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>State:</strong> ${data.state}</p>
    <p><strong>Zip:</strong> ${data.zip}</p>
    <p><strong>Credential:</strong> ${data.credential}</p>
    <p><strong>Interested In:</strong> ${data.interested}</p>
  `);

const applicantEmailTemplate = (data) =>
  emailWrapper(`
    <h3>Thank you for applying, ${data.fullName}!</h3>
    <p>Your application has been received and is under review.</p>
  `);

/* ------------------ CONTROLLERS ------------------ */

/**
 * POST /api/career/apply
 * Handles form submit with resume upload (req.file)
 */
export const applyCareerForm = async (req, res) => {
  try {
    const { fullName, email, phone, zip, city, state, credential, interested } = req.body;
    const file = req.file;

    // validations
    if (!fullName || !email || !phone)
      return res.status(400).json({ message: "Full Name, Email, Phone are required." });

    if (!isValidEmail(email)) return res.status(400).json({ message: "Invalid email." });
    if (!isValidPhone(phone)) return res.status(400).json({ message: "Invalid phone number." });
    if (!file) return res.status(400).json({ message: "Resume file is required." });

    // ---------------- SAVE TO DATABASE ----------------
    const newEntry = await Application.create({
      fullName,
      email,
      phone,
      zip: zip || "",
      city: city || "",
      state: state || "",
      credential: credential || "",
      interested: interested || "",
      resume: {
        path: file.path,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      },
      metadata: {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      },
    });

    console.log("💾 Saved application:", newEntry._id);

    // RESPONSE TO FRONTEND (INSTANT)
    res.status(200).json({ success: true, message: "Application submitted.", id: newEntry._id });

    // ---------------- EMAILS (BACKGROUND) ----------------
    const hrRecipients = (process.env.RECEIVER_EMAIL || process.env.ADMIN_EMAIL || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const adminMail = {
      from: process.env.ADMIN_EMAIL,
      to: hrRecipients.length ? hrRecipients : process.env.ADMIN_EMAIL,
      subject: `New Application – ${fullName}`,
      html: adminEmailTemplate({ fullName, email, phone, zip, city, state, credential, interested }),
      attachments: [
        {
          filename: file.originalname,
          path: file.path,
        },
      ],
    };

    const applicantMail = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Your Application Was Received",
      html: applicantEmailTemplate({ fullName }),
    };

    Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(applicantMail),
    ])
      .then(() => {
        console.log("📧 Emails sent successfully.");

        // delete resume file after emails sent (optional)
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (e) {
          console.warn("Could not unlink resume file:", e.message);
        }
      })
      .catch((err) => {
        console.error("Email send error:", err?.message || err);
      });
  } catch (err) {
    console.error("Error in applyCareerForm:", err);
    if (!res.headersSent) res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

/**
 * GET /api/career/list
 * Admin-only. Returns all applications (most recent first)
 */
export const listApplications = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 }).lean();

    const safe = apps.map((a) => ({
      _id: a._id,
      fullName: a.fullName,
      email: a.email,
      phone: a.phone,
      city: a.city,
      state: a.state,
      zip: a.zip,
      credential: a.credential,
      interested: a.interested,
      resume: a.resume, // { path, originalName, mimeType, size }
      metadata: a.metadata,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));

    res.status(200).json({ success: true, applications: safe });
  } catch (err) {
    console.error("Error in listApplications:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/career/delete/:id
 * Admin-only. Deletes application and its resume file.
 */
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    // delete resume file if exists
    if (app.resume?.path && fs.existsSync(app.resume.path)) {
      try {
        fs.unlinkSync(app.resume.path);
      } catch (e) {
        console.warn("Failed to unlink resume file:", e.message);
      }
    }

    await Application.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Application deleted" });
  } catch (err) {
    console.error("Error in deleteApplication:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/career/download/:id
 * Admin-only. Streams resume file as attachment (original filename).
 */
export const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Application.findById(id).lean();
    if (!app || !app.resume?.path) return res.status(404).json({ success: false, message: "File not found" });

    const filePath = app.resume.path;
    const filename = app.resume.originalName || path.basename(filePath);

    // secure check: ensure file is inside uploads folder
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(uploadsRoot)) {
      return res.status(400).json({ success: false, message: "Invalid file path" });
    }

    if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: "File not found on disk" });

    return res.download(filePath, filename);
  } catch (err) {
    console.error("Error in downloadResume:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
