"use client";

import React from "react";
import { motion } from "framer-motion";
import { GiScrollQuill, GiSoundWaves, GiTrophyCup, GiSparkles, GiTempleGate } from "react-icons/gi";
import { FaAward, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 parchment-texture text-[#2b1810] relative overflow-hidden border-t border-b border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Photography in Ornate Victorian Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Elegant Victorian Double Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl p-2.5 bg-gradient-to-br from-[#d4af37] via-[#f5e6a8] to-[#8c5916]">
              <div className="rounded-2xl overflow-hidden border border-[#2e080c] relative aspect-[4/5] bg-black">
                <img
                  src="/images/hero_classical_tanpura.jpg"
                  alt="Authentic Indian Classical Tanpura Riyaz & Sangeet Sadhana"
                  className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0406]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-cinzel text-xs uppercase tracking-widest text-[#f5e6a8] font-bold block mb-1">
                    Authentic Sangeet Sadhana
                  </span>
                  <p className="font-cormorant text-base italic text-stone-200 leading-snug">
                    Rooted in the timeless tradition of Guru-Shishya Parampara.
                  </p>
                </div>
              </div>
            </div>

            {/* Antique Seal Badge */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-[#3b0d11] border-2 border-[#d4af37] text-white flex flex-col items-center justify-center p-2 shadow-2xl z-20 hidden sm:flex">
              <GiTempleGate className="text-[#e5c158] text-xl mb-0.5" />
              <span className="font-cinzel text-[10px] font-bold text-center leading-tight tracking-wider text-[#f5e6a8]">
                ESTD.<br />PARAMPARA
              </span>
            </div>
          </motion.div>

          {/* Right Column: Academy Story & Four Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2e2c4] border border-[#d4af37]/50 text-[#631820] font-cinzel text-xs font-bold uppercase tracking-widest mb-4">
              <span>⚜</span> The Heritage of Tamasha Bhawan
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-tight text-[#2e080c] leading-tight mb-6">
              A Noble Sanctuary For The <span className="italic font-playfair font-normal text-[#8c1d27]">Soul of Sangeet</span>
            </h2>

            <p className="font-cormorant text-xl text-[#3d2419] leading-relaxed mb-8">
              Founded on the timeless philosophy of <span className="font-semibold text-[#2e080c]">Guru-Shishya Parampara</span>, Tamasha Bhawan serves as an authentic bridge between ancient Indian classical heritage and modern musical pedagogy. Whether preparing for Gandharva Mahavidyalaya degrees or mastering UGC-NET Music examinations, our sanctuary guides learners from foundational svara accuracy to virtuosic raga mastery.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/90 border border-[#d4af37]/30 shadow-sm hover:border-[#d4af37] transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b0d11] text-[#f5e6a8] flex items-center justify-center text-base">
                    <GiSoundWaves />
                  </div>
                  <h3 className="font-cinzel font-bold text-sm text-[#2e080c]">Swara Sadhana</h3>
                </div>
                <p className="font-cormorant text-sm text-gray-700 leading-snug">
                  Precision in pitch placement, voice projection, and the deep emotional resonance of each note.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#d4af37]/30 shadow-sm hover:border-[#d4af37] transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b0d11] text-[#f5e6a8] flex items-center justify-center text-base">
                    <GiScrollQuill />
                  </div>
                  <h3 className="font-cinzel font-bold text-sm text-[#2e080c]">Grantha & Shastra</h3>
                </div>
                <p className="font-cormorant text-sm text-gray-700 leading-snug">
                  In-depth study of Sangeet Ratnakar, Natya Shastra, and essential treatises for UGC-NET.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#d4af37]/30 shadow-sm hover:border-[#d4af37] transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b0d11] text-[#f5e6a8] flex items-center justify-center text-base">
                    <GiTrophyCup />
                  </div>
                  <h3 className="font-cinzel font-bold text-sm text-[#2e080c]">Certified Degrees</h3>
                </div>
                <p className="font-cormorant text-sm text-gray-700 leading-snug">
                  Structured syllabus aligning with Akhil Bhartiya Gandharva Mahavidyalaya exam certifications.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#d4af37]/30 shadow-sm hover:border-[#d4af37] transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b0d11] text-[#f5e6a8] flex items-center justify-center text-base">
                    <FaBookOpen />
                  </div>
                  <h3 className="font-cinzel font-bold text-sm text-[#2e080c]">Academic Mentorship</h3>
                </div>
                <p className="font-cormorant text-sm text-gray-700 leading-snug">
                  One-on-one riyaz correction, swaralipi notations, and tailored faculty feedback.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#3b0d11] text-[#f5e6a8] rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-[#521319] transition shadow-md inline-flex items-center gap-2"
              >
                Read Academy Heritage →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
