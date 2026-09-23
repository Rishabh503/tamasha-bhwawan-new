"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AdminReport({ params }) {
  const { id: quizId } = use(params);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("leaderboard"); // "leaderboard" | "questions" | "students"
  const [leaderboard, setLeaderboard] = useState([]);
  const [questionsAnalytics, setQuestionsAnalytics] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const query = sessionId ? `?quizId=${quizId}&sessionId=${sessionId}` : `?quizId=${quizId}`;
        const res = await fetch(`/api/live-quiz/leaderboard${query}`);
        if (!res.ok) {
          throw new Error("Failed to load report data");
        }
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
        setQuestionsAnalytics(data.questionsAnalytics || []);
        setQuizInfo(data.quiz || null);

        if (data.leaderboard && data.leaderboard.length > 0) {
          setSelectedStudentId(data.leaderboard[0].id);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [quizId, sessionId]);

  const totalParticipants = leaderboard.length;
  const avgScore = totalParticipants > 0
    ? Math.round(leaderboard.reduce((acc, p) => acc + p.score, 0) / totalParticipants)
    : 0;
  const topScore = totalParticipants > 0
    ? Math.max(...leaderboard.map(p => p.score))
    : 0;

  const selectedStudent = leaderboard.find(p => p.id === selectedStudentId);

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[#d4af37]/20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold">
                Session Evaluation Archives
              </span>
              {quizInfo?.joinCode && (
                <span className="px-2.5 py-0.5 bg-[#240609] border border-[#d4af37]/40 text-[#f5e6a8] text-[11px] font-mono font-bold rounded-full">
                  PIN: {quizInfo.joinCode}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
              {quizInfo?.title || "Quiz Analytics & Review"}
            </h1>
            <p className="text-xs sm:text-sm text-[#e6ca65]/70 font-cormorant italic mt-0.5">
              Comprehensive student breakdown and question accuracy metrics
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin/live-quiz"
              className="px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition"
            >
              ← Quiz Portal
            </Link>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#240609] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#f5e6a8] rounded-xl text-xs font-cinzel tracking-wider transition shadow-sm"
            >
              🖨 Print Dossier
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center text-[#e6ca65]/60 font-cormorant italic text-lg">
            <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Analyzing candidate responses and tabulating sabha metrics...
          </div>
        ) : error ? (
          <div className="p-6 bg-[#2b080d] text-[#f87171] rounded-2xl border border-[#f87171]/40 text-center font-sans-modern">
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          <>
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1e0508]/85 p-5 rounded-2xl border border-[#d4af37]/30 shadow-lg backdrop-blur-sm">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Total Candidates
                </span>
                <p className="text-3xl font-cinzel font-black text-white mt-1">{totalParticipants}</p>
              </div>
              <div className="bg-[#1e0508]/85 p-5 rounded-2xl border border-[#d4af37]/30 shadow-lg backdrop-blur-sm">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Questions Evaluated
                </span>
                <p className="text-3xl font-cinzel font-black text-white mt-1">{quizInfo?.totalQuestions || 0}</p>
              </div>
              <div className="bg-[#1e0508]/85 p-5 rounded-2xl border border-[#d4af37]/30 shadow-lg backdrop-blur-sm">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Highest Honor (Top Score)
                </span>
                <p className="text-3xl font-cinzel font-black text-[#4ade80] mt-1">
                  {topScore} <span className="text-xs font-sans-modern text-[#e6ca65]/60 font-normal">pts</span>
                </p>
              </div>
              <div className="bg-[#1e0508]/85 p-5 rounded-2xl border border-[#d4af37]/30 shadow-lg backdrop-blur-sm">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Average Proficiency
                </span>
                <p className="text-3xl font-cinzel font-black text-[#f5e6a8] mt-1">
                  {avgScore} <span className="text-xs font-sans-modern text-[#e6ca65]/60 font-normal">pts</span>
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#d4af37]/20 mb-6 gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`py-3 px-5 font-cinzel font-bold text-xs tracking-wider border-b-2 transition whitespace-nowrap ${
                  activeTab === "leaderboard"
                    ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10 rounded-t-xl"
                    : "border-transparent text-[#e6ca65]/60 hover:text-white"
                }`}
              >
                🏆 Sabha Standings & Rankings
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`py-3 px-5 font-cinzel font-bold text-xs tracking-wider border-b-2 transition whitespace-nowrap ${
                  activeTab === "questions"
                    ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10 rounded-t-xl"
                    : "border-transparent text-[#e6ca65]/60 hover:text-white"
                }`}
              >
                📊 Question-by-Question Analysis
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`py-3 px-5 font-cinzel font-bold text-xs tracking-wider border-b-2 transition whitespace-nowrap ${
                  activeTab === "students"
                    ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10 rounded-t-xl"
                    : "border-transparent text-[#e6ca65]/60 hover:text-white"
                }`}
              >
                🔍 Student Answer Inspector
              </button>
            </div>

            {/* TAB 1: Standings & Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="bg-[#1e0508]/85 rounded-3xl shadow-xl border border-[#d4af37]/30 overflow-hidden backdrop-blur-sm">
                <div className="p-6 border-b border-[#d4af37]/20 flex justify-between items-center">
                  <h2 className="text-base sm:text-lg font-cinzel font-bold text-white tracking-wide">
                    Official Sabha Rankings
                  </h2>
                  <span className="text-xs text-[#e6ca65]/70 font-cormorant italic">
                    {leaderboard.length} candidates evaluated
                  </span>
                </div>
                
                {leaderboard.length === 0 ? (
                  <div className="p-12 text-center text-[#e6ca65]/50 font-cormorant italic">
                    No participants recorded in this session.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#140305]/80 border-b border-[#d4af37]/20 text-[11px] uppercase tracking-[0.15em] text-[#d4af37] font-cinzel font-bold">
                          <th className="p-4 pl-6">Rank</th>
                          <th className="p-4">Student Name</th>
                          <th className="p-4">Score</th>
                          <th className="p-4">Accuracy</th>
                          <th className="p-4">Avg Speed</th>
                          <th className="p-4 pr-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d4af37]/10 text-sm">
                        {leaderboard.map((p, i) => (
                          <tr key={p.id} className="hover:bg-[#28080d]/60 transition">
                            <td className="p-4 pl-6 font-cinzel font-bold text-[#f5e6a8]">
                              {i === 0 ? "🥇 Rank 1" : i === 1 ? "🥈 Rank 2" : i === 2 ? "🥉 Rank 3" : `#${p.rank}`}
                            </td>
                            <td className="p-4 font-semibold text-white">{p.name}</td>
                            <td className="p-4 font-cinzel font-bold text-[#d4af37] text-base">{p.score} pts</td>
                            <td className="p-4 text-[#e6ca65]/80">
                              <span className="font-bold text-white">{p.correctAnswers}</span> / {p.totalQuestions || p.totalAnswers} correct
                            </td>
                            <td className="p-4 text-[#e6ca65]/60 font-mono text-xs">
                              {p.totalAnswers > 0 ? `${Math.round(p.totalTimeTaken / p.totalAnswers)}s avg` : "-"}
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <button
                                onClick={() => {
                                  setSelectedStudentId(p.id);
                                  setActiveTab("students");
                                }}
                                className="text-xs font-cinzel font-bold text-[#d4af37] hover:text-[#f5e6a8] hover:underline"
                              >
                                Inspect Sheet →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Question-by-Question Analysis */}
            {activeTab === "questions" && (
              <div className="space-y-6">
                {questionsAnalytics.map((q, idx) => (
                  <div key={q.id} className="bg-[#1e0508]/85 rounded-3xl shadow-xl border border-[#d4af37]/30 p-6 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-[#d4af37]/20">
                      <div>
                        <span className="px-3 py-1 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#160305] rounded-full font-cinzel font-bold text-[11px] tracking-wider">
                          Question {idx + 1}
                        </span>
                        <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white mt-2">{q.questionText}</h3>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-2xl font-cinzel font-black text-[#d4af37]">{q.accuracyPercent}%</div>
                        <span className="text-xs text-[#e6ca65]/70 font-sans-modern">
                          {q.correctCount} of {q.answeredCount} answered correctly
                        </span>
                      </div>
                    </div>

                    {q.imageUrl && (
                      <div className="mb-4 rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#140305] p-2 max-w-sm">
                        <img src={q.imageUrl} alt="Question" className="max-h-48 w-full object-contain rounded-xl" />
                      </div>
                    )}

                    {/* Options Accuracy Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                      {q.options.map((opt, optIdx) => {
                        const count = q.optionCounts[opt] || 0;
                        const percent = q.answeredCount > 0 ? Math.round((count / q.answeredCount) * 100) : 0;
                        const isCorrect = opt === q.correctAns;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3.5 rounded-2xl border flex justify-between items-center transition ${
                              isCorrect
                                ? "bg-[#0d2818]/80 border-[#4ade80]/60 text-white shadow-[0_0_10px_rgba(74,222,128,0.1)]"
                                : "bg-[#140305]/80 border-[#d4af37]/20 text-[#f5e6a8]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-6 h-6 shrink-0 rounded-full font-cinzel font-bold text-xs flex items-center justify-center border ${
                                isCorrect
                                  ? "bg-[#4ade80] text-[#0d2818] border-[#4ade80]"
                                  : "bg-[#240609] text-[#d4af37] border-[#d4af37]/30"
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold truncate text-white">{opt}</span>
                              {isCorrect && (
                                <span className="text-[10px] font-cinzel font-bold bg-[#4ade80] text-[#0d2818] px-2 py-0.5 rounded-full shrink-0">
                                  ✓ Key
                                </span>
                              )}
                            </div>
                            <div className="text-right text-xs font-mono font-bold text-[#e6ca65] shrink-0 ml-2">
                              {count} ({percent}%)
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Student Answer Inspector */}
            {activeTab === "students" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Selector List */}
                <div className="bg-[#1e0508]/85 rounded-3xl shadow-xl border border-[#d4af37]/30 p-5 h-fit backdrop-blur-sm">
                  <h3 className="font-cinzel font-bold text-[#d4af37] mb-3 text-xs uppercase tracking-[0.2em]">
                    Select Student ({leaderboard.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {leaderboard.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedStudentId(p.id)}
                        className={`w-full text-left p-3 rounded-2xl transition flex justify-between items-center ${
                          selectedStudentId === p.id
                            ? "bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#160305] font-bold shadow-md"
                            : "hover:bg-[#28080d]/80 text-[#f5e6a8] border border-transparent hover:border-[#d4af37]/30"
                        }`}
                      >
                        <div>
                          <span className="text-sm font-semibold block">{p.name}</span>
                          <span className={`text-xs ${selectedStudentId === p.id ? "text-[#160305]/80 font-medium" : "text-[#e6ca65]/60"}`}>
                            Rank #{p.rank} • {p.correctAnswers} / {p.totalQuestions} correct
                          </span>
                        </div>
                        <span className="font-cinzel font-bold text-sm">{p.score} pts</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Answers Detailed Sheet */}
                <div className="lg:col-span-2 space-y-4">
                  {selectedStudent ? (
                    <div className="bg-[#1e0508]/85 rounded-3xl shadow-xl border border-[#d4af37]/30 p-6 backdrop-blur-sm">
                      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                            {selectedStudent.name}'s Evaluation Sheet
                          </h3>
                          <p className="text-xs sm:text-sm text-[#e6ca65]/70 font-cormorant italic mt-0.5">
                            Rank #{selectedStudent.rank} • Total Score: {selectedStudent.score} pts • Accuracy: {selectedStudent.correctAnswers} / {selectedStudent.totalQuestions}
                          </p>
                        </div>
                        <span className="px-3.5 py-1 bg-[#140305] border border-[#d4af37]/40 text-[#d4af37] font-cinzel font-bold rounded-full text-xs">
                          {Math.round((selectedStudent.correctAnswers / (selectedStudent.totalQuestions || 1)) * 100)}% Accuracy
                        </span>
                      </div>

                      <div className="space-y-4">
                        {questionsAnalytics.map((q, idx) => {
                          const ansData = selectedStudent.answersMap?.[q.id];
                          const isCorrect = ansData?.isCorrect;
                          const studentAns = ansData?.answer;

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-2xl border transition ${
                                isCorrect
                                  ? "bg-[#0d2818]/60 border-[#4ade80]/40"
                                  : studentAns
                                  ? "bg-[#2b080d]/60 border-[#f87171]/40"
                                  : "bg-[#140305]/60 border-[#d4af37]/20"
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <span className="font-cinzel font-bold text-white text-sm">
                                  Q{idx + 1}. {q.questionText}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold shrink-0 ${
                                  isCorrect
                                    ? "bg-[#4ade80] text-[#0d2818]"
                                    : studentAns
                                    ? "bg-[#f87171] text-[#2b080d]"
                                    : "bg-[#240609] text-[#e6ca65]/60"
                                }`}>
                                  {isCorrect ? "✓ Correct" : studentAns ? "✕ Incorrect" : "Not Answered"}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mt-3">
                                <div className="p-2.5 rounded-xl bg-[#140305]/90 border border-[#d4af37]/20">
                                  <span className="text-[#d4af37] block mb-0.5 uppercase font-cinzel font-bold text-[10px]">
                                    Candidate Response
                                  </span>
                                  <span className={`font-semibold ${isCorrect ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                                    {studentAns || "No answer submitted"}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#140305]/90 border border-[#d4af37]/20">
                                  <span className="text-[#d4af37] block mb-0.5 uppercase font-cinzel font-bold text-[10px]">
                                    Standard Answer Key
                                  </span>
                                  <span className="font-semibold text-white">
                                    {q.correctAns}
                                  </span>
                                </div>
                              </div>

                              {typeof ansData?.timeTaken === "number" && (
                                <div className="text-[11px] text-[#e6ca65]/60 mt-2 font-mono">
                                  Evaluation time taken: {ansData.timeTaken}s
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-[#e6ca65]/50 bg-[#1e0508]/80 rounded-3xl border border-[#d4af37]/30 font-cormorant italic">
                      Select a student on the left to inspect their answers.
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

