"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCheckCircle, FaAward, FaCalendarAlt, FaClock, FaCertificate } from "react-icons/fa";
import { GiMusicalNotes, GiBookmarklet } from "react-icons/gi";
import Link from "next/link";

const Pathways = () => {
  const courses = [
    {
      id: "classical-gandharva",
      badge: "Govt. Recognized Certification",
      title: "Learn Indian Classical Vocal Music",
      subtitle: "Official Syllabus of Akhil Bhartiya Gandharva Mahavidyalaya (Pune)",
      desc: "A rigorous and divine journey through the foundational pillars of Hindustani Classical Vocal. Designed for scholars seeking formal certification, university preparation, and profound swara mastery.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200",
      features: [
        "Complete preparation for Gandharva Mahavidyalaya exams",
        "Deep exploration of Ragas: Yaman, Bhairav, Jaunpuri, Bageshri & more",
        "Khayal gayaki, Bandishes, Taan patterns & Laya variations",
        "Personalized one-on-one Riyaz correction and guidance",
        "Comprehensive PDF Notes, Swaralipi notations & audio stems"
      ],
      level: "Prarambhik to Visharad",
      duration: "Structured Semester / Flexible",
      enrollLink: "https://forms.gle/DMSC7CvMzZvCq8feA",
      popular: true
    },
    {
      id: "hindustani-light",
      badge: "Voice Culture & Performance",
      title: "Learn Hindustani Light Classical & Bhava",
      subtitle: "Mastering Thumri, Dadra, Ghazal, and Voice Placement",
      desc: "Unlock the expressive soul of your singing voice. Learn how to blend classical pitch accuracy with emotive aesthetics, microtonal meends, and soul-stirring semi-classical genres.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200",
      features: [
        "Voice Culture: Breath control, octave range expansion, and resonance",
        "Techniques of Thumri, Dadra, Bhajans & Ghazal phrasing",
        "Murki, Khatka, and Meend ornamentation training",
        "Singing with Tanpura & Tabla accompaniment",
        "Studio recording insights & live performance etiquette"
      ],
      level: "Beginner to Intermediate",
      duration: "Flexible Batches",
      enrollLink: "https://forms.gle/DMSC7CvMzZvCq8feA",
      popular: false
    }
  ];

  return (
    <section id="courses" className="py-24 px-6 md:px-16 dark-velvet-bg text-white relative overflow-hidden">
      {/* Victorian Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase tracking-widest mb-4">
            <GiMusicalNotes className="text-[#e5c158]" /> Curated Classical Curriculums
          </div>
          
          <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-stone-100 tracking-tight mb-4">
            Pathways to <span className="gold-gradient-text italic font-playfair font-normal">Musical Eminence</span>
          </h2>
          
          <div className="flourish-divider w-48 mx-auto my-3">
            <span>⚜</span>
          </div>

          <p className="font-cormorant text-xl text-[#f0e6d2]/85 leading-relaxed font-light mt-4">
            Whether your aspiration is academic degree certification or heartfelt vocal expression, our bespoke courses are structured to elevate your musical spirit.
          </p>
        </div>

        {/* 2 Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {courses.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between border-2 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] ${
                c.popular
                  ? "bg-gradient-to-b from-[#33090e] via-[#200508] to-[#160305] border-[#d4af37] shadow-2xl relative"
                  : "bg-gradient-to-b from-[#25060a] to-[#160305] border-[#d4af37]/30"
              }`}
            >
              {/* Popular Flag */}
              {c.popular && (
                <div className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full gold-gradient-bg text-[#1a0406] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <FaAward /> Most Enrolled
                </div>
              )}

              {/* Course Header Banner Image */}
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200508] via-[#200508]/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#160305]/90 border border-[#d4af37]/50 text-[#f5e6a8] font-cinzel text-xs font-semibold mb-2">
                    {c.badge}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-snug">
                    {c.title}
                  </h3>
                </div>
              </div>

              {/* Course Content Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-playfair italic text-[#e5c158] text-base mb-3">
                    {c.subtitle}
                  </h4>

                  <p className="font-cormorant text-base sm:text-lg text-[#f0e6d2]/90 leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-3 pb-6 mb-6 border-b border-[#d4af37]/20">
                    <div className="flex items-center gap-2 text-xs font-sans-modern text-stone-300 bg-[#3b0d11]/60 px-3 py-1.5 rounded-lg border border-[#d4af37]/20">
                      <FaCertificate className="text-[#e5c158]" />
                      <span>{c.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans-modern text-stone-300 bg-[#3b0d11]/60 px-3 py-1.5 rounded-lg border border-[#d4af37]/20">
                      <FaClock className="text-[#e5c158]" />
                      <span>{c.duration}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="font-cinzel text-xs uppercase tracking-widest text-[#f5e6a8] font-bold block mb-2">
                      Curriculum Highlights
                    </span>
                    {c.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <FaCheckCircle className="text-[#d4af37] text-sm shrink-0 mt-1" />
                        <span className="font-cormorant text-base text-stone-200 leading-tight">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enroll CTA */}
                <div className="pt-4 border-t border-[#d4af37]/20">
                  <a
                    href={c.enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2.5"
                  >
                    <FaGraduationCap className="text-lg" />
                    Enroll In This Course →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Consultation Assistance Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#30080d]/80 border border-[#d4af37]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-cinzel text-xl font-bold text-white mb-1">Unsure which musical path suits your voice?</h4>
            <p className="font-cormorant text-base text-[#f0e6d2]">
              Connect with our master faculty for a preliminary voice assessment and curriculum guidance.
            </p>
          </div>
          <a
            href="https://wa.me/919310395103"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-[#4a1017] hover:bg-[#61151f] text-[#f5e6a8] border border-[#d4af37]/50 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition"
          >
            Speak With Faculty (WhatsApp) →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Pathways;
