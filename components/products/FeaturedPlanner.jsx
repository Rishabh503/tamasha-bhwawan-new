import React from "react";
import {
  FaCheck,
  FaClock,
  FaHeart,
  FaStar,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import planner from "../../public/planner.jpg";
import Image from "next/image";
const FeaturedPlanner = () => {
    
  const whatsappNumber = "9310395103";
  const handleWhatsAppOrder = (productName, price) => {
    const message = `Hi! I'm interested in ordering the "${productName}" (${price}). Please provide me with more details about payment and delivery.`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };
  const featuredProduct = {
    id: 1,
    name: "Riyaz Planner - Your Personal Music Practice Companion",
    price: "₹999",
    originalPrice: "₹1499",
    discount: "33% OFF",
    rating: 4.9,
    reviewCount: 127,
    image: planner,
    shortDescription:
      "Transform your music practice with our comprehensive Riyaz Planner - designed specifically for Indian classical music students and professionals.",
    features: [
      "90 Days structured practice planning",
      "Do's and Dont's of Riyaz",
      "Daily practice log with time tracking",
      "Goal setting and achievement milestones",
      "Monthly review and reflection pages",
    ],
  };

  return (
    <div>
      {" "}
      <section
        id="featured-product"
        className="py-20 px-6 md:px-24 bg-gradient-to-br from-[#4A1A1A] to-[#2A0E0E] text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-[#c67f00] px-4 py-2 rounded-full text-sm font-bold mb-4">
              🌟 FEATURED PRODUCT 🌟
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Master Your <span className="text-[#c67f00]">Riyaz</span> Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The ultimate practice companion for every Indian classical music
              student
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image & Info */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(featuredProduct.rating)
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-bold">
                      {featuredProduct.rating}
                    </span>
                    {/* <span className="text-gray-300">({featuredProduct.reviewCount} reviews)</span> */}
                  </div>
                  <FaHeart className="text-red-400 text-xl hover:scale-110 cursor-pointer transition" />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  {featuredProduct.name}
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  {featuredProduct.shortDescription}
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-[#c67f00]">
                    {featuredProduct.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {featuredProduct.originalPrice}
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {featuredProduct.discount}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {featuredProduct.features
                    .slice(0, 4)
                    .map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheck className="text-green-400 text-sm" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      handleWhatsAppOrder(
                        featuredProduct.name,
                        featuredProduct.price
                      )
                    }
                    className="flex-1 bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#20BD59] transition flex items-center justify-center gap-2 text-lg"
                  >
                    <FaWhatsapp className="text-xl" />
                    Order Now
                  </button>
                  <button
                    onClick={() => router.push("/product")}
                    className="flex-1 border-2 border-[#c67f00] text-[#c67f00] px-6 py-4 rounded-lg font-bold hover:bg-[#c67f00] hover:text-white transition"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-8 pt-6">
                <div className="text-center">
                  <FaUsers className="text-[#c67f00] text-2xl mx-auto mb-2" />
                  <span className="text-sm text-gray-300">500+ Users</span>
                </div>
                <div className="text-center">
                  <FaWhatsapp className="text-[#25D366] text-2xl mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Instant Support</span>
                </div>
                <div className="text-center">
                  <FaClock className="text-[#c67f00] text-2xl mx-auto mb-2" />
                  <span className="text-sm text-gray-300">Quick Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FeaturedPlanner;
