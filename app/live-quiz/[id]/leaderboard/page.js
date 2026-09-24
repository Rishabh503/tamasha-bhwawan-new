"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { 
  FaTrophy, 
  FaMedal, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaRedo, 
  FaHome, 
  FaChevronLeft, 
  FaChevronRight, 
  FaBolt, 
  FaBullseye,
  FaChartPie,
  FaQuestionCircle
} from "react-icons/fa";
import { GiMusicalNotes, GiLaurelCrown } from "react-icons/gi";

export default function StudentLeaderboard({ params }) {
  const { id: quizId } = use(params);
  const { isLoaded, isSignedIn, user } = useUser();
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");
  const router = useRouter();

  const [leaderboard, setLeaderboard] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [studentReview, setStudentReview] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = participantId ? `?quizId=${quizId}&participantId=${participantId}` : `?quizId=${quizId}`;
        const [lbRes, revRes] = await Promise.all([
          fetch(`/api/live-quiz/leaderboard?quizId=${quizId}`),
          fetch(`/api/live-quiz/student-review${query}`)
        ]);

        if (lbRes.ok) {
          const lbData = await lbRes.json();
          setLeaderboard(lbData.leaderboard || []);
          setQuizInfo(lbData.quiz || null);
        }

        if (revRes.ok) {
          const revData = await revRes.json();
          setStudentReview(revData);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load quiz results");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId, participantId]);

  // Identify current participant
  const currentParticipant = participantId
    ? leaderboard.find((p) => p.id === participantId)
    : (user?.id ? leaderboard.find((p) => p.userId === user.id) : null) || (leaderboard.length > 0 ? leaderboard[0] : null);

  const questionsList = studentReview?.questions || [];
  const currentReviewQ = questionsList[reviewIdx] || null;

  const totalQuestions = currentParticipant?.totalQuestions || quizInfo?.totalQuestions || questionsList.length || 0;
  const correctCount = currentParticipant?.correctAnswers ?? questionsList.filter(q => q.isCorrect).length;
  const answeredCount = currentParticipant?.totalAnswers ?? questionsList.filter(q => q.studentAnswer).length;
  const incorrectCount = Math.max(0, answeredCount - correctCount);
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  
  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const totalTimeTaken = currentParticipant?.totalTimeTaken ?? questionsList.reduce((acc, q) => acc + (q.timeTaken || 0), 0);
  const avgTimePerQuestion = answeredCount > 0 ? (totalTimeTaken / answeredCount).toFixed(1) : 0;
  
  const participantRank = currentParticipant?.rank || 1;
  const totalParticipants = leaderboard.length || 1;

  // Format time (seconds to m s)
  const formatTime = (secs) => {
    if (!secs || secs <= 0) return "0s";
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = Math.round(secs % 60);
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // Performance remark logic
  const getPerformanceBadge = (acc) => {
    if (acc >= 90) return { title: "Grand Maestro", text: "Outstanding Precision & Mastery", color: "text-[#4ade80]", bg: "bg-[#0d2818]", border: "border-[#4ade80]/40", icon: "🌟" };
    if (acc >= 75) return { title: "Sangeet Vidwan", text: "Exceptional Classical Acumen", color: "text-[#f5e6a8]", bg: "bg-[#2a070c]", border: "border-[#d4af37]/40", icon: "🎖️" };
    if (acc >= 50) return { title: "Promising Scholar", text: "Commendable Knowledge & Effort", color: "text-[#60a5fa]", bg: "bg-[#0b1b36]", border: "border-[#60a5fa]/40", icon: "✨" };
    return { title: "Apprentice", text: "Dedicated Learner • Keep Practicing", color: "text-[#e6ca65]", bg: "bg-[#1f0508]", border: "border-[#d4af37]/30", icon: "📖" };
  };

  const badge = getPerformanceBadge(accuracyPercent);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-cinzel tracking-widest uppercase text-[#d4af37]">Calculating Sabha Results...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl shadow-2xl p-8 text-center backdrop-blur-md relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#2a070c] border border-[#d4af37]/40 flex items-center justify-center text-3xl mx-auto mb-5 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            🔐
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
            Authentication Required
          </span>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            Student Login Required
          </h1>
          <p className="text-xs text-[#e6ca65]/80 font-cormorant italic mt-2 mb-6">
            You must be logged in to view your test results and performance analysis.
          </p>

          <Link
            href={`/sign-in?redirect_url=/live-quiz/${quizId}/leaderboard`}
            className="block w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-2xl font-cinzel font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition text-center"
          >
            Log In Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-8">
        
        {/* Top Header Bar */}
        <header className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-[#d4af37]/25">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-2xl text-[#d4af37] shadow-lg">
              📜
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  Performance Dossier
                </span>
                <span className="text-stone-500">•</span>
                <h1 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide">
                  {quizInfo?.title || "Quiz Evaluation Results"}
                </h1>
              </div>
              <p className="text-xs text-[#e6ca65]/80 font-cormorant italic">
                Official candidate results, rank standing, accuracy analytics, and verified answer dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/live-quiz/join"
              className="px-4 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition flex items-center gap-2"
            >
              <FaRedo className="text-[10px]" /> Join Another Quiz
            </Link>
            <Link
              href="/"
              className="px-4 py-2.5 bg-[#240609] hover:bg-[#32080d] border border-[#d4af37]/35 text-[#f5e6a8] rounded-xl text-xs font-cinzel tracking-wider transition flex items-center gap-1.5"
            >
              <FaHome className="text-[10px]" /> Home
            </Link>
          </div>
        </header>

        {/* SECTION 1: Personal Result & Grand Rank Banner */}
        <div className="bg-gradient-to-b from-[#250609]/95 via-[#1a0406]/95 to-[#120204]/95 border-2 border-[#d4af37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle Royal Accent Corner Ornaments */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-bl-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#800020]/20 rounded-tr-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            
            {/* Top Identity & Rank Headline */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#d4af37]/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                    Candidate Evaluation Card
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f5e6a8] text-[9px] font-cinzel font-bold uppercase">
                    Official
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide flex items-center gap-3">
                  <span>{currentParticipant?.name || user?.fullName || "Candidate"}</span>
                  <span className="text-xs font-sans font-normal text-[#e6ca65]/70 bg-[#3b0d11] px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                    You
                  </span>
                </h2>
                <p className="text-xs text-[#e6ca65]/80 font-cormorant italic">
                  Performance recorded in the Tamasha Bhawan classical archives
                </p>
              </div>

              {/* Official Standing Rank Badge */}
              <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end bg-[#140305] p-3.5 sm:px-5 sm:py-3 rounded-2xl border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                <div className="text-3xl sm:text-4xl">
                  {participantRank === 1 ? "🥇" : participantRank === 2 ? "🥈" : participantRank === 3 ? "🥉" : "🎖️"}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#d4af37] block">
                    Official Rank
                  </span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-2xl sm:text-3xl font-cinzel font-black text-white">
                      #{participantRank}
                    </span>
                    <span className="text-xs text-[#e6ca65]/60 font-sans">
                      / {totalParticipants} {totalParticipants === 1 ? "candidate" : "candidates"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
              
              {/* Accuracy Card */}
              <div className="bg-[#140305]/90 border border-[#4ade80]/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between group hover:border-[#4ade80] transition">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#4ade80] flex items-center gap-1.5">
                    <FaBullseye className="text-xs" /> Accuracy
                  </span>
                  <span className="text-xs text-[#4ade80] font-bold">{accuracyPercent}%</span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-cinzel font-black text-white block">
                    {accuracyPercent}%
                  </span>
                  <span className="text-[11px] text-[#e6ca65]/70 font-sans mt-0.5 block">
                    {correctCount} of {totalQuestions} correct
                  </span>
                </div>
              </div>

              {/* Total Score Card */}
              <div className="bg-[#140305]/90 border border-[#d4af37]/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between group hover:border-[#d4af37] transition">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                    <FaTrophy className="text-xs" /> Total Score
                  </span>
                  <span className="text-xs text-[#d4af37] font-bold">PTS</span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-cinzel font-black text-white block">
                    {currentParticipant?.score ?? 0}
                  </span>
                  <span className="text-[11px] text-[#e6ca65]/70 font-sans mt-0.5 block">
                    Points accumulated
                  </span>
                </div>
              </div>

              {/* Response Speed Card */}
              <div className="bg-[#140305]/90 border border-[#60a5fa]/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between group hover:border-[#60a5fa] transition">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#60a5fa] flex items-center gap-1.5">
                    <FaBolt className="text-xs" /> Avg Speed
                  </span>
                  <span className="text-xs text-[#60a5fa] font-bold">{avgTimePerQuestion}s</span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-cinzel font-black text-white block font-mono">
                    {avgTimePerQuestion}s
                  </span>
                  <span className="text-[11px] text-[#e6ca65]/70 font-sans mt-0.5 block">
                    Avg time / question
                  </span>
                </div>
              </div>

              {/* Total Duration Card */}
              <div className="bg-[#140305]/90 border border-[#e6ca65]/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between group hover:border-[#e6ca65] transition">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#e6ca65] flex items-center gap-1.5">
                    <FaClock className="text-xs" /> Total Time
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-cinzel font-black text-white block font-mono">
                    {formatTime(totalTimeTaken)}
                  </span>
                  <span className="text-[11px] text-[#e6ca65]/70 font-sans mt-0.5 block">
                    Across {answeredCount} submissions
                  </span>
                </div>
              </div>

            </div>

            {/* Visual Performance & Accuracy Breakdown Bar */}
            <div className="bg-[#140305] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-inner">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FaChartPie className="text-[#d4af37]" /> Response Breakdown & Evaluation
                </span>
                
                {/* Performance Mastery Badge */}
                <div className={`px-3 py-1 rounded-full border ${badge.bg} ${badge.border} flex items-center gap-1.5 text-xs font-cinzel font-bold ${badge.color}`}>
                  <span>{badge.icon}</span>
                  <span>{badge.title}</span>
                  <span className="text-stone-500 hidden sm:inline">•</span>
                  <span className="font-sans font-normal text-[11px] hidden sm:inline text-white/80">{badge.text}</span>
                </div>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="w-full h-4 bg-[#1f0508] rounded-full overflow-hidden flex border border-[#d4af37]/20 p-0.5 gap-0.5">
                {correctCount > 0 && (
                  <div 
                    style={{ width: `${(correctCount / (totalQuestions || 1)) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-l-full transition-all duration-500"
                    title={`Correct: ${correctCount}`}
                  />
                )}
                {incorrectCount > 0 && (
                  <div 
                    style={{ width: `${(incorrectCount / (totalQuestions || 1)) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#ef4444] to-[#f87171] transition-all duration-500"
                    title={`Incorrect: ${incorrectCount}`}
                  />
                )}
                {unansweredCount > 0 && (
                  <div 
                    style={{ width: `${(unansweredCount / (totalQuestions || 1)) * 100}%` }}
                    className="h-full bg-stone-700 rounded-r-full transition-all duration-500"
                    title={`Unanswered: ${unansweredCount}`}
                  />
                )}
              </div>

              {/* Detailed Breakdown Legend Pills */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center sm:text-left">
                <div className="p-2.5 rounded-xl bg-[#0d2818]/70 border border-[#4ade80]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4ade80] shrink-0"></span>
                    <span className="text-xs font-cinzel font-bold text-[#4ade80]">Correct</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{correctCount} <span className="text-[10px] text-stone-400 font-sans">({accuracyPercent}%)</span></span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#2b080d]/70 border border-[#f87171]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f87171] shrink-0"></span>
                    <span className="text-xs font-cinzel font-bold text-[#f87171]">Incorrect</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    {incorrectCount} <span className="text-[10px] text-stone-400 font-sans">({totalQuestions > 0 ? Math.round((incorrectCount / totalQuestions) * 100) : 0}%)</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#1a0f12]/70 border border-stone-600/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-500 shrink-0"></span>
                    <span className="text-xs font-cinzel font-bold text-stone-300">Unanswered</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    {unansweredCount} <span className="text-[10px] text-stone-400 font-sans">({totalQuestions > 0 ? Math.round((unansweredCount / totalQuestions) * 100) : 0}%)</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 2: Verified Answer Key & Evaluation Dossier */}
        <section id="answer-dossier" className="pt-2">
          <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
            
            {/* Header with Navigation Controls & Quick Jump Stepper */}
            <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-cinzel font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  📋 Verified Answer Key & Question Dossier
                </span>
                <span className="text-xs font-mono px-3 py-1 bg-[#3b0d11] border border-[#d4af37]/35 text-[#f5e6a8] rounded-full">
                  Question {reviewIdx + 1} of {questionsList.length || 1}
                </span>
              </div>

              {/* Question Quick Jump Stepper Pills */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {questionsList.map((q, idx) => {
                  const isActive = idx === reviewIdx;
                  return (
                    <button
                      key={q.id || idx}
                      type="button"
                      onClick={() => setReviewIdx(idx)}
                      className={`w-8 h-8 rounded-xl text-xs font-cinzel font-bold transition flex items-center justify-center border ${
                        isActive
                          ? "bg-[#d4af37] text-[#160305] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] ring-1 ring-[#d4af37]"
                          : q.isCorrect
                          ? "bg-[#0d2818] text-[#4ade80] border-[#4ade80]/50 hover:border-[#4ade80]"
                          : q.studentAnswer
                          ? "bg-[#2b080d] text-[#f87171] border-[#f87171]/50 hover:border-[#f87171]"
                          : "bg-[#140305] text-stone-500 border-[#d4af37]/20 hover:border-[#d4af37]/50"
                      }`}
                      title={`Go to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReviewIdx(prev => Math.max(0, prev - 1))}
                  disabled={reviewIdx === 0}
                  className="px-4 py-2 bg-[#2a070c] hover:bg-[#3d0b11] border border-[#d4af37]/35 text-[#f5e6a8] rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition disabled:opacity-30 disabled:cursor-not-allowed shadow"
                >
                  <FaChevronLeft className="text-[10px]" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => setReviewIdx(prev => Math.min(questionsList.length - 1, prev + 1))}
                  disabled={reviewIdx >= questionsList.length - 1}
                  className="px-4 py-2 bg-[#2a070c] hover:bg-[#3d0b11] border border-[#d4af37]/35 text-[#f5e6a8] rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 transition disabled:opacity-30 disabled:cursor-not-allowed shadow"
                >
                  Next <FaChevronRight className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* Active Single Question Review Card */}
            {currentReviewQ ? (
              <div className={`p-5 sm:p-6 rounded-3xl border transition ${
                currentReviewQ.isCorrect
                  ? "bg-[#0d2818]/60 border-[#4ade80]/40 shadow-lg"
                  : currentReviewQ.studentAnswer
                  ? "bg-[#2b080d]/60 border-[#f87171]/40 shadow-lg"
                  : "bg-[#140305]/80 border-[#d4af37]/20"
              }`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Side (6 of 12 cols): Question Text & Large Image */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-cinzel font-bold text-sm text-[#f5e6a8]">
                        Question #{reviewIdx + 1}
                      </span>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-cinzel font-bold ${
                        currentReviewQ.isCorrect
                          ? "bg-[#4ade80] text-[#0d2818]"
                          : currentReviewQ.studentAnswer
                          ? "bg-[#f87171] text-[#2b080d]"
                          : "bg-[#240609] text-[#e6ca65]/60"
                      }`}>
                        {currentReviewQ.isCorrect ? "✓ Correct (+100)" : currentReviewQ.studentAnswer ? "✕ Incorrect" : "⚪ Not Answered"}
                      </span>
                      {typeof currentReviewQ.timeTaken === 'number' && (
                        <span className="text-xs text-[#e6ca65]/70 font-mono flex items-center gap-1 ml-auto">
                          <FaClock className="text-[10px]" /> {currentReviewQ.timeTaken}s
                        </span>
                      )}
                    </div>

                    <h4 className="font-cinzel font-bold text-white text-base sm:text-lg leading-relaxed">
                      {currentReviewQ.questionText || "Refer to the image for question and options"}
                    </h4>

                    {currentReviewQ.imageUrl && (
                      <div className="rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#100204] p-2 max-h-72 flex items-center justify-center shadow-inner">
                        <img 
                          src={currentReviewQ.imageUrl} 
                          alt="Question review reference" 
                          className="max-h-64 w-auto object-contain rounded-xl" 
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Side (6 of 12 cols): Answer Comparison Deck */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className={`p-4 rounded-2xl border ${
                      currentReviewQ.isCorrect 
                        ? "bg-[#0d2818] border-[#4ade80]/60 shadow-md" 
                        : currentReviewQ.studentAnswer 
                        ? "bg-[#2b080d] border-[#f87171]/60 shadow-md" 
                        : "bg-[#140305] border-[#d4af37]/25"
                    }`}>
                      <span className="text-[#d4af37] block font-cinzel font-bold text-xs uppercase tracking-wider">
                        Your Selected Answer:
                      </span>
                      <span className={`font-semibold text-base sm:text-lg block truncate mt-1 ${
                        currentReviewQ.isCorrect ? "text-[#4ade80]" : "text-[#f87171]"
                      }`}>
                        {currentReviewQ.studentAnswer ? (
                          currentReviewQ.isCorrect ? `✓ ${currentReviewQ.studentAnswer}` : `✕ ${currentReviewQ.studentAnswer}`
                        ) : (
                          "⚪ No answer submitted"
                        )}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#140305] border-2 border-[#d4af37]/50 shadow-md">
                      <span className="text-[#d4af37] block font-cinzel font-bold text-xs uppercase tracking-wider">
                        Standard Verified Answer Key:
                      </span>
                      <span className="font-semibold text-white text-base sm:text-lg block truncate mt-1">
                        ✓ {currentReviewQ.correctAns}
                      </span>
                    </div>

                    {/* All Options Reference List */}
                    {currentReviewQ.options && currentReviewQ.options.length > 0 && (
                      <div className="p-3 bg-[#140305]/70 rounded-2xl border border-[#d4af37]/20 space-y-1.5">
                        <span className="text-[10px] font-cinzel font-bold text-[#e6ca65]/60 uppercase tracking-wider block">
                          Options Breakdown:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {currentReviewQ.options.map((opt, i) => (
                            <div 
                              key={i} 
                              className={`px-2.5 py-1.5 rounded-lg border text-xs truncate ${
                                opt === currentReviewQ.correctAns
                                  ? "bg-[#0d2818] border-[#4ade80]/50 text-[#4ade80] font-bold"
                                  : opt === currentReviewQ.studentAnswer
                                  ? "bg-[#2b080d] border-[#f87171]/50 text-[#f87171]"
                                  : "bg-[#1f0508] border-[#d4af37]/15 text-stone-400"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}: {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-stone-400 font-cormorant text-sm">
                Loading question review details...
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}



