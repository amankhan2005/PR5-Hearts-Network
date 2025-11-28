 import {
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

import defaultLogo from "../assets/logo/PR5-Hearts.webp";  // ✅ FIXED DEFAULT LOGO
import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  // ---------------------- BACKEND URL ----------------------
  const backend = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

  // ---------------------- LOGO (PERFECT LOGIC) ----------------------
  const rawLogo = settings?.logo;

  const logoUrl =
    rawLogo && rawLogo !== "" && rawLogo !== null
      ? rawLogo.startsWith("http")
        ? rawLogo
        : `${backend}${rawLogo}`
      : defaultLogo; // ✅ Always show fallback if backend empty

  // ---------------------- DEFAULT VALUES ----------------------
  const defaultEmail = "info@pr5-heartsnetwork.com";
  const defaultPhone = "+1 (443) 992-2299";
  const defaultAddress = "4919 Harford Rd, Baltimore, MD 21214";
  const defaultAddressLink = "https://maps.app.goo.gl/mBkEdBxhhbThS67q7";

  // ---------------------- CONTACT INFO ----------------------
  const address = settings?.address || defaultAddress;

  const addressLink = settings?.address
    ? `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`
    : defaultAddressLink;

  const phone = settings?.phone || defaultPhone;
  const phoneHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  const email = settings?.email || defaultEmail;

  // CLEAN EMAIL
  const cleanedEmail = (email || "")
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // ---------------------- SOCIAL LINKS ----------------------
  const facebook = settings?.facebook || settings?.fb || "";
  const instagram = settings?.instagram || settings?.ig || "";
  const twitter = settings?.twitter || settings?.x || settings?.x_url || "";
  const tiktok =
    settings?.tiktok || settings?.tikTok || settings?.tiktok_url || "";

  return (
    <footer
      className="relative text-white pt-24 pb-10"
      style={{ backgroundColor: "#0A3F24" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-600 z-0"></div>

      {/* MAIN GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16">

        {/* LOGO + TAGLINE */}
        <div>
          <img src={logoUrl} alt="PR5 Hearts Logo" className="w-32 h-auto mb-4" />

          <p className="leading-relaxed">
            <strong>PR5-Hearts Network:</strong> Five Senses Inspiring Compassion and Respectful Partnership.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/about-us" className="hover:text-yellow-300">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-yellow-300">Contact</a></li>
            <li><a href="/faq" className="hover:text-yellow-300">FAQs</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-2">
            <li><a href="/services/rc" className="hover:text-yellow-300">Respite Care (RC)</a></li>
            <li><a href="/services/iiss" className="hover:text-yellow-300">IISS</a></li>
            <li><a href="/services/fc" className="hover:text-yellow-300">Family Consultation (FC)</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-4">

            {/* ADDRESS */}
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-white text-xl" />
              <a href={addressLink} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 leading-tight">
                {address}
              </a>
            </li>

            {/* PHONE */}
            <li className="flex items-center gap-3">
              <FaPhone className="text-white text-xl scale-x-[-1]" />
              <a href={phoneHref} className="hover:text-yellow-300">
                {phone}
              </a>
            </li>

            {/* EMAIL */}
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-white text-xl" />
              <a href={`mailto:${cleanedEmail}`} className="hover:text-yellow-300">
                {cleanedEmail}
              </a>
            </li>

          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <p className="mb-4">Join our community for tips, stories, and updates.</p>

          <div className="flex gap-4">

            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
                <FaFacebookF className="text-white text-xl group-hover:text-green-700" />
              </a>
            )}

            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
                <FaInstagram className="text-white text-xl group-hover:text-green-700" />
              </a>
            )}

            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
                <FaTwitter className="text-white text-xl group-hover:text-green-700" />
              </a>
            )}

            {tiktok && (
              <a href={tiktok} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
                <SiTiktok className="text-white text-xl group-hover:text-green-700" />
              </a>
            )}

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 border-t border-white/40 mt-16 pt-6 text-center text-white text-sm">
        © {new Date().getFullYear()} PR5-Hearts Network. All Rights Reserved.
        Developed by{" "}
        <a
          href="https://www.webieapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium hover:underline"
        >
          WebieApp
        </a>
      </div>
    </footer>
  );
}
