"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaWhatsapp } from "react-icons/fa";
import { GiGrandPiano } from "react-icons/gi";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 dark-velvet-bg text-white overflow-hidden border-t-2 border-[#d4af37]/40">
      {/* Victorian Ornate Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#380b10_0%,_#1a0406_100%)] opacity-90"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#3b0d11] border-2 border-[#d4af37] text-[#e5c158] flex items-center justify-center text-3xl mb-6 shadow-xl">
          <GiGrandPiano />
        </div>

        <h2 className="font-cinzel text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          Begin Your Sacred <span className="gold-gradient-text italic font-playfair font-normal">Sangeet Journey</span>
        </h2>

        <div className="flourish-divider w-56 my-3">
          <span>⚜</span>
        </div>

        <p className="font-cormorant text-xl sm:text-2xl text-[#f0e6d2]/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Enroll in our Gandharva certified programs or connect directly with our music faculty for personalized guidance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <a
            href="https://forms.gle/DMSC7CvMzZvCq8feA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaGraduationCap className="text-lg" />
            Apply For Admission Now
          </a>

          <a
            href="https://wa.me/919310395103"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2e080c]/80 border border-[#d4af37]/60 text-[#f5e6a8] font-cinzel font-semibold text-sm tracking-wider uppercase hover:bg-[#3d0b11] hover:border-[#d4af37] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaWhatsapp className="text-lg text-green-400" />
            Chat On WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;