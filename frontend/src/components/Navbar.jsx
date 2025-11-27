 import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo/PR5-Hearts.webp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-40">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-16 md:h-20" alt="PR5 Logo" />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-10 text-[#21C55D] font-semibold">
          <Link className="hover:text-green-700 transition" to="/">HOME</Link>
          <Link className="hover:text-green-700 transition" to="/about-us">ABOUT US</Link>

          {/* SERVICES DROPDOWN */}
          <div className="relative group cursor-pointer">
            <span className="hover:text-green-700 transition">SERVICES +</span>

            <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-md shadow-lg top-6 left-0 w-60 py-4 z-50">
              <Link to="/services/rc" className="px-4 py-2 hover:bg-gray-100">Respite Care (RC)</Link>
              <Link to="/services/iiss" className="px-4 py-2 hover:bg-gray-100">IISS</Link>
              <Link to="/services/fc" className="px-4 py-2 hover:bg-gray-100">Family Consultation (FC)</Link>
            </div>
          </div>

          {/* RESOURCES DROPDOWN */}
          <div className="relative group cursor-pointer">
            <span className="hover:text-green-700 transition">RESOURCES +</span>

            <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-md shadow-lg top-6 left-0 w-56 py-4 z-50">
              <Link to="/faq" className="px-4 py-2 hover:bg-gray-100">FAQ</Link>
            </div>
          </div>

          <Link className="hover:text-green-700 transition" to="/contact-us">CONTACT</Link>
        </div>

        {/* DESKTOP CTA */}
        <Link
          to="/contact-us"
          className="hidden md:inline-block bg-[#21C55D] text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition"
        >
          BOOK A CONSULTATION
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-green-600">
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4 text-[#21C55D] font-semibold space-y-4">

          <Link className="block" to="/" onClick={() => setOpen(false)}>HOME</Link>
          <Link className="block" to="/about-us" onClick={() => setOpen(false)}>ABOUT US</Link>

          {/* MOBILE SERVICES DROPDOWN */}
          <div>
            <button
              onClick={() => setServiceOpen(!serviceOpen)}
              className="w-full text-left flex justify-between items-center py-2"
            >
              <span>SERVICES</span>
              <span>{serviceOpen ? "-" : "+"}</span>
            </button>

            {serviceOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2 text-green-700">
                <Link className="block" to="/services/rc" onClick={() => setOpen(false)}>
                  Respite Care (RC)
                </Link>
                <Link className="block" to="/services/iiss" onClick={() => setOpen(false)}>
                  IISS
                </Link>
                <Link className="block" to="/services/fc" onClick={() => setOpen(false)}>
                  Family Consultation (FC)
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE RESOURCES DROPDOWN */}
          <div>
            <button
              onClick={() => setResourceOpen(!resourceOpen)}
              className="w-full text-left flex justify-between items-center py-2"
            >
              <span>RESOURCES</span>
              <span>{resourceOpen ? "-" : "+"}</span>
            </button>

            {resourceOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2 text-green-700">
                <Link className="block" to="/faq" onClick={() => setOpen(false)}>
                  FAQ
                </Link>
              </div>
            )}
          </div>

          <Link className="block" to="/contact-us" onClick={() => setOpen(false)}>CONTACT</Link>

          {/* MOBILE CTA */}
          <Link
            to="/contact-us"
            className="block text-center bg-[#21C55D] text-white mt-4 py-3 rounded-md font-semibold hover:bg-green-700 transition"
            onClick={() => setOpen(false)}
          >
            BOOK A CONSULTATION
          </Link>
        </div>
      )}
    </nav>
  );
}
