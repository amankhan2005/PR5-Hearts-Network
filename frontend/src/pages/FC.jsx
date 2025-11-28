 import { FaCheckCircle, FaHandsHelping, FaHeart, FaArrowRight } from "react-icons/fa";

export default function FC() {
  return (
    <div className="bg-white text-gray-800">

      {/* 🍃 HERO SECTION */}
      <section className="relative bg-green-600 py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Family Consultation (FC)
        </h1>

        <p className="text-white text-xl mt-5 max-w-3xl mx-auto">
          Professional support and guidance designed to help families strengthen routines, 
          improve communication, and build confidence in supporting their loved ones.
        </p>

        <div className="w-20 h-1.5 bg-white rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 WHAT IS FC */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0A3F24] text-center">
          What Is Family Consultation?
        </h2>

        <p className="text-gray-700 text-lg text-center mt-6 max-w-3xl mx-auto">
          Family Consultation (FC) provides caregivers with guidance, coaching, and practical 
          strategies to support their child's daily routines, communication, emotional well-being, 
          and overall development. The goal is to empower families with tools they can use at 
          home, school, and in the community.
        </p>

        <div className="w-20 h-1.5 bg-[#23B14D] rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 BENEFITS SECTION */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#E8FCEF] to-[#CFF6DF]">
        <div className="max-w-7xl mx-auto">

          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-14">
            Benefits of Family Consultation
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Strengthens communication and collaboration within the family",
              "Provides practical tools for managing daily routines",
              "Helps improve transitions, structure, and consistency at home",
              "Builds caregiver confidence in supporting their child",
              "Offers strategies for handling emotional and behavioral challenges",
              "Enhances coordination between home, school, and community settings"
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-3xl shadow-md border border-green-200 hover:border-[#23B14D] hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FaCheckCircle className="text-[#23B14D] text-xl" />
                  <h4 className="text-lg font-semibold text-[#0A3F24]">
                    {item}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🍃 WHO QUALIFIES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0A3F24] text-center">
          Who Can Receive FC Services?
        </h2>

        <p className="text-gray-700 text-lg mt-6 text-center max-w-3xl mx-auto">
          Family Consultation is available to parents, caregivers, and households who seek 
          expert guidance in supporting daily routines, communication, emotional growth, or 
          behavior management for their child or loved one.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            "Parents or caregivers needing support with routines and structure",
            "Families seeking guidance in communication or skill-building strategies",
            "Households facing daily challenges and looking for consistent tools",
            "Caregivers looking to strengthen confidence and understanding"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-[#23B14D] p-3 rounded-xl">
                <FaHeart className="text-white text-xl" />
              </div>
              <p className="text-gray-700 text-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🍃 WHAT FC PROVIDERS DO */}
      <section className="py-16 px-6 bg-[#F5FFF9]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-12">
            What Our Family Consultants Help With
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Developing structured routines and daily systems",
              "Coaching caregivers on effective home strategies",
              "Strengthening communication between family members",
              "Providing guidance for emotional and behavioral challenges",
              "Teaching practical, skill-building techniques",
              "Creating visual supports and tools for home success"
            ].map((item, i) => (
              <div
                key={i}
                className="group p-7 bg-white rounded-3xl shadow-md border border-green-200 hover:border-[#23B14D] hover:shadow-xl transition"
              >
                <FaHandsHelping className="text-[#23B14D] text-3xl mb-4" />
                <p className="text-gray-700 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🍃 CTA */}
      <section className="py-20 px-6 bg-white text-center">
        <h3 className="text-4xl font-bold text-[#0A3F24] mb-6">
          Need Support as a Caregiver?
        </h3>

        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-10">
          Our Family Consultation services equip caregivers with the tools, 
          knowledge, and confidence they need to support their child’s growth 
          and well-being.
        </p>

        <a
          href="/contact-us"
          className="inline-flex items-center gap-3 bg-[#23B14D] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#1e9c46] transition"
        >
          Get Started <FaArrowRight />
        </a>
      </section>

    </div>
  );
}
