"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { LuMusic2 } from "react-icons/lu";


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
   <>
   <div className="fixed top-0 w-full bg-[#4A1A1A] text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
           <div   className="flex items-center space-x-3">
            <Link  href='/'> 
            <img src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png" alt="Logo" className="h-10 w-10" />
            </Link>
             <h1 className="text-2xl font-bold">Tamasha Bhawan</h1>
           </div>
           <nav className="hidden md:flex space-x-6">
             <Link href='/newAbout'> About</Link>
             <Link href='/contact'> Contact</Link>
             <Link href='/product'> Product</Link>
           </nav>
           <button className='md:hidden' onClick={()=>setIsOpen(!isOpen)}> <LuMusic2/> </button>
           </div>
  
          <div className='bg-red-500'>
           <nav className={` ${isOpen?"hidden":"block"} bg-[#4A1A1A] text-white md:hidden mt-[72px] -mb:10 items-start pl-10  justify-between  flex flex-col`}>
             <Link className="hover:text-yellow-400 w-full  mt-2 font-semibold" href='/newAbout'> About</Link>
             <Link className="hover:text-yellow-400 w-full  mt-2 font-semibold" href='/product'> Product</Link>
             <Link className="hover:text-yellow-400 w-full  mt-2 font-semibold" href='/contact'> Contact</Link>
           </nav>
          </div>
   </>

  );
};

// export default Navbar;
