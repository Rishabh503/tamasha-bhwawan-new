import { Music, Mail, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

export const ContactSection = () => (
  <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#160305] text-[#f5e6a8] relative overflow-hidden border-t border-[#d4af37]/25">
    {/* Ambient lighting */}
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] mb-3 shadow">
          <Music size={22} />
        </div>
        <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
          Join the Sabha
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-white mb-4">
          Begin Your Musical Journey
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        <p className="text-lg sm:text-xl text-[#f5e6a8]/90 font-cormorant italic mt-6 max-w-2xl mx-auto">
          Become part of our global community and immerse in the transcendental beauty of Hindustani classical music. Connect with our gurus through any of our channels:
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a 
          href="https://t.me/tamashabhawanmusic" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] hover:from-[#3d0f14] hover:to-[#25060a] border-2 border-[#d4af37]/40 hover:border-[#d4af37] p-8 rounded-3xl text-center flex flex-col items-center justify-center transition-all hover:-translate-y-1.5 duration-300 shadow-xl group"
        >
          <div className="w-14 h-14 bg-[#140305] border border-[#d4af37]/40 text-[#d4af37] group-hover:text-white group-hover:border-[#d4af37] p-3.5 rounded-2xl mb-4 flex items-center justify-center transition shadow">
            <Send size={24} />
          </div>
          <span className="font-cinzel font-bold text-white text-base tracking-wider block mb-1">Telegram Community</span>
          <span className="text-xs text-[#e6ca65]/70 font-sans-modern">Join active riyaz discussions</span>
        </a>
        
        <a 
          href="mailto:contact@tamashabhawan.com" 
          className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] hover:from-[#3d0f14] hover:to-[#25060a] border-2 border-[#d4af37]/40 hover:border-[#d4af37] p-8 rounded-3xl text-center flex flex-col items-center justify-center transition-all hover:-translate-y-1.5 duration-300 shadow-xl group"
        >
          <div className="w-14 h-14 bg-[#140305] border border-[#d4af37]/40 text-[#d4af37] group-hover:text-white group-hover:border-[#d4af37] p-3.5 rounded-2xl mb-4 flex items-center justify-center transition shadow">
            <Mail size={24} />
          </div>
          <span className="font-cinzel font-bold text-white text-base tracking-wider block mb-1">Direct Inquiries</span>
          <span className="text-xs text-[#e6ca65]/70 font-sans-modern">contact@tamashabhawan.com</span>
        </a>
        
        <a 
          href="https://www.youtube.com/@TamashaBhawanMusic" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] hover:from-[#3d0f14] hover:to-[#25060a] border-2 border-[#d4af37]/40 hover:border-[#d4af37] p-8 rounded-3xl text-center flex flex-col items-center justify-center transition-all hover:-translate-y-1.5 duration-300 shadow-xl group"
        >
          <div className="w-14 h-14 bg-[#140305] border border-[#d4af37]/40 text-[#d4af37] group-hover:text-white group-hover:border-[#d4af37] p-3.5 rounded-2xl mb-4 flex items-center justify-center transition shadow">
            <Youtube size={24} />
          </div>
          <span className="font-cinzel font-bold text-white text-base tracking-wider block mb-1">YouTube Lessons</span>
          <span className="text-xs text-[#e6ca65]/70 font-sans-modern">Explore free masterclasses</span>
        </a>
      </div>
      
      <div className="mt-14 text-center">
        <Link 
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] font-cinzel font-bold text-sm sm:text-base tracking-widest uppercase rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 transition-all"
        >
          Enroll for Auditions & Taaleem →
        </Link>
      </div>
    </div>
  </section>
);
