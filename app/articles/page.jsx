"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FaSearch, 
  FaClock, 
  FaHeadphones, 
  FaArrowRight,
  FaTimes,
  FaCalendarAlt,
  FaUserEdit
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";

export default function ArticlesHubPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (query = searchQuery) => {
    setLoading(true);
    try {
      const url = new URL("/api/articles", window.location.origin);
      if (query && query.trim()) {
        url.searchParams.set("search", query.trim());
      }

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        // Ensure strictly sorted by date in descending order (newest first)
        const sorted = (Array.isArray(data) ? data : []).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setArticles(sorted);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchArticles("");
  };

  return (
    <div className="min-h-screen dark-velvet-bg text-white font-sans-modern pt-16 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Compact Top Header: Small Articles Heading on Left + Search Bar on Right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#d4af37]/25">
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-extrabold text-stone-100 tracking-tight flex items-center gap-2">
              <GiMusicalNotes className="text-[#e5c158] text-lg" /> Articles
            </h1>
            <p className="font-cormorant text-xs sm:text-sm text-[#f0e6d2]/70 mt-0.5">
              Sangeet Shastra Granthalaya & Musicology Readings ({articles.length})
            </p>
          </div>

          {/* Compact Search Bar & Search Button */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") {
                    fetchArticles("");
                  }
                }}
                placeholder="Search articles..."
                className="w-full bg-[#160305] border border-[#d4af37]/35 focus:border-[#d4af37] focus:outline-none px-3 py-1.5 pl-8 pr-7 rounded-lg text-xs text-white placeholder-stone-400 font-sans-modern shadow-inner transition"
              />
              <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#d4af37] text-[11px]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs p-0.5"
                  title="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-3.5 py-1.5 gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider rounded-lg shadow hover:brightness-110 active:scale-95 transition shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Articles List - Vertical Flex Design */}
        {loading ? (
          <div className="text-center py-16 text-stone-400 font-cormorant text-lg">
            <div className="w-8 h-8 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-[#200508]/80 border border-[#d4af37]/30 rounded-2xl p-6 max-w-md mx-auto">
            <GiScrollUnfurled className="text-4xl text-[#d4af37]/60 mx-auto mb-2" />
            <h3 className="font-cinzel text-base font-bold text-white mb-1">No Articles Found</h3>
            <p className="font-cormorant text-stone-300 text-xs mb-3">
              {searchQuery ? `No results matching "${searchQuery}"` : "No articles published yet."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-3 py-1.5 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-gradient-to-r from-[#200407] via-[#1a0305] to-[#120204] border border-[#d4af37]/25 hover:border-[#d4af37]/70 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5 group"
              >
                {/* Article Image Thumbnail */}
                <div className="w-full sm:w-56 md:w-64 h-44 sm:h-auto shrink-0 relative overflow-hidden rounded-xl bg-black/40 border border-[#d4af37]/20">
                  <img
                    src={article.coverImage || "/images/hero_classical_tanpura.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1e0508]/90 border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      {article.category}
                    </span>
                  </div>
                  {article.audioUrl && (
                    <div className="absolute bottom-2.5 right-2.5 bg-[#160305]/90 border border-green-500/50 text-green-300 px-2 py-0.5 rounded-md text-[10px] font-cinzel font-bold flex items-center gap-1 shadow">
                      <FaHeadphones className="text-[10px]" /> Audio
                    </div>
                  )}
                </div>

                {/* Article Meta & Content */}
                <div className="flex-1 flex flex-col justify-between space-y-2.5">
                  <div className="space-y-2">
                    {/* Date & Reading Time */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#e6ca65]/80 font-sans">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-[10px] text-[#d4af37]" />
                        {new Date(article.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[10px] text-[#d4af37]" />
                        {article.readingTimeMin || 5} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#f5e6a8] transition line-clamp-2 leading-snug">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="font-cormorant text-xs sm:text-sm text-[#f0e6d2]/80 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Author & Action */}
                  <div className="pt-2 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-300 font-cinzel">
                      <FaUserEdit className="text-[#d4af37] text-[11px]" />
                      <span className="truncate max-w-[180px] sm:max-w-[240px]">
                        {article.authorName}
                      </span>
                    </div>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="px-3.5 py-1.5 bg-[#2a060a] hover:bg-[#3d0b11] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5 group-hover:scale-105 shrink-0"
                    >
                      Read Treatise <FaArrowRight className="text-[9px]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

