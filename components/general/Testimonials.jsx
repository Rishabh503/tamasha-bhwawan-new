"use client";

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Roy",
      role: "Gandharva Exam Qualifier (Visharad)",
      course: "Classical Vocal Mastery",
      text: "Tamasha Bhawan transformed my understanding of swara and raga dynamics. The personalized feedback on my riyaz and the structured Gandharva syllabus guided me to distinction in my examinations.",
      location: "New Delhi"
    },
    {
      id: 2,
      name: "Rohan V. Sharma",
      role: "UGC-NET Music Scholar",
      course: "UGC-NET Music & Shastra",
      text: "The conceptual depth in Sangeet Ratnakar, Gharana genealogies, and ancient treatises provided here is unparalleled. The live quizzes made exam revision sharp and engaging.",
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Meera Krishnan",
      role: "Performing Vocalist",
      course: "Light Classical & Bhava",
      text: "The voice culture and bhava expression techniques unlocked an entirely new dimension in my Thumri and Ghazal phrasing. Every lesson is an intimate musical journey.",
      location: "Bengaluru"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-16 parchment-texture text-[#2b1810] relative border-b-2 border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2e2c4] border border-[#d4af37]/50 text-[#631820] font-cinzel text-xs font-bold uppercase tracking-widest mb-4">
            <GiLaurelCrown className="text-[#8c1d27] text-base" /> Scholar Accolades
          </div>
          
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-[#2e080c] tracking-tight mb-4">
            Voices of the <span className="italic font-playfair font-normal text-[#8c1d27]">Sangeet Sadhaks</span>
          </h2>
          
          <div className="flourish-divider w-48 mx-auto my-3">
            <span>⚜</span>
          </div>

          <p className="font-cormorant text-xl text-[#4a2e20] leading-relaxed font-light mt-4">
            Hear from dedicated learners and scholars who have elevated their musical journey with Tamasha Bhawan.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white/95 rounded-3xl p-8 border-2 border-[#d4af37]/40 shadow-xl flex flex-col justify-between relative hover:border-[#d4af37] hover:shadow-2xl transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <FaQuoteLeft className="text-[#d4af37] text-2xl opacity-60" />
                  <div className="flex text-amber-500 text-xs gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <p className="font-cormorant text-lg text-[#3d2419] italic leading-relaxed mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel font-bold text-base text-[#2e080c]">{t.name}</h4>
                  <p className="text-xs font-sans-modern text-stone-500">{t.role}</p>
                  <span className="text-[11px] font-semibold text-[#8c1d27] font-cinzel block mt-0.5">
                    {t.course}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">
                  {t.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
