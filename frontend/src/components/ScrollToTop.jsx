 import React, { useEffect, useState } from "react";

export default function ScrollToTop({
  threshold = 250,
  bottom = "4rem",
  right = "1.25rem",
  size = 48,
  ariaLabel = "Scroll to top",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const wrapperStyle = {
    position: "fixed",
    right,
    bottom,
    zIndex: 9999,
  };

  return (
    <div style={wrapperStyle} aria-hidden={!visible}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
          hover:shadow-yellow-400/50 focus:outline-none`}
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #23B14D, #0A3F24)", // GREEN THEME
          color: "white",
        }}
      >
        {/* Bold thick arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          style={{ width: size * 0.5, height: size * 0.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
