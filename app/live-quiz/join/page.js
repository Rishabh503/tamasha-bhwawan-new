"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GamePinEntryPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPin = pin.trim().replace(/\s+/g, "");

    if (cleanPin.length < 4) {
      setError("Please enter a valid Game PIN.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/live-quiz/find-by-code?code=${cleanPin}`);
      const data = await res.json();

      if (res.ok && data.quizId) {
        router.push(`/live-quiz/${data.quizId}/join`);
      } else {
        setError(data.error || "Quiz not found. Please check the Game PIN and try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify Game PIN. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark-velvet-bg font-sans-modern p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl shadow-2xl p-8 text-center backdrop-blur-md relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#2a070c] border border-[#d4af37]/40 flex items-center justify-center text-3xl mx-auto mb-5 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
          🪕
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel font-semibold block mb-1">
          Tamasha Bhawan • Sangeet Sabha
        </span>
        <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
          Join Live Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-[#e6ca65]/70 font-cormorant italic mt-1 mb-6">
          Enter the 6-digit Game PIN provided by your masterclass teacher
        </p>

        {error && (
          <div className="p-3.5 mb-5 bg-[#2b080d] border border-[#f87171]/40 text-[#f87171] text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              required
              maxLength={8}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="ENTER PIN"
              className="w-full py-4 px-4 text-center text-3xl font-black font-mono tracking-[0.25em] border-2 border-[#d4af37]/40 rounded-2xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 focus:outline-none uppercase bg-[#140305] text-[#f5e6a8] placeholder-[#e6ca65]/30 transition shadow-inner"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || !pin.trim()}
            className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] rounded-2xl font-cinzel font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition disabled:opacity-50"
          >
            {loading ? "Authenticating PIN..." : "Enter Sabha Arena →"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#d4af37]/20 text-xs">
          <Link href="/" className="text-[#e6ca65]/70 hover:text-[#d4af37] font-cinzel tracking-wider transition">
            ← Return to Tamasha Bhawan
          </Link>
        </div>
      </div>
    </div>
  );
}

