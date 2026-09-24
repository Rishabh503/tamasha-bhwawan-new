"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaArrowLeft, 
  FaClock, 
  FaEye, 
  FaShareAlt, 
  FaBookmark, 
  FaHeadphones, 
  FaAward, 
  FaCheck, 
  FaWhatsapp,
  FaBookOpen,
  FaUserGraduate
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled, GiLyre, GiTempleGate } from "react-icons/gi";
import ArticleAudioPlayer from "../../../components/articles/ArticleAudioPlayer";
import ArticleContentRenderer, { extractHeadings } from "../../../components/articles/ArticleContentRenderer";

export default function ArticleReaderPage({ params }) {
  const router = useRouter();
  const { slug } = use(params);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  // Track scroll progress and active heading
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check headings
      const headingElements = document.querySelectorAll("h2[id], h3[id]");
      let currentActive = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160) {
          currentActive = el.id;
        }
      });
      if (currentActive) {
        setActiveHeadingId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${slug}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        router.push("/articles");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern pt-24">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-cinzel text-lg font-bold text-[#f5e6a8]">Retrieving Sangeet Shastra Article...</p>
        <p className="font-cormorant text-sm text-[#f0e6d2]/70 mt-1">Preparing immersive classical reading room</p>
      </div>
    );
  }

  if (!data?.article) {
    return (
      <div className="min-h-screen dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern pt-24">
        <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mb-3" />
        <h1 className="font-cinzel text-2xl font-bold text-white mb-2">Article Not Found</h1>
        <Link href="/articles" className="px-5 py-2.5 gold-gradient-bg text-[#1a0406] rounded-xl font-cinzel text-xs font-bold uppercase">
          ← Back to Granthalaya
        </Link>
      </div>
    );
  }

  const { article, related = [] } = data;
  const headings = extractHeadings(article.content);

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern pt-14 sm:pt-16 pb-16 relative">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#140305] z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#f5e6a8] to-[#aa7c11] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Strip */}
        <div className="flex flex-wrap justify-between items-center gap-2 py-2 mb-4 border-b border-[#d4af37]/25 text-xs font-cinzel">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-[#e6ca65] hover:text-white transition font-bold"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Articles Granthalaya
          </Link>

          <div className="flex items-center gap-3 text-stone-400">
            <span className="flex items-center gap-1">
              <FaClock className="text-[#d4af37]" /> {article.readingTimeMin || 5} min read
            </span>
            <span className="flex items-center gap-1">
              <FaEye className="text-[#d4af37]" /> {article.views} views
            </span>
            <button
              onClick={handleCopyLink}
              className="p-1 px-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg transition flex items-center gap-1 text-[11px]"
              title="Copy Article Link"
            >
              <FaShareAlt className="text-[9px]" /> {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>

        {/* 3-COLUMN LAYOUT: (Left: TOC | Middle: Main Article | Right: Sidebar / Ads) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================
              LEFT COLUMN (3 Cols): Sticky Table of Contents & Metrics
             ======================================================== */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-20 space-y-5">
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-[#d4af37]/20">
                <GiScrollUnfurled className="text-[#d4af37] text-base" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#f5e6a8]">
                  Table of Contents
                </span>
              </div>

              {headings.length === 0 ? (
                <p className="font-cormorant text-xs text-[#f0e6d2]/60 italic">Reading section uninterrupted</p>
              ) : (
                <nav className="space-y-1.5 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                  {headings.map((h, idx) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <a
                        key={idx}
                        href={`#${h.id}`}
                        className={`block text-[11px] transition-all duration-200 py-1 px-2 rounded-lg ${
                          h.level === 3 ? "ml-2.5 text-[10px]" : "font-semibold"
                        } ${
                          isActive
                            ? "bg-gradient-to-r from-[#3b0d11] to-[#25060a] border-l-2 border-[#d4af37] text-[#f5e6a8] font-cinzel font-bold shadow-sm"
                            : "text-stone-300 hover:text-white hover:bg-[#28080d]/60 font-sans-modern"
                        }`}
                      >
                        {h.title}
                      </a>
                    );
                  })}
                </nav>
              )}

              {/* Quick Jump to Audio if Available */}
              {article.audioUrl && (
                <div className="mt-3 pt-3 border-t border-[#d4af37]/20">
                  <a
                    href="#audio-edition"
                    className="w-full py-1.5 bg-[#2a060a] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 transition"
                  >
                    <FaHeadphones className="text-[10px] text-[#d4af37]" /> Jump to Audio Player
                  </a>
                </div>
              )}
            </div>

            {/* Author Mini Badge */}
            <div className="bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-xl p-3 shadow-lg flex items-center gap-2.5">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/50 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-cinzel font-bold text-xs shrink-0">
                  {article.authorName?.charAt(0) || "A"}
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-cinzel tracking-wider text-[#d4af37] block">Author</span>
                <span className="font-cinzel text-xs font-bold text-white truncate block">{article.authorName}</span>
                <span className="text-[10px] text-stone-300 truncate block font-cormorant">{article.authorRole}</span>
              </div>
            </div>
          </aside>


          {/* ========================================================
              MIDDLE COLUMN (6 Cols): Main Article Reading Space
             ======================================================== */}
          <main className="lg:col-span-6 bg-[#1b0406]/85 border border-[#d4af37]/35 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-4">
            
            {/* Category & Date Header */}
            <div className="flex flex-wrap justify-between items-center gap-2 pb-2.5 border-b border-[#d4af37]/25">
              <span className="px-2.5 py-0.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[10px] font-bold uppercase tracking-wider">
                <GiMusicalNotes className="inline mr-1 text-[#e5c158]" /> {article.category || "Musicology"}
              </span>
              <span className="text-xs text-[#e6ca65]/80 font-cormorant italic">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>

            {/* Article Title & Excerpt */}
            <div>
              <h1 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-100 tracking-tight leading-snug">
                {article.title}
              </h1>

              {/* Excerpt / Lead Subtitle */}
              {article.excerpt && (
                <p className="font-playfair italic text-xs sm:text-sm text-[#f3e5ab] mt-2 leading-relaxed opacity-90">
                  &ldquo;{article.excerpt}&rdquo;
                </p>
              )}
            </div>

            {/* Audio Recitation Player (if audioUrl exists) */}
            {article.audioUrl && (
              <div id="audio-edition">
                <ArticleAudioPlayer
                  audioUrl={article.audioUrl}
                  title={article.title}
                  durationSec={article.audioDuration}
                />
              </div>
            )}

            {/* Featured Hero Cover Image */}
            {article.coverImage && (
              <div className="rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-xl bg-black/50 aspect-video relative my-3 group">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160305]/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
            )}

            {/* Article Main Text Content */}
            <div className="pt-1">
              <ArticleContentRenderer content={article.content} />
            </div>

            {/* Tags Cloud */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center gap-1.5">
                <span className="font-cinzel text-[11px] font-bold text-[#d4af37] mr-1">Tags:</span>
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-[#28080d] border border-[#d4af37]/30 text-[#f5e6a8] font-cinzel text-[10px] rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ========================================================
                ABOUT THE AUTHOR SECTION (At End of Article)
               ======================================================== */}
            <div className="mt-8 pt-6 border-t border-[#d4af37]/30 bg-gradient-to-br from-[#2a060a] to-[#160305] rounded-2xl p-5 border border-[#d4af37]/35 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
                {/* Author Avatar */}
                <div className="relative shrink-0">
                  {article.authorAvatar ? (
                    <img
                      src={article.authorAvatar}
                      alt={article.authorName}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-[#d4af37] shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-[#3b0d11] border border-[#d4af37] flex items-center justify-center text-xl font-cinzel font-black text-[#d4af37] shadow-md">
                      {article.authorName?.charAt(0) || "T"}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-[#d4af37] text-[#160305] p-1 rounded-full shadow text-[10px]">
                    <FaAward />
                  </div>
                </div>

                {/* Author Details & Bio */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#d4af37] font-cinzel font-bold block">
                    About The Author
                  </span>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                    {article.authorName || "Tamasha Bhawan Faculty"}
                  </h3>
                  <p className="text-[11px] font-cinzel font-semibold text-[#f5e6a8]">
                    {article.authorRole || "Maestro & Senior Musicologist"}
                  </p>
                  <p className="font-cormorant text-xs sm:text-sm text-[#f0e6d2]/90 leading-relaxed pt-0.5">
                    {article.authorBio || "Dedicated scholar and teacher at Tamasha Bhawan, preserving and transmitting the sacred lineages of Hindustani Classical Vocal and Ancient Sangeet Shastras."}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <a
                      href="https://wa.me/919310395103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#2e080c] hover:bg-[#420d13] border border-[#d4af37]/50 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold tracking-wider uppercase transition flex items-center gap-1 shadow"
                    >
                      <FaWhatsapp className="text-green-400" /> Consult with Faculty
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </main>


          {/* ========================================================
              RIGHT COLUMN (3 Cols): Related Reads, Ads & CTA Space
             ======================================================== */}
          <aside className="lg:col-span-3 space-y-6 sticky top-24">
            
            {/* Related Articles Card */}
            {related.length > 0 && (
              <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#d4af37]/20">
                  <FaBookOpen className="text-[#d4af37] text-sm" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#f5e6a8]">
                    Related Dissertations
                  </span>
                </div>

                <div className="space-y-3.5">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/articles/${item.slug}`}
                      className="block p-3 rounded-2xl bg-[#140305]/80 hover:bg-[#28080d] border border-[#d4af37]/20 hover:border-[#d4af37] transition group"
                    >
                      <span className="text-[10px] font-cinzel font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-cinzel text-xs font-bold text-stone-100 group-hover:text-[#f5e6a8] transition line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-stone-400 font-sans">
                        <span>⏱ {item.readingTimeMin || 5} min read</span>
                        {item.audioUrl && <span className="text-[#d4af37]">🎧 Audio</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Academy Course Promotion / Advertisement Widget */}
            <div className="bg-gradient-to-b from-[#2a060a] to-[#160305] border-2 border-[#d4af37]/50 rounded-3xl p-6 shadow-2xl text-center space-y-3 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-[#3b0d11] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] text-xl mx-auto shadow-lg">
                <FaUserGraduate />
              </div>
              <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                Official Certification
              </span>
              <h4 className="font-cinzel text-base font-bold text-white leading-tight">
                Gandharva Mahavidyalaya Degree Courses
              </h4>
              <p className="font-cormorant text-xs text-[#f0e6d2]/80 leading-relaxed">
                Enroll for structured Visharad certification, personalized riyaz corrections & notation sheets.
              </p>
              <div className="pt-2">
                <Link
                  href="/courses"
                  className="block w-full py-2.5 gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:scale-105 transition"
                >
                  Explore Syllabuses →
                </Link>
              </div>
            </div>

            {/* Future Ads Slot / Sponsorship Placeholder */}
            <div className="border border-dashed border-[#d4af37]/30 bg-[#140305]/50 rounded-2xl p-4 text-center">
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#d4af37]/60 block">
                ⚜ Sangeet Granthalaya Bulletin ⚜
              </span>
              <p className="text-[11px] font-cormorant italic text-[#f0e6d2]/50 mt-1">
                Curated research and audio stems published weekly by Tamasha Bhawan.
              </p>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
