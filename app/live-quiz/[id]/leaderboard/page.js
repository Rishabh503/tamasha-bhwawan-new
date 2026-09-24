"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FaTrophy, FaMedal, FaCheckCircle, FaTimesCircle, FaClock, FaRedo, FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiMusicalNotes, GiLaurelCrown } from "react-icons/gi";

export default function StudentLeaderboard({ params }) {
  const { id: quizId } = use(params);
  const { isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");
  const router = useRouter();

  const [leaderboard, setLeaderboard] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [studentReview, setStudentReview] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(false);
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

  const currentParticipant = participantId
    ? leaderboard.find((p) => p.id === participantId)
    : leaderboard.length > 0 ? leaderboard[0] : null;

  const totalQuestions = currentParticipant?.totalQuestions || quizInfo?.totalQuestions || (studentReview?.questions?.length || 5);
  const accuracyPercent = currentParticipant 
    ? Math.round((currentParticipant.correctAnswers / (totalQuestions || 1)) * 100) 
    : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg">
        <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
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
            You must be logged in to view session rankings and evaluations.
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

  const questionsList = studentReview?.questions || [];
  const currentReviewQ = questionsList[reviewIdx] || null;

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-8">
        
        {/* Top Header Bar */}
        <header className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-[#d4af37]/25">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#3b0d11] border border-[#d4af37]/40 flex items-center justify-center text-xl text-[#d4af37] shadow-lg">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  Sabha Dossier
                </span>
                <span className="text-stone-500">•</span>
                <h1 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide">
                  {quizInfo?.title || "Quiz Evaluation Results"}
                </h1>
              </div>
              <p className="text-xs text-[#e6ca65]/80 font-cormorant italic">
                Official final rankings, Sabha champions, and verified answer key dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/live-quiz/join"
              className="px-4 py-2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition flex items-center gap-2"
            >
              <FaRedo className="text-[10px]" /> Join Another Quiz
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-[#240609] hover:bg-[#32080d] border border-[#d4af37]/35 text-[#f5e6a8] rounded-xl text-xs font-cinzel tracking-wider transition flex items-center gap-1.5"
            >
              <FaHome className="text-[10px]" /> Home
            </Link>
          </div>
        </header>

        {/* SECTION 1: Top Hero Section — Quiz Overview & Grand Winner Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (4 of 12 ~33%): Quiz Overview & Your Standing */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            
            {/* Quiz Info Summary Card */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-3xl p-5 shadow-xl space-y-3 backdrop-blur-md">
              <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                Session Overview
              </span>
              <h2 className="font-cinzel text-lg font-bold text-white leading-tight">
                {quizInfo?.title || "Live Classical Evaluation"}
              </h2>
              
              <div className="space-y-2 pt-2 text-xs text-[#e6ca65]/80 font-sans-modern">
                <div className="flex justify-between items-center py-1.5 border-b border-[#d4af37]/10">
                  <span className="text-stone-400">Total Questions:</span>
                  <span className="font-mono font-bold text-white text-sm">{totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#d4af37]/10">
                  <span className="text-stone-400">Total Participants:</span>
                  <span className="font-mono font-bold text-[#f5e6a8] text-sm">{leaderboard.length} Candidates</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-400">Session Status:</span>
                  <span className="text-[#4ade80] font-semibold text-xs px-2.5 py-0.5 rounded-full bg-[#0d2818] border border-[#4ade80]/40">
                    ✓ Concluded
                  </span>
                </div>
              </div>
            </div>

            {/* Student Personal Standing Card */}
            {currentParticipant ? (
              <div className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] border-2 border-[#d4af37] rounded-3xl p-5 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                        Your Official Standing
                      </span>
                      <h3 className="text-xl font-cinzel font-bold text-white tracking-wide mt-1 truncate">
                        {currentParticipant.name}
                        {participantId && currentParticipant.id === participantId && (
                          <span className="ml-2 text-xs text-[#f5e6a8] font-normal font-sans">(You)</span>
                        )}
                      </h3>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b0d11] to-[#160305] border-2 border-[#d4af37] flex flex-col items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <span className="text-lg">
                        {currentParticipant.rank === 1 ? "🥇" : currentParticipant.rank === 2 ? "🥈" : currentParticipant.rank === 3 ? "🥉" : "🎖"}
                      </span>
                      <span className="text-[10px] font-cinzel font-bold text-[#f5e6a8]">
                        #{currentParticipant.rank}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#140305] p-3 rounded-2xl border border-[#d4af37]/30 shadow-inner">
                      <span className="text-[9px] font-cinzel font-bold uppercase text-[#d4af37] block">Total Score</span>
                      <span className="text-2xl font-cinzel font-black text-white">{currentParticipant.score} <span className="text-xs text-[#e6ca65]/60 font-sans">pts</span></span>
                    </div>

                    <div className="bg-[#140305] p-3 rounded-2xl border border-[#4ade80]/30 shadow-inner">
                      <span className="text-[9px] font-cinzel font-bold uppercase text-[#4ade80] block">Accuracy</span>
                      <span className="text-2xl font-cinzel font-black text-white">{accuracyPercent}%</span>
                      <span className="text-[10px] text-[#e6ca65]/60 block font-sans">{currentParticipant.correctAnswers}/{totalQuestions} correct</span>
                    </div>
                  </div>

                  {currentParticipant.totalAnswers > 0 && (
                    <div className="p-3 bg-[#140305]/80 rounded-2xl border border-[#d4af37]/20 flex justify-between items-center text-xs">
                      <span className="text-[#e6ca65]/80 font-cormorant italic">Response Velocity:</span>
                      <span className="font-mono font-bold text-white">
                        {Math.round(currentParticipant.totalTimeTaken / currentParticipant.totalAnswers)}s per question
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#d4af37]/20 mt-3 text-center">
                  <p className="text-xs text-[#e6ca65]/90 font-cormorant italic">
                    {currentParticipant.rank === 1 
                      ? "🌟 Outstanding Mastery! Top honored candidate of this Sabha." 
                      : "Performance recorded in the Tamasha Bhawan archives."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-[#1e0508]/85 border border-[#d4af37]/30 rounded-3xl text-center text-sm font-cormorant italic">
                Loading session results...
              </div>
            )}
          </div>

          {/* Right Column (8 of 12 ~67%): Grand Winners & Leaderboard Standings Table */}
          <div className="lg:col-span-8 bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between backdrop-blur-md">
            <div>
              {/* Leaderboard Header */}
              <div className="flex flex-wrap justify-between items-center pb-4 mb-4 border-b border-[#d4af37]/20 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-base font-cinzel font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    🏆 Sabha Champions & Rankings
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-full">
                    {leaderboard.length} Candidates
                  </span>
                </div>
                <span className="text-xs text-[#e6ca65]/70 font-cormorant italic">
                  Ranked by points and response speed
                </span>
              </div>

              {/* Winners Podium Highlights (Top 3) */}
              {leaderboard.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {leaderboard.slice(0, 3).map((winner, idx) => {
                    const isFirst = idx === 0;
                    const isCurrentUser = participantId && winner.id === participantId;

                    return (
                      <div
                        key={winner.id}
                        className={`p-3.5 rounded-2xl border text-center transition relative overflow-hidden ${
                          isFirst
                            ? "bg-gradient-to-b from-[#3d0f14] to-[#1f0508] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] ring-1 ring-[#d4af37]"
                            : "bg-[#140305]/90 border-[#d4af37]/30"
                        }`}
                      >
                        <span className="text-2xl block mb-1">
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                        </span>
                        <span className="text-[10px] font-cinzel font-bold text-[#d4af37] block uppercase tracking-wider">
                          {idx === 0 ? "1st Place Winner" : idx === 1 ? "2nd Place" : "3rd Place"}
                        </span>
                        <h4 className="font-cinzel font-bold text-white text-sm sm:text-base truncate mt-0.5">
                          {winner.name}
                          {isCurrentUser && <span className="text-[10px] text-[#f5e6a8] font-sans ml-1">(You)</span>}
                        </h4>
                        <div className="text-xs font-cinzel font-bold text-[#f5e6a8] mt-1">
                          {winner.score} <span className="text-[9px] text-[#e6ca65]/60">PTS</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Complete Leaderboard List */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 divide-y divide-[#d4af37]/10">
                {leaderboard.map((p, i) => {
                  const isCurrentUser = participantId && p.id === participantId;

                  return (
                    <div
                      key={p.id}
                      className={`pt-2 first:pt-0 flex justify-between items-center p-3 rounded-2xl border transition ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-[#3b0d11] to-[#200508] border-[#d4af37] ring-1 ring-[#d4af37] shadow-md"
                          : i === 0
                          ? "bg-[#25060a]/90 border-[#d4af37]/40"
                          : "bg-[#140305]/70 border-[#d4af37]/20 hover:border-[#d4af37]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="w-8 h-8 rounded-xl bg-[#2a070c] border border-[#d4af37]/35 text-[#f5e6a8] font-cinzel font-bold text-xs flex items-center justify-center shrink-0">
                          {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${p.rank}`}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-cinzel font-bold text-sm text-white truncate">{p.name}</span>
                            {isCurrentUser && (
                              <span className="px-2 py-0.5 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5e6a8] text-[9px] font-cinzel rounded-full font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#e6ca65]/70 font-sans-modern">
                            {p.correctAnswers} / {totalQuestions} correct answers
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-cinzel font-bold text-white text-base sm:text-lg">{p.score}</span>
                        <span className="text-[10px] text-[#d4af37] font-cinzel font-bold ml-1.5">PTS</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Down Prompt Indicator */}
            <div className="pt-4 border-t border-[#d4af37]/20 mt-4 text-center">
              <a
                href="#answer-dossier"
                className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#d4af37] hover:text-[#f5e6a8] transition hover:underline"
              >
                <span>Scroll Down to Inspect Question & Answer Dossier</span>
                <span className="animate-bounce">↓</span>
              </a>
            </div>
          </div>

        </div>

        {/* SECTION 2: Bottom Section — 1-Question at a Time Paginated Answer Review Dossier */}
        <section id="answer-dossier" className="pt-4">
          <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
            
            {/* Header with Navigation Controls & Quick Jump Stepper */}
            <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-cinzel font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  📋 Verified Answer Key & Evaluation Dossier
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



