"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { FaShieldAlt, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import { GiTempleGate } from "react-icons/gi";

export default function AdminLayout({ children }) {
  const { isAdmin, loading, isSignedIn, user } = useAuth();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (!loading && (!isSignedIn || !isAdmin)) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(isSignedIn ? "/" : "/sign-in");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading, isSignedIn, isAdmin, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[85vh] dark-velvet-bg text-white flex flex-col items-center justify-center p-6 font-sans-modern">
        <div className="w-12 h-12 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5e6a8] tracking-wide">
          Verifying Administrative Access
        </h2>
        <p className="font-cormorant text-stone-300 text-sm mt-1">
          Connecting to Tamasha Bhawan Master Control...
        </p>
      </div>
    );
  }

  // Access Denied for non-admin users
  if (!isSignedIn || !isAdmin) {
    return (
      <div className="min-h-[85vh] dark-velvet-bg text-white flex items-center justify-center p-4 font-sans-modern">
        <div className="max-w-md w-full bg-gradient-to-b from-[#25060a] to-[#140204] border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 text-2xl mx-auto shadow-inner">
            <FaShieldAlt />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-cinzel font-bold tracking-[0.2em] text-red-400 block">
              Restricted Area
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-black text-stone-100">
              Administrative Privileges Required
            </h2>
            <p className="font-cormorant text-stone-300 text-sm leading-relaxed">
              This portal and editing controls for Quizzes, Articles, and Academy management are restricted strictly to authorized Tamasha Bhawan administrators.
            </p>
          </div>

          <div className="bg-[#120204] border border-[#d4af37]/20 rounded-xl p-3 text-xs text-stone-400">
            Redirecting to {isSignedIn ? "Home" : "Sign In"} in <span className="font-bold text-[#f5e6a8]">{countdown}s</span>...
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-4 py-2 bg-[#2a060a] hover:bg-[#3d0b11] border border-[#d4af37]/40 text-[#f5e6a8] rounded-xl font-cinzel text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <FaArrowLeft className="text-[10px]" /> Back to Sanctuary
            </Link>

            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className="w-full sm:w-auto px-4 py-2 gold-gradient-bg text-[#1a0406] rounded-xl font-cinzel text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5"
              >
                <FaSignInAlt className="text-xs" /> Admin Login
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin View
  return <>{children}</>;
}
