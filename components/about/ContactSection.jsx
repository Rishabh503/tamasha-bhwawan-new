import { Music, Mail } from 'lucide-react';
import Link from 'next/link';

export const ContactSection = () => (
  <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#4A1A1A] text-[#D7A32F]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Music className="inline-block text-[#D7A32F] mb-2" size={32} />
        <h2 className="text-4xl font-bold text-[#D7A32F] mb-4">Join Our Musical Journey</h2>
        <div className="h-1 w-24 bg-[#D7A32F] mx-auto"></div>
        <p className="text-xl mt-6 max-w-3xl mx-auto">
          Be part of our vibrant community and explore the rich tradition of Hindustani classical music. Connect with us through any of these channels:
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a 
          href="https://t.me/tamashabhawanmusic" 
          className="bg-[#D7A32F] hover:bg-[#4A1A1A] p-6 rounded-lg text-center flex flex-col items-center justify-center transition-all hover:-translate-y-2 duration-300"
        >
          <div className="bg-[#000000] text-[#fff] p-4 rounded-full mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-medium text-white">Telegram</span>
        </a>
        
        <a 
          href="mailto:contact@tamashabhawan.com" 
          className="bg-[#D7A32F] hover:bg-[#4A1A1A] p-6 rounded-lg text-center flex flex-col items-center justify-center transition-all hover:-translate-y-2 duration-300"
        >
          <div className="bg-[#000] text-[#fff] p-4 rounded-full mb-4">
            <Mail size={24} />
          </div>
          <span className="font-medium text-white">Email</span>
        </a>
        
        <a 
          href="https://www.youtube.com/@TamashaBhawanMusic" 
          className="bg-[#D7A32F] hover:bg-[#4A1A1A] p-6 rounded-lg text-center flex flex-col items-center justify-center transition-all hover:-translate-y-2 duration-300"
        >
          <div className="bg-[#000] text-[#fff] p-4 rounded-full mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988802 13.537 1.14279 15.3213 1.46 17.08C1.57879 17.5546 1.82072 17.9894 2.16135 18.3406C2.50198 18.6918 2.92925 18.9468 3.4 19.08C5.12 19.54 12 19.54 12 19.54C12 19.54 18.88 19.54 20.6 19.08C21.0708 18.9468 21.498 18.6918 21.8387 18.3406C22.1793 17.9894 22.4212 17.5546 22.54 17.08C22.8524 15.3397 23.0063 13.5747 23 11.8C23.0112 10.013 22.8572 8.22866 22.54 6.47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-medium text-white">YouTube</span>
        </a>
      </div>
      
      <div className="mt-12 text-center">
        <Link 
          href="/contact"
          className="inline-block bg-[#D7A32F] text-[#4A1A1A] font-bold py-3 px-8 rounded-full hover:bg-[#4A1A1A] hover:text-[#D7A32F] transition-colors text-lg"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  </section>
);
