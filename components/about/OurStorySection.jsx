import { Music } from 'lucide-react';
import Image from 'next/image';

export const OurStorySection = () => (
  <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#140305] via-[#1e0508] to-[#160305] relative overflow-hidden">
    {/* Subtle ambient lighting */}
    <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] mb-3 shadow">
          <Music size={22} />
        </div>
        <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37] block mb-1">
          Parampara & Origins
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-white mb-4">
          Our Story
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] group">
            <div className="relative w-full h-84 sm:h-96">
              <Image
                src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745739567/WhatsApp_Image_2025-02-05_at_20.31.04_b5620e85_fu6eul.jpg"
                alt="Tamasha Bhawan History"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140305]/95 via-[#140305]/40 to-transparent flex items-end p-6">
                <div>
                  <span className="px-3 py-1 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#160305] rounded-full font-cinzel font-bold text-xs shadow inline-block mb-1">
                    Est. 2015
                  </span>
                  <p className="text-white text-lg font-cinzel font-bold">A Decade of Classical Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 text-[#f5e6a8]/90 font-cormorant text-lg sm:text-xl leading-relaxed space-y-5">
          <p>
            <strong className="text-white font-cinzel text-base tracking-wide block mb-1">Tamasha Bhawan</strong> was born from a sacred passion to celebrate, nurture, and preserve the opulent heritage of Hindustani classical vocal music. Situated in the heart of Delhi, our institution blossomed from intimate baithaks to a prestigious sanctuary uniting gurus, performers, and ardent disciples across the globe.
          </p>
          <p>
            The word <span className="text-[#d4af37] font-semibold italic">&quot;Tamasha&quot;</span> signifies grand theatrical celebration and joyous engagement. We embody this spirit by transforming rigorous classical riyaz into an inspiring, deeply fulfilling journey. Our pedagogy harmoniously bridges sacred oral guru-shishya lineages with cutting-edge learning masterclasses.
          </p>
          <p className="text-base font-sans-modern text-[#e6ca65]/80 pt-2 border-t border-[#d4af37]/20">
            Affiliated with the prestigious <span className="text-white font-semibold">Gandharva Mahavidyalaya Pune</span>, we equip students for certified diploma examinations, UGC NET Music exams, and stage performances.
          </p>
        </div>
      </div>
    </div>
  </section>
);