import React from "react";
import { motion } from 'framer-motion';
const About = () => {
  return (
    <div>
      {" "}
      <section id="about" className="py-20 px-6 md:px-24 bg-white">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">About Tamasha Bhawan</h2>
            <p className="text-gray-700 mb-6">
              Tamasha Bhawan was born from a vision — to nurture, teach and
              celebrate the divine traditions of Indian classical music. Our
              institution stands as a sanctuary for passionate learners and
              future legends.
            </p>
            <button
              onClick={() => router.push("/newAbout")}
              className="bg-yellow-400 text-[#4A1A1A] px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              {" "}
              Know More
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699728/trendy-string-music-vector-removebg-preview_yunrzl.png"
            alt="About Image"
            className="w-full md:w-1/2"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default About;
