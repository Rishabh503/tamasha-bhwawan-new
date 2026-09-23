"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaChevronLeft, FaChevronRight, FaAward, FaBookOpen, FaWhatsapp } from "react-icons/fa";
import { GiLyre, GiTempleGate, GiMusicalNotes } from "react-icons/gi";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "Centuries of Musical Lineage",
    title: "The Living Heritage of Hindustani Sangeet",
    subtitle: "From ancient royal darbars and sacred temples to modern academic mastery.",
    description: "Tamasha Bhawan is an authentic music academy dedicated to rigorous vocal training, raga aesthetics, and Gandharva Mahavidyalaya certified degree programs.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1800", // Royal Indian architectural palace arches
    ctaText: "Explore Certified Courses",
    ctaLink: "#courses",
    accent: "Heritage & Guru-Shishya Parampara"
  },
  {
    id: 2,
    badge: "Govt. Recognized Certification",
    title: "Akhil Bhartiya Gandharva Mahavidyalaya Degree",
    subtitle: "Complete formal examination syllabus from Prarambhik to Visharad.",
    description: "Structured curriculum, personalized one-on-one riyaz corrections, swara notation sheets, and formal university board exam preparation.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1800", // Authentic acoustic riyaz instruments setup
    ctaText: "Enroll for Gandharva Exam",
    ctaLink: "#courses",
    accent: "Affiliated Degree Preparation"
  },
  {
    id: 3,
    badge: "UGC-NET Music Mastery",
    title: "In-Depth Musicology & Shastra Lectures",
    subtitle: "Mastering ancient treatises, Gharana lineages, and competitive theory.",
    description: "Exhaustive guidance on Sangeet Ratnakar, Natyashastra, microtonal Shrutis, and previous year question breakdowns by subject experts.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1800", // Vocalist in riyaz performance
    ctaText: "View Course Syllabus",
    ctaLink: "#courses",
    accent: "Academic & Competitive Excellence"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[current];

  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#160305] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Ken Burns / Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110"
          />
          {/* Deep Victorian Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#160305] via-[#160305]/70 to-[#160305]/85"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#160305_90%)]"></div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle Victorian Architectural Border Frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#d4af37]/20 pointer-events-none rounded-3xl z-10 hidden md:block">
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center px-6 md:px-12 py-16 flex flex-col items-center">
        
        {/* Slide Counter & Badge */}
        <motion.div
          key={`badge-${currentSlide.id}`}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2a060a]/90 border border-[#d4af37]/40 backdrop-blur-md mb-6 shadow-xl"
        >
          <GiMusicalNotes className="text-[#e5c158] text-sm" />
          <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#f5e6a8] uppercase">
            {currentSlide.badge}
          </span>
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1
          key={`title-${currentSlide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mb-4 text-stone-100 max-w-4xl"
        >
          {currentSlide.title}
        </motion.h1>

        {/* Elegant Flourish */}
        <div className="flourish-divider w-48 md:w-64 my-3">
          <span>⚜</span>
        </div>

        {/* Subtitle */}
        <motion.p
          key={`sub-${currentSlide.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair italic text-lg sm:text-2xl text-[#e5c158] max-w-3xl mx-auto mb-4 font-normal"
        >
          "{currentSlide.subtitle}"
        </motion.p>

        {/* Narrative Description */}
        <motion.p
          key={`desc-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-cormorant text-lg sm:text-xl text-[#f0e6d2]/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          {currentSlide.description}
        </motion.p>

        {/* Primary High-Conversion Call To Actions */}
        <motion.div
          key={`cta-${currentSlide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={currentSlide.ctaLink}
            className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <FaGraduationCap className="text-lg" />
            {currentSlide.ctaText} →
          </a>

          <a
            href="https://wa.me/919310395103"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#2e080c]/80 border border-[#d4af37]/60 text-[#f5e6a8] font-cinzel font-semibold text-xs tracking-wider uppercase backdrop-blur hover:bg-[#420d13] hover:border-[#d4af37] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg"
          >
            <FaWhatsapp className="text-base text-green-400" />
            Direct Faculty Consultation
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-14 pt-8 border-t border-[#d4af37]/20 w-full">
          <div className="flex items-center justify-center gap-3 text-left">
            <FaAward className="text-2xl text-[#d4af37] shrink-0" />
            <div>
              <div className="font-cinzel text-xs font-bold text-[#f5e6a8]">Certified Syllabus</div>
              <div className="text-[11px] text-stone-300 font-sans-modern">Gandharva Mahavidyalaya</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-left">
            <GiLyre className="text-2xl text-[#d4af37] shrink-0" />
            <div>
              <div className="font-cinzel text-xs font-bold text-[#f5e6a8]">Guru-Shishya</div>
              <div className="text-[11px] text-stone-300 font-sans-modern">Authentic Raga Parampara</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-left">
            <FaBookOpen className="text-2xl text-[#d4af37] shrink-0" />
            <div>
              <div className="font-cinzel text-xs font-bold text-[#f5e6a8]">UGC-NET Music</div>
              <div className="text-[11px] text-stone-300 font-sans-modern">Theory & Paper Analysis</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-left">
            <GiTempleGate className="text-2xl text-[#d4af37] shrink-0" />
            <div>
              <div className="font-cinzel text-xs font-bold text-[#f5e6a8]">5,000+ Scholars</div>
              <div className="text-[11px] text-stone-300 font-sans-modern">Worldwide Community</div>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#1c0406]/80 hover:bg-[#3b0d11] text-[#f5e6a8] border border-[#d4af37]/40 flex items-center justify-center transition shadow-lg hover:scale-110"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#1c0406]/80 hover:bg-[#3b0d11] text-[#f5e6a8] border border-[#d4af37]/40 flex items-center justify-center transition shadow-lg hover:scale-110"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* Slide Indicators / Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx
                ? "w-8 bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
                : "w-2 bg-stone-600 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;