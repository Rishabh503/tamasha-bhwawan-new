"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPusherClient } from "../../../lib/pusher";

export default function PlayQuiz({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: quizId } = use(params);
  const participantId = searchParams.get("participantId");
  
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(`quiz-${quizId}-play`);
    
    const handleNextQuestion = (data) => {
      if (data?.currentQuestion) {
        setQuestion(data.currentQuestion);
        setTimeLeft(data.currentQuestion.timeLimitSeconds || 30);
        setHasAnswered(false);
        setSelectedAnswer("");
        setIsSubmitting(false);
      }
    };

    const handleQuizEnded = () => {
      const query = participantId ? `?participantId=${participantId}` : "";
      router.push(`/live-quiz/${quizId}/leaderboard${query}`);
    };

    channel.bind("next-question", handleNextQuestion);
    channel.bind("quiz-ended", handleQuizEnded);

    return () => {
      channel.unbind("next-question", handleNextQuestion);
      channel.unbind("quiz-ended", handleQuizEnded);
      pusher.unsubscribe(`quiz-${quizId}-play`);
    };
  }, [quizId, participantId, router]);

  useEffect(() => {
    if (timeLeft > 0 && !hasAnswered) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasAnswered]);

  const submitAnswer = async (answer) => {
    if (hasAnswered || isSubmitting || timeLeft === 0) return;
    
    setIsSubmitting(true);
    setSelectedAnswer(answer);
    setHasAnswered(true);

    try {
      await fetch("/api/live-quiz/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          participantId, 
          questionId: question.id, 
          answer, 
          timeTaken: Math.max(0, (question.timeLimitSeconds || 30) - timeLeft) 
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center p-8 bg-[#1e0508]/90 shadow-2xl border border-[#d4af37]/35 rounded-3xl max-w-sm w-full backdrop-blur-md relative z-10">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
            Tamasha Bhawan Arena
          </span>
          <h2 className="text-xl font-cinzel font-bold text-white mb-1">Awaiting Question</h2>
          <p className="text-xs text-[#e6ca65]/70 font-cormorant italic">
            The maestro will broadcast the question to all participants shortly...
          </p>
        </div>
      </div>
    );
  }

  const isLocked = hasAnswered || timeLeft === 0;

  return (
    <div className="min-h-[calc(100vh-70px)] lg:h-[calc(100vh-75px)] dark-velvet-bg text-[#f5e6a8] font-sans-modern p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0 relative z-10 space-y-3">
        {/* Top Header Bar with Question Number & Animated Timer */}
        <header className="flex justify-between items-center bg-[#1e0508]/90 px-4 py-2.5 rounded-2xl shadow-xl border border-[#d4af37]/30 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-full font-cinzel font-bold text-xs shadow-sm">
              Question {question.order + 1}
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
                  className="max-h-full max-w-full object-contain rounded-xl transition group-hover:scale-[1.01]" 
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
                <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-[10px] font-bold">
                  Selection: {selectedAnswer}
                </span>
              )}
            </div>

            {/* 4 Vertical Option Cards */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 flex flex-col justify-center min-h-0">
              {question.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                let btnClass = "w-full p-3 sm:p-3.5 border-2 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold text-left transition-all flex items-center justify-between ";
                
                if (isLocked) {
                  if (opt === selectedAnswer) {
                    btnClass += "border-[#4ade80] bg-[#0d2818]/90 text-white shadow-[0_0_20px_rgba(74,222,128,0.25)] ring-2 ring-[#4ade80]/50";
                  } else {
                    btnClass += "border-[#d4af37]/15 bg-[#140305]/60 text-[#e6ca65]/40 opacity-50 cursor-not-allowed";
                  }
                } else {
                  btnClass += "border-[#d4af37]/30 bg-[#140305]/90 hover:border-[#d4af37] hover:bg-[#28080d] text-[#f5e6a8] hover:text-white cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-[0.99]";
                }

                return (
                  <button
                    key={i}
                    disabled={isLocked}
                    onClick={() => submitAnswer(opt)}
                    className={btnClass}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-8 h-8 shrink-0 rounded-full font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center border transition ${
                        opt === selectedAnswer
                          ? "bg-[#4ade80] text-[#0d2818] border-[#4ade80]"
                          : "bg-[#240609] text-[#d4af37] border-[#d4af37]/40"
                      }`}>
                        {letter}
                      </span>
                      <span className="truncate text-sm sm:text-base font-sans-modern">{opt}</span>
                    </div>

                    {opt === selectedAnswer && (
                      <span className="text-[#4ade80] font-cinzel font-bold text-xs ml-2 shrink-0 flex items-center gap-1">
                        ✓ Recorded
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Status Confirmation Footnote */}
            <div className="pt-2 border-t border-[#d4af37]/20 shrink-0 text-center">
              <p className="text-xs font-cormorant italic text-[#e6ca65]/90">
                {hasAnswered 
                  ? "✨ Response locked in the sabha archives! Awaiting next question..." 
                  : timeLeft === 0 
                  ? "⌛ Time expired! Awaiting next question..." 
                  : "⚡ Select one option before the timer expires"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

