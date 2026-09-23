"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMusic2 } from "react-icons/lu";

export const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        setRole(data?.data?.role || null);
      } catch (err) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAdmin = role === "ADMIN";

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 w-full bg-[#1c0406]/95 backdrop-blur-md border-b border-[#d4af37]/30 text-white px-6 md:px-12 py-3.5 flex justify-between items-center shadow-xl z-50">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png"
              alt="Tamasha Bhawan Logo"
              className="h-11 w-11 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="font-cinzel text-lg md:text-xl font-black tracking-wider text-stone-100 group-hover:text-[#f5e6a8] transition-colors">
                TAMASHA BHAWAN
              </h1>
              <span className="font-cormorant text-[11px] tracking-widest uppercase text-[#d4af37] block -mt-1 font-semibold">
                Sanctuary of Sangeet
              </span>
            </div>
          </Link>

          {isAdmin && (
            <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full gold-gradient-bg text-[#1a0406] font-cinzel font-black tracking-wider">
              ADMIN
            </span>
          )}
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 font-cinzel text-xs uppercase tracking-widest font-semibold">
          {!isAdmin && (
            <>
              <Link href="/about" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">About</Link>
              <Link href="/courses" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">Courses</Link>
              <Link href="/#videos" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">Masterclasses</Link>
              <Link href="/#chronicle" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">Chronicle</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link href="/admin/dashboard" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/payments" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">
                Payments
              </Link>
              <Link href="/admin/users" className="text-stone-300 hover:text-[#f5e6a8] transition-colors">
                Users
              </Link>
              <Link href="/admin/live-quiz" className="px-3.5 py-1.5 rounded-full bg-[#3b0d11] border border-[#d4af37]/60 text-[#f5e6a8] hover:bg-[#521319] hover:border-[#d4af37] transition">
                Live Quizzes
              </Link>
            </>
          )}

          {!isSignedIn && (
            <Link 
              href="/sign-in" 
              className="px-4 py-1.5 rounded-lg gold-gradient-bg text-[#1a0406] font-bold hover:scale-105 transition shadow"
            >
              Portal Login
            </Link>
          )}

          {isSignedIn && (
            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-[#d4af37]/50",
                  },
                }}
              />
            </div>
          )}
        </nav>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden p-2 rounded-lg bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8]" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <LuMusic2 size={22} />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[68px] left-0 w-full bg-[#1c0406]/98 border-b border-[#d4af37]/30 text-white transition-all duration-300 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-4 font-cinzel text-xs uppercase tracking-widest font-semibold">
          {!isAdmin && (
            <>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">About</Link>
              <Link href="/courses" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Courses</Link>
              <Link href="/#videos" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Masterclasses</Link>
              <Link href="/#chronicle" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Sangeet Chronicle</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Dashboard</Link>
              <Link href="/admin/payments" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Payments</Link>
              <Link href="/admin/users" onClick={() => setIsOpen(false)} className="text-stone-200 hover:text-[#f5e6a8]">Users</Link>
              <Link href="/admin/live-quiz" onClick={() => setIsOpen(false)} className="text-[#f5e6a8] font-bold">Live Quiz Platform</Link>
            </>
          )}

          {!isSignedIn && (
            <Link href="/sign-in" onClick={() => setIsOpen(false)} className="mt-2 py-2 text-center rounded-lg gold-gradient-bg text-[#1a0406] font-bold">
              Portal Login
            </Link>
          )}

          {isSignedIn && (
            <div className="pt-2">
              <UserButton />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
