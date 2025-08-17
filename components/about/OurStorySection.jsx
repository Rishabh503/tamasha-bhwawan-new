import { Music } from 'lucide-react';
import Image from 'next/image';

export const OurStorySection = () => (
  <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-amber-100 to-[#c58f8f]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Music className="inline-block text-amber-600 mb-2" size={32} />
        <h2 className="text-4xl font-bold text-amber-800 mb-4">Our Story</h2>
        <div className="h-1 w-24 bg-amber-600 mx-auto"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative rounded-lg overflow-hidden border-4 border-amber-600 shadow-xl transform transition-all hover:scale-105 duration-300">
            <div className="relative w-full h-80">
              <Image
                src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745739567/WhatsApp_Image_2025-02-05_at_20.31.04_b5620e85_fu6eul.jpg"
                alt="Tamasha Bhawan History"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end">
                <p className="text-amber-100 p-4 text-lg font-medium">Founded in 2015</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 text-amber-800">
          <p className="text-lg mb-4">
            Tamasha Bhawan was born from a passion to celebrate and preserve the rich heritage of Hindustani classical music. Located in the heart of Delhi, our institution has grown from a small gathering of music enthusiasts to a vibrant community of performers, teachers, and students.
          </p>
          <p className="text-lg mb-4">
            The word &quot;Tamasha&quot; means entertainment, and we&apos;ve stayed true to our name by making learning a joyful experience. Our approach combines traditional teaching methods with modern techniques, creating an environment where ancient melodies find contemporary relevance.
          </p>
          <p className="text-lg">
            Today, we stand as a testament to the timeless appeal of Hindustani classical music, offering both practical and theoretical knowledge to students of all ages and skill levels.
          </p>
        </div>
      </div>
    </div>
  </section>
);