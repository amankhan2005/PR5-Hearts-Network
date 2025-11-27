import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import bgLogo from "../assets/logo/PR5-Hearts.webp";

export default function Footer() {
  return (
    <footer
      className="relative text-white pt-24 pb-10"
      style={{ backgroundColor: "#0A3F24" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-green-600"></div>

      {/* MAIN GRID */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16">

        {/* LOGO + TAGLINE */}
        <div>
          <img src={bgLogo} alt="PR5 Hearts Logo" className="w-32 h-auto mb-4" />
          <p className="text-white leading-relaxed">
            <strong className="text-white">PR5-Hearts Network:</strong>  
            Five Senses Inspiring Compassion and Respectful Partnership.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Quick Links</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-2 text-white">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/about-us" className="hover:text-yellow-300">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-yellow-300">Contact</a></li>
            <li><a href="/faq" className="hover:text-yellow-300">FAQs</a></li>
            {/* <li><a href="/careers" className="hover:text-yellow-300">Careers</a></li> */}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Services</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-2 text-white">
            <li><a href="/services/rc" className="hover:text-yellow-300">Respite Care (RC)</a></li>
            <li><a href="/services/iiss" className="hover:text-yellow-300">IISS</a></li>
            <li><a href="/services/fc" className="hover:text-yellow-300">Family Consultation (FC)</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Get in Touch</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <ul className="space-y-4 text-white">

            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-white text-xl" />
              <span>Maryland, USA</span>
            </li>

            <li className="flex items-center gap-3">
              <FaPhone className="text-white text-xl" />
              <a href="tel:+14109087154" className="hover:text-yellow-300">
                +1 (410) 908-7154
              </a>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope className="text-white text-xl" />
              <a
                href="mailto:info@pr5-heartsnetwork.com"
                className="hover:text-yellow-300"
              >
                info@pr5-heartsnetwork.com
              </a>
            </li>

          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Follow Us</h3>
          <div className="w-12 h-1 bg-white mb-4"></div>

          <p className="text-white mb-4 leading-relaxed">
            Join our community for tips, stories, and updates.
          </p>

          <div className="flex gap-4">
            <a className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
              <FaFacebookF className="text-white text-xl group-hover:text-green-700" />
            </a>

            <a className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
              <FaInstagram className="text-white text-xl group-hover:text-green-700" />
            </a>

            <a className="bg-white/20 p-3 rounded-lg hover:bg-white transition group">
              <FaTwitter className="text-white text-xl group-hover:text-green-700" />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="relative border-t border-white/40 mt-16 pt-6 text-center text-white text-sm">
        © 2025 PR5-Hearts Network. All Rights Reserved.  
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
