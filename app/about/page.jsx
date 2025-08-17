import { HeroSection } from '@/components/about/HeroSection';
import { OurStorySection } from '@/components/about/OurStorySection';
import { VisionMissionSection } from '@/components/about/VisionMissionSection';
import { FAQSection } from '@/components/about/FAQSection';
import { ContactSection } from '@/components/about/ContactSection';

export const metadata = {
  title: 'About Us | Tamasha Bhawan - Classical Music Institute',
  description: 'Learn about Tamasha Bhawan\'s journey in preserving and promoting Hindustani classical music. Discover our vision, mission, and commitment to musical excellence.',
  keywords: 'Tamasha Bhawan, Hindustani classical music, music education, Delhi, classical music institute',
};

export default function AboutUs() {
  return (
    <div className="bg-amber-50 text-[#4A1A1A]">
      <HeroSection />
      <OurStorySection />
      <VisionMissionSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}