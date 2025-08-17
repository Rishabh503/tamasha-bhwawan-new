import React from 'react'
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaYoutube } from 'react-icons/fa';
const Videos = () => {
      const videos = [
    {
      id: 1,
      title: "Gharana Khyal UGC NET MUSIC",
      thumbnail: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745702083/TAMASHA-removebg-preview_hhyykj.png",
      views: "",
      length: "20:29",
      link:"https://www.youtube.com/watch?v=R3N3vl6GRJc&ab_channel=TamashaBhawan"
    },
    {
      id: 2,
      title: "Sarang ang ke raag ",
      thumbnail: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745702083/TAMASHA-removebg-preview_hhyykj.png",
      views: "",
      length: "22:47",
      link:"https://youtu.be/ntOPlCwpcvM?si=M6RdPUK3hIivYEdg"
    },
    {
      id: 3,
      title: "UGC NET MUSIC SANGEET KE GRANTH PART 1",
      thumbnail: "https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745702083/TAMASHA-removebg-preview_hhyykj.png",
      views: "",
      length: "30:14",
      link:"https://www.youtube.com/watch?v=d9AKaut_bSk&ab_channel=TamashaBhawan"
    }
  ];
  return (
    <div> <section id="youtube" className="py-20 px-6 md:px-24 bg-[#4A1A1A] text-white">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
       
          <div className="md:w-1/2 text-left">
            <FaYoutube className="text-red-600 text-6xl mb-6" />
            <h2 className="text-4xl font-bold mb-6">Explore Our Video Lessons</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join our  <span className="text-yellow-400 font-bold">5000+</span> subscribers experiencing the soul of Indian classical music through our video lessons, performances, and musical insights.
            </p>
            <a 
              href="https://www.youtube.com/@TamashaBhawanMusic" 
      
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 text-white rounded-full flex items-center gap-2 hover:bg-red-700 transition w-fit"
            >
              Subscribe Now <FaArrowRight />
            </a>
          </div>
          

          <div className="md:w-1/2 grid gap-4 mt-10 md:mt-0">
            {videos.map((video) => (
              <motion.div 
                key={video.id}
                className="bg-gray-800 rounded-lg overflow-hidden flex items-center hover:bg-gray-700 transition cursor-pointer"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-1/3">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-24 object-cover" />
                  <a href={video.link} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <FaPlay className="text-white text-xl" />
                  </a>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                    {video.length}
                  </div>
                </div>
                <div className="p-3 w-2/3">
                  <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                  <p className="text-gray-400 text-xs">{video.views} </p>
                </div>
              </motion.div>
            ))}
            <div className="text-center mt-2">
              <a href="https://www.youtube.com/@TamashaBhawanMusic" className="text-yellow-400 text-sm hover:underline">View more videos →</a>
            </div>
          </div>
        </motion.div>
      </section></div>
  )
}

export default Videos