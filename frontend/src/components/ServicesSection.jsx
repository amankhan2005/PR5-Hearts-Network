 import ServiceCard from "./ServiceCard";
import { FaHandsHelping, FaChild, FaUsers } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section className="w-full py-28 bg-[#23B14D]">

      {/* HEADING AREA */}
      <div className="text-center px-6 mb-20">
        
        <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Our Services
        </h2>

        {/* Underline */}
        <div className="h-2 w-24 mx-auto bg-white rounded-full mt-4"></div>

        <p className="text-white/90 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
          Providing reliable, compassionate, and personalized support services 
          that empower individuals and families in their medical, educational, 
          and everyday needs.
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
          desc="Short-term support services that provide relief and balance for families and caregivers."
          link="/services/rc"
          Icon={FaHandsHelping}
        />

        <ServiceCard
          title="Individual Support Services (ISS)"
          desc="One-on-one development and assistance focused on communication, daily skills, and personal growth."
          link="/services/iss"
          Icon={FaChild}
        />

        <ServiceCard
          title="Family Consultation (FC)"
          desc="Guidance, planning, and personalized strategies to help families navigate medical, educational, and daily challenges."
          link="/services/fc"
          Icon={FaUsers}
        />
      </div>
    </section>
  );
}
