 import Settings from "../models/global.models.js";

async function ensureSettings() {
  let s = await Settings.findOne();
  if (!s) {
    s = await Settings.create({
      global: {
        logo: "",
        phone: "",
        email: "",
        address: "",
        facebook: "",
        instagram: "",
        twitter: "",
        tiktok: ""
      },
      globalMeta: {
        logoUpdatedAt: null,
        phoneUpdatedAt: null,
        emailUpdatedAt: null,
        addressUpdatedAt: null,
        facebookUpdatedAt: null,
        instagramUpdatedAt: null,
        twitterUpdatedAt: null,
        tiktokUpdatedAt: null
      }
    });
  }
  return s;
}

export const getSettings = async (req, res) => {
  try {
    const s = await ensureSettings();
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update settings with per-field toggles.
 *
 * Expected request:
 * - If sending JSON (no file): body contains values and fieldsToUpdate array.
 *   Example:
 *    {
 *      "fieldsToUpdate": ["phone","facebook"],
 *      "phone": "+1 111 222 3333",
 *      "facebook": "https://facebook.com/yourpage"
 *    }
 *
 * - If uploading logo file via multipart/form-data:
 *   include fieldsToUpdate[] with "logo" in it, and file field name "logo"
 *
 * Only fields listed in fieldsToUpdate will be changed (and their per-field timestamp).
 * If fieldsToUpdate is missing, controller will update only fields explicitly provided in body.
 */
export const updateSettings = async (req, res) => {
  try {
    const user = req.headers["x-admin-user"];
    const pass = req.headers["x-admin-pass"];

    if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
      return res.status(403).json({ error: "Invalid admin credentials" });
    }

    const s = await ensureSettings();

    // allowed fields to change
    const allowed = [
      "logo",
      "phone",
      "email",
      "address",
      "facebook",
      "instagram",
      "twitter",
      "tiktok"
    ];

    // fieldsToUpdate may come as array or comma-separated string
    let fieldsToUpdate = req.body.fieldsToUpdate;
    if (typeof fieldsToUpdate === "string") {
      try { fieldsToUpdate = JSON.parse(fieldsToUpdate); } catch { fieldsToUpdate = fieldsToUpdate.split(",").map(f=>f.trim()).filter(Boolean); }
    }
    // if absent, we'll treat as "update any provided fields"
    const doSelective = Array.isArray(fieldsToUpdate) && fieldsToUpdate.length > 0;

    const now = new Date();

    // helper to set field and meta
    const setField = (field, value) => {
      s.global[field] = value;
      const metaKey = `${field}UpdatedAt`;
      if (!s.globalMeta) s.globalMeta = {};
      s.globalMeta[metaKey] = now;
    };

    // 1) handle file upload (logo) if present
    if (req.file) {
      // only update if selective mode is off OR logo included in fieldsToUpdate
      if (!doSelective || fieldsToUpdate.includes("logo")) {
        s.global.logo = `/uploads/settings/${req.file.filename}`;
        if (!s.globalMeta) s.globalMeta = {};
        s.globalMeta.logoUpdatedAt = now;
      }
    }

    // 2) handle regular fields
    for (const key of allowed) {
      if (key === "logo") continue; // handled above
      const incoming = req.body[key];

      // ignore undefined fields
      if (typeof incoming === "undefined") continue;

      // selective mode: only update if listed
      if (doSelective && !fieldsToUpdate.includes(key)) continue;

      // apply change and meta
      setField(key, incoming);
    }

    await s.save();

    res.json({ ok: true, settings: s });
  } catch (err) {
    console.error("settings.update error:", err);
    res.status(500).json({ error: err.message });
  }
};
