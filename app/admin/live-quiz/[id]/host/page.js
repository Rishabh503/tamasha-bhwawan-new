"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPusherClient } from "../../../../lib/pusher";

export default function HostQuiz({ params }) {
  const router = useRouter();
  const { id: quizId } = use(params);
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [liveResponses, setLiveResponses] = useState([]); // List of { participantId, participantName, answer, isCorrect, timeTaken }
  const [showAnswers, setShowAnswers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(`quiz-${quizId}-teacher`);
    
    const handleStudentAnswered = (data) => {
      if (data?.participantId) {
        setLiveResponses((prev) => {
          // Deduplicate by participantId for current question
          const exists = prev.some(r => r.participantId === data.participantId);
          if (exists) return prev;
          return [...prev, data];
        });
      }
    };

    channel.bind("student-answered", handleStudentAnswered);

    return () => {
      channel.unbind("student-answered", handleStudentAnswered);
      pusher.unsubscribe(`quiz-${quizId}-teacher`);
    };
  }, [quizId]);

  const handleNextQuestion = async () => {
    setLoading(true);
    setLiveResponses([]);
    setShowAnswers(false);
    try {
      const res = await fetch("/api/live-quiz/next-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, currentQuestionId: currentQuestion?.id }),
      });
      const data = await res.json();
      
      if (data.status === "COMPLETED") {
        router.push(`/admin/live-quiz/${quizId}/report`);
      } else {
        setCurrentQuestion(data.currentQuestion);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate live breakdown
  const optionCounts = {};
  if (currentQuestion?.options) {
    currentQuestion.options.forEach((opt) => {
      optionCounts[opt] = 0;
    });
  }
  liveResponses.forEach((r) => {
    if (r.answer && optionCounts[r.answer] !== undefined) {
      optionCounts[r.answer]++;
    }
  });

  const correctResponsesCount = liveResponses.filter(r => r.isCorrect).length;
  const incorrectResponsesCount = liveResponses.length - correctResponsesCount;

  return (
    <div className="min-h-screen lg:h-screen flex flex-col dark-velvet-bg text-[#f5e6a8] font-sans-modern p-3 sm:p-5 lg:p-6 overflow-hidden relative">
      {/* Background ambient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0 relative z-10">
        {/* Top Header Bar */}
        <header className="flex flex-wrap justify-between items-center gap-3 pb-3 mb-3 border-b border-[#d4af37]/20 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/live-quiz/${quizId}/lobby`}
              className="px-3 py-1.5 rounded-lg text-xs font-cinzel tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition"
            >
              ← Lobby
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                <h1 className="text-base sm:text-lg font-cinzel font-bold text-white tracking-wide">
                  Masterclass Conductor Arena
                </h1>
              </div>
              <p className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                Session: <span className="font-mono text-[#d4af37]">{quizId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentQuestion && (
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className={`px-3.5 py-1.5 rounded-xl font-cinzel tracking-wider text-xs font-bold transition border ${
                  showAnswers 
                    ? "bg-[#d4af37]/20 text-[#f5e6a8] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]" 
                    : "bg-[#240609] text-[#e6ca65] border-[#d4af37]/30 hover:border-[#d4af37]"
                }`}
              >
                {showAnswers ? "Hide Key" : "👁 Reveal Key"}
              </button>
            )}

            <button
              onClick={handleNextQuestion}
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-xl font-cinzel font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 transition"
            >
              {loading ? "Propagating..." : currentQuestion ? "Next Question →" : "Broadcast First Question"}
            </button>
          </div>
        </header>

        {currentQuestion ? (
          /* 2-Column Split Dashboard for Single-Window Laptop Layout */
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
            
            {/* Left 7 Columns: Active Question & Live Options Distribution */}
            <div className="lg:col-span-7 bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex justify-between items-center gap-2 pb-2.5 mb-3 border-b border-[#d4af37]/20">
                  <span className="px-3 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#160305] rounded-full font-cinzel font-bold text-xs">
                    Question {currentQuestion.order + 1}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-[#140305] border border-[#d4af37]/30 text-[#d4af37] font-mono text-xs font-bold">
                    ⏱ {currentQuestion.timeLimitSeconds}s Timer
                  </div>
                </div>

                <h2 className="text-base sm:text-xl font-cinzel font-bold text-white leading-relaxed mb-3">
                  {currentQuestion.questionText}
                </h2>
                
                {currentQuestion.imageUrl && (
                  <div className="mb-3 rounded-2xl overflow-hidden border border-[#d4af37]/35 bg-[#100204] p-2 max-h-52 flex items-center justify-center shadow-inner">
                    <img 
                      src={currentQuestion.imageUrl} 
                      alt="Question Reference" 
                      className="max-h-48 max-w-full object-contain rounded-xl" 
                    />
                  </div>
                )}

                {/* Options Breakdown with Real-Time Distribution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                  {currentQuestion.options.map((opt, i) => {
                    const count = optionCounts[opt] || 0;
                    const percent = liveResponses.length > 0 ? Math.round((count / liveResponses.length) * 100) : 0;
                    const isCorrectOpt = opt === currentQuestion.correctAns;

                    return (
                      <div
                        key={i}
                        className={`relative p-3 rounded-xl transition-all overflow-hidden border ${
                          showAnswers && isCorrectOpt
                            ? "border-[#4ade80] bg-[#0d2818]/80 shadow-[0_0_12px_rgba(74,222,128,0.2)]"
                            : "border-[#d4af37]/25 bg-[#140305]/80"
                        }`}
                      >
                        {/* Live progress fill indicator */}
                        <div
                          className={`absolute top-0 left-0 bottom-0 opacity-20 transition-all duration-500 ${
                            isCorrectOpt ? "bg-[#4ade80]" : "bg-[#d4af37]"
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>

                        <div className="relative flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-6 h-6 shrink-0 rounded-full font-cinzel font-bold text-xs flex items-center justify-center border ${
                              showAnswers && isCorrectOpt
                                ? "bg-[#4ade80] text-[#0d2818] border-[#4ade80]"
                                : "bg-[#240609] text-[#d4af37] border-[#d4af37]/40"
                            }`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="font-sans-modern font-semibold text-white text-xs sm:text-sm truncate">
                              {opt}
                            </span>
                            {showAnswers && isCorrectOpt && (
                              <span className="shrink-0 text-[9px] font-cinzel font-bold px-1.5 py-0.5 bg-[#4ade80] text-[#0d2818] rounded-full">
                                ✓ Key
                              </span>
                            )}
                          </div>
                          <div className="text-right font-mono text-xs font-bold text-[#f5e6a8] shrink-0">
                            {count} <span className="text-[10px] text-[#e6ca65]/60 font-sans">({percent}%)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Aggregate Counter */}
              <div className="flex flex-wrap justify-between items-center p-3 bg-[#140305]/90 rounded-xl border border-[#d4af37]/30 text-[#f5e6a8] gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-pulse"></span>
                  <span className="font-cinzel font-bold text-xs sm:text-sm text-white">
                    {liveResponses.length} Submissions Received
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-[#4ade80]">✓ {correctResponsesCount} Correct</span>
                  <span className="text-[#f87171]">✕ {incorrectResponsesCount} Incorrect</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Student Responses Feed */}
            <div className="lg:col-span-5 bg-[#1e0508]/85 border border-[#d4af37]/25 rounded-2xl p-4 shadow-xl flex flex-col min-h-0 overflow-hidden">
              <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-[#d4af37]/20 shrink-0">
                <div>
                  <h3 className="font-cinzel font-bold text-white text-sm tracking-wide">
                    Live Response Stream
                  </h3>
                  <p className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                    Incoming student answers synchronized in real-time
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-[#140305] border border-[#d4af37]/30 text-[#d4af37] rounded-full">
                  {liveResponses.length}
                </span>
              </div>

              {liveResponses.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center text-[#e6ca65]/50 text-xs font-cormorant italic p-8">
                  Awaiting student submissions for this question...
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-[#d4af37]/10">
                  {liveResponses.map((r, index) => (
                    <div key={index} className="pt-2 first:pt-0 pb-1 flex justify-between items-center hover:bg-[#28080d]/60 rounded-lg px-2 transition">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] font-cinzel font-bold flex items-center justify-center text-xs shrink-0">
                          {r.participantName?.charAt(0).toUpperCase() || "S"}
                        </span>
                        <div className="min-w-0">
                          <span className="font-semibold text-white text-xs block truncate">{r.participantName}</span>
                          <span className="text-[11px] text-[#e6ca65]/70 font-sans-modern truncate block">
                            "{r.answer}"
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {typeof r.timeTaken === 'number' && (
                          <span className="text-[10px] text-[#e6ca65]/60 font-mono">{r.timeTaken}s</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-cinzel font-bold ${
                          r.isCorrect
                            ? "bg-[#0d2818] text-[#4ade80] border border-[#4ade80]/40"
                            : "bg-[#2b080d] text-[#f87171] border border-[#f87171]/40"
                        }`}>
                          {r.isCorrect ? "✓" : "✕"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#1e0508]/80 rounded-2xl border border-[#d4af37]/30 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#2a070c] border border-[#d4af37]/40 flex items-center justify-center text-2xl mx-auto mb-4 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              🪕
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white mb-2">
              Ready to Conduct Sangeet Sabha
            </h2>
            <p className="text-xs sm:text-sm text-[#e6ca65]/80 font-cormorant italic max-w-md mx-auto mb-6">
              Click the button below to broadcast the initial evaluation question to all admitted students in the arena.
            </p>
            <button
              onClick={handleNextQuestion}
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-xl font-cinzel font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition"
            >
              {loading ? "Initializing..." : "Broadcast First Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


