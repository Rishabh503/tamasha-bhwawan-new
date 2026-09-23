import React from 'react';
import { FaYoutube, FaWhatsapp, FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-[#160305] text-white w-full border-t border-[#d4af37]/30'>
      <div className='max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12'>
        
        {/* Column 1: Brand Info */}
        <div className='md:col-span-1'>
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png" 
              alt="Logo" 
              className="h-10 w-10 object-contain" 
            />
            <div>
              <h2 className="font-cinzel text-lg font-bold tracking-wider text-stone-100">TAMASHA BHAWAN</h2>
              <span className="font-cormorant text-xs text-[#d4af37] tracking-widest block uppercase">Sanctuary of Sangeet</span>
            </div>
          </div>
          <p className='font-cormorant text-stone-400 text-sm leading-relaxed'>
            A premier classical academy dedicated to preserving authentic Hindustani musical traditions, Gandharva Mahavidyalaya degrees, and UGC-NET pedagogy.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className='font-cinzel font-bold text-sm tracking-wider text-[#f5e6a8] uppercase mb-4'>Sanctum Links</h3>
          <nav className='flex flex-col gap-2.5 font-cormorant text-base text-stone-300'>
            <Link href='/' className='hover:text-[#f5e6a8] transition-colors'>Grand Home</Link>
            <Link href='/about' className='hover:text-[#f5e6a8] transition-colors'>About The Academy</Link>
            <Link href='/courses' className='hover:text-[#f5e6a8] transition-colors'>Certified Courses</Link>
            <Link href='/#chronicle' className='hover:text-[#f5e6a8] transition-colors'>Sangeet Chronicle</Link>
          </nav>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className='font-cinzel font-bold text-sm tracking-wider text-[#f5e6a8] uppercase mb-4'>Direct Inquiries</h3>
          <div className='flex flex-col gap-2.5 font-cormorant text-base text-stone-300'>
            <p><strong className="text-stone-100 font-cinzel text-xs">Phone:</strong> +91 93103 95103</p>
            <p><strong className="text-stone-100 font-cinzel text-xs">Email:</strong> tamashabhawan@gmail.com</p>
            <p><strong className="text-stone-100 font-cinzel text-xs">Admissions:</strong> Open for New Batches</p>
          </div>
        </div>
        
        {/* Column 4: Social Media */}
        <div>
          <h3 className='font-cinzel font-bold text-sm tracking-wider text-[#f5e6a8] uppercase mb-4'>Official Channels</h3>
          <p className="font-cormorant text-xs text-stone-400 mb-4">
            Follow our lectures, ragas, and announcements across our classical community:
          </p>
          <div className='flex gap-4 text-xl'>
            <a 
              href="https://www.youtube.com/@TamashaBhawanMusic" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube" 
              className='w-10 h-10 rounded-full bg-[#200508] border border-[#d4af37]/40 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-600 transition'
            >
              <FaYoutube />
            </a>
            <a 
              href="https://wa.me/919310395103" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp" 
              className='w-10 h-10 rounded-full bg-[#200508] border border-[#d4af37]/40 flex items-center justify-center text-green-500 hover:text-white hover:bg-green-600 transition'
            >
              <FaWhatsapp />
            </a>
            <a 
              href='https://t.me/tamashabhawanmusic' 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Telegram" 
              className='w-10 h-10 rounded-full bg-[#200508] border border-[#d4af37]/40 flex items-center justify-center text-sky-400 hover:text-white hover:bg-sky-500 transition'
            >
              <FaTelegram />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className='border-t border-[#d4af37]/20 bg-[#100203]'>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-cormorant text-stone-400">
          <p>© {new Date().getFullYear()} Tamasha Bhawan. All Rights Reserved.</p>
          <p className="italic">Nurturing classical excellence through tradition and innovation.</p>
        </div>
      </div>
    </footer>
  );
};