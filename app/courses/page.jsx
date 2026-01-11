"use client";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-[#f8f4f2] px-6 py-10">
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* LEFT: Course Details */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          
          {/* Course Title */}
          <h1 className="text-3xl font-semibold text-[#4a1c1c]">
            Guitar Basics – Beginner to Performer
          </h1>

          <p className="text-gray-600 mt-2">
            Learn guitar from scratch with structured lessons designed by
            professional musicians at Tamasha Bhawan.
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-6"></div>

          {/* About Course */}
          <h2 className="text-xl text-[#4a1c1c] mb-2">
            About this course
          </h2>

          <p className="text-gray-700 leading-relaxed">
            This course is specially designed for beginners who want to learn
            guitar step by step. You will start with basic chords, strumming
            patterns, and gradually move towards playing full songs confidently.
          </p>

          {/* What you'll learn */}
          <h2 className="text-xl text-[#4a1c1c] mt-6 mb-3">
            What you’ll learn
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Understanding guitar parts and tuning</li>
            <li>Basic chords and transitions</li>
            <li>Strumming and rhythm techniques</li>
            <li>Playing popular songs</li>
            <li>Basic music theory for guitarists</li>
          </ul>
        </div>

        {/* RIGHT: Purchase Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          
          {/* Price */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">Course Price</p>
            <h2 className="text-3xl font-semibold text-[#4a1c1c] mt-1">
              ₹1,999
            </h2>
          </div>

          {/* Buy Button */}
          <button
            className="w-full mt-6 bg-[#4a1c1c] text-white py-3 rounded-xl hover:bg-[#3a1515] transition"
          >
            Buy Course
          </button>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Lifetime access • Learn at your own pace
          </p>
        </div>

      </div>
    </div>
  );
}
