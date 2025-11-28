//  import { useState, useEffect } from "react";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// export default function Topbar() {
//   const [hide, setHide] = useState(false);
//   let lastScroll = 0;

//   useEffect(() => {
//     function handleScroll() {
//       const current = window.scrollY;
//       if (current > lastScroll) {
//         setHide(true);
//       } else {
//         setHide(false);
//       }
//       lastScroll = current;
//     }

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={`w-full bg-green-600 text-white text-sm transition-all duration-300
//         ${hide ? "-translate-y-full" : "translate-y-0"}
//       `}
//     >
//       <div
//         className="
//           max-w-7xl mx-auto 
//           px-4 py-2 
//           flex flex-col md:flex-row 
//           items-center md:items-center 
//           justify-between 
//           gap-2 md:gap-6 
//           text-center md:text-left
//         "
//       >
//         {/* LEFT TEXT */}
//         <p className="font-medium text-[13px] leading-tight">
//           PR5-Hearts Network: Five Senses Inspiring Compassion and Respectful Partnership
//         </p>

//         {/* CONTACT ITEMS */}
//         <div
//           className="
//             flex flex-wrap items-center justify-center 
//             gap-4 text-[13px]
//           "
//         >
//           {/* EMAIL */}
//           <a
//             href="mailto:info@pr5-heartsnetwork.com"
//             className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
//           >
//             <FaEnvelope className="text-[12px]" />
//             info@pr5-heartsnetwork.com
//           </a>

//           {/* PHONE WITH MIRRORED ICON */}
//           <a
//             href="tel:+14439922299"
//             className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
//           >
//             <FaPhone
//               className="text-[12px] transform scale-x-[-1]"
//             />
//             +1 (443) 992-2299
//           </a>

//           {/* ADDRESS WITH MAP LINK */}
//           <a
//             href="https://maps.app.goo.gl/mBkEdBxhhbThS67q7"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
//           >
//             <FaMapMarkerAlt className="text-[12px]" />
//             4919 Harford Rd, Baltimore, MD 21214
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext";

export default function Topbar() {
  const [hide, setHide] = useState(false);
  const { settings } = useSettings();

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

  // ------------------ DYNAMIC GLOBAL SETTINGS ------------------

  const address =
    settings?.address || "4919 Harford Rd, Baltimore, MD 21214";

  const phone =
    settings?.phone || "+1 (443) 992-2299";

  const email =
    settings?.email || "info@pr5-heartsnetwork.com";

  const googleMapLink = `https://maps.google.com/?q=${encodeURIComponent(
    address
  )}`;

  // --------------------------------------------------------------

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
            gap-4 text-[13px]
          "
        >
          {/* EMAIL */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
          >
            <FaEnvelope className="text-[12px]" />
            {email}
          </a>

          {/* PHONE */}
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
          >
            <FaPhone className="text-[12px] transform scale-x-[-1]" />
            {phone}
          </a>

          {/* ADDRESS */}
          <a
            href={googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-300 transition"
          >
            <FaMapMarkerAlt className="text-[12px]" />
            {address}
          </a>
        </div>
      </div>
    </div>
  );
}
