import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Hero = () => {
  return (
   <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-[#fff9f0]">

        <div className="md:w-1/2 mb-8 md:mb-0">
          <img 
            src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745702083/TAMASHA-removebg-preview_hhyykj.png" 
            alt="Indian Classical Music" 
            className="w-full bg-transparent  h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col items-start gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover the <span className="text-[#c67f00]">Soul</span> of Indian Music
          </h2>
          <p className="text-lg text-gray-600">
            Join Tamasha Bhawan - where tradition meets excellence. Learn, compete, and shine with the masters.
          </p>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-[#c67f00] text-white rounded-full flex items-center gap-2 hover:bg-[#a66700]"
          >
            Get Started <FaArrowRight />
          </a>
        </div>
      </section>
  )
}

export default Hero