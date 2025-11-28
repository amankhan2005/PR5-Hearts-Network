 import { useEffect, useState } from "react";
import {
  FaHeart,
  FaHandsHelping,
  FaBrain,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaAward,
  FaSeedling,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import heroImg from "../assets/services/home.png";
import missionImg from "../assets/services/home.png";
import valuesImg from "../assets/services/parent.jpg";
import approachImg from "../assets/services/aba.webp";

export default function About() {
  // ------------------ DYNAMIC MAP ADDRESS ------------------
  const [mapAddress, setMapAddress] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/map`)
      .then((res) => res.json())
      .then((data) => setMapAddress(data?.mapAddress || ""));
  }, []);

  // DEFAULT / FALLBACK ADDRESS
  const finalAddress =
    mapAddress || "4919 Harford Road\nBaltimore, MD 21214";
  // ----------------------------------------------------------

  return (
    <div className="bg-white text-gray-800">

      {/* ✔ HERO SECTION */}
      <section className="relative bg-green-600 py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <FaHeart className="w-4 h-4" />
            About Us
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] mb-6">
            Empowering Families With  
            <span className="block bg-white bg-clip-text text-transparent">
              Compassion & Support
            </span>
          </h1>

          <div className="w-20 h-1.5 bg-white rounded-full mx-auto mb-8"></div>

          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            We provide trusted care, family support, and individual assistance that help 
            people navigate medical, educational, and personal challenges with confidence.
          </p>

        </div>
      </section>

      {/* ✔ MISSION SECTION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white border border-green-300 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
              <FaHeart className="w-4 h-4" />
              Our Mission
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A3F24] leading-tight">
              Supporting Individuals & Families  
              <span className="block text-[#23B14D]">Every Step Of The Way</span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              At <span className="font-semibold text-[#23B14D]">PR5-Hearts Network</span>, 
              our mission is to ensure that every person receives guidance, compassion, 
              and access to essential support services.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We help families navigate medical needs, educational planning, daily 
              challenges, and personal development — offering reliable and personalized 
              support tailored to each individual's journey.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={missionImg}
              className="w-full h-[550px] object-cover"
              alt="Mission"
            />
          </div>
        </div>
      </section>

      {/* ✔ VALUES SECTION */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#E8FCEF] to-[#CFF6DF]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-green-300 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
              <FaStar className="w-4 h-4" />
              What Guides Us
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A3F24] leading-tight">
              Our Core Values
            </h2>

            <div className="w-20 h-1.5 bg-[#23B14D] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-10">

            <div className="group bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all border border-green-200 hover:border-[#23B14D] hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#23B14D] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#0A3F24]">Compassion</h3>
              <p className="text-gray-700">
                Providing every individual and family with understanding, care, and respect.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all border border-green-200 hover:border-[#23B14D] hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#23B14D] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <FaHandsHelping className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#0A3F24]">Collaboration</h3>
              <p className="text-gray-700">
                We work hand-in-hand with families to create meaningful outcomes.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl transition-all border border-green-200 hover:border-[#23B14D] hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#23B14D] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <FaSeedling className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#0A3F24]">Growth</h3>
              <p className="text-gray-700">
                Helping individuals build confidence, skills, and independence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ✔ APPROACH SECTION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={approachImg}
              className="w-full h-[550px] object-cover"
              alt="Approach"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white border border-green-300 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium">
              <FaBrain className="w-4 h-4" />
              Our Approach
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A3F24]">
              Compassionate, Personalized Support
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We focus on building practical strengths and supporting individuals through:
            </p>

            <ul className="space-y-4">
              {[
                "Daily living and independence skills",
                "Social communication and emotional development",
                "Support for families navigating challenges",
                "Evidence-aligned learning strategies",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#23B14D]" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* MAP — NOW 100% DYNAMIC */}
      <section className="py-12 px-6 bg-white">
        <div className="w-full h-96 shadow-lg rounded-2xl overflow-hidden">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(finalAddress)}&z=13&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

    </div>
  );
}
