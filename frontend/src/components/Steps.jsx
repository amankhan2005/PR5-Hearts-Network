 import step1Img from "../assets/steps/step1.png";
import step2Img from "../assets/steps/step2.png";
import step3Img from "../assets/steps/step3.png";

export default function Steps() {
  return (
    <section className="w-full py-24 bg-white">

      {/* HEADING */}
      <div className="text-center mb-16">
        <p className="text-[#23B14D] font-semibold uppercase tracking-wide flex items-center justify-center gap-2">
          <span className="text-yellow-400 text-xl">●</span>
          Our Process: Simple & Supportive
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-[#094B24] mt-3">
          Get Started In Just 3 Steps
        </h2>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-14 px-6">

        {/* STEP CARD START */}
        {[ 
          { img: step1Img, num: "01", title: "Make An Enquiry", text: "Please reach out and let us know about your child and family." },
          { img: step2Img, num: "02", title: "Personalized Plan", text: "Together, we'll design a plan that matches your goals." },
          { img: step3Img, num: "03", title: "Start Services", text: "Begin receiving high-quality, compassionate care." }
        ].map((item, index) => (
          <div key={index} className="group text-center">

            {/* IMAGE WITH GLOW */}
            <div className="relative w-48 h-48 mx-auto">
              
              {/* Glow Ring */}
              <div className="
                absolute inset-0 rounded-full 
                bg-[#23B14D]/20 blur-2xl scale-110 opacity-70
              "></div>

              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="
                  w-full h-full object-cover rounded-full 
                  shadow-lg border-4 border-white relative z-10
                "
              />

              {/* NUMBER BADGE */}
              <div className="
                absolute -bottom-3 left-1/2 -translate-x-1/2
                bg-[#23B14D] text-white 
                w-14 h-14 flex items-center justify-center
                rounded-full font-bold text-xl shadow-md
              ">
                {item.num}
              </div>
            </div>

            {/* CARD */}
            <div
              className="
                mt-10 p-8 rounded-2xl
                bg-white 
                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                transition-all duration-500
                group-hover:-translate-y-3
                group-hover:bg-gradient-to-b group-hover:from-[#23B14D] group-hover:to-[#1B923F]
                group-hover:text-white
              "
            >
              <h3
                className="
                  text-2xl font-semibold text-[#094B24]
                  transition-all duration-500 group-hover:text-white
                "
              >
                {item.title}
              </h3>

              <p className="
                mt-3 text-gray-700 leading-relaxed
                transition-all duration-500 group-hover:text-white
              ">
                {item.text}
              </p>
            </div>

          </div>
        ))}
        {/* STEP CARD END */}

      </div>

      {/* CTA BUTTON */}
      <div className="text-center mt-20">
        <a
          href="/contact-us"
          className="
            inline-flex items-center gap-2 px-10 py-4 
            bg-[#23B14D] text-white text-lg font-semibold 
            rounded-full shadow-md hover:bg-[#1fa750] 
            transition-all
          "
        >
          Start Your Journey →
        </a>
      </div>

    </section>
  );
}
