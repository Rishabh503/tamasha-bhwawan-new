"use client";
import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import { MusicalNotes } from './MusicalNotes';
import { VeenaPattern } from './VeenaPattern';
import { InstrumentsSilhouettes } from './InstrumentsSilhouettes';

export const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const heroStyle = {
    height: '100vh',
    backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    filter: scrolled ? "brightness(0.3) blur(2px)" : "brightness(0.4)"
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={heroStyle}
      />
      
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140305]/80 via-[#1f0508]/60 to-[#140305] z-0 pointer-events-none" />
      
      <VeenaPattern />
      <InstrumentsSilhouettes />
      <MusicalNotes />
      
      <div className="absolute inset-4 sm:inset-8 border border-[#d4af37]/30 z-0 rounded-3xl pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-4 py-24 sm:py-32 max-w-5xl mx-auto">
        <div className="mb-6 transform transition-all duration-1000" style={{
          transform: scrolled ? 'translateY(-15px)' : 'translateY(0)'
        }}>
          <div className="backdrop-blur-xl bg-gradient-to-b from-[#2e080c]/80 to-[#140305]/95 rounded-3xl p-6 sm:p-12 mb-6 border-2 border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <span className="text-xs sm:text-sm font-cinzel font-bold uppercase tracking-[0.3em] text-[#d4af37] block mb-2">
              Sanctuary of Indian Classical Sangeet
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider font-cinzel">
              Tamasha Bhawan
            </h1>
            
            <div className="flex justify-center gap-6 items-center my-5">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <Music className="text-[#d4af37]" size={24} />
              <div className="text-[#d4af37] text-xl">🪕</div>
              <Music className="text-[#d4af37]" size={24} />
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            
            <p className="text-lg sm:text-2xl text-[#f5e6a8] font-cormorant italic tracking-wide">
              A Temple of Hindustani Classical Music • Preserving Guru-Shishya Parampara Since 2015
            </p>
          </div>
        </div>
        
        <div className="backdrop-blur-md bg-[#1e0508]/80 inline-block rounded-2xl px-6 sm:px-10 py-3.5 border border-[#d4af37]/30 shadow-xl transform transition-all duration-1000" style={{
          transform: scrolled ? 'translateY(15px) scale(0.95)' : 'translateY(0) scale(1)'
        }}>
          <h2 className="text-base sm:text-xl font-cinzel font-bold text-[#f5e6a8] tracking-wide">
            Where Timeless Ragas Meet Contemporary Mastery
          </h2>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce opacity-80 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
            <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};