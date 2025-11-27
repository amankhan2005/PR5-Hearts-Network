 import ServiceCard from "./ServiceCard";
import { FaHandsHelping, FaChild, FaUsers } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section className="w-full py-28 bg-[#23B14D]">

      {/* HEADING AREA */}
      <div className="text-center px-6 mb-20">
        
        <h2 className="text-5xl md:text-6xl font-extrabold text-white">
          Our Services
        </h2>

        {/* GREEN UNDERLINE replaced with WHITE */}
        <div className="h-2 w-28 mx-auto bg-white rounded-full mt-5"></div>

        <p className="text-white/90 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
          Supporting Maryland families with compassionate care, 
          life-skills development, and personalized autism support programs.
        </p>
      </div>

      {/* GRID OF CARDS */}
      <div
        className="
        max-w-7xl mx-auto px-6 
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-14 items-stretch
        "
      >
        <ServiceCard
          title="Respite Care (RC)"
          desc="Structured short-term relief support designed for families and caregivers."
          link="/services/rc"
          Icon={FaHandsHelping}
        />

        <ServiceCard
          title="Intensive Individual Support Services (IISS)"
          desc="One-on-one developmental support focused on communication, behavior, and skill-building."
          link="/services/iiss"
          Icon={FaChild}
        />

        <ServiceCard
          title="Family Consultation (FC)"
          desc="Personalized guidance, strategies, and coaching for families navigating autism care."
          link="/services/fc"
          Icon={FaUsers}
        />
      </div>
    </section>
  );
}
