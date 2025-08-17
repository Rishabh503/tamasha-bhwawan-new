import React from "react";
import { FaArrowRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Roy",
      img: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png",
      text: "Tamasha Bhawan transformed my understanding of classical music. Their sitar program is simply magical and the instructors are phenomenal.",
      role: "Professional Musician",
      course: "Sitar Mastery",
    },
    {
      id: 2,
      name: "Rohan Patel",
      img: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png",
      text: "The tabla instructors here are real legends. I finally feel connected to rhythm! Their teaching methods make complex concepts so accessible.",
      role: "Engineering Student",
      course: "Tabla Rhythms",
    },
    {
      id: 3,
      name: "Neha Sharma",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "Their Hindustani vocal classes are so soulful. Every session feels like a blessing and has helped me discover my voice in ways I never imagined.",
      role: "Vocal Artist",
      course: "Hindustani Vocals",
    },
    {
      id: 4,
      name: "Arjun Mehta",
      img: "https://randomuser.me/api/portraits/men/36.jpg",
      text: "The instructors at Tamasha Bhawan have an incredible ability to pass on centuries of tradition with such passion and clarity. Life-changing experience!",
      role: "Music Teacher",
      course: "Flute Techniques",
    },
  ];

        const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  return (
    <div>
      {" "}
      <section id="testimonials" className="py-20 px-6 md:px-24 bg-[#F8F1E7]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">Voices of Our Students</h2>
          <div className="bg-[#c67f00] h-1 w-24 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Hear from those who have experienced the transformative power of our
            musical education
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {testimonials.slice(0, 2).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 md:p-10 shadow-lg mb-10 relative"
            >
              <div className="absolute -top-6 left-10 bg-[#c67f00] rounded-full p-3 shadow-lg">
                <FaQuoteLeft className="text-white text-xl" />
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#fff1db]"
                />

                <div className="flex-1">
                  <p className="text-gray-700 italic mb-4 text-lg">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      {/* <h4 className="font-bold text-lg">{testimonial.name}</h4> */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {testimonial.role}
                        </span>
                        <span className="w-1 h-1 bg-[#c67f00] rounded-full"></span>
                        <span className="text-sm text-[#c67f00]">
                          {testimonial.course}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <FaQuoteRight className="text-[#E5D6B8] text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/contact")}
            className="px-8 py-3 bg-[#c67f00] text-white rounded-full font-semibold hover:bg-[#a66700] transition inline-flex items-center gap-2"
          >
            Join Us <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
