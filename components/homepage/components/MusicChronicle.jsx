"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaFeatherAlt, FaClock } from "react-icons/fa";
import { GiScrollUnfurled, GiFountainPen } from "react-icons/gi";

const MusicChronicle = () => {
  const articles = [
    {
      id: "khayal-evolution",
      tag: "Gharana History",
      title: "The Evolution of Khayal: From Royal Darbars to Modern Gharanas",
      excerpt: "Unraveling how the sublime architecture of Khayal gayaki overtook Dhrupad during the late Mughal era, branching into the iconic aesthetic lineages of Gwalior, Agra, and Kirana.",
      readTime: "7 min read",
      author: "Pandit Sangeetacharya",
      date: "Classical Lore"
    },
    {
      id: "shruti-physics",
      tag: "Acoustics & Svara",
      title: "The Microtonal Tapestry: Decoding the 22 Shrutis of Indian Music",
      excerpt: "A profound exploration into the mathematical ratios and emotional temperaments of Shrutis that differentiate delicate komal swaras across Raga Todi, Darbari, and Bhairav.",
      readTime: "5 min read",
      author: "Musicology Faculty",
      date: "Theory & Science"
    },
    {
      id: "samay-siddhanta",
      tag: "Raga Aesthetics",
      title: "Samay Siddhanta: The Classical Time Theory & Circadian Rhythms",
      excerpt: "Why is Raga Bhairav reserved for dawn while Raga Yaman reigns at dusk? The scientific and metaphysical connections between diurnal cycles, emotional rasas, and svara frequencies.",
      readTime: "9 min read",
      author: "Tamasha Bhawan Scholar",
      date: "Aesthetic Shastra"
    }
  ];

  return (
    <section id="chronicle" className="py-24 px-6 md:px-16 dark-velvet-bg text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase tracking-widest mb-4">
            <GiScrollUnfurled className="text-[#e5c158]" /> The Sangeet Chronicle
          </div>
          
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-stone-100 tracking-tight mb-4">
            Sacred Manuscripts & <span className="gold-gradient-text italic font-playfair font-normal">Music Lore</span>
          </h2>
          
          <div className="flourish-divider w-48 mx-auto my-3">
            <span>⚜</span>
          </div>

          <p className="font-cormorant text-xl text-[#f0e6d2]/85 leading-relaxed font-light mt-4">
            Immerse your intellect in analytical treatises, historical anecdotes, and acoustic philosophy penned for classical scholars.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-gradient-to-b from-[#25060a] to-[#160305] border border-[#d4af37]/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#3b0d11] text-[#f5e6a8] border border-[#d4af37]/30 text-xs font-cinzel font-bold">
                    {art.tag}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                    <FaClock /> {art.readTime}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#f5e6a8] transition-colors leading-snug mb-4">
                  {art.title}
                </h3>

                <p className="font-cormorant text-base text-[#f0e6d2]/80 leading-relaxed mb-6 font-light">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaFeatherAlt className="text-[#d4af37] text-xs" />
                  <span className="font-cormorant text-sm italic text-stone-300">{art.author}</span>
                </div>

                <button
                  onClick={() => alert(`"${art.title}" — Full treatise reading module coming soon in the Tamasha Bhawan Digital Library!`)}
                  className="text-xs font-cinzel font-bold text-[#e5c158] hover:text-[#f5e6a8] uppercase tracking-wider transition"
                >
                  Read Manuscript →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MusicChronicle;
