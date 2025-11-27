 import React from "react";
import ContactCTASection from "../components/ContactSection";
import { FaHeart, FaArrowRight } from "react-icons/fa";

// ✅ Local Images
import abaImage from "../assets/services/aba.webp";
import parentImage from "../assets/services/parent.jpg";
import behaviourImage from "../assets/services/behaviour.jpg";
import socialImage from "../assets/services/social.jpeg";
import dailyImage from "../assets/services/daily.jpg";
import homeImage from "../assets/services/home.png";

// ✅ Service Data
const services = [
  {
    id: 1,
    title: "ABA Therapy",
    desc: "Applied Behavior Analysis (ABA) therapy is tailored to each child's individual strengths and needs. Our clinicians design personalized programs that teach communication, reduce challenging behaviours, and promote independence through structured, data-driven sessions. Therapy emphasizes practical life skills such as following instructions, expressing needs, and self-care. Parents are actively involved to ensure progress continues at home, school, and within the community — helping every child build confidence and independence step by step.",
    img: abaImage,
  },
  {
    id: 2,
    title: "Parent & Caregiver Training",
    desc: "We empower parents and caregivers with effective strategies to support their child’s growth. Through hands-on coaching, role-play, and real-life practice, families learn reinforcement methods, visual supports, and predictable routines that improve learning and reduce stress. Our training builds collaboration and confidence, ensuring that parents feel equipped to manage behaviour, encourage communication, and apply ABA principles consistently across everyday routines — creating meaningful progress in both home and social settings.",
    img: parentImage,
  },
  {
    id: 3,
    title: "Positive Behaviour Support",
    desc: "Our Positive Behaviour Support program focuses on understanding the reasons behind behaviours and teaching positive alternatives. We conduct functional behaviour assessments to identify triggers and create personalized support plans. By reinforcing adaptive behaviours and adjusting environments, we help children build self-regulation, communication, and coping skills. The goal is to replace frustration and challenges with independence and confidence, improving quality of life for both children and families through consistent, evidence-based guidance.",
    img: behaviourImage,
  },
  {
    id: 4,
    title: "Social Skills Groups",
    desc: "Social skills groups provide structured environments for children to learn social interaction, conversation, and teamwork. Using play-based methods, role-play, and group games, therapists guide children through real-life scenarios that teach sharing, listening, and empathy. Each session promotes connection and confidence, helping kids apply learned skills in classrooms, playgrounds, and community activities. Parents receive feedback and practical tips to support generalization, ensuring that new social abilities flourish across all environments.",
    img: socialImage,
  },
  {
    id: 5,
    title: "Daily Living Skills",
    desc: "We teach essential daily living skills that promote independence and confidence. Our therapists use step-by-step routines, visual schedules, and positive reinforcement to help children master self-care tasks such as dressing, feeding, brushing teeth, and staying safe. These life skills are critical for success at home and in the community. Each child’s program is customized to their pace and abilities, making every achievement meaningful while preparing them for greater independence over time.",
    img: dailyImage,
  },
  {
    id: 6,
    title: "Home-based Support",
    desc: "Home-based ABA therapy integrates learning into your family’s everyday life. Our therapists work within your child’s natural environment to teach communication, cooperation, and independence. We collaborate closely with parents during real routines — mealtimes, playtime, and transitions — to model effective techniques and reinforce consistent practice. This approach ensures that progress is meaningful, sustainable, and tailored to your child’s unique needs, helping families build stronger bonds and positive learning experiences together.",
    img: homeImage,
  },
];

export default function ServicesAlternatingCards() {
  // ✅ Function to trim text to ~80 words
  const trimText = (text, limit = 80) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6">
            <FaHeart className="w-4 h-4" />
            Our Services
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Empowering Every{" "}
            <span className="bg-white bg-clip-text text-transparent">Child</span>
          </h1>
          <div className="w-20 h-1.5 bg-white rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Providing evidence-based ABA therapy, parent coaching, and life
            skill training to help children reach their fullest potential.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {services.map((s, i) => (
          <div
            key={s.id}
            className={`flex flex-col lg:flex-row ${
              i % 2 !== 0 ? "lg:flex-row-reverse" : ""
            } rounded-3xl overflow-hidden shadow-lg bg-white transition-all duration-500 hover:shadow-2xl`}
            style={{ minHeight: "480px" }}
          >
            {/* ✅ Image Side */}
            <div className="lg:w-1/2 relative">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ✅ Text Side */}
            <div className="lg:w-1/2 p-10 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  {trimText(s.desc, 80)}
                </p>
              </div>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-amber-100 transition-all duration-300 shadow-md self-start animate-enquire group"
              >
                Enquire Now{" "}
                <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes enquirePulse {
          0% {
            transform: translateY(0);
            box-shadow: 0 6px 18px rgba(249, 115, 22, 0.12);
          }
          50% {
            transform: translateY(-4px);
            box-shadow: 0 18px 30px rgba(249, 115, 22, 0.18);
          }
          100% {
            transform: translateY(0);
            box-shadow: 0 6px 18px rgba(249, 115, 22, 0.12);
          }
        }

        .animate-enquire {
          animation: enquirePulse 3s ease-in-out infinite;
        }

        .animate-enquire:hover {
          animation-play-state: paused;
          transform: translateY(-2px);
          box-shadow: 0 22px 40px rgba(249, 115, 22, 0.22);
        }

        .animate-enquire:active {
          transform: translateY(0);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
          transition: transform 120ms;
        }
      `}</style>

      <ContactCTASection />
    </div>
  );
}
