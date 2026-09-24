"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaBookOpen, 
  FaHeadphones, 
  FaSearch, 
  FaCheck, 
  FaTimes, 
  FaChartBar,
  FaClock
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";

export default function AdminArticlesDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (article) => {
    setTogglingId(article.id);
    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !article.isPublished })
      });
      if (res.ok) {
        setArticles(prev => prev.map(a => a.id === article.id ? { ...a, isPublished: !a.isPublished } : a));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleToDelete.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));
        setArticleToDelete(null);
      } else {
        alert("Failed to delete article");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = !search.trim() || 
      a.title.toLowerCase().includes(search.toLowerCase()) || 
      a.authorName.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === "ALL" || a.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const publishedCount = articles.filter(a => a.isPublished).length;
  const draftCount = articles.length - publishedCount;

  return (
    <div className="min-h-screen dark-velvet-bg text-white p-4 sm:p-8 font-sans-modern">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#d4af37]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase tracking-widest mb-2">
              <GiMusicalNotes className="text-[#e5c158]" /> Admin Publication Studio
            </div>
            <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Article & Granthalaya Management
            </h1>
            <p className="font-cormorant text-base sm:text-lg text-[#f0e6d2]/80 mt-0.5">
              Author scholarly musicology papers, attach audio lectures, and manage reader publications.
            </p>
          </div>

          <Link
            href="/admin/articles/create"
            className="px-6 py-3.5 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition flex items-center gap-2 shrink-0"
          >
            <FaPlus /> Author New Article
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] uppercase font-cinzel font-bold text-[#d4af37] block">Total Articles</span>
            <span className="text-2xl sm:text-3xl font-cinzel font-black text-white">{articles.length}</span>
          </div>
          <div className="bg-[#1e0508]/90 border border-green-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] uppercase font-cinzel font-bold text-green-300 block">Published</span>
            <span className="text-2xl sm:text-3xl font-cinzel font-black text-green-400">{publishedCount}</span>
          </div>
          <div className="bg-[#1e0508]/90 border border-amber-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] uppercase font-cinzel font-bold text-amber-300 block">Drafts</span>
            <span className="text-2xl sm:text-3xl font-cinzel font-black text-amber-300">{draftCount}</span>
          </div>
          <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] uppercase font-cinzel font-bold text-[#f5e6a8] block">Total Reader Views</span>
            <span className="text-2xl sm:text-3xl font-cinzel font-black text-white">{totalViews}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-2xl p-4 shadow-md">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by title, author..."
              className="w-full bg-[#140305] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none px-3.5 py-2 pl-9 rounded-xl text-xs text-white placeholder-stone-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37] text-xs" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["ALL", "Raga Shastra", "Gharana Parampara", "Voice Culture", "Ancient Treatises", "Musicology"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition whitespace-nowrap border ${
                  filterCategory === cat
                    ? "bg-[#d4af37] text-[#160305] border-[#d4af37]"
                    : "bg-[#140305] text-[#f5e6a8] border-[#d4af37]/30 hover:border-[#d4af37]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Table */}
        {loading ? (
          <div className="text-center py-20 text-stone-400 font-cormorant text-xl">
            <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading articles list...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#200508]/80 border border-[#d4af37]/30 rounded-3xl p-8">
            <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mx-auto mb-3" />
            <h3 className="font-cinzel text-lg font-bold text-white mb-1">No Articles Found</h3>
            <p className="font-cormorant text-stone-300 text-sm mb-4">Create your first dissertation or adjust filter.</p>
            <Link
              href="/admin/articles/create"
              className="px-5 py-2.5 gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl inline-block"
            >
              Author First Article
            </Link>
          </div>
        ) : (
          <div className="bg-[#200508]/90 rounded-3xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#160305]/80 border-b border-[#d4af37]/20 text-[11px] uppercase font-cinzel tracking-wider text-[#d4af37] font-bold">
                    <th className="p-4 pl-6">Article</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Audio</th>
                    <th className="p-4">Views</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4af37]/15 text-sm font-sans-modern text-stone-200">
                  {filteredArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-[#2e080c]/60 transition">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          {art.coverImage ? (
                            <img
                              src={art.coverImage}
                              alt={art.title}
                              className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/30 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#3b0d11] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                              <FaBookOpen />
                            </div>
                          )}
                          <div className="min-w-0 max-w-sm">
                            <span className="font-cinzel font-bold text-white text-sm line-clamp-1 block">
                              {art.title}
                            </span>
                            <span className="text-[11px] text-stone-400 font-sans block">
                              ⏱ {art.readingTimeMin || 5} min read • /{art.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-cinzel text-xs text-[#f5e6a8]">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/30">
                          {art.category}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-xs text-stone-300">
                        {art.authorName}
                      </td>

                      <td className="p-4">
                        {art.audioUrl ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-400 font-cinzel">
                            <FaHeadphones /> Attached
                          </span>
                        ) : (
                          <span className="text-xs text-stone-500 font-cinzel">None</span>
                        )}
                      </td>

                      <td className="p-4 font-mono text-xs text-amber-300 font-bold">
                        {art.views}
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(art)}
                          disabled={togglingId === art.id}
                          className={`px-3 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase transition flex items-center gap-1 ${
                            art.isPublished
                              ? "bg-green-900/60 text-green-300 border border-green-500/40 hover:bg-green-800"
                              : "bg-amber-900/60 text-amber-300 border border-amber-500/40 hover:bg-amber-800"
                          }`}
                        >
                          {art.isPublished ? "✓ Published" : "✎ Draft"}
                        </button>
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/admin/articles/${art.id}/preview`}
                            className="p-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg transition"
                            title="Preview Article (User View)"
                          >
                            <FaEye className="text-xs" />
                          </Link>

                          <Link
                            href={`/admin/articles/${art.id}/edit`}
                            className="p-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg transition"
                            title="Edit Article"
                          >
                            <FaEdit className="text-xs" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setArticleToDelete(art)}
                            className="p-2 bg-[#240609] hover:bg-red-950/60 border border-red-500/30 text-red-300 rounded-lg transition"
                            title="Delete Article"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#200508] border-2 border-red-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <FaTrash className="text-lg" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">
              Delete Article?
            </h3>
            <p className="font-cormorant text-stone-300 text-sm">
              Are you sure you want to permanently delete <strong className="text-white font-cinzel">&ldquo;{articleToDelete.title}&rdquo;</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-cinzel text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteArticle}
                disabled={deleting}
                className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-xl font-cinzel text-xs font-bold transition shadow-lg disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
