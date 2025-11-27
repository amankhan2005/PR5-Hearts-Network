 import heroImg from "../assets/Banner/hero.png";

export default function Hero() {
  return (
    <section className="
      relative w-full min-h-[650px] md:min-h-[900px] overflow-hidden
      bg-gradient-to-b from-[#1A8A3A] via-[#23B14D] to-[#6BE58B]
      pt-16 md:pt-20 pb-16 md:pb-20
    ">

      <div className="
        max-w-7xl mx-auto px-4 md:px-6 
        grid grid-cols-1 md:grid-cols-2 
        gap-12 md:gap-10 items-center
      ">

        {/* LEFT TEXT */}
        <div className="text-white space-y-6 md:space-y-8 md:pr-10 text-center md:text-left">

          {/* TAGLINE */}
          <p className="uppercase tracking-wide font-semibold flex items-center gap-2 text-sm md:text-base justify-center md:justify-start">
            <span className="text-yellow-300 text-lg md:text-xl">●</span>
            Unleash Potential, Forge Brighter Paths
          </p>

          {/* ⭐ RESPONSIVE HEADING ⭐ */}
          <h1 className="
            text-3xl sm:text-4xl md:text-6xl 
            font-extrabold leading-tight
          ">
            BEST AUTISM <br className="hidden sm:block" />
            SUPPORT SERVICES <br className="hidden sm:block" />
            IN MARYLAND
          </h1>

          {/* PARAGRAPH */}
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-95">
            Looking for Autism Waiver services for your child? At PR5-Hearts Network,
            we know every step on the autism journey matters—big or small, each one
            deserves to be celebrated.
            <br /><br />
            We walk alongside families with compassion, practical tools, and
            personalized care so your child can grow with confidence and your
            family feels supported every step of the way.
          </p>

          {/* BUTTON */}
          <a
            href="/contact"
            className="
              inline-block bg-white text-[#23B14D] font-semibold 
              px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-md 
              transition hover:bg-green-50 mt-2 sm:mt-4
            "
          >
            Book A Consultation →
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:block mt-6 md:mt-0">

          {/* HIDE BIG BACKDROP ON MOBILE */}
          <div className="
            hidden md:block
            absolute -right-64 top-5 
            w-[1300px] h-[1300px] 
            bg-white/40 rounded-tl-[55%] rounded-bl-[55%]
            rotate-[-15deg]
          "></div>

          {/* RESPONSIVE IMAGE */}
          <img
            src={heroImg}
            alt="Autism Care Support"
            className="
              relative z-10 
              w-[75%] sm:w-[60%] md:w-[120%] 
              max-w-xs sm:max-w-sm md:max-w-none 
              h-auto object-cover
            "
          />
        </div>

      </div>

    </section>
  );
}
