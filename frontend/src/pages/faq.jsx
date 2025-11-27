 import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const serviceFaqs = {
    "Respite Care (RC)": [
      {
        q: "What is Respite Care (RC)?",
        a: "Respite Care provides temporary relief for families by offering safe and supervised care for children enrolled in the Autism Waiver."
      },
      {
        q: "Where is RC provided?",
        a: "RC can be provided in the home or community settings depending on the family's needs."
      },
      {
        q: "Who delivers Respite Care?",
        a: "Trained respite providers who ensure safety, structure, and support for the child."
      },
      {
        q: "How does RC benefit families?",
        a: "It gives caregivers time to rest, manage responsibilities, and reduce stress while their child is supported professionally."
      }
    ],

    "Intensive Individual Support Services (IISS)": [
      {
        q: "What is IISS?",
        a: "IISS offers one-on-one behavioral and adaptive skills training for children enrolled in the Maryland Autism Waiver."
      },
      {
        q: "Where is IISS delivered?",
        a: "IISS is delivered at home or in the community to help children build real-life skills."
      },
      {
        q: "What skills does IISS focus on?",
        a: "Communication, social skills, independence, daily routines, emotional regulation, and behavior support."
      },
      {
        q: "Who qualifies for IISS?",
        a: "Children birth–21 enrolled in the Autism Waiver who need individualized behavioral or adaptive support."
      }
    ],

    "Family Consultation (FC)": [
      {
        q: "What is Family Consultation?",
        a: "Family Consultation provides caregiver guidance, training, and behavior management strategies."
      },
      {
        q: "Why is FC important?",
        a: "It equips parents with tools to manage behaviors, strengthen routines, and support daily skill development."
      },
      {
        q: "Who receives FC services?",
        a: "Parents and caregivers of children enrolled in the Autism Waiver."
      },
      {
        q: "How often does FC occur?",
        a: "Frequency depends on the child's plan and family needs, usually a few times per month."
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
          Find answers to common questions about our Maryland Autism Waiver services: RC, IISS, and FC.
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
                      <h3 className={`text-lg font-semibold 
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
