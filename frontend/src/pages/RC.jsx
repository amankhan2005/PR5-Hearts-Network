 import { FaCheckCircle, FaHandsHelping, FaHeart, FaArrowRight } from "react-icons/fa";

export default function RC() {
  return (
    <div className="bg-white text-gray-800">

      {/* 🍃 HERO SECTION */}
      <section className="relative bg-green-600 py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Respite Care (RC) Services in Maryland
        </h1>

        <p className="text-white text-xl mt-5 max-w-3xl mx-auto">
          Compassionate, temporary support designed for Maryland families caring for children with autism through the Autism Waiver Program.
        </p>

        <div className="w-20 h-1.5 bg-white rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 WHAT IS RC */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0A3F24] text-center">
          What Is Respite Care?
        </h2>

        <p className="text-gray-700 text-lg text-center mt-6 max-w-3xl mx-auto">
          Respite Care (RC) is a short-term support service that provides relief to families caring for a child with autism. 
          It allows caregivers time to rest, manage personal responsibilities, and reduce stress while ensuring their child receives
          safe, structured, and professional supervision.
        </p>

        <div className="w-20 h-1.5 bg-[#23B14D] rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 BENEFITS SECTION */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#E8FCEF] to-[#CFF6DF]">
        <div className="max-w-7xl mx-auto">

          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-14">
            Benefits of Respite Care for Autism Families
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Safe and structured supervision by trained professionals",
              "Gives caregivers essential time for rest, work, and personal needs",
              "Improves emotional regulation and reduces stress-related behaviors",
              "Helps families during emergencies or high-stress situations",
              "Supports overall mental and emotional well-being of families",
              "Includes enriching, meaningful activities for children"
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
          Who Qualifies for Respite Care Services?
        </h2>

        <p className="text-gray-700 text-lg mt-6 text-center max-w-3xl mx-auto">
          Children enrolled in the Maryland Autism Waiver who require temporary supervision, structured support,
          or assistance with daily routines are eligible for Respite Care services.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            "Children (birth–21 years) diagnosed with autism and enrolled in the Maryland Autism Waiver",
            "Families needing short-term caregiving relief",
            "Parents unable to provide supervision due to work, appointments, or personal needs",
            "Households experiencing emergencies, schedule conflicts, or high-stress periods"
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

      {/* 🍃 WHAT OUR RC PROVIDERS DO */}
      <section className="py-16 px-6 bg-[#F5FFF9]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-12">
            What Our Respite Care Providers Support With
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Supervision and safety monitoring",
              "Engaging, structured play and activities",
              "Support with daily living routines (non-medical)",
              "Reinforcing positive behavior strategies",
              "Promoting communication skills",
              "Encouraging independence and confidence"
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
          Need Respite Care Support in Maryland?
        </h3>

        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-10">
          Contact us to learn more about Respite Care and begin your Maryland Autism Waiver enrollment process.
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
