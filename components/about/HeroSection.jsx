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
    backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    filter: scrolled ? "brightness(0.6) blur(2px)" : "brightness(0.7)"
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={heroStyle}
      />
      
      <VeenaPattern />
      <InstrumentsSilhouettes />
      <MusicalNotes />
      
      <div className="absolute inset-5 border-4 border-amber-200/30 z-0 rounded-lg"></div>
      
      <div className="relative z-10 text-center px-4 py-32 max-w-5xl mx-auto">
        <div className="mb-6 transform transition-all duration-1000" style={{
          transform: scrolled ? 'translateY(-20px)' : 'translateY(0)'
        }}>
          <div className="backdrop-blur-md bg-gradient-to-b from-amber-900/50 to-[#4A1A1A] rounded-lg p-10 mb-8 border border-amber-200/30 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider font-serif">
              Tamasha Bhawan
            </h1>
            
            <div className="flex justify-center gap-6 items-center my-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-200">
                <path d="M5,19 L9,15 L9,5 C9,3 7,2 5,2 C3,2 1,3 1,5 C1,7 3,8 5,8 L5,19 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <Music className="text-amber-200" size={28} />
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-200">
                <path d="M19,19 L15,15 L15,5 C15,3 17,2 19,2 C21,2 23,3 23,5 C23,7 21,8 19,8 L19,19 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-16 bg-amber-200/60"></div>
              <div className="text-amber-200 text-2xl">♪</div>
              <div className="h-px w-16 bg-amber-200/60"></div>
            </div>
            
            <p className="text-xl text-amber-100 font-light italic">
              A Temple of Classical Music Since 2015
            </p>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-amber-700/20 inline-block rounded-lg px-8 py-4 border border-amber-100/20 shadow-lg transform transition-all duration-1000" style={{
          transform: scrolled ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)'
        }}>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7A2E2E]">
            Where Classical Melodies Meet Modern Mastery
          </h2>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce opacity-80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-100">
            <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};