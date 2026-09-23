import { BookOpen, Heart, Users } from "lucide-react";

export const VisionMissionSection = () => (
  <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#160305] text-[#f5e6a8] relative overflow-hidden border-y border-[#d4af37]/25">
    {/* Ambient lighting */}
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] mb-3 shadow">
          <BookOpen size={22} />
        </div>
        <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
          Guiding Philosophy
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-white mb-4">
          Vision & Mission
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] p-8 rounded-3xl border-2 border-[#d4af37]/40 shadow-2xl transform transition-all hover:-translate-y-1.5 duration-300 relative overflow-hidden group">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mr-4 shadow-lg group-hover:scale-105 transition">
              <Users size={26} />
            </div>
            <div>
              <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#d4af37] block">The Eternal Horizon</span>
              <h3 className="text-2xl font-cinzel font-bold text-white">Our Vision</h3>
            </div>
          </div>
          <p className="text-lg sm:text-xl font-cormorant text-[#f5e6a8]/90 leading-relaxed">
            To create an enlightened global ecosystem where Hindustani classical music thrives across generations—transcending geographical, cultural, and digital boundaries while preserving its sacred oral authenticity and spiritual purity.
          </p>
          <div className="mt-8 pt-4 border-t border-[#d4af37]/20 flex justify-between items-center text-xs text-[#e6ca65]/70 font-cinzel">
            <span>Global Sangeet Reach</span>
            <span className="text-2xl text-[#d4af37]/40">♪</span>
          </div>
        </div>
        
        {/* Mission Card */}
        <div className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] p-8 rounded-3xl border-2 border-[#d4af37]/40 shadow-2xl transform transition-all hover:-translate-y-1.5 duration-300 relative overflow-hidden group">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mr-4 shadow-lg group-hover:scale-105 transition">
              <Heart size={26} />
            </div>
            <div>
              <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#d4af37] block">Our Sacred Commitment</span>
              <h3 className="text-2xl font-cinzel font-bold text-white">Our Mission</h3>
            </div>
          </div>
          <p className="text-lg sm:text-xl font-cormorant text-[#f5e6a8]/90 leading-relaxed">
            To impart masterclass-grade vocal training blending ancient Shruti nuances with structured syllabus progressions; to mentor serious aspirants for national exams and concerts; and to make the bliss of classical ragas accessible to all devoted seekers.
          </p>
          <div className="mt-8 pt-4 border-t border-[#d4af37]/20 flex justify-between items-center text-xs text-[#e6ca65]/70 font-cinzel">
            <span>Tradition & Innovation</span>
            <span className="text-2xl text-[#d4af37]/40">♫</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
