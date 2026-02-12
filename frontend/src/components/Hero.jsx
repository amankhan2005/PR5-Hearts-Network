 import { useEffect, useState } from "react";
import heroDefault from "../assets/Banner/hero.png";

export default function Hero() {
  const [hero, setHero] = useState({
    tagline: "Empowering People, Supporting Futures",
    line1: "EMPOWERING",
    line2: "FAMILIES",
    line3: "AND",
    line4: "INDIVIDUALS",
    description:
      "Looking for reliable support related to medical needs, educational guidance, or personal development? We assist individuals and families with trusted resources — provided with care, clarity, and confidence.\n\nFrom essential service connections to hands-on support, we ensure you're informed, empowered, and supported every step of the way.",
    buttonText: "Book A Consultation →",
    buttonLink: "/contact-us",
    image: heroDefault, // default banner always shows
  });

  useEffect(() => {
    const backend = import.meta.env.VITE_BACKEND_URL;

    fetch(`${backend}/api/hero-pr5`)
      .then((res) => res.json())
      .then((data) => {
        setHero((prev) => ({
          ...prev,
          ...data,
          image: data?.image ? backend + data.image : heroDefault,
        }));
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="
        relative w-full min-h-[650px] md:min-h-[900px] overflow-hidden
        bg-gradient-to-b from-[#1A8A3A] via-[#23B14D] to-[#6BE58B]
        pt-16 md:pt-20 pb-16 md:pb-20
      "
    >
      <div
        className="
          max-w-7xl mx-auto px-4 md:px-6 
          grid grid-cols-1 md:grid-cols-2 
          gap-12 md:gap-10 items-center
        "
      >
        {/* LEFT TEXT */}
        <div className="text-white space-y-6 md:space-y-8 md:pr-10 text-center md:text-left">

          {/* TAGLINE */}
          <p className="uppercase tracking-wide font-semibold text-sm md:text-base opacity-95">
            {hero.tagline}
          </p>

          {/* 4-LINE HEADING */}
          <h1
            className="
              text-3xl sm:text-4xl md:text-6xl
              font-extrabold leading-tight
            "
          >
            {hero.line1} <br />
            {hero.line2} <br />
            {hero.line3} <br />
            {hero.line4}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-95 whitespace-pre-line">
            {hero.description}
          </p>

          {/* BUTTON */}
          <a
            href={hero.buttonLink}
            className="
              inline-block bg-white text-[#23B14D] font-semibold 
              px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-md 
              transition hover:bg-green-50 mt-2 sm:mt-4
            "
          >
            {hero.buttonText}
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:block mt-6 md:mt-0">

          {/* BACKDROP */}
          <div
            className="
              hidden md:block
              absolute -right-36 top-16 
              w-[950px] h-[950px]
              bg-white/30
              rounded-tl-[55%] rounded-bl-[55%]
              rotate-[-12deg]
            "
          ></div>

          {/* HERO IMAGE */}
          <img
            src={hero.image}
            alt="Support Services Banner"
            className="
              relative z-10
              w-[95%] sm:w-[85%] md:w-[120%] lg:w-[120%]
              max-w-none
              h-auto object-cover
            "
          />
        </div>

      </div>
    </section>
  );
}
