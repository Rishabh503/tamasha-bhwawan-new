import { HeroSection } from '@/components/about/HeroSection';
import { OurStorySection } from '@/components/about/OurStorySection';
import { VisionMissionSection } from '@/components/about/VisionMissionSection';
import { FAQSection } from '@/components/about/FAQSection';
import { ContactSection } from '@/components/about/ContactSection';
import { aboutPageMetadata } from '@/data/metaData';

export const metadata = aboutPageMetadata;
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