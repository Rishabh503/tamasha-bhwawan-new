import React from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
const Pathways = () => {
  const courses = [
    {
      id: 1,
      name: "Learn Indian Classical Music",
      category: "Vocal",
      img: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1747320825/Screenshot_2025-05-15_202223_fwdg6f.png",
      instructor: " ",
      desc: "Get Certification from AKHIL BHARTIYA GANDHARVA MAHAVIDALAYA (pune)",
      duration: "Flexible",
      level: "All Levels",
      startDate: "Flexible",
    },

    {
      id: 2,
      name: "Learn Hindustani Music Light",
      category: "vocal",
      img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
      instructor: " ",
      desc: "Discover your voice through ancient Hindustani classical traditions",
      duration: "Flexible",
      level: "Beginner",
      startDate: "Flexible",
    },
  ];


//   franer motion
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
      <section
        id="courses"
        className="py-20 px-6 md:px-24 bg-gradient-to-b from-[#F8F1E7] to-[#F5E6C8]"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">Pathways to Mastery</h2>
          <div className="bg-[#c67f00] h-1 w-24 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Immerse yourself in the rich traditions of Indian classical music
            through our signature courses, each designed to transform passion
            into expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } bg-white rounded-xl overflow-hidden shadow-xl`}
            >
              {/* Course Poster/Image */}
              <div className="md:w-2/5 relative">
                <img
                  src={course.img}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A1A] to-transparent opacity-70"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block bg-[#c67f00] px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {course.category === "instrumental"
                      ? "Instrumental"
                      : "Vocal"}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{course.name}</h3>
                  <p className="text-sm opacity-90">{course.instructor}</p>
                </div>
              </div>

              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#fff1db] text-[#c67f00] px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-6 text-lg">{course.desc}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#c67f00] mr-2" />
                      <span className="text-gray-700">
                        Starts {course.startDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaBookOpen className="text-[#c67f00] mr-2" />
                      <span className="text-gray-700">{course.duration}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://forms.gle/DMSC7CvMzZvCq8feA"
                  className="self-start bg-[#4A1A1A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3A1010] transition flex items-center gap-2"
                >
                  <FaGraduationCap /> Enroll Now
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <button
            onClick={() => router.push("/underDev")}
            className="px-8 py-3 bg-[#c67f00] text-white rounded-full font-semibold hover:bg-[#a66700] transition inline-flex items-center gap-2"
          >
            View All Courses <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pathways;
