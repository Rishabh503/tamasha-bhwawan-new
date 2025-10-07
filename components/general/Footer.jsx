import React from 'react';
import { FaYoutube, FaWhatsapp, FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from 'next/link'; // Import Link for navigation

export const Footer = () => {
  return (
    <footer className='bg-[#4A1A1A] text-white w-full'>
      <div className='max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-4 gap-12'>
        
        {/* Column 1: Brand Info */}
        <div className='md:col-span-1'>
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png" 
              alt="Logo" 
              className="h-10 w-10" 
            />
            <h1 className="text-xl font-bold">TAMASHA BHAWAN</h1>
          </div>
          <p className='text-gray-300 text-sm'>
            A premier music institute dedicated to providing quality music education across all classes and domains.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className='font-bold text-lg mb-4'>Quick Links</h2>
          <nav className='flex flex-col gap-3'>
            <Link href='/' className='hover:text-yellow-400 transition-colors'>Home</Link>
            <Link href='/about' className='hover:text-yellow-400 transition-colors'>About</Link>
            <Link href='/product' className='hover:text-yellow-400 transition-colors'>Product</Link>
            <Link href='/contact' className='hover:text-yellow-400 transition-colors'>Contact</Link>
          </nav>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h2 className='font-bold text-lg mb-4'>Get in Touch</h2>
          <div className='flex flex-col gap-3 text-gray-300'>
            <p><strong>Phone:</strong> +91 93103 95103</p>
            <p><strong>Email:</strong> tamashabhawan@gmail.com</p>
          </div>
        </div>
        
        {/* Column 4: Social Media */}
        <div>
          <h2 className='font-bold text-lg mb-4'>Follow Us</h2>
          <div className='flex mt-4 gap-6 text-3xl'>
            <a href="https://www.youtube.com/@TamashaBhawanMusic" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className='hover:text-yellow-400 transition-colors'>
              <FaYoutube />
            </a>
            <a href="https://wa.me/919310395103" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className='hover:text-yellow-400 transition-colors'>
              <FaWhatsapp />
            </a>
            <a href='https://t.me/tamashabhawanmusic' target="_blank" rel="noopener noreferrer" aria-label="Telegram" className='hover:text-yellow-400 transition-colors'>
              <FaTelegram />
            </a>
             {/* Add links for Instagram and Facebook if you have them */}
            {/* <a href='#' target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='hover:text-yellow-400 transition-colors'>
              <FaInstagram />
            </a>
            <a href='#' target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='hover:text-yellow-400 transition-colors'>
              <FaFacebook />
            </a>
            */}
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className='border-t border-gray-700 mt-8'>
        <p className='text-center text-gray-400 text-sm py-6'>
          © {new Date().getFullYear()} Tamasha Bhawan. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};