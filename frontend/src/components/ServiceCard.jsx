 import { Link } from "react-router-dom";

export default function ServiceCard({ title, desc, link, Icon }) {
  return (
    <div
      className="
      bg-white 
      rounded-3xl 
      p-10 
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      border border-transparent
      hover:border-[#23B14D]/40
      hover:shadow-[0_12px_45px_rgba(0,0,0,0.12)]
      transition-all 
      duration-300
      relative
      group
      h-full                      /* ⭐ Full height */
      flex flex-col justify-between   /* ⭐ Align inner content equal */
    "
    >
      {/* ICON */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="
          absolute inset-0 
          bg-[#23B14D]/15 
          rounded-full 
          blur-xl
        "></div>

        <div className="
          relative w-full h-full flex items-center justify-center 
          bg-[#23B14D] 
          rounded-full 
          shadow-lg
          group-hover:scale-110
          transition-all duration-300
        ">
          <Icon className="text-white text-4xl" />
        </div>
      </div>

      {/* TITLE */}
      <h3 className="
        text-2xl font-bold 
        text-gray-900 text-center 
        group-hover:text-[#23B14D]
        transition-all duration-300
      ">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 text-center mt-4 leading-relaxed flex-grow">
        {desc}
      </p>

      {/* CTA */}
      <Link
        to={link}
        className="
          mt-6 mx-auto block w-fit
          text-[#23B14D] 
          font-semibold 
          text-lg
          group-hover:underline
          flex items-center gap-2
        "
      >
        Learn More →
      </Link>
    </div>
  );
}
