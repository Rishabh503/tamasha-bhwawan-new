"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaPlay, FaHistory, FaAward, FaBookOpen } from "react-icons/fa";
import { GiMusicalNotes, GiScrollUnfurled } from "react-icons/gi";

export default function AdminLiveQuizzes() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("templates"); // "templates" | "history"
  const [quizzes, setQuizzes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchQuizzesAndSessions();
  }, []);

  const fetchQuizzesAndSessions = async () => {
    setLoading(true);
    try {
      const [quizzesRes, sessionsRes] = await Promise.all([
        fetch("/api/live-quiz/list"),
        fetch("/api/live-quiz/sessions/list")
      ]);

      if (quizzesRes.ok) {
        const data = await quizzesRes.json();
        setQuizzes(data);
      }

      if (sessionsRes.ok) {
        const data = await sessionsRes.json();
        setSessions(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleHostNewSession = async (quizId) => {
    setActionLoading(quizId);
    try {
      const res = await fetch("/api/live-quiz/reset-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      if (res.ok) {
        router.push(`/admin/live-quiz/${quizId}/lobby`);
      } else {
        router.push(`/admin/live-quiz/${quizId}/lobby`);
      }
    } catch (err) {
      console.error(err);
      router.push(`/admin/live-quiz/${quizId}/lobby`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen dark-velvet-bg text-white p-4 sm:p-8 font-sans-modern">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[#d4af37]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold uppercase tracking-widest mb-2">
              <GiMusicalNotes className="text-[#e5c158]" /> Admin Sangeet Arena
            </div>
            <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Live Quiz Management
            </h1>
            <p className="font-cormorant text-base sm:text-lg text-[#f0e6d2]/80 mt-0.5">
              Author question templates, host real-time classroom sessions, and inspect historical performance.
            </p>
          </div>

          <Link 
            href="/admin/live-quiz/create"
            className="px-6 py-3.5 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <FaPlus /> Create New Quiz
          </Link>
        </div>

        {/* Ornate Tabs */}
        <div className="flex border-b border-[#d4af37]/30 mb-8 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("templates")}
            className={`py-3 px-5 font-cinzel font-bold text-xs uppercase tracking-wider border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "templates"
                ? "border-[#d4af37] text-[#f5e6a8] bg-[#3b0d11]/40 rounded-t-xl"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <FaBookOpen /> Quiz Templates ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-3 px-5 font-cinzel font-bold text-xs uppercase tracking-wider border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "history"
                ? "border-[#d4af37] text-[#f5e6a8] bg-[#3b0d11]/40 rounded-t-xl"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            <FaHistory /> Conducted Sessions & History ({sessions.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-stone-400 font-cormorant text-xl">
            <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading quiz arena data...
          </div>
        ) : activeTab === "templates" ? (
          /* TAB 1: Templates */
          quizzes.length === 0 ? (
            <div className="text-center p-12 bg-[#200508]/80 border border-[#d4af37]/30 rounded-3xl">
              <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mx-auto mb-3" />
              <p className="font-cormorant text-xl text-stone-300 mb-4">No quiz templates created yet.</p>
              <Link
                href="/admin/live-quiz/create"
                className="px-6 py-2.5 gold-gradient-bg text-[#1a0406] font-cinzel font-bold rounded-xl text-xs uppercase tracking-wider inline-block"
              >
                Create First Quiz
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  className="bg-gradient-to-b from-[#25060a] to-[#160305] border border-[#d4af37]/30 rounded-3xl p-6 flex flex-col justify-between hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h2 className="font-cinzel text-lg font-bold text-white line-clamp-1">{quiz.title}</h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold shrink-0 ${
                        quiz.status === 'LOBBY' ? 'bg-amber-900/60 text-amber-200 border border-amber-600/50' :
                        quiz.status === 'IN_PROGRESS' ? 'bg-green-900/60 text-green-200 border border-green-600/50' :
                        'bg-stone-800 text-stone-300'
                      }`}>
                        {quiz.status}
                      </span>
                    </div>

                    <p className="font-cormorant text-sm text-[#f0e6d2]/70 mb-4">
                      {quiz._count?.questions || 0} Questions Total
                    </p>

                    {quiz.joinCode && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3b0d11] border border-[#d4af37]/40 rounded-lg text-xs font-mono font-bold text-[#f5e6a8] mb-4">
                        <span>PIN: {quiz.joinCode}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2.5 mt-4 pt-4 border-t border-[#d4af37]/20">
                    <button
                      onClick={() => handleHostNewSession(quiz.id)}
                      disabled={actionLoading === quiz.id}
                      className="w-full py-3 rounded-xl gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider hover:scale-[1.02] transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <FaPlay className="text-xs" />
                      {actionLoading === quiz.id ? "Preparing..." : "▶ Host Live Session"}
                    </button>
                    <Link
                      href={`/admin/live-quiz/${quiz.id}/report`}
                      className="block text-center w-full py-2 bg-[#2e080c] hover:bg-[#3d0b11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-semibold tracking-wider transition"
                    >
                      View Report & Analytics →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* TAB 2: Sessions History */
          sessions.length === 0 ? (
            <div className="text-center py-16 bg-[#200508]/80 border border-[#d4af37]/30 rounded-3xl text-stone-400">
              <GiScrollUnfurled className="text-5xl text-[#d4af37]/60 mx-auto mb-3" />
              <p className="font-cinzel text-lg font-bold text-stone-200 mb-1">No Past Sessions Recorded</p>
              <p className="font-cormorant text-base text-[#f0e6d2]/70">Host a live quiz session to view historical student performance and answer sheets here.</p>
            </div>
          ) : (
            <div className="bg-[#200508]/90 rounded-3xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
              <div className="p-5 sm:p-6 border-b border-[#d4af37]/30">
                <h2 className="font-cinzel text-lg font-bold text-white">All Conducted Quiz Sessions</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#160305]/80 border-b border-[#d4af37]/20 text-[11px] uppercase font-cinzel tracking-wider text-[#d4af37] font-bold">
                      <th className="p-4 pl-6">Date Conducted</th>
                      <th className="p-4">Quiz Title</th>
                      <th className="p-4">Game PIN</th>
                      <th className="p-4">Participants</th>
                      <th className="p-4">Avg Score</th>
                      <th className="p-4">Top Score</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d4af37]/15 text-sm font-cormorant text-stone-200">
                    {sessions.map((s) => (
                      <tr key={s.id} className="hover:bg-[#2e080c]/60 transition">
                        <td className="p-4 pl-6 text-stone-400 font-sans-modern text-xs whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td className="p-4 font-bold text-white font-cinzel text-sm">{s.quizTitle}</td>
                        <td className="p-4 font-mono font-bold text-[#f5e6a8] text-xs">PIN: {s.pin}</td>
                        <td className="p-4 font-semibold">{s.participantCount} students</td>
                        <td className="p-4 font-bold text-amber-300">{s.avgScore} pts</td>
                        <td className="p-4 font-bold text-green-400">{s.topScore} pts</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold ${
                            s.status === 'COMPLETED' ? 'bg-stone-800 text-stone-300' :
                            s.status === 'IN_PROGRESS' ? 'bg-green-900/60 text-green-200 border border-green-600/40' :
                            'bg-amber-900/60 text-amber-200 border border-amber-600/40'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6">
                          <Link
                            href={`/admin/live-quiz/${s.quizId}/report?sessionId=${s.id}`}
                            className="px-3.5 py-1.5 bg-[#3b0d11] hover:bg-[#521319] text-[#f5e6a8] border border-[#d4af37]/40 rounded-lg text-xs font-cinzel font-bold tracking-wider transition inline-block whitespace-nowrap"
                          >
                            View Report →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}
