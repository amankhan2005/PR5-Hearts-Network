 import { FaCheckCircle, FaHandsHelping, FaHeart, FaArrowRight } from "react-icons/fa";

export default function IISS() {
  return (
    <div className="bg-white text-gray-800">

      {/* 🍃 HERO SECTION */}
      <section className="relative bg-green-600 py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Intensive Individual Support Services (IISS)
        </h1>

        <p className="text-white text-xl mt-5 max-w-3xl mx-auto">
          Personalized one-on-one behavioral support and adaptive skills training 
          for children enrolled in the Maryland Autism Waiver.
        </p>

        <div className="w-20 h-1.5 bg-white rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 WHAT IS IISS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0A3F24] text-center">
          What Is IISS?
        </h2>

        <p className="text-gray-700 text-lg text-center mt-6 max-w-3xl mx-auto">
          Intensive Individual Support Services (IISS) are one-on-one, structured 
          support sessions designed to help children with autism build behavioral, 
          communication, and adaptive living skills. These services are tailored to 
          each child’s needs and are delivered at home or in the community.
        </p>

        <div className="w-20 h-1.5 bg-[#23B14D] rounded-full mx-auto mt-8"></div>
      </section>

      {/* 🍃 BENEFITS SECTION */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#E8FCEF] to-[#CFF6DF]">
        <div className="max-w-7xl mx-auto">

          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-14">
            Benefits of IISS Support
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Personalized one-on-one skill-building support",
              "Improves communication & social skills",
              "Promotes independence in daily routines",
              "Enhances emotional regulation & positive behaviors",
              "Supports community engagement & participation",
              "Evidence-based teaching strategies tailored to the child"
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
          Who Qualifies for IISS Services?
        </h2>

        <p className="text-gray-700 text-lg mt-6 text-center max-w-3xl mx-auto">
          IISS services are available to children and adolescents who are enrolled 
          in the Maryland Autism Waiver and require structured, individualized 
          behavioral or adaptive living support.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            "Children (birth–21 years) diagnosed with autism",
            "Enrolled in the Maryland Autism Waiver",
            "Require support with communication, behavior, or daily living skills",
            "Need structured one-on-one guidance at home or in the community"
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

      {/* 🍃 WHAT OUR IISS PROVIDERS DO */}
      <section className="py-16 px-6 bg-[#F5FFF9]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0A3F24] text-center mb-12">
            What Our IISS Providers Help With
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Behavioral skill-building",
              "Communication & social interaction",
              "Emotional regulation strategies",
              "Daily living & self-help routines",
              "Community participation & safety awareness",
              "Encouraging independence & confidence"
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
          Need Intensive Support for Your Child?
        </h3>

        <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-10">
          Connect with our team to learn more about IISS and begin your Maryland 
          Autism Waiver support journey.
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
