 // models/contact.models.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },

    childName: { type: String, trim: true },
    childAge: { type: Number, min: 0, max: 25 },

    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },

    message: { type: String, required: true, trim: true },

    /* ⭐ UPDATED ENUMS to match frontend + controller ⭐*/
    serviceInterest: {
      type: String,
      enum: ["RC", "ISS", "FC", "GENERAL", "OTHER"],
      default: "OTHER",
    },

    preferredContact: {
      type: String,
      enum: ["Call", "Email", "Text", "WhatsApp"],
      default: "Call",
    },

    bestTimeToReach: { type: String, trim: true },

    leadSource: {
      type: String,
      enum: ["website", "google", "facebook", "referral", "other"],
      default: "website",
    },

    utm: {
      campaign: String,
      medium: String,
      source: String,
    },

    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "closed"],
      default: "new",
    },

    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({
  parentName: "text",
  email: "text",
  phone: "text",
  message: "text",
  city: "text",
  state: "text",
});

export default mongoose.models.ContactLead ||
  mongoose.model("ContactLead", contactSchema);
