"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaPlus, 
  FaTrash, 
  FaClock, 
  FaCheck, 
  FaCopy, 
  FaImage, 
  FaUpload, 
  FaTimes, 
  FaArrowUp, 
  FaArrowDown, 
  FaEye, 
  FaPlay,
  FaSave
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";

export default function EditLiveQuiz({ params }) {
  const router = useRouter();
  const { id: quizId } = use(params);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  useEffect(() => {
    fetchQuizDetails();
  }, [quizId]);

  const fetchQuizDetails = async () => {
    setInitialLoading(true);
    try {
      const res = await fetch(`/api/live-quiz/${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
        if (data.questions && data.questions.length > 0) {
          setQuestions(
            data.questions.map((q) => ({
              id: q.id,
              questionText: q.questionText || "",
              imageUrl: q.imageUrl || "",
              options: q.options && q.options.length > 0 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
              correctAns: q.correctAns || (q.options?.[0] || "Option A"),
              timeLimitSeconds: q.timeLimitSeconds || 30,
              type: q.type || "MCQ"
            }))
          );
        } else {
          setQuestions([
            {
              questionText: "",
              imageUrl: "",
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctAns: "Option A",
              timeLimitSeconds: 30,
              type: "MCQ"
            }
          ]);
        }
      } else {
        alert("Could not load quiz details.");
        router.push("/admin/live-quiz");
      }
    } catch (error) {
      console.error("Error fetching quiz for edit:", error);
      alert("Error loading quiz.");
    } finally {
      setInitialLoading(false);
    }
  };

  const activeQuestion = questions[activeIdx] || questions[0];

  // Question CRUD Operations
  const addQuestion = () => {
    const newQ = { 
      questionText: "", 
      imageUrl: "", 
      options: ["Option A", "Option B", "Option C", "Option D"], 
      correctAns: "Option A", 
      timeLimitSeconds: 30,
      type: "MCQ"
    };
    const updated = [...questions, newQ];
    setQuestions(updated);
    setActiveIdx(updated.length - 1);
  };

  const duplicateQuestion = (idx) => {
    const qToCopy = JSON.parse(JSON.stringify(questions[idx]));
    // Strip original id so it creates cleanly
    delete qToCopy.id;
    const newQuestions = [...questions];
    newQuestions.splice(idx + 1, 0, qToCopy);
    setQuestions(newQuestions);
    setActiveIdx(idx + 1);
  };

  const removeQuestion = (idx) => {
    if (questions.length <= 1) {
      alert("A quiz must have at least one question.");
      return;
    }
    const newQuestions = questions.filter((_, i) => i !== idx);
    setQuestions(newQuestions);
    setActiveIdx(Math.max(0, idx === activeIdx ? idx - 1 : activeIdx > idx ? activeIdx - 1 : activeIdx));
    setDeleteConfirmIdx(null);
  };

  const moveQuestion = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    
    const newQuestions = [...questions];
    const [movedItem] = newQuestions.splice(idx, 1);
    newQuestions.splice(targetIdx, 0, movedItem);
    setQuestions(newQuestions);
    setActiveIdx(targetIdx);
  };

  const handleActiveQuestionChange = (field, value) => {
    if (!questions[activeIdx]) return;
    const newQuestions = [...questions];
    newQuestions[activeIdx] = {
      ...newQuestions[activeIdx],
      [field]: value
    };
    setQuestions(newQuestions);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      handleActiveQuestionChange("imageUrl", base64Url);
      if (!activeQuestion.questionText.trim()) {
        handleActiveQuestionChange("questionText", "Refer to the image for question and options");
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    handleActiveQuestionChange("imageUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setStandardPlaceholderOptions = () => {
    const standardOpts = ["Option A", "Option B", "Option C", "Option D"];
    const newQuestions = [...questions];
    newQuestions[activeIdx].options = standardOpts;
    if (!standardOpts.includes(newQuestions[activeIdx].correctAns)) {
      newQuestions[activeIdx].correctAns = "Option A";
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optIndex, value) => {
    const newQuestions = [...questions];
    const oldVal = newQuestions[activeIdx].options[optIndex];
    const newOptions = [...newQuestions[activeIdx].options];
    newOptions[optIndex] = value;
    newQuestions[activeIdx].options = newOptions;
    
    if (newQuestions[activeIdx].correctAns === oldVal && oldVal !== "") {
      newQuestions[activeIdx].correctAns = value;
    }
    setQuestions(newQuestions);
  };

  const setCorrectOption = (opt) => {
    if (!opt) return;
    handleActiveQuestionChange("correctAns", opt);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a Quiz Title");
      return;
    }

    // Validation
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim() && !q.imageUrl) {
        alert(`Question #${i + 1} needs either a text question prompt or an uploaded image.`);
        setActiveIdx(i);
        return;
      }
      
      if (!q.questionText.trim() && q.imageUrl) {
        q.questionText = "Refer to the image for question and options";
      }

      const hasEmptyOpt = q.options.some(o => !o.trim());
      if (hasEmptyOpt) {
        alert(`Question #${i + 1} has empty options. Please fill all 4 options or use the default Option A/B/C/D placeholders.`);
        setActiveIdx(i);
        return;
      }
      if (!q.correctAns || !q.options.includes(q.correctAns)) {
        alert(`Question #${i + 1} has no correct answer selected. Click the radio letter button next to the correct option.`);
        setActiveIdx(i);
        return;
      }
    }

    setSaving(true);
    setSaveSuccessMessage("");
    try {
      const res = await fetch(`/api/live-quiz/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: title.trim(), 
          description: description?.trim() || "", 
          questions 
        })
      });

      if (res.ok) {
        setSaveSuccessMessage("Quiz updated successfully!");
        setTimeout(() => setSaveSuccessMessage(""), 3500);
      } else {
        const errorText = await res.text();
        alert(`Error saving quiz changes: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Failed to update quiz. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-cinzel text-lg font-bold text-[#f5e6a8]">Loading Quiz Editor Studio...</p>
        <p className="font-cormorant text-sm text-[#f0e6d2]/70 mt-1">Retrieving question bank and configuration</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col dark-velvet-bg text-white font-sans-modern overflow-hidden">
      {/* Studio Top Bar */}
      <header className="px-4 py-3 bg-[#180305]/95 border-b border-[#d4af37]/30 flex flex-wrap justify-between items-center gap-3 shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/live-quiz"
            className="px-3 py-1.5 bg-[#2a070c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition shrink-0"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <GiMusicalNotes className="text-[#d4af37] text-lg shrink-0 hidden sm:inline" />
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#120204] border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none px-3.5 py-1.5 rounded-lg text-white font-cinzel font-bold text-sm sm:text-base w-60 sm:w-80 md:w-96 placeholder-[#e6ca65]/40 transition" 
              placeholder="Quiz Title (e.g. Raga Lakshana & Gharana Mastery)"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {saveSuccessMessage && (
            <span className="text-xs font-cinzel text-[#4ade80] flex items-center gap-1 animate-pulse">
              <FaCheck /> {saveSuccessMessage}
            </span>
          )}

          <Link
            href={`/admin/live-quiz/${quizId}/preview`}
            className="px-3.5 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            title="Preview Quiz"
          >
            <FaEye className="text-xs" /> Preview
          </Link>

          <Link
            href={`/admin/live-quiz/${quizId}/lobby`}
            className="px-3.5 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            title="Go to Lobby"
          >
            <FaPlay className="text-xs" /> Host
          </Link>

          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <FaSave /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Main Studio Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Question Navigator (CRUD: Read, Select, Reorder, Add, Delete) */}
        <aside className="w-full lg:w-80 bg-[#1a0406]/95 border-b lg:border-b-0 lg:border-r border-[#d4af37]/25 flex flex-col shrink-0">
          <div className="p-3 border-b border-[#d4af37]/20 flex justify-between items-center bg-[#140305]/80">
            <div>
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#d4af37] block">
                Questions Bank
              </span>
              <span className="text-[10px] text-[#e6ca65]/60 font-sans">
                {questions.length} total question{questions.length === 1 ? "" : "s"}
              </span>
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition"
            >
              <FaPlus className="text-[10px]" /> Add Question
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-2 flex lg:flex-col overflow-x-auto lg:overflow-x-hidden">
            {questions.map((q, idx) => {
              const isActive = idx === activeIdx;
              const isFilled = q.questionText.trim().length > 0 || q.imageUrl;
              const hasAns = !!q.correctAns;

              return (
                <div
                  key={q.id || idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 shrink-0 lg:shrink w-56 lg:w-full ${
                    isActive
                      ? "bg-gradient-to-r from-[#3b0d11] to-[#25060a] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]"
                      : "bg-[#140305]/60 border-[#d4af37]/20 hover:border-[#d4af37]/40 hover:bg-[#200508]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className={`w-6 h-6 rounded-full font-cinzel font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isActive ? "bg-[#d4af37] text-[#160305] border-[#d4af37]" : "bg-[#25060a] text-[#d4af37] border-[#d4af37]/30"
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium text-white truncate block">
                        {q.questionText || (q.imageUrl ? "🖼 [Image Question]" : `Question ${idx + 1}`)}
                      </span>
                      <span className="text-[10px] text-[#e6ca65]/60 font-sans block">
                        {hasAns ? `✓ Key: ${q.correctAns}` : "⚠ No key"} • {q.timeLimitSeconds}s
                      </span>
                    </div>
                  </div>

                  {/* Reorder and Delete Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveQuestion(idx, -1);
                      }}
                      disabled={idx === 0}
                      className="p-1 text-stone-400 hover:text-[#d4af37] disabled:opacity-20 transition"
                      title="Move Question Up"
                    >
                      <FaArrowUp className="text-[10px]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveQuestion(idx, 1);
                      }}
                      disabled={idx === questions.length - 1}
                      className="p-1 text-stone-400 hover:text-[#d4af37] disabled:opacity-20 transition"
                      title="Move Question Down"
                    >
                      <FaArrowDown className="text-[10px]" />
                    </button>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmIdx(idx);
                        }}
                        className="p-1 text-stone-500 hover:text-red-400 rounded transition"
                        title="Delete Question"
                      >
                        <FaTrash className="text-[10px]" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-[#140305] border-t border-[#d4af37]/20 flex items-center justify-between">
            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <FaPlus className="text-[10px]" /> Add New Question
            </button>
          </div>
        </aside>

        {/* Right Column: Active Question Editor Workspace (CRUD: Update, Duplicate, Delete) */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#160305]/40">
          {activeQuestion ? (
            <div className="max-w-4xl w-full space-y-4 mx-auto">
              {/* Header of Active Question */}
              <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#d4af37]/25">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#3b0d11] text-[#f5e6a8] border border-[#d4af37]/40 rounded-full font-cinzel font-bold text-xs">
                    Question {activeIdx + 1} of {questions.length}
                  </span>
                  <span className="text-xs text-[#e6ca65]/80 font-cormorant italic hidden sm:inline">
                    Click the letter circle (A, B, C, D) to set the Answer Key
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => duplicateQuestion(activeIdx)}
                    className="px-3 py-1.5 text-xs font-cinzel font-bold text-[#d4af37] border border-[#d4af37]/35 hover:bg-[#d4af37]/10 rounded-lg flex items-center gap-1.5 transition"
                    title="Duplicate this Question"
                  >
                    <FaCopy className="text-[10px]" /> Duplicate
                  </button>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmIdx(activeIdx)}
                      className="px-3 py-1.5 text-xs font-cinzel font-bold text-red-400 border border-red-500/35 hover:bg-red-950/40 rounded-lg flex items-center gap-1.5 transition"
                      title="Delete this Question"
                    >
                      <FaTrash className="text-[10px]" /> Delete
                    </button>
                  )}
                </div>
              </div>

              {/* Question Image Attachment Card (Upload or URL) */}
              <div className="bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2 pb-1 border-b border-[#d4af37]/15">
                  <div className="flex items-center gap-2">
                    <FaImage className="text-[#d4af37] text-sm" />
                    <label className="font-cinzel text-xs font-bold text-stone-200 uppercase tracking-wider">
                      Question Image Attachment
                    </label>
                  </div>
                  <span className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                    Upload screenshot/diagram or paste direct image URL
                  </span>
                </div>

                {activeQuestion.imageUrl ? (
                  <div className="relative rounded-xl border border-[#d4af37]/40 bg-[#120204] p-3 flex flex-col sm:flex-row items-center gap-4">
                    <div className="max-w-xs w-full max-h-52 rounded-lg overflow-hidden border border-[#d4af37]/30 bg-black/60 flex items-center justify-center">
                      <img 
                        src={activeQuestion.imageUrl} 
                        alt="Question preview" 
                        className="max-h-48 w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="text-xs text-[#4ade80] font-cinzel font-bold flex items-center justify-center sm:justify-start gap-1">
                        <FaCheck /> Image Attached
                      </span>
                      <p className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                        Students will see this image in their live exam arena.
                      </p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-3 py-1.5 bg-[#2e080c] hover:bg-[#3d0b11] text-red-400 border border-red-500/30 rounded-lg text-xs font-cinzel flex items-center gap-1.5 mx-auto sm:mx-0 transition"
                      >
                        <FaTimes /> Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#d4af37]/40 hover:border-[#d4af37] bg-[#140305]/60 hover:bg-[#1a0406] rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#2a070c] border border-[#d4af37]/40 group-hover:border-[#d4af37] flex items-center justify-center text-[#d4af37] transition">
                        <FaUpload className="text-sm" />
                      </div>
                      <div>
                        <span className="font-cinzel text-xs font-bold text-white block">
                          Click to Upload Question Image (PNG, JPG, WebP)
                        </span>
                        <span className="text-[11px] text-[#e6ca65]/60 font-cormorant italic">
                          Supports full question screenshots with all 4 options included
                        </span>
                      </div>
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Or Direct URL Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-stone-500 font-cinzel uppercase shrink-0">OR URL:</span>
                      <input 
                        type="text" 
                        placeholder="Paste image link: https://..." 
                        value={activeQuestion.imageUrl || ""}
                        onChange={(e) => handleActiveQuestionChange("imageUrl", e.target.value)}
                        className="w-full bg-[#140305] border border-[#d4af37]/25 focus:border-[#d4af37] focus:outline-none px-3 py-1.5 rounded-lg text-xs text-stone-300 font-mono transition"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Question Prompt Input */}
              <div className="bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block font-cinzel text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Question Text Prompt {activeQuestion.imageUrl && <span className="text-stone-400 text-[10px] lowercase font-normal">(optional when image attached)</span>}
                  </label>
                </div>
                <textarea 
                  rows={2}
                  placeholder={activeQuestion.imageUrl ? "Refer to the image for question and options (optional)" : "e.g. Which of the following is the Vadi swara of Raga Bhupali?"} 
                  value={activeQuestion.questionText || ""}
                  onChange={(e) => handleActiveQuestionChange("questionText", e.target.value)}
                  className="w-full bg-[#140305] border border-[#d4af37]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none p-3 rounded-xl text-white text-sm resize-none transition"
                />
              </div>

              {/* 4 Options in 2x2 Grid with 1-Click Correct Answer Selection */}
              <div className="bg-[#1e0508]/80 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2 pb-1 border-b border-[#d4af37]/15">
                  <div className="flex items-center gap-2">
                    <label className="block font-cinzel text-xs font-bold text-stone-200 uppercase tracking-wider">
                      Multiple Choice Options
                    </label>
                    <button
                      type="button"
                      onClick={setStandardPlaceholderOptions}
                      className="px-2.5 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg text-[10px] font-cinzel font-bold tracking-wider transition flex items-center gap-1"
                      title="Reset options to standard Option A, Option B, Option C, Option D"
                    >
                      ⚡ Use Default Option A, B, C, D
                    </button>
                  </div>
                  <span className="text-xs text-[#d4af37] font-sans">
                    Selected Answer Key: <strong className="text-white font-cinzel ml-1">{activeQuestion.correctAns || "None Selected"}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeQuestion.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isCorrect = opt && activeQuestion.correctAns === opt;

                    return (
                      <div 
                        key={optIdx} 
                        className={`relative flex items-center rounded-xl border transition-all ${
                          isCorrect 
                            ? "border-[#4ade80] bg-[#0d2818]/80 ring-1 ring-[#4ade80]/60 shadow-[0_0_15px_rgba(74,222,128,0.2)]" 
                            : "border-[#d4af37]/30 bg-[#140305] hover:border-[#d4af37]/60"
                        }`}
                      >
                        {/* Option letter / Correct toggle button */}
                        <button
                          type="button"
                          onClick={() => setCorrectOption(opt)}
                          disabled={!opt.trim()}
                          title="Click to set as correct answer"
                          className={`ml-2.5 w-8 h-8 rounded-full font-cinzel font-bold text-xs flex items-center justify-center shrink-0 border transition ${
                            isCorrect
                              ? "bg-[#4ade80] text-[#0d2818] border-[#4ade80]"
                              : opt.trim()
                              ? "bg-[#2e080c] text-[#d4af37] border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#160305]"
                              : "bg-[#1f0508] text-stone-600 border-stone-800 cursor-not-allowed"
                          }`}
                        >
                          {isCorrect ? "✓" : letter}
                        </button>

                        <input 
                          type="text" 
                          placeholder={`Option ${letter}`}
                          required
                          value={opt}
                          onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                          className="w-full bg-transparent focus:outline-none py-3 pl-3 pr-3 text-white text-sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timer & Quick Setting Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1e0508]/80 p-4 rounded-2xl border border-[#d4af37]/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="font-cinzel text-xs font-bold text-stone-200 uppercase flex items-center gap-1.5">
                    <FaClock className="text-[#d4af37]" /> Question Timer:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[15, 30, 45, 60].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => handleActiveQuestionChange("timeLimitSeconds", sec)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition border ${
                          activeQuestion.timeLimitSeconds === sec
                            ? "bg-[#d4af37] text-[#160305] border-[#d4af37]"
                            : "bg-[#140305] text-[#f5e6a8] border-[#d4af37]/30 hover:border-[#d4af37]"
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="px-4 py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <FaPlus className="text-[9px]" /> Add Next Question
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <FaSave /> {saving ? "Saving..." : "Save Quiz"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mx-auto mb-3" />
              <p className="font-cormorant text-xl text-stone-300 mb-4">No questions in this quiz.</p>
              <button
                onClick={addQuestion}
                className="px-6 py-2.5 gold-gradient-bg text-[#1a0406] font-cinzel font-bold rounded-xl text-xs uppercase tracking-wider inline-block"
              >
                Add First Question
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal for Question */}
      {deleteConfirmIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#200508] border-2 border-red-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <FaTrash className="text-lg" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">
              Delete Question #{deleteConfirmIdx + 1}?
            </h3>
            <p className="font-cormorant text-stone-300 text-sm">
              Are you sure you want to remove this question from the quiz template? This action will take effect upon saving.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmIdx(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-cinzel text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => removeQuestion(deleteConfirmIdx)}
                className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-xl font-cinzel text-xs font-bold transition shadow-lg"
              >
                Yes, Delete Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
