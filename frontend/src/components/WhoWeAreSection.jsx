 import { FaUsers, FaHandshake, FaCalendarCheck, FaSmile } from "react-icons/fa";
import childImg from "../assets/services/social.jpeg";

export default function WhoWeAreSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 px-6 items-center">

        {/* RIGHT IMAGE FIRST ON MOBILE */}
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={childImg}
            alt="Autism Support"
            className="w-full h-[260px] sm:h-[320px] md:h-full object-cover"
          />
        </div>

        {/* LEFT CONTENT */}
        <div className="order-2 md:order-1">

          {/* SMALL LABEL */}
          <p className="text-[#23B14D] font-semibold uppercase flex items-center gap-2 mb-3 tracking-wide text-sm">
            <span className="text-yellow-400 text-lg">●</span>
            Who We Are?
          </p>

          {/* MAIN TITLE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#23B14D]">
            We Specialize In Autism & Spectrum <br className="hidden sm:block" />
            Support Services.
          </h2>

          {/* PARAGRAPH */}
          <p className="text-gray-700 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed">
            At PR5-Hearts Network, every child is valued for their unique abilities.
            As a Maryland State–approved Autism Waiver provider, we partner with
            families to create pathways toward independence, inclusion, and brighter futures.
          </p>

        

          {/* CTA BUTTON (smaller for mobile) */}
          <a
            href="/about-us"
            className="
              mt-8 inline-flex items-center gap-2 
              bg-[#23B14D] text-white font-semibold
              px-6 py-3 rounded-lg shadow-md text-sm sm:text-base
              hover:bg-[#1c9a42] transition-all
            "
          >
            Learn More →
          </a>

        </div>

      </div>
    </section>
  );
}
