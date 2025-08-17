import React from 'react'

const CTA = () => {
  return (
   <section id="contact" className="py-20 bg-[#4A1A1A] text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Begin Your Musical Journey?</h2>
        <button onClick={()=>router.push("/contact")} className="mt-6 bg-yellow-400 text-[#4A1A1A] px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">Contact Us</button>
      </section>
  )
}

export default CTA