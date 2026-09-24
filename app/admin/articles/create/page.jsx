"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaSave, 
  FaEye, 
  FaArrowLeft, 
  FaImage, 
  FaHeadphones, 
  FaUser, 
  FaTag, 
  FaFolder, 
  FaCheck,
  FaFileAlt,
  FaBookOpen
} from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import ArticleContentRenderer from "../../../../components/articles/ArticleContentRenderer";

const CATEGORIES = [
  "Raga Shastra",
  "Gharana Parampara",
  "Voice Culture",
  "Ancient Treatises",
  "History & Lineage",
  "Musicology"
];

export default function CreateArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Raga Shastra");
  const [tagsInput, setTagsInput] = useState("Hindustani, Ragas, Classical Vocal");
  const [readingTimeMin, setReadingTimeMin] = useState(5);
  const [isPublished, setIsPublished] = useState(true);

  // Media
  const [coverImage, setCoverImage] = useState("/images/hero_classical_tanpura.jpg");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState("");

  // Content
  const [content, setContent] = useState(`## Introduction to the Shastra

Write the foundational overview of the musical treatise, raga, or gharana here...

---

## Swara Dynamics & Structure

- **Arohana (Ascent):** \`S - R - G - m - P - D - N - S'\`
- **Avarohana (Descent):** \`S' - N - D - P - m - G - R - S\`
- **Vadi (Sonant):** \`Shuddha Gandhar (G)\`
- **Samvadi (Consonant):** \`Shuddha Nishad (N)\`

> "Music is the language of the soul in divine meditation."

---

## Classical Bandish & Swaralipi

\`\`\`
Sthayi:
S   R   G   m | P   -   D   P | m   G   R   S
Ja- go  Mo- han | Pya-  -   re- - | Ka- na- ha- i
\`\`\`

## Pedagogical Notes for Riyaz

Detailed one-on-one riyaz recommendations for examinees and students...`);

  // Author details
  const [authorName, setAuthorName] = useState("Acharya Sangeet Praveen");
  const [authorRole, setAuthorRole] = useState("Head of Musicology, Tamasha Bhawan");
  const [authorAvatar, setAuthorAvatar] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400");
  const [authorBio, setAuthorBio] = useState("Gold medalist in Gandharva Sangeet Visharad with over 25 years of research in microtonal Shruti theory and Vedic chhandas.");

  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const tags = tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/articles", {
        method: "POST",
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
        router.push("/admin/articles");
      } else {
        const errorText = await res.text();
        alert(`Error saving article: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while publishing.");
    } finally {
      setLoading(false);
    }
  };

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
              <FaArrowLeft className="text-[10px]" /> Back to Dashboard
            </Link>
            <div>
              <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Author New Sangeet Treatise
              </h1>
              <p className="text-xs text-[#e6ca65]/70 font-cormorant italic">
                Publish scholarly literature with audio lectures and author credits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}
              className="px-4 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaEye className="text-xs" /> {activeTab === "edit" ? "Preview Formatted View" : "Back to Editor"}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
            >
              <FaSave /> {loading ? "Publishing..." : "Publish Article"}
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
                  placeholder="e.g. The Architecture of Raga Bhairav: Dawn, Devotion & Microtonal Komal Re"
                  className="w-full bg-[#120204] border border-[#d4af37]/40 focus:border-[#d4af37] focus:outline-none p-3 rounded-xl text-white font-cinzel font-bold text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold text-stone-200">
                    Custom URL Slug (Optional, auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="architecture-of-raga-bhairav"
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
                  Lead Subtitle / Excerpt (Summary displayed in cards and reader header)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="An overview highlighting the thesis, melodic significance, or historical lineage..."
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
                    placeholder="Raga Bhairav, Komal Re, Shrutis"
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
                    placeholder="https://.../lecture-audio.mp3"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none p-2.5 rounded-xl text-stone-300 font-mono text-xs"
                  />
                  <span className="text-[10px] text-[#e6ca65]/60 font-cormorant italic block">
                    Enables the embedded audio recitation player in the reader
                  </span>
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
                  <FaBookOpen /> 3. Article Content (Markdown / Formatted)
                </h3>

                {/* Quick Insert Helper Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet("## New Section Heading\n\nWrite section text here...")}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + H2 Heading (TOC)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet("### Subheading\n\nSubheading details...")}
                    className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-lg font-cinzel text-[10px] font-bold"
                  >
                    + H3 Subheading
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('> "Quote by Pt. Bhatkhande or Sarangadeva"\n> — Sangeet Treatise')}
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
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write in-depth musical analysis, raga structures, swaralipi notations..."
                className="w-full bg-[#120204] border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none p-4 rounded-2xl text-white font-mono text-sm leading-relaxed"
              />
            </div>

            {/* 4. About Author Section */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                <FaUser /> 4. About the Author (Appears at the End of Article)
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
                    placeholder="e.g. Acharya Sangeet Praveen"
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
                    placeholder="e.g. Head of Musicology, Tamasha Bhawan"
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
                  placeholder="https://images.unsplash.com/..."
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
                  placeholder="Academic credentials, Guru lineage, Gandharva Visharad degree, research background..."
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
                  Publish immediately (Visible in Public Granthalaya)
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-2xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
              >
                <FaSave /> {loading ? "Publishing..." : "Publish Article"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
