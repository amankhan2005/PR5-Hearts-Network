 import { FaUsers, FaHandshake, FaCalendarCheck, FaSmile } from "react-icons/fa";
import childImg from "../assets/services/social.jpeg";

export default function WhoWeAreSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img
              src={childImg}
              alt="Support Services Image"
              className="w-full h-[280px] sm:h-[350px] md:h-[500px] object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="order-2 md:order-1 space-y-6">

          {/* LABEL */}
          <div className="inline-block bg-[#e9f9ef] text-[#23B14D] px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
            WHO WE ARE
          </div>

          {/* HEADING */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Supporting Individuals & Families  
            <span className="text-[#23B14D]"> With Care </span>  
            And Trusted Guidance
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-lg leading-relaxed">
            We are committed to helping individuals and families access the right 
            support—whether it’s related to medical assistance, education guidance, 
            personal development, or navigating everyday challenges.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our team works with dedication, compassion, and professionalism to ensure 
            every person receives personalized services designed to improve their 
            well-being and empower their growth.
          </p>

          {/* BUTTON */}
          <a
            href="/about-us"
            className="
              inline-flex items-center gap-2 
              bg-[#23B14D] text-white font-semibold
              px-7 py-3 rounded-xl shadow-lg
              hover:bg-[#19913d] transition-all text-base
            "
          >
            Learn More →
          </a>

        </div>

      </div>
    </section>
  );
}
