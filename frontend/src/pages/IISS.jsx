 import { FaCheckCircle, FaHandsHelping, FaHeart, FaArrowRight } from "react-icons/fa";

export default function IISS() {
  return (
    <div className="bg-white text-gray-800">

      {/* 🍃 HERO SECTION */}
      <section className="relative bg-green-600 py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Individual Support Services (ISS)
        </h1>

        <p className="text-white text-xl mt-5 max-w-3xl mx-auto">
          Personalized one-on-one support that helps children and individuals build
          communication, social, emotional, and daily living skills at home or in the community.
        </p>

        <div className="w-20 h-1.5 bg-white rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 WHAT IS ISS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0A3F24] text-center">
          What Is Individual Support Services?
        </h2>

        <p className="text-gray-700 text-lg text-center mt-6 max-w-3xl mx-auto">
          Individual Support Services (ISS) provide structured one-on-one assistance to help
          individuals develop important life skills. These sessions focus on communication,
          social interaction, emotional growth, and daily living abilities — all tailored to
          the person’s unique needs and goals.
        </p>

        <div className="w-20 h-1.5 bg-[#23B14D] rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 BENEFITS SECTION */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#E8FCEF] to-[#CFF6DF]">
        <div className="max-w-7xl mx-auto">

          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-14">
            Benefits of ISS Support
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Personalized one-on-one skill-building support",
              "Improves communication & social interaction",
              "Promotes independence in daily routines",
              "Encourages emotional growth & confidence",
              "Supports community participation & engagement",
              "Uses structured, evidence-informed strategies"
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
          Who Can Receive ISS Services?
        </h2>

        <p className="text-gray-700 text-lg mt-6 text-center max-w-3xl mx-auto">
          ISS services are available to children, youth, or individuals who may benefit from
          structured skill-building, emotional support, or guided assistance in everyday routines.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            "Individuals who need extra support with communication and social skills",
            "Children or youth requiring guidance with daily routines",
            "Families seeking personalized one-on-one skill development",
            "Those who benefit from structured support at home or in the community"
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

      {/* 🍃 WHAT PROVIDERS DO */}
      <section className="py-16 px-6 bg-[#F5FFF9]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-12">
            What Our ISS Providers Help With
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Skill-building and guided learning",
              "Communication & social interaction",
              "Emotional regulation & coping strategies",
              "Daily living & self-help routines",
              "Community participation & safety awareness",
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
          Need Individual Support Services?
        </h3>

        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-10">
          Contact us to learn more about ISS and explore how personalized one-on-one support
          can help your child or loved one build confidence and essential skills.
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
