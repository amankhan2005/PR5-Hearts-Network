import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{7,15}$/,
    },

    city: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    zip: { type: String, trim: true, default: "" },
    credential: { type: String, trim: true, default: "" },
    interested: { type: String, trim: true, default: "" },

    resume: {
      path: { type: String, required: true },
      originalName: { type: String, required: true },
      mimeType: { type: String },
      size: { type: Number },
    },

    status: {
      type: String,
      enum: ["submitted", "reviewing", "shortlisted", "rejected", "hired"],
      default: "submitted",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    metadata: {
      ip: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
