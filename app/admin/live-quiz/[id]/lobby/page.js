"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPusherClient } from "../../../../lib/pusher";
import { FaPlay, FaCopy, FaLink, FaRedo, FaUsers, FaCheckDouble } from "react-icons/fa";
import { GiMusicalNotes, GiHourglass } from "react-icons/gi";

export default function AdminLobby({ params }) {
  const router = useRouter();
  const { id: quizId } = use(params);
  const [participants, setParticipants] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [fetchingInitial, setFetchingInitial] = useState(true);
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const resetLobbySession = async () => {
    setResetting(true);
    try {
      const res = await fetch("/api/live-quiz/reset-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuizInfo((prev) => ({
          ...prev,
          joinCode: data.joinCode,
          status: "LOBBY"
        }));
        setParticipants([]);
        return data;
      }
    } catch (err) {
      console.error("Error resetting lobby session:", err);
    } finally {
      setResetting(false);
    }
    return null;
  };

  const fetchLobbyData = async () => {
    try {
      const res = await fetch(`/api/live-quiz/leaderboard?quizId=${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQuizInfo(data.quiz || null);

        if (data.quiz && data.quiz.status === "COMPLETED") {
          await resetLobbySession();
        } else {
          setParticipants(data.leaderboard || []);
        }
      }
    } catch (err) {
      console.error("Error fetching lobby data:", err);
    } finally {
      setFetchingInitial(false);
    }
  };

  useEffect(() => {
    fetchLobbyData();

    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(`quiz-${quizId}-lobby`);
    
    const handleStudentJoined = (participant) => {
      setParticipants((prev) => {
        const index = prev.findIndex((p) => p.id === participant.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = participant;
          return updated;
        }
        return [...prev, participant];
      });
    };

    channel.bind("student-joined", handleStudentJoined);

    return () => {
      channel.unbind("student-joined", handleStudentJoined);
      pusher.unsubscribe(`quiz-${quizId}-lobby`);
    };
  }, [quizId]);

  const handleManualReset = async () => {
    if (!confirm("Start a new session? This will generate a new Game PIN and reset the waiting room.")) {
      return;
    }
    const result = await resetLobbySession();
    if (result) {
      alert(`New session initialized! PIN: ${result.joinCode}`);
    }
  };

  const handleStatus = async (participantId, status) => {
    try {
      await fetch("/api/live-quiz/accept-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, status, quizId }),
      });
      setParticipants(prev => prev.map(p => p.id === participantId ? { ...p, status } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptAll = async () => {
    const waitingStudents = participants.filter(p => p.status === 'WAITING');
    for (const p of waitingStudents) {
      await handleStatus(p.id, 'ACCEPTED');
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      await fetch("/api/live-quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      router.push(`/admin/live-quiz/${quizId}/host`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyPinToClipboard = () => {
    navigator.clipboard.writeText(pin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const copyDirectLink = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/live-quiz/${quizId}/join` : '';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const acceptedCount = participants.filter(p => p.status === 'ACCEPTED').length;
  const waitingCount = participants.filter(p => p.status === 'WAITING').length;
  const pin = quizInfo?.joinCode || "------";

  return (
    <div className="min-h-screen lg:h-screen flex flex-col dark-velvet-bg text-white font-sans-modern overflow-hidden p-3 sm:p-5 lg:p-6">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col min-h-0">
        
        {/* Compact Top Navigation Bar */}
        <header className="flex flex-wrap justify-between items-center gap-3 pb-3 mb-4 border-b border-[#d4af37]/25 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/live-quiz"
              className="px-3 py-1.5 bg-[#2a070c] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-lg font-cinzel text-xs font-bold transition"
            >
              ← Quizzes
            </Link>
            <div>
              <h1 className="font-cinzel text-lg sm:text-xl font-bold text-white line-clamp-1">
                {quizInfo?.title || "Live Session Lobby"}
              </h1>
              <p className="text-xs text-[#e6ca65]/70 font-cormorant italic">
                Real-time student admission and room broadcast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualReset}
              disabled={resetting || loading}
              className="px-3 py-1.5 bg-[#2a070c] hover:bg-[#3d0b11] text-[#f5e6a8] border border-[#d4af37]/35 rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              title="Generate a fresh Game PIN"
            >
              <FaRedo className={`text-[10px] ${resetting ? "animate-spin" : ""}`} /> {resetting ? "Resetting..." : "New PIN"}
            </button>
            
            <button
              onClick={handleStart}
              disabled={loading || acceptedCount === 0}
              className="px-5 py-2 gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition shadow-lg disabled:opacity-50 flex items-center gap-1.5"
            >
              <FaPlay className="text-[10px]" />
              {loading ? "Starting..." : `Start Quiz (${acceptedCount} Admitted)`}
            </button>
          </div>
        </header>

        {/* 2-Column Split View for Single-Window Laptop Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
          
          {/* Left Column (5 Cols): Game PIN & Room Status */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* PIN Card */}
            <div className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] border-2 border-[#d4af37] rounded-2xl p-5 text-center shadow-xl relative overflow-hidden flex flex-col justify-center">
              <div className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#f5e6a8] mb-1">
                ⚜ Official Game PIN ⚜
              </div>

              <div className="font-mono text-4xl sm:text-5xl font-black tracking-widest my-2 text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {pin}
              </div>

              <p className="text-xs font-cormorant italic text-[#f0e6d2]/80 mb-3">
                Students join at <span className="text-[#f5e6a8] font-bold font-mono break-all">{origin ? `${origin}/live-quiz/join` : "/live-quiz/join"}</span>
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={copyPinToClipboard}
                  className="py-2 px-3 bg-[#3b0d11] hover:bg-[#521319] border border-[#d4af37]/50 rounded-xl font-cinzel text-xs font-bold text-[#f5e6a8] transition flex items-center justify-center gap-1.5"
                >
                  <FaCopy className="text-[11px]" /> {copiedPin ? "Copied!" : "Copy PIN"}
                </button>

                <button
                  onClick={copyDirectLink}
                  className="py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-cinzel text-xs font-bold text-white transition flex items-center justify-center gap-1.5"
                >
                  <FaLink className="text-[11px]" /> {copiedLink ? "Link Copied!" : "Direct Link"}
                </button>
              </div>
            </div>

            {/* Room Summary Card */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-2xl p-4 shadow-lg flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#d4af37] block">
                  Sabha Admission Metrics
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#140305] p-3 rounded-xl border border-[#4ade80]/30">
                    <span className="text-[10px] uppercase font-cinzel font-bold text-[#4ade80] block">Admitted</span>
                    <span className="text-2xl font-cinzel font-black text-white">{acceptedCount}</span>
                  </div>
                  <div className="bg-[#140305] p-3 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] uppercase font-cinzel font-bold text-amber-300 block">Waiting</span>
                    <span className="text-2xl font-cinzel font-black text-white">{waitingCount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#d4af37]/20">
                <button
                  onClick={handleStart}
                  disabled={loading || acceptedCount === 0}
                  className="w-full py-3 gold-gradient-bg text-[#1a0406] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FaPlay className="text-xs" />
                  {loading ? "Starting..." : `Commence Sabha (${acceptedCount} Ready)`}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Real-Time Student Admission Feed */}
          <div className="lg:col-span-7 bg-[#1e0508]/90 border border-[#d4af37]/30 rounded-2xl p-4 shadow-xl flex flex-col min-h-0 overflow-hidden">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#d4af37]/20 shrink-0">
              <div>
                <h2 className="font-cinzel text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <FaUsers className="text-[#d4af37]" /> Student Admission Queue
                </h2>
                <p className="text-[11px] text-[#e6ca65]/70 font-cormorant italic">
                  Live incoming students entering the session PIN
                </p>
              </div>

              <div className="flex items-center gap-2">
                {waitingCount > 1 && (
                  <button
                    onClick={handleAcceptAll}
                    className="px-2.5 py-1 bg-green-800/80 hover:bg-green-700 text-white rounded-lg text-[10px] font-cinzel font-bold transition flex items-center gap-1"
                  >
                    <FaCheckDouble className="text-[9px]" /> Accept All
                  </button>
                )}
                <span className="font-cinzel text-[11px] font-bold px-2.5 py-0.5 bg-[#3b0d11] border border-[#d4af37]/30 text-[#f5e6a8] rounded-full">
                  {participants.length} Total
                </span>
              </div>
            </div>

            {/* Scrollable Queue Feed */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {fetchingInitial ? (
                <div className="py-12 text-center text-stone-400 font-cormorant text-sm">
                  <div className="w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  Checking admission queue...
                </div>
              ) : participants.length === 0 ? (
                <div className="py-16 text-center text-stone-400">
                  <GiHourglass className="text-3xl text-[#d4af37]/60 mx-auto mb-2 animate-pulse" />
                  <p className="font-cinzel text-sm font-bold text-stone-200">Waiting for students to join...</p>
                  <p className="font-cormorant text-xs text-[#f0e6d2]/60 mt-0.5">Students entering PIN {pin} will appear here instantly.</p>
                </div>
              ) : (
                participants.map((p) => (
                  <div 
                    key={p.id} 
                    className="flex justify-between items-center p-2.5 sm:p-3 rounded-xl bg-[#140305] border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#3b0d11] text-[#f5e6a8] font-cinzel font-bold flex items-center justify-center text-xs border border-[#d4af37]/40 shrink-0">
                        {p.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <span className="font-cinzel font-bold text-xs sm:text-sm text-stone-100 truncate block">{p.name}</span>
                        <span className={`text-[9px] font-cinzel font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          p.status === 'ACCEPTED' ? 'bg-green-900/60 text-green-300 border border-green-600/40' :
                          p.status === 'REJECTED' ? 'bg-red-900/60 text-red-300 border border-red-600/40' :
                          'bg-amber-900/60 text-amber-300 border border-amber-600/40 animate-pulse'
                        }`}>
                          {p.status === 'WAITING' ? '⏳ Awaiting Admission' : p.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {p.status === 'WAITING' ? (
                        <>
                          <button 
                            onClick={() => handleStatus(p.id, 'ACCEPTED')}
                            className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded-lg text-[10px] font-cinzel font-bold uppercase transition"
                          >
                            ✓ Accept
                          </button>
                          <button 
                            onClick={() => handleStatus(p.id, 'REJECTED')}
                            className="px-2.5 py-1 bg-red-800 hover:bg-red-700 text-white rounded-lg text-[10px] font-cinzel font-bold uppercase transition"
                          >
                            ✕
                          </button>
                        </>
                      ) : p.status === 'ACCEPTED' ? (
                        <button 
                          onClick={() => handleStatus(p.id, 'REJECTED')}
                          className="px-2.5 py-1 bg-[#240609] hover:bg-red-900/50 text-stone-400 hover:text-red-300 border border-[#d4af37]/20 rounded-lg text-[10px] font-cinzel transition"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStatus(p.id, 'ACCEPTED')}
                          className="px-2.5 py-1 bg-[#240609] hover:bg-green-900/50 text-stone-400 hover:text-green-300 border border-[#d4af37]/20 rounded-lg text-[10px] font-cinzel transition"
                        >
                          Admit
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

