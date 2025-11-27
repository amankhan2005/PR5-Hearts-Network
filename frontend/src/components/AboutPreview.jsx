 import React from "react";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import aboutImage from "../assets/Home/about-uspreview.webp"; // ✅ Import your local image here

export default function AboutPreview() {
  return (
    <section
      id="about-preview"
      className="max-w-7xl mx-auto px-6 py-16 md:py-16 relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white"
    >
      {/* Subtle Background Decorations */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-orange-50/50 to-amber-50/50 rounded-full filter blur-3xl -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <div className="space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
            <Sparkles className="w-4 h-4" />
            Evidence-Based ABA Therapy
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
              Empowering
              <br />
              Children,
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Supporting
                <br />
                Families
              </span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="text-gray-700 leading-relaxed text-lg">
              At{" "}
              <span className="text-orange-600 font-semibold">
                Autism ABA Partners
              </span>
              , we believe every child deserves the opportunity to reach their
              fullest potential. Our mission is to deliver compassionate,
              evidence-based ABA therapy that empowers children with autism to
              develop stronger communication, social, and life skills.
            </p>

            <p className="text-gray-600 leading-relaxed text-base">
              Our team blends scientific precision with heartfelt empathy to
              design individualized treatment plans. Every program is crafted to
              ensure families receive care that's personal, effective, and
              rooted in genuine understanding.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/about-us-us"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="/contact-us"
              className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 border-2 border-gray-200 hover:border-orange-300"
            >
              Get Started
              <Heart className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent z-10"></div>

              {/* ✅ Local Image Used Here */}
              <img
                src={aboutImage}
                alt="Therapist working with child - Autism ABA Partners"
                className="w-full max-w-lg h-[750px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/98 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-20 border border-white/20 transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-gray-900 mb-1">
                      Compassionate Care
                    </div>
                    <div className="text-sm text-gray-600 leading-snug">
                      Individualized therapy plans designed for every child's
                      unique journey
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-orange-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-amber-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
