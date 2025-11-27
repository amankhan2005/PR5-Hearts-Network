import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle, CheckCircle } from "lucide-react";

const faqs = [
  {
    q: "How many sessions will my child need?",
    a: "Session frequency depends on the initial assessment and treatment goals. Many families start with 10–20 hours/week for intensive programs, then adjust as progress is measured. We review plans every 3 months.",
    icon: "sessions"
  },
  {
    q: "Do you accept insurance?",
    a: "Yes — we accept many major U.S. insurance plans. Our intake team will verify benefits and explain any out-of-pocket costs before treatment begins.",
    icon: "insurance"
  },
  {
    q: "Is telehealth/online therapy effective?",
    a: "Telehealth can be very effective for parent training, consultation, and many skill-building goals. We use a hybrid approach when needed — combining in-person and telehealth sessions.",
    icon: "telehealth"
  },
  {
    q: "Do parents need to be involved?",
    a: "Yes — parent participation is a core part of our approach. We provide coaching and practical strategies so gains made in sessions generalize to home and school settings.",
    icon: "parents"
  },
];

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (openIndex === idx) {
        el.style.maxHeight = el.scrollHeight + "px";
        el.style.opacity = "1";
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
      }
    });
  }, [openIndex]);

  return (
    <section
      id="faq-preview"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-16 lg:py-16 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-orange-50/30 to-amber-50/30 rounded-full filter blur-3xl -z-10"></div>

      {/* Header */}
      <header className="mb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 px-5 py-2.5 rounded-full text-sm font-medium">
          <HelpCircle className="w-4 h-4" />
          Common Questions
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get clear answers to the most common questions about our{" "}
          <span className="text-orange-600 font-semibold">ABA therapy</span>, parent
          coaching, and telehealth services.
        </p>

        <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
      </header>

      {/* 2x2 Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={f.q}
              className={`group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border-2 transition-all duration-300 ${
                isOpen 
                  ? "border-orange-400 shadow-orange-100" 
                  : "border-gray-100 hover:border-orange-200"
              }`}
            >
              {/* Question Header */}
              <button
                type="button"
                className="w-full text-left p-6 sm:p-7 focus:outline-none"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-toggle-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {/* Number Badge */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isOpen 
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600"
                      }`}>
                        {i + 1}
                      </div>
                      
                      <h3 className={`text-lg sm:text-xl font-bold leading-snug transition-colors duration-300 ${
                        isOpen
                          ? "text-orange-600"
                          : "text-gray-900 group-hover:text-orange-600"
                      }`}>
                        {f.q}
                      </h3>
                    </div>
                  </div>

                  {/* Chevron Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-orange-100 text-orange-600 rotate-180"
                      : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600"
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Answer Panel */}
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-toggle-${i}`}
                className="px-6 sm:px-7 transition-[max-height,opacity] duration-300 ease-out overflow-hidden"
                ref={(el) => (contentRefs.current[i] = el)}
                style={{ maxHeight: 0, opacity: 0 }}
              >
                <div className="pb-6 sm:pb-7 pt-2">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed text-base">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
    </section>
  );
}