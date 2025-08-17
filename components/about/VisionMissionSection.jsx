import { BookOpen, Heart, Users } from "lucide-react";

export const VisionMissionSection = () => (
  <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#4A1A1A] text-amber-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <BookOpen className="inline-block text-amber-200 mb-2" size={32} />
        <h2 className="text-4xl font-bold text-amber-100 mb-4">Vision & Mission</h2>
        <div className="h-1 w-24 bg-amber-200 mx-auto"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-amber-700/50 p-6 rounded-lg transform transition-all hover:-translate-y-2 duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Users className="text-amber-800" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-amber-100">Our Vision</h3>
          </div>
          <p className="text-lg">
            To create a world where Hindustani classical music thrives across generations, transcending cultural and geographical boundaries while preserving its authentic essence and rich heritage.
          </p>
          <div className="mt-6 flex justify-end">
            <div className="text-4xl text-amber-200 opacity-30">♪</div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-amber-700/50 p-6 rounded-lg transform transition-all hover:-translate-y-2 duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Heart className="text-amber-800" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-amber-100">Our Mission</h3>
          </div>
          <p className="text-lg">
            To provide comprehensive musical education that balances tradition with innovation, nurture talent with personalized guidance, foster a community of music lovers, and promote Hindustani classical music as a living, evolving art form accessible to all.
          </p>
          <div className="mt-6 flex justify-end">
            <div className="text-4xl text-amber-200 opacity-30">♫</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
