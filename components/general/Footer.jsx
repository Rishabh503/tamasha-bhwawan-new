import React from 'react'
import { FaFacebook, FaGooglePlay, FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className='bg-black w-full flex flex-col items-center   text-white'>
     <div className=' mt-16 p-4 '>
     <div className='flex flex-col  items-center gap-4 bottom-0  '>
        <h1>TAMASHA BHAWAN</h1>
        <p>Contact : +91 93103 95103</p>
        <p>
          Mail: tamashabhawan@gmail.com
        </p>
        <p>
            Tamasha bhawan is a premier music institute dedicated to providing quality music education across all classes and domains. 
        </p>
       </div>

       <div className='flex mt-4 gap-8 justify-between text-4xl'>
       <a href="https://www.youtube.com/@TamashaBhawanMusic ">
       <FaYoutube/>
       </a>
      <a href="wa.me/message/9310395103">
      <FaWhatsapp />
      </a>
       <FaTelegram href='https://t.me/tamashabhawanmusic' />
       </div>
     </div>
     </footer>
  )
}

