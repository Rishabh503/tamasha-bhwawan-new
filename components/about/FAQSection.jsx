"use client";
import { useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "What Makes Learning at Tamasha Bhawan Comprehensive?",
    answer: "At Tamasha Bhawan, disciples receive both foundational practical taaleem and rigorous theoretical knowledge of Hindustani classical music. Beyond vocal technique and ragas, students master the cultural, philosophical, and historical lineage of Gharanas. This comprehensive approach equips learners to perform with artistic depth and excel in prestigious evaluations."
  },
  {
    question: "How Can You Get Admission to Tamasha Bhawan?",
    answer: "To ensure customized guidance, aspirants submit an audio recording of their vocal rendition along with a brief registration profile. Our gurus assess voice texture, swara alignment, and riyaz baseline to assign the candidate to the ideal syllabus tier."
  },
  {
    question: "Does Tamasha Bhawan Offer Both Online and Offline Classes?",
    answer: "Yes! Tamasha Bhawan offers high-definition interactive live online masterclasses worldwide (with active disciples across India, Dubai, UK, and USA) as well as offline studio sessions in Delhi. All students access recorded archives, notation dossiers, and live practice sabhas."
  },
  {
    question: "How Does Tamasha Bhawan Make Learning Fun and Engaging?",
    answer: "True to the word 'Tamasha' (joyful celebration), our riyaz ecosystem turns traditional rigor into an exhilarating voyage. Through gamified evaluations, live riyaz circles, and interactive peer sabhas, classical music becomes an uplifting daily devotion rather than a tedious drill."
  },
  {
    question: "How Does Tamasha Bhawan Help Students Get Certified?",
    answer: "Tamasha Bhawan prepares candidates for certified examinations affiliated with Gandharva Mahavidyalaya Pune, ranging from Prarambhik to Visharad diplomas, as well as UGC NET Music preparation. Our structured curriculum and mock evaluation arenas ensure top distinctions."
  }
];

export const FAQSection = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleFAQ = (index) => {
    if (isOpen === index) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#160305] via-[#1f0508] to-[#140305] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] mb-3 shadow">
            <MessageSquare size={22} />
          </div>
          <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>
        
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isExpanded = isOpen === index;

            return (
              <div 
                key={index} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                  isExpanded
                    ? "bg-[#25070b] border-[#d4af37] ring-1 ring-[#d4af37]/40"
                    : "bg-[#1a0406]/90 border-[#d4af37]/25 hover:border-[#d4af37]/50"
                }`}
              >
                <button
                  className="w-full p-5 text-left flex justify-between items-center focus:outline-none transition-colors group"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={`text-base sm:text-lg font-cinzel font-bold tracking-wide transition ${
                    isExpanded ? "text-[#f5e6a8]" : "text-white group-hover:text-[#f5e6a8]"
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ml-4 shrink-0 ${
                    isExpanded
                      ? "bg-[#d4af37] text-[#160305] border-[#d4af37] rotate-180"
                      : "bg-[#2e080c] text-[#d4af37] border-[#d4af37]/40"
                  }`}>
                    <ChevronDown size={18} />
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#d4af37]/15 bg-[#140305]/60 animate-fadeIn">
                    <p className="text-[#f5e6a8]/90 font-cormorant text-lg sm:text-xl leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};