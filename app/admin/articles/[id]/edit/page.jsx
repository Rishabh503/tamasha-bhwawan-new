"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaSave, 
  FaEye, 
  FaArrowLeft, 
  FaImage, 
  FaHeadphones, 
  FaUser, 
  FaFileAlt,
  FaBookOpen,
  FaCheck
} from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import ArticleContentRenderer from "../../../../../components/articles/ArticleContentRenderer";

const CATEGORIES = [
  "Raga Shastra",
  "Gharana Parampara",
  "Voice Culture",
  "Ancient Treatises",
  "History & Lineage",
  "Musicology"
];

export default function EditArticlePage({ params }) {
  const router = useRouter();
  const { id: articleId } = use(params);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Raga Shastra");
  const [tagsInput, setTagsInput] = useState("");
  const [readingTimeMin, setReadingTimeMin] = useState(5);
  const [isPublished, setIsPublished] = useState(true);

  // Media
  const [coverImage, setCoverImage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState("");

  // Content
  const [content, setContent] = useState("");

  // Author details
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [authorBio, setAuthorBio] = useState("");

  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    setInitialLoading(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setExcerpt(data.excerpt || "");
        setCategory(data.category || "Musicology");
        setTagsInput(Array.isArray(data.tags) ? data.tags.join(", ") : "");
        setReadingTimeMin(data.readingTimeMin || 5);
        setIsPublished(data.isPublished ?? true);
        setCoverImage(data.coverImage || "");
        setAudioUrl(data.audioUrl || "");
        setAudioDuration(data.audioDuration ? String(data.audioDuration) : "");
        setContent(data.content || "");
        setAuthorName(data.authorName || "Tamasha Bhawan Faculty");
        setAuthorRole(data.authorRole || "");
        setAuthorAvatar(data.authorAvatar || "");
        setAuthorBio(data.authorBio || "");
      } else {
        alert("Article not found.");
        router.push("/admin/articles");
      }
    } catch (err) {
      console.error(err);
      alert("Error loading article data.");
    } finally {
      setInitialLoading(false);
    }
  };

  const insertSnippet = (snippet) => {
    setContent(prev => prev + "\n\n" + snippet);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter an Article Title");
      return;
    }
    if (!content.trim()) {
      alert("Please enter Article Content");
      return;
    }

    setSaving(true);
    setSaveSuccess("");
    try {
      const tags = tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          category,
          tags,
          readingTimeMin: Number(readingTimeMin) || 5,
          isPublished,
          coverImage,
          audioUrl,
          audioDuration: audioDuration ? Number(audioDuration) : null,
          content,
          authorName,
          authorRole,
          authorAvatar,
          authorBio,
        }),
      });

      if (res.ok) {
        setSaveSuccess("Article updated successfully!");
        setTimeout(() => setSaveSuccess(""), 3500);
      } else {
        const errorText = await res.text();
        alert(`Error saving article changes: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-cinzel text-lg font-bold text-[#f5e6a8]">Loading Article Studio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark-velvet-bg text-white font-sans-modern p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-[#d4af37]/30">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="px-3 py-1.5 bg-[#2a070c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaArrowLeft className="text-[10px]" /> Back to Articles
            </Link>
            <div>
              <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Edit Article: {title || "Treatise"}
              </h1>
              <p className="text-xs text-[#e6ca65]/70 font-cormorant italic">
                Update content, audio recitation track, and author biography
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {saveSuccess && (
              <span className="text-xs font-cinzel text-[#4ade80] flex items-center gap-1 animate-pulse">
                <FaCheck /> {saveSuccess}
              </span>
            )}

            <Link
              href={`/admin/articles/${articleId}/preview`}
              className="px-3.5 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaEye className="text-xs" /> Full Preview
            </Link>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}
              className="px-4 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              {activeTab === "edit" ? "Quick Preview Tab" : "Back to Editor"}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
            >
              <FaSave /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {activeTab === "preview" ? (
          /* Live Preview Mode */
          <div className="bg-[#1b0406]/95 border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-[#d4af37]/25">
              <span className="px-3.5 py-1 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase">
                {category}
              </span>
              <span className="text-xs font-cinzel text-[#d4af37]">
                ⏱ {readingTimeMin} min read
              </span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-stone-100">
              {title || "Untitled Article"}
            </h1>

            {excerpt && (
              <p className="font-playfair italic text-lg text-[#f3e5ab]">
                &ldquo;{excerpt}&rdquo;
              </p>
            )}

            {coverImage && (
              <div className="rounded-2xl overflow-hidden border border-[#d4af37]/40 aspect-video bg-black/40">
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="pt-2">
              <ArticleContentRenderer content={content} />
            </div>

            {/* Author Box Preview */}
            <div className="mt-8 pt-6 border-t border-[#d4af37]/30 bg-[#25060a] p-6 rounded-2xl border border-[#d4af37]/30 flex items-center gap-4">
              {authorAvatar ? (
                <img src={authorAvatar} alt={authorName} className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[#3b0d11] border border-[#d4af37] flex items-center justify-center font-cinzel text-xl text-[#d4af37]">
                  {authorName.charAt(0)}
                </div>
              )}
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#d4af37] block">About the Author</span>
                <h4 className="font-cinzel text-base font-bold text-white">{authorName}</h4>
                <p className="text-xs text-[#f5e6a8] font-cinzel">{authorRole}</p>
                <p className="font-cormorant text-sm text-[#f0e6d2]/80 mt-1">{authorBio}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Editor Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Title & Excerpt */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                <FaFileAlt /> 1. Article Core Information
              </h3>

              <div className="space-y-1.5">
                <label className="block text-xs font-cinzel font-bold text-stone-200">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Article Title"
                  className="w-full bg-[#120204] border border-[#d4af37]/40 focus:border-[#d4af37] focus:outline-none p-3 rounded-xl text-white font-cinzel font-bold text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Custom URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="article-slug-url"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-white font-cinzel text-xs"
                  >
                    {CATEGORIES.filter(c => c !== "ALL").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-cinzel font-bold text-stone-200">
                  Lead Subtitle / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Article summary..."
                  className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-3 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Ragas, Shrutis, Parampara"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Estimated Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={readingTimeMin}
                    onChange={(e) => setReadingTimeMin(e.target.value)}
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. Media: Audio & Cover Image */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                <FaHeadphones /> 2. Audio Edition & Cover Artwork
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200 flex items-center gap-1.5">
                    <FaHeadphones className="text-[#d4af37]" /> Audio Stream Link (MP3 / Audio URL)
                  </label>
                  <input
                    type="text"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://.../lecture.mp3"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200 flex items-center gap-1.5">
                    <FaImage className="text-[#d4af37]" /> Cover Artwork Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/images/hero_classical_tanpura.jpg"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 font-mono text-xs"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setCoverImage("/images/hero_classical_tanpura.jpg")}
                      className="text-[10px] px-2 py-0.5 bg-[#2a060a] border border-[#d4af37]/30 text-[#f5e6a8] rounded"
                    >
                      Tanpura
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverImage("/images/hero_classical_sitar_tabla.jpg")}
                      className="text-[10px] px-2 py-0.5 bg-[#2a060a] border border-[#d4af37]/30 text-[#f5e6a8] rounded"
                    >
                      Sitar & Tabla
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverImage("/images/hero_sangeet_shastra.jpg")}
                      className="text-[10px] px-2 py-0.5 bg-[#2a060a] border border-[#d4af37]/30 text-[#f5e6a8] rounded"
                    >
                      Sangeet Shastra
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Main Rich Content Editor */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-[#d4af37]/20">
                <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                  <FaBookOpen /> 3. Article Content
                </h3>

                {/* Quick Insert Helper Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet("## Section Heading\n\nSection content...")}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + H2 (TOC)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet("### Subheading\n\nSubheading details...")}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + H3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> "Ancient musicological quotation"\n> — Sangeet Treatise')}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet("```\nSthayi:\nS   R   G   m | P   -   D   P | m   G   R   S\n```")}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + Swaralipi Box
                  </button>
                </div>
              </div>

              <textarea
                rows={16}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write musical dissertation..."
                className="w-full bg-[#120204] border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none p-4 rounded-2xl text-white font-mono text-sm leading-relaxed"
              />
            </div>

            {/* 4. About Author Section */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                <FaUser /> 4. About the Author
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-white text-xs font-cinzel font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Author Role / Designation
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-cinzel font-bold text-stone-200">
                  Author Photo / Avatar Link
                </label>
                <input
                  type="text"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-cinzel font-bold text-stone-200">
                  Detailed Author Biography
                </label>
                <textarea
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-3 rounded-xl text-white text-sm"
                />
              </div>
            </div>

            {/* 5. Publish Status & Bottom Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#1e0508] p-5 rounded-3xl border border-[#d4af37]/40 shadow-2xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-5 h-5 accent-[#d4af37] rounded"
                />
                <span className="font-cinzel text-xs font-bold text-stone-200">
                  Published (Visible in Public Granthalaya)
                </span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 rounded-2xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
              >
                <FaSave /> {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
