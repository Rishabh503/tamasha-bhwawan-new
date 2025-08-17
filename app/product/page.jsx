"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaWhatsapp, 
  FaStar, 
  FaPlay, 
  FaDownload, 
  FaBook, 
  FaClock, 
  FaUsers, 
  FaCalendarAlt,
  FaCheck,
  FaHeart,
  FaShare,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  
  // WhatsApp integration
  const whatsappNumber = "9310395103"; // Replace with actual WhatsApp number
  const handleWhatsAppOrder = (productName, price) => {
    const message = `Hi! I'm interested in ordering the "${productName}" (${price}). Please provide me with more details about payment and delivery.`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };
  
  const handleWhatsAppInquiry = (productName) => {
    const message = `Hello! I have some questions about the "${productName}". Can you help me?`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };
  
  // Main product data - Riyaz Planner
  const product = {
    id: 1,
    name: "Riyaz Planner - Your Personal Music Practice Companion",
    price: "₹999",
    originalPrice: "₹1499",
    discount: "33% OFF",
    rating: 4.9,
    // reviewCount: 127,
    type: "Digital Planner + Physical Journal",
    category: "Practice Tools",
    images: [
      "/planner.jpg",
      "/planner2.jpg",
    ],
    shortDescription: "Transform your music practice with our comprehensive Riyaz Planner - designed specifically for Indian classical vocalists.",
    longDescription: "The Riyaz Planner is more than just a practice journal. It's your personal guide to structured, meaningful practice sessions that accelerate your musical growth. Whether you're learning vocal techniques, mastering ragas, or perfecting your instrument, this planner helps you track progress, set goals, and maintain consistency in your musical journey.",
    features: [
      "90 Days structured practice planning",
      "Do's and Dont's of Riyaz",
      "Daily practice log with time tracking",
      "Goal setting and achievement milestones",
      "Technique development exercises",
      "Fun Musical Activity - GUESS THE RAGA SEGMENT",
      "Your Premium Palta Guide with 30+ Paltas ",
      "Design Your own Musical Vision Board",
      "Monthly review and reflection pages",
      "Inspirational quotes from master musicians"
    ],
    specifications: {
      "Format": "Physical Journal (A5 size) ",
      "Pages": " 120+  premium paper",
      "Languages": "Hindi, English",
      "Suitable For": "All levels - Beginner to Advanced"
    },
    benefits: [
      "Structured approach to daily practice",
      "Track your musical growth over time",
      "Develop consistent practice habits",
      "Master complex ragas systematically",
      "Prepare effectively for performances",
      "Build technique with guided exercises"
    ]
  };

 const relatedProducts = [
    { 
      id: 2, 
      name: "UGC-NET Music Notes", 
      price: "₹2899", 
      img: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
      rating: 4.8
    },
    { 
      id: 3, 
      name: "RPSC Music Notes", 
      price: "₹3000", 
      img: "https://cdn-icons-png.flaticon.com/512/8074/8074800.png",
      rating: 4.5
    },
    { 
      id: 4, 
      name: "TGT-PGT Music Notes", 
      price: "₹2000", 
      img: "https://cdn-icons-png.flaticon.com/512/3749/3749543.png",
      rating: 4.9
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "This planner has completely transformed my practice routine. The raga tracking system is incredible!",
      date: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      text: "As a tabla student, this helps me organize my practice sessions perfectly. Highly recommended!",
      date: "1 month ago",
      verified: true
    },
    {
      id: 3,
      name: "Anita Devi",
      rating: 4,
      text: "Great quality and very detailed. My guru is impressed with my progress tracking.",
      date: "3 weeks ago",
      verified: true
    }
  ];

  return (
    <div className="font-serif bg-[#F5E6C8] text-[#4A1A1A] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        {/* Uncomment if you want breadcrumb navigation
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => router.push('/')}
              className="text-[#c67f00] hover:underline"
            >
              Home
            </button>
            <FaArrowRight className="text-gray-400 text-xs" />
            <button 
              onClick={() => router.push('/products')}
              className="text-[#c67f00] hover:underline"
            >
              Products
            </button>
            <FaArrowRight className="text-gray-400 text-xs" />
            <span className="text-gray-600">{product.name.split(' - ')[0]}</span>
          </div>
        </div>
        */}
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <div className="relative w-full h-96">
                  <Image 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    priority={selectedImage === 0}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 relative ${
                      selectedImage === index 
                        ? 'border-[#c67f00]' 
                        : 'border-gray-200 hover:border-[#c67f00]'
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Product image ${index + 1}`} 
                      fill
                      className="object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <span className="bg-[#c67f00] text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-600">{product.reviewCount}</span>
              </div>
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>

            {/* Price and Order Section */}
            <div className="bg-[#fff9f0] p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-[#c67f00]">{product.price}</span>
                <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.discount}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-6">Excluding shipping</p>
              
              {/* WhatsApp Order Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => handleWhatsAppOrder(product.name, product.price)}
                  className="w-full bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#20BD59] transition flex items-center justify-center gap-3 text-lg"
                >
                  <FaWhatsapp className="text-xl" /> 
                  Order via WhatsApp
                </button>
                
                <button 
                  onClick={() => handleWhatsAppInquiry(product.name)}
                  className="w-full border-2 border-[#c67f00] text-[#c67f00] px-8 py-3 rounded-lg font-semibold hover:bg-[#c67f00] hover:text-white transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> 
                  Ask Questions
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 text-center">
                  <FaWhatsapp className="inline mr-2" />
                  Quick response guaranteed! Chat directly with our team for instant support and personalized assistance.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-4 text-lg">What&apos;s Included:</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">About This Product</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>
              
              <h3 className="text-xl font-bold mb-4">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#c67f00] rounded-full mt-2"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Specifications */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-800">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h3 className="font-bold mb-4 text-center">Ready to Order?</h3>
              
              <div className="bg-[#fff9f0] p-4 rounded-lg mb-6">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-[#c67f00]">{product.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
                </div>
                <div className="text-center">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Save ₹400 • {product.discount}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleWhatsAppOrder(product.name, product.price)}
                  className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#20BD59] transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" />
                  Order Now
                </button>
                
                <button 
                  onClick={() => handleWhatsAppInquiry(product.name)}
                  className="w-full border-2 border-[#c67f00] text-[#c67f00] py-3 rounded-lg font-semibold hover:bg-[#c67f00] hover:text-white transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp />
                  Chat with Us
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3 text-center">Other Ways to Connect</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <FaPhone className="text-[#c67f00]" />
                    <span>+91 9310395103</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <FaEnvelope className="text-[#c67f00]" />
                    <span>tamashabhawan@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-800 text-center">
                  ✅ Instant Response • Personal Support • Secure Payment Options
                </p>
              </div>
            </div>

            {/* Why Choose WhatsApp Ordering */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaWhatsapp className="text-[#25D366]" />
                Why Order via WhatsApp?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <span className="font-medium block">Instant Response</span>
                    <span className="text-sm text-gray-600">Get immediate answers to your questions</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <span className="font-medium block">Personal Guidance</span>
                    <span className="text-sm text-gray-600">Expert advice tailored to your needs</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <span className="font-medium block">Flexible Payment</span>
                    <span className="text-sm text-gray-600">Multiple payment options available</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <span className="font-medium block">Order Tracking</span>
                    <span className="text-sm text-gray-600">Real-time updates on your order</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-[#F8F1E7] p-6 rounded-lg hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      fill
                      className="object-cover" 
                    />
                  </div>
                </div>
                <h4 className="font-bold text-center mb-2">{item.name}</h4>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-xs ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm">({item.rating})</span>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-[#c67f00] block mb-3">{item.price}</span>
                  <button 
                    onClick={() => handleWhatsAppInquiry(item.name)}
                    className="w-full bg-[#25D366] text-white py-2 rounded-lg hover:bg-[#20BD59] transition flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductPage;