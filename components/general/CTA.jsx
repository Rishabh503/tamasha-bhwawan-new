"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

// For this to work, you need to add a single line to your tailwind.config.js file
// under theme: { extend: { ... } }, add:
// clipPath: {
//   'angled-bottom': 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
// },
// After adding, restart your development server.
//
// If you don't want to modify the config, you can use an inline style instead.
// I've included the inline style option in the code below as a comment.

const CTA = () => {
  const router = useRouter();

  return (
    <section 
      id="contact" 
      className="bg-[#4A1A1A] text-white"
      // Uncomment the line below if you don't want to edit tailwind.config.js
      // style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
    >
      <div className="bg-[#fcf7f7] py-20 text-center" 
        // Uncomment the line below as well for the inline style option
        // style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      >
        <h2 className="text-4xl font-bold text-[#4A1A1A]">
          Ready to Begin Your Musical Journey?
        </h2>
        <button 
          onClick={() => router.push("/contact")} 
          className="mt-8 bg-yellow-400 text-[#4A1A1A] px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Contact Us
        </button>
      </div>
    </section>
  )
}

export default CTA;