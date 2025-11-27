 // utils/sendMail.js
import nodemailer from "nodemailer";

// ✅ Always create a new transporter for each mail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
};

// ✅ Clean wrapper for sending mail safely
export const sendMail = async ({ to, subject, html, text, fromName }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"${fromName || "Autism ABA Partners"}" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Mail sent to ${to}:`, info.response || info);
    return info;
  } catch (err) {
    console.error(`❌ Mail error (${to}):`, err.message);
    throw err;
  }
};
