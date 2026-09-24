"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaEdit, 
  FaPlay, 
  FaTrash, 
  FaArrowLeft, 
  FaArrowRight, 
  FaTimes,
  FaKey,
  FaCheck,
  FaRedo
} from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";

export default function PreviewLiveQuiz({ params }) {
  const router = useRouter();
  const { id: quizId } = use(params);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showAnswerKey, setShowAnswerKey] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/live-quiz/${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
        if (data.questions && data.questions.length > 0) {
          setTimeLeft(data.questions[0].timeLimitSeconds || 30);
        }
      } else {
        alert("Quiz not found.");
        router.push("/admin/live-quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error loading preview.");
    } finally {
      setLoading(false);
    }
  };

  const questions = quiz?.questions || [];
  const question = questions[currentIdx] || null;

  // When question index changes, reset simulated answer & timer
  useEffect(() => {
    if (question) {
      setSelectedAnswer("");
      setTimeLeft(question.timeLimitSeconds || 30);
    }
  }, [currentIdx, question]);

  // Optional simulated timer
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTimerRunning, timeLeft]);

  const handleSelectOption = (opt) => {
    setSelectedAnswer(opt);
  };

  const handleResetSimulatedAnswer = () => {
    setSelectedAnswer("");
    if (question) {
      setTimeLeft(question.timeLimitSeconds || 30);
    }
  };

  const handleDeleteQuiz = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/live-quiz/${quizId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/admin/live-quiz");
      } else {
        const errorText = await res.text();
        alert(`Failed to delete quiz: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting quiz.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg font-sans-modern">
        <div className="text-center p-8 bg-[#1e0508]/90 shadow-2xl border border-[#d4af37]/35 rounded-3xl max-w-sm w-full backdrop-blur-md">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
            Tamasha Bhawan Arena
          </span>
          <h2 className="text-xl font-cinzel font-bold text-white mb-1">Loading Preview Arena</h2>
          <p className="text-xs text-[#e6ca65]/70 font-cormorant italic">
            Preparing student exam view...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg font-sans-modern p-4">
        <div className="text-center p-8 bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl max-w-md w-full shadow-2xl space-y-4">
          <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mx-auto" />
          <h2 className="font-cinzel text-xl font-bold text-white">No Questions in this Quiz</h2>
          <p className="font-cormorant text-stone-300 text-sm">Please add questions first to preview the student arena experience.</p>
          <div className="flex gap-3 justify-center pt-2">
            <Link
              href="/admin/live-quiz"
              className="px-4 py-2 bg-stone-800 text-stone-200 rounded-xl font-cinzel text-xs font-bold"
            >
              Back to Quizzes
            </Link>
            <Link
              href={`/admin/live-quiz/${quizId}/edit`}
              className="px-5 py-2 gold-gradient-bg text-[#1a0406] rounded-xl font-cinzel text-xs font-bold uppercase"
            >
              Add Questions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern p-2 sm:p-3 lg:p-4 flex flex-col justify-between overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Admin Floating Control Ribbon */}
      <div className="max-w-7xl w-full mx-auto relative z-20 shrink-0 mb-2">
        <div className="bg-[#140305]/95 border border-[#d4af37]/40 rounded-2xl px-3 py-2 flex flex-wrap justify-between items-center gap-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Link
              href="/admin/live-quiz"
              className="px-3 py-1 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1.5"
            >
              <FaArrowLeft className="text-[10px]" /> Exit Preview
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/30 text-[#f5e6a8] font-cinzel text-[10px] font-bold">
              👑 Student View Simulation
            </span>
            <span className="font-cinzel text-xs font-bold text-white max-w-[200px] md:max-w-xs truncate hidden md:inline">
              {quiz.title}
            </span>
          </div>

          {/* Center question stepper */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="p-1.5 px-2 bg-[#2e080c] hover:bg-[#3d0b11] disabled:opacity-30 border border-[#d4af37]/30 rounded-lg text-xs text-[#f5e6a8] font-cinzel font-bold transition flex items-center gap-1"
              title="Previous Question"
            >
              <FaArrowLeft className="text-[9px]" /> Prev
            </button>

            <span className="font-cinzel text-xs text-[#d4af37] font-bold px-2 whitespace-nowrap">
              {currentIdx + 1} / {questions.length}
            </span>

            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              disabled={currentIdx === questions.length - 1}
              className="p-1.5 px-2 bg-[#2e080c] hover:bg-[#3d0b11] disabled:opacity-30 border border-[#d4af37]/30 rounded-lg text-xs text-[#f5e6a8] font-cinzel font-bold transition flex items-center gap-1"
              title="Next Question"
            >
              Next <FaArrowRight className="text-[9px]" />
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`px-2.5 py-1 rounded-lg font-cinzel text-[11px] font-bold border transition flex items-center gap-1.5 ${
                showAnswerKey
                  ? "bg-green-950/70 border-green-500/70 text-green-300"
                  : "bg-[#1f0508] border-[#d4af37]/30 text-stone-400"
              }`}
              title="Toggle Answer Key highlight"
            >
              <FaKey className="text-[9px]" /> {showAnswerKey ? "Key: On" : "Key: Off"}
            </button>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-2.5 py-1 rounded-lg font-cinzel text-[11px] font-bold border transition ${
                isTimerRunning
                  ? "bg-amber-950/70 border-amber-500/70 text-amber-300 animate-pulse"
                  : "bg-[#1f0508] border-[#d4af37]/30 text-stone-400"
              }`}
              title="Toggle countdown timer simulation"
            >
              {isTimerRunning ? "⏱ Pause" : "⏱ Run Timer"}
            </button>

            <Link
              href={`/admin/live-quiz/${quizId}/edit`}
              className="px-3 py-1 bg-[#2e080c] hover:bg-[#420d13] border border-[#d4af37]/50 text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition flex items-center gap-1"
            >
              <FaEdit className="text-[10px]" /> Edit
            </Link>

            <Link
              href={`/admin/live-quiz/${quizId}/lobby`}
              className="px-3 py-1 gold-gradient-bg text-[#1a0406] rounded-lg font-cinzel text-xs font-bold uppercase transition flex items-center gap-1"
            >
              <FaPlay className="text-[9px]" /> Host
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 bg-[#240609] hover:bg-red-900/60 border border-red-500/30 text-red-300 rounded-lg transition"
              title="Delete Quiz"
            >
              <FaTrash className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Student Exact UI Viewport */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0 relative z-10 space-y-2.5">
        
        {/* Top Header Bar with Question Number & Animated Timer (Identical to Student View) */}
        <header className="flex justify-between items-center bg-[#1e0508]/90 px-4 py-2.5 rounded-2xl shadow-xl border border-[#d4af37]/30 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-full font-cinzel font-bold text-xs shadow-sm">
              Question {currentIdx + 1}
            </span>
            <span className="text-xs text-[#e6ca65]/80 font-cormorant italic hidden sm:inline">
              Tamasha Bhawan • Live Sangeet Evaluation
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm sm:text-base font-cinzel font-bold px-4 py-1 rounded-xl border transition-all ${
              timeLeft <= 5 
                ? "bg-[#2b080d] text-[#f87171] border-[#f87171] animate-pulse shadow-[0_0_15px_rgba(248,113,113,0.3)]" 
                : "bg-[#140305] text-[#d4af37] border-[#d4af37]/40 shadow-[0_0_10px_rgba(212,175,55,0.15)]"
            }`}>
              ⏱ {timeLeft}s
            </span>
          </div>
        </header>

        {/* 50/50 Horizontal Studio Split: Question & Image (50%) + Options (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0 overflow-hidden">
          
          {/* Left Column (50% / 6 cols): Question Prompt at Top & Large Image Under It */}
          <div className="lg:col-span-6 bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between min-h-0 overflow-hidden backdrop-blur-md">
            <div className="space-y-2 shrink-0 pb-2 border-b border-[#d4af37]/20">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-cinzel font-semibold block">
                Evaluation Prompt
              </span>
              <h2 className="text-base sm:text-lg lg:text-xl font-cinzel font-bold text-white leading-snug">
                {question.questionText || "Refer to the image below for question and options"}
              </h2>
            </div>

            {/* Question Image Viewport */}
            <div className="flex-1 min-h-0 mt-3 rounded-2xl border border-[#d4af37]/30 bg-[#100204] p-2 flex items-center justify-center overflow-hidden shadow-inner relative group">
              {question.imageUrl ? (
                <img 
                  src={question.imageUrl} 
                  alt="Question evaluation reference" 
                  onClick={() => setZoomedImage(question.imageUrl)}
                  className="max-h-full max-w-full object-contain rounded-xl transition group-hover:scale-[1.01] cursor-zoom-in" 
                />
              ) : (
                <div className="text-center p-6 text-stone-500 font-cormorant italic text-sm">
                  Text-only question prompt
                </div>
              )}
            </div>
          </div>

          {/* Right Column (50% / 6 cols): Options & Submission Status */}
          <div className="lg:col-span-6 bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between min-h-0 overflow-hidden backdrop-blur-md">
            <div className="flex justify-between items-center pb-2.5 border-b border-[#d4af37]/20 shrink-0">
              <div>
                <h3 className="font-cinzel font-bold text-white text-sm sm:text-base tracking-wide">
                  Choose Your Response
                </h3>
                <p className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                  Tap the corresponding letter option to submit
                </p>
              </div>
              {selectedAnswer && (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[10px] font-bold">
                    Selection: {selectedAnswer}
                  </span>
                  <button
                    onClick={handleResetSimulatedAnswer}
                    className="text-stone-400 hover:text-[#d4af37] text-xs p-1"
                    title="Clear simulated selection"
                  >
                    <FaRedo className="text-[10px]" />
                  </button>
                </div>
              )}
            </div>

            {/* 4 Vertical Option Cards (Exact student styling with answer key helper) */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 flex flex-col justify-center min-h-0">
              {(question.options || []).map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selectedAnswer === opt;
                const isCorrectAnswer = question.correctAns === opt;

                let btnClass = "w-full p-3 sm:p-3.5 border-2 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold text-left transition-all flex items-center justify-between ";

                if (selectedAnswer) {
                  // Simulated answered state
                  if (isSelected) {
                    btnClass += "border-[#4ade80] bg-[#0d2818]/90 text-white shadow-[0_0_20px_rgba(74,222,128,0.25)] ring-2 ring-[#4ade80]/50";
                  } else if (showAnswerKey && isCorrectAnswer) {
                    btnClass += "border-green-500/70 bg-green-950/40 text-green-200";
                  } else {
                    btnClass += "border-[#d4af37]/15 bg-[#140305]/60 text-[#e6ca65]/40 opacity-50";
                  }
                } else {
                  // Default unselected state
                  if (showAnswerKey && isCorrectAnswer) {
                    btnClass += "border-green-500/60 bg-[#140305]/95 hover:border-green-400 hover:bg-[#102416] text-[#f5e6a8] hover:text-white cursor-pointer shadow-md";
                  } else {
                    btnClass += "border-[#d4af37]/30 bg-[#140305]/90 hover:border-[#d4af37] hover:bg-[#28080d] text-[#f5e6a8] hover:text-white cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-[0.99]";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className={btnClass}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-8 h-8 shrink-0 rounded-full font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center border transition ${
                        isSelected
                          ? "bg-[#4ade80] text-[#0d2818] border-[#4ade80]"
                          : showAnswerKey && isCorrectAnswer
                          ? "bg-green-600 text-white border-green-400"
                          : "bg-[#240609] text-[#d4af37] border-[#d4af37]/40"
                      }`}>
                        {letter}
                      </span>
                      <span className="truncate text-sm sm:text-base font-sans-modern">{opt}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {showAnswerKey && isCorrectAnswer && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/40 text-[10px] font-cinzel font-bold uppercase tracking-wider">
                          Correct Answer
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[#4ade80] font-cinzel font-bold text-xs ml-1 flex items-center gap-1">
                          ✓ Recorded
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Status Confirmation Footnote */}
            <div className="pt-2 border-t border-[#d4af37]/20 shrink-0 text-center">
              <p className="text-xs font-cormorant italic text-[#e6ca65]/90">
                {selectedAnswer 
                  ? "✨ Response locked in the sabha archives! Awaiting next question..." 
                  : timeLeft === 0 
                  ? "⌛ Time expired! Awaiting next question..." 
                  : "⚡ Select one option to test student response interaction"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Quiz Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#200508] border-2 border-red-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <FaTrash className="text-lg" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">
              Permanently Delete Quiz?
            </h3>
            <p className="font-cormorant text-stone-300 text-sm">
              This will permanently delete the quiz template <strong className="text-white font-cinzel">&ldquo;{quiz.title}&rdquo;</strong> and all associated question sets.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-cinzel text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteQuiz}
                disabled={deleting}
                className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white rounded-xl font-cinzel text-xs font-bold transition shadow-lg disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#d4af37] text-xl font-bold"
            >
              <FaTimes />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed question"
              className="max-h-[85vh] w-auto object-contain rounded-xl border border-[#d4af37]/40 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
