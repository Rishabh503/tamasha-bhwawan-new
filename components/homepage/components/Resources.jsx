import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
const Resources = () => {
  const products = [
    {
      id: 1,
      name: "Sitar Learning Notes",
      price: "₹499",
      img: "https://cdn-icons-png.flaticon.com/512/2907/2907030.png",
      rating: 4.8,
      type: "ebook",
      description:
        "Comprehensive guide to mastering sitar techniques with step-by-step instructions",
      features: [
        "150 pages",
        "Digital download",
        "Practice exercises",
        "Raga notations",
      ],
    },
    {
      id: 2,
      name: "Tabla Practice Guide",
      price: "₹349",
      img: "https://cdn-icons-png.flaticon.com/512/4065/4065533.png",
      rating: 4.5,
      type: "digital guide",
      description:
        "Learn authentic tabla techniques with audio demonstrations from experts",
      features: [
        "2 hours of audio",
        "PDF reference guide",
        "10 practice compositions",
        "Rhythm exercises",
      ],
    },
    {
      id: 3,
      name: "Hindustani Vocal eBook",
      price: "₹599",
      img: "https://cdn-icons-png.flaticon.com/512/3125/3125713.png",
      rating: 4.9,
      type: "ebook",
      description:
        "Develop your vocal skills with this comprehensive guide to Hindustani classical singing",
      features: [
        "200 pages",
        "Vocal exercises",
        "Raga reference",
        "Breathing techniques",
      ],
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
      <section id="products" className="py-20 px-6 md:px-24 bg-white">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">Musical Resources</h2>
          <div className="bg-[#c67f00] h-1 w-24 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Elevate your practice with our carefully crafted learning materials
            developed by master musicians
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-[#F8F1E7] rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="p-8 bg-[#fff9f0] flex justify-center items-center h-56 relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-32 group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#c67f00] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.type}
                </div>
              </div>

              <div className="p-6 border-t border-[#E5D6B8]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>

                <ul className="mb-4">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-gray-600 text-sm flex items-center mb-1"
                    >
                      <span className="w-2 h-2 bg-[#c67f00] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-[#c67f00]">
                    {product.price}
                  </p>
                  <button className="bg-[#4A1A1A] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#3A1010] transition text-sm">
                    <FaShoppingCart /> Coming Soon
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Resources;
