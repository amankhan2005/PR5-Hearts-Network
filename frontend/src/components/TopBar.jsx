 import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

export default function Topbar() {
  const [hide, setHide] = useState(false);
  let lastScroll = 0;

  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY;
      if (current > lastScroll) {
        setHide(true);
      } else {
        setHide(false);
      }
      lastScroll = current;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full bg-green-600 text-white text-sm transition-all duration-300
        ${hide ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div
        className="
          max-w-7xl mx-auto 
          px-4 py-2 
          flex flex-col md:flex-row 
          items-center md:items-center 
          justify-between 
          gap-2 md:gap-6 
          text-center md:text-left
        "
      >
        {/* LEFT TEXT */}
        <p className="font-medium text-[13px] leading-tight">
          PR5-Hearts Network: Five Senses Inspiring Compassion and Respectful Partnership
        </p>

        {/* CONTACT ITEMS */}
    <div
  className="
    flex flex-wrap items-center justify-center 
    gap-3 text-[13px]
  "
>
  <a
    href="mailto:admin@pr5-heartsnetwork.com"
    className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-400 transition"
  >
    <FaEnvelope /> admin@pr5-heartsnetwork.com
  </a>

  <a
    href="tel:+14109087154"
    className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-400 transition"
  >
    <FaPhone className="rotate-[15deg]" />  {/* PHONE ICON STRAIGHT */}
    +1 (410)-908-7154
  </a>
</div>

      </div>
    </div>
  );
}
