"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getPusherClient } from "../../../lib/pusher";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function JoinQuiz({ params }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { id: quizId } = use(params);
  const [quizInfo, setQuizInfo] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("FORM"); // FORM, WAITING, REJECTED
  const [loading, setLoading] = useState(false);
  const [participantId, setParticipantId] = useState(null);

  useEffect(() => {
    if (user) {
      const studentName = user.fullName || user.firstName || user.username || "";
      if (studentName && !name) {
        setName(studentName);
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const res = await fetch(`/api/live-quiz/leaderboard?quizId=${quizId}`);
        if (res.ok) {
          const data = await res.json();
          setQuizInfo(data.quiz || null);
        }
      } catch (err) {
        console.error("Error fetching quiz info:", err);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  useEffect(() => {
    if (!participantId) return;

    const pusher = getPusherClient();
    if (!pusher) return;

    // Listen for personal acceptance
    const userChannel = pusher.subscribe(`participant-${participantId}`);
    const lobbyChannel = pusher.subscribe(`quiz-${quizId}-lobby`);

    const handleStatusUpdate = (updated) => {
      if (updated.status === "ACCEPTED") {
        // Now waiting for quiz start event
      } else if (updated.status === "REJECTED") {
        setStatus("REJECTED");
      }
    };

    const handleQuizStarted = () => {
      router.push(`/live-quiz/${quizId}/play?participantId=${participantId}`);
    };

    userChannel.bind("status-update", handleStatusUpdate);
    lobbyChannel.bind("quiz-started", handleQuizStarted);

    return () => {
      userChannel.unbind("status-update", handleStatusUpdate);
      lobbyChannel.unbind("quiz-started", handleQuizStarted);
      pusher.unsubscribe(`participant-${participantId}`);
      pusher.unsubscribe(`quiz-${quizId}-lobby`);
    };
  }, [participantId, quizId, router]);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/live-quiz/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, name: name.trim() }),
      });
      const data = await res.json();
      
      setParticipantId(data.id);
      setStatus("WAITING");
    } catch (err) {
      console.error(err);
      alert("Failed to join. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center dark-velvet-bg">
        <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
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
          <p className="text-xs sm:text-sm text-[#e6ca65]/80 font-cormorant italic mt-2 mb-6">
            You must be logged in to your Tamasha Bhawan account to participate in this quiz session and enter the Sangeet Sabha arena.
          </p>

          <div className="space-y-3">
            <Link
              href={`/sign-in?redirect_url=/live-quiz/${quizId}/join`}
              className="block w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-2xl font-cinzel font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition text-center"
            >
              Log In to Join Sabha →
            </Link>
            <Link
              href={`/sign-up?redirect_url=/live-quiz/${quizId}/join`}
              className="block w-full py-3 bg-[#240609] border border-[#d4af37]/40 text-[#f5e6a8] rounded-2xl font-cinzel font-semibold text-xs tracking-wider uppercase hover:border-[#d4af37] transition text-center"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#d4af37]/20 text-xs">
            <Link href="/" className="text-[#e6ca65]/70 hover:text-[#d4af37] font-cinzel tracking-wider transition">
              ← Return to Tamasha Bhawan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "WAITING") {
    return (
      <div className="flex min-h-screen items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center p-8 bg-[#1e0508]/90 shadow-2xl rounded-3xl max-w-sm w-full border border-[#d4af37]/35 backdrop-blur-md relative z-10">
          <div className="w-14 h-14 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
            Admission Queue
          </span>
          <h2 className="text-2xl font-cinzel font-bold text-white mb-2">Awaiting Master's Approval</h2>
          <p className="text-[#e6ca65]/80 font-cormorant italic text-sm mb-5">
            Waiting for the teacher to admit candidate <span className="font-semibold text-[#f5e6a8] font-cinzel">"{name}"</span> into the arena.
          </p>
          <div className="p-3.5 bg-[#140305] border border-[#d4af37]/30 text-[#e6ca65] rounded-2xl text-xs font-sans-modern">
            Please keep this window active. You will enter automatically the moment the evaluation commences.
          </div>
        </div>
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="flex min-h-screen items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
        <div className="text-center p-8 bg-[#1e0508]/90 shadow-2xl rounded-3xl max-w-sm w-full border border-[#f87171]/40 backdrop-blur-md relative z-10">
          <div className="text-4xl mb-3">🚫</div>
          <h2 className="text-2xl font-cinzel font-bold text-[#f87171] mb-2">Admission Denied</h2>
          <p className="text-[#e6ca65]/70 font-cormorant italic text-sm mb-6">The teacher did not admit you to this session.</p>
          <button
            onClick={() => setStatus("FORM")}
            className="w-full py-3 bg-[#240609] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl text-xs font-cinzel tracking-wider uppercase hover:border-[#d4af37] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-[#1e0508]/90 rounded-3xl shadow-2xl border border-[#d4af37]/35 backdrop-blur-md relative z-10">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2a070c] border border-[#d4af37]/40 flex items-center justify-center text-2xl mx-auto mb-3 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            🎼
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
            Candidate Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            {quizInfo?.title || "Sangeet Sabha"}
          </h1>
          {quizInfo?.joinCode && (
            <div className="inline-block mt-2 px-3 py-1 bg-[#140305] border border-[#d4af37]/30 text-[#f5e6a8] rounded-full text-xs font-mono font-bold">
              PIN: {quizInfo.joinCode}
            </div>
          )}
        </div>

        <form onSubmit={handleJoin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-cinzel font-bold uppercase tracking-[0.15em] text-[#d4af37] mb-2">
              Your Full Name / Nickname
            </label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-[#d4af37]/30 bg-[#140305] focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 focus:outline-none p-3.5 rounded-2xl text-white text-base font-medium placeholder-[#e6ca65]/30 transition"
              placeholder="e.g. Alex Sharma"
              autoFocus
            />
          </div>

          <button 
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-2xl font-cinzel font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Request Admission to Sabha →"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#d4af37]/20 text-center text-xs">
          <Link href="/live-quiz/join" className="text-[#e6ca65]/70 hover:text-[#d4af37] font-cinzel tracking-wider transition">
            Join with a different PIN
          </Link>
        </div>
      </div>
    </div>
  );
}

