 import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const serviceFaqs = {
    "Respite Care (RC)": [
      {
        q: "What is Respite Care (RC)?",
        a: "Respite Care provides temporary relief for families by offering safe, supervised, and structured support for their child or loved one."
      },
      {
        q: "Where is RC provided?",
        a: "RC can be provided at home or in community settings depending on the family's needs and preferences."
      },
      {
        q: "Who delivers Respite Care?",
        a: "Trained respite providers who ensure safety, structure, engagement, and professional short-term support."
      },
      {
        q: "How does RC benefit families?",
        a: "It allows caregivers time to rest, attend appointments, manage responsibilities, and reduce stress — while their child is in safe hands."
      }
    ],

    "Individual Support Services (ISS)": [
      {
        q: "What is ISS?",
        a: "ISS offers personalized one-on-one support focused on communication, daily routines, social interaction, emotional skills, and independence."
      },
      {
        q: "Where is ISS delivered?",
        a: "ISS can be provided at home, in the community, or in other natural environments to help individuals build real-life skills."
      },
      {
        q: "What skills does ISS focus on?",
        a: "Communication, social interaction, independence, daily living routines, emotional regulation, and confidence-building."
      },
      {
        q: "Who can receive ISS?",
        a: "Children, youth, or individuals who benefit from guided support, skill-building, and structured one-on-one assistance."
      }
    ],

    "Family Consultation (FC)": [
      {
        q: "What is Family Consultation?",
        a: "Family Consultation provides caregivers with professional guidance, coaching, and strategies to support their child’s daily routines and personal development."
      },
      {
        q: "Why is FC important?",
        a: "It equips families with tools for communication, emotional support, structure, and building positive daily habits."
      },
      {
        q: "Who can receive FC services?",
        a: "Parents or caregivers seeking assistance with routines, communication strategies, emotional support, or daily challenges."
      },
      {
        q: "How often does FC occur?",
        a: "Frequency varies based on family needs — typically a few times per month for ongoing guidance and support."
      }
    ]
  };

  const [openIndex, setOpenIndex] = useState({});

  const toggleFAQ = (category, index) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index
    }));
  };

  return (
    <div className="bg-white text-gray-800">

      {/* 🍃 HERO */}
      <section className="relative bg-green-600 py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          FAQs
        </h1>
        <p className="text-white text-xl mt-5 max-w-3xl mx-auto">
          Find answers to common questions about our support services: RC, ISS, and FC.
        </p>
        <div className="w-20 h-1.5 bg-white rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 FAQ SECTIONS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">

        {Object.entries(serviceFaqs).map(([category, faqs], catIndex) => (
          <div key={catIndex} className="mb-20">

            {/* CATEGORY TITLE */}
            <h2 className="text-4xl font-bold text-[#0A3F24] text-center mb-6">
              {category}
            </h2>
            <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-12">
              Answers to the most frequently asked questions about our {category} service.
            </p>

            {/* FAQ ACCORDION */}
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((item, index) => {
                const isOpen = openIndex[category] === index;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-3xl border transition-all duration-300 shadow-md 
                    ${isOpen ? "border-[#23B14D] shadow-green-100" : "border-gray-200 hover:border-[#23B14D] hover:shadow-lg"}`}
                  >
                    <button
                      onClick={() => toggleFAQ(category, index)}
                      className="w-full flex items-center justify-between px-6 py-6 text-left group"
                    >
                      <h3
                        className={`text-lg font-semibold 
                        ${isOpen ? "text-[#23B14D]" : "text-[#0A3F24] group-hover:text-[#23B14D]"}`}
                      >
                        {item.q}
                      </h3>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform duration-300 
                        ${isOpen ? "rotate-180 text-[#23B14D]" : "text-gray-400 group-hover:text-[#23B14D]"}`}
                      />
                    </button>

                    <div
                      className={`px-6 transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-gray-700 leading-relaxed border-t pt-4">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
