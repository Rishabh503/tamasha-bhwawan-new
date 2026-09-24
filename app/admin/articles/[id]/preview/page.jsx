"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaClock, 
  FaEye, 
  FaHeadphones, 
  FaAward, 
  FaCheck, 
  FaShareAlt,
  FaBookOpen,
  FaWhatsapp,
  FaUserGraduate
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";
import ArticleAudioPlayer from "../../../../../components/articles/ArticleAudioPlayer";
import ArticleContentRenderer, { extractHeadings } from "../../../../../components/articles/ArticleContentRenderer";

export default function AdminArticlePreviewPage({ params }) {
  const router = useRouter();
  const { id: articleId } = use(params);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

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
  }, [article]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setArticle(data);
      } else {
        alert("Article not found");
        router.push("/admin/articles");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!article) return;
    setToggling(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !article.isPublished })
      });
      if (res.ok) {
        setArticle(prev => ({ ...prev, isPublished: !prev.isPublished }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/admin/articles");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-cinzel text-lg font-bold text-[#f5e6a8]">Loading Admin Article Preview...</p>
      </div>
    );
  }

  if (!article) return null;

  const headings = extractHeadings(article.content);

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern pt-4 pb-20 relative">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#140305] z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#f5e6a8] to-[#aa7c11] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Admin Floating Control Header */}
        <div className="bg-[#140305]/95 border border-[#d4af37]/40 rounded-2xl px-4 py-2.5 flex flex-wrap justify-between items-center gap-3 shadow-2xl backdrop-blur-md sticky top-4 z-40">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="px-3 py-1.5 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaArrowLeft className="text-[10px]" /> Back to Dashboard
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/30 text-[#f5e6a8] font-cinzel text-[10px] font-bold">
              👑 Admin Preview Mode
            </span>
            <span className="text-xs text-white font-cinzel font-bold max-w-xs truncate hidden sm:inline">
              /{article.slug}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleTogglePublish}
              disabled={toggling}
              className={`px-3 py-1.5 rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5 border ${
                article.isPublished
                  ? "bg-green-950 border-green-500/60 text-green-300"
                  : "bg-amber-950 border-amber-500/60 text-amber-300"
              }`}
            >
              {article.isPublished ? "✓ Published" : "✎ Draft"}
            </button>

            <Link
              href={`/admin/articles/${articleId}/edit`}
              className="px-3.5 py-1.5 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaEdit className="text-xs" /> Edit Article
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-[#240609] hover:bg-red-950/60 border border-red-500/30 text-red-300 rounded-xl transition"
              title="Delete Article"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>

        {/* 3-COLUMN USER VIEW (Table of Contents | Article | Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* ========================================================
              LEFT COLUMN (3 Cols): Sticky Table of Contents
             ======================================================== */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-20 space-y-6">
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#d4af37]/20">
                <GiScrollUnfurled className="text-[#d4af37] text-lg" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#f5e6a8]">
                  Table of Contents
                </span>
              </div>

              {headings.length === 0 ? (
                <p className="font-cormorant text-xs text-[#f0e6d2]/60 italic">Reading section uninterrupted</p>
              ) : (
                <nav className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                  {headings.map((h, idx) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <a
                        key={idx}
                        href={`#${h.id}`}
                        className={`block text-xs transition-all duration-200 py-1.5 px-2.5 rounded-xl ${
                          h.level === 3 ? "ml-3 text-[11px]" : "font-semibold"
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

              {article.audioUrl && (
                <div className="mt-4 pt-4 border-t border-[#d4af37]/20">
                  <a
                    href="#audio-edition"
                    className="w-full py-2 bg-[#2a060a] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <FaHeadphones className="text-xs text-[#d4af37]" /> Jump to Audio
                  </a>
                </div>
              )}
            </div>

            {/* Author Mini Badge */}
            <div className="bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-2xl p-4 shadow-lg flex items-center gap-3">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]/50 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-cinzel font-bold text-sm shrink-0">
                  {article.authorName?.charAt(0) || "A"}
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#d4af37] block">Author</span>
                <span className="font-cinzel text-xs font-bold text-white truncate block">{article.authorName}</span>
                <span className="text-[10px] text-stone-300 truncate block font-cormorant">{article.authorRole}</span>
              </div>
            </div>
          </aside>

          {/* ========================================================
              MIDDLE COLUMN (6 Cols): Main Article Reading Space
             ======================================================== */}
          <main className="lg:col-span-6 bg-[#1b0406]/85 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md space-y-6">
            
            {/* Category & Date Header */}
            <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#d4af37]/25">
              <span className="px-3.5 py-1 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase tracking-widest">
                <GiMusicalNotes className="inline mr-1 text-[#e5c158]" /> {article.category || "Musicology"}
              </span>
              <span className="text-xs text-[#e6ca65]/80 font-cormorant italic">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>

            {/* Article Title */}
            <div>
              <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 tracking-tight leading-[1.2]">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="font-playfair italic text-lg sm:text-xl text-[#f3e5ab] mt-3 leading-relaxed">
                  &ldquo;{article.excerpt}&rdquo;
                </p>
              )}
            </div>

            {/* Audio Recitation Player */}
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
              <div className="rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-black/50 aspect-video relative my-4 group">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
              </div>
            )}

            {/* Article Main Text Content */}
            <div className="pt-2">
              <ArticleContentRenderer content={article.content} />
            </div>

            {/* Tags Cloud */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-[#d4af37]/20 flex flex-wrap items-center gap-2">
                <span className="font-cinzel text-xs font-bold text-[#d4af37] mr-1">Tags:</span>
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#28080d] border border-[#d4af37]/30 text-[#f5e6a8] font-cinzel text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ========================================================
                ABOUT THE AUTHOR SECTION (At End of Article)
               ======================================================== */}
            <div className="mt-12 pt-8 border-t-2 border-[#d4af37]/30 bg-gradient-to-br from-[#2a060a] to-[#160305] rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                <div className="relative shrink-0">
                  {article.authorAvatar ? (
                    <img
                      src={article.authorAvatar}
                      alt={article.authorName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#3b0d11] border-2 border-[#d4af37] flex items-center justify-center text-3xl font-cinzel font-black text-[#d4af37] shadow-xl">
                      {article.authorName?.charAt(0) || "T"}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-[#d4af37] text-[#160305] p-1.5 rounded-full shadow-md text-xs">
                    <FaAward />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-cinzel font-bold block">
                    About The Author
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {article.authorName || "Tamasha Bhawan Faculty"}
                  </h3>
                  <p className="text-xs font-cinzel font-semibold text-[#f5e6a8]">
                    {article.authorRole || "Maestro & Senior Musicologist"}
                  </p>
                  <p className="font-cormorant text-base text-[#f0e6d2]/90 leading-relaxed pt-1">
                    {article.authorBio || "Dedicated scholar and teacher at Tamasha Bhawan, preserving and transmitting the sacred lineages of Hindustani Classical Vocal and Ancient Sangeet Shastras."}
                  </p>
                </div>
              </div>
            </div>

          </main>

          {/* ========================================================
              RIGHT COLUMN (3 Cols): Related Reads, Ads & CTA Space
             ======================================================== */}
          <aside className="lg:col-span-3 space-y-6 sticky top-20">
            
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#200508] border-2 border-red-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <FaTrash className="text-lg" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">
              Delete Article?
            </h3>
            <p className="font-cormorant text-stone-300 text-sm">
              Are you sure you want to delete this article?
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-stone-800 text-stone-200 rounded-xl font-cinzel text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 bg-red-700 text-white rounded-xl font-cinzel text-xs font-bold"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
