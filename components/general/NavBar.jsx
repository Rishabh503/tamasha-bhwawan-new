"use client";

// import { getCurrentUser } from "../../app/lib/auth";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMusic2 } from "react-icons/lu";

export const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState("USER")
  const [loading,setLoading]=useState(false)
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        console.log(data)
        setRole(data?.data?.role || null);
      } catch (err) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  console.log(role)
  // const role = user // "admin" | "user"
  const isAdmin = role === "ADMIN";
// const isAdmin=f 
  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 w-full bg-[#4A1A1A] text-white px-6 py-4 flex justify-between items-center shadow-md z-50">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <img
              src="https://res.cloudinary.com/dhe9p6bo0/image/upload/v1745699335/WhatsApp_Image_2025-04-27_at_01.46.00_31d81b70-removebg-preview_riv0f9.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Tamasha Bhawan
          </h1>

          {isAdmin && (
            <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-500 text-black font-semibold">
              ADMIN
            </span>
          )}
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          {!isAdmin && (
            <>
              <Link href="/about" className="hover:text-yellow-400">About</Link>
              <Link href="/courses" className="hover:text-yellow-400">Courses</Link>
              <Link href="/product" className="hover:text-yellow-400">Product</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link href="/admin/dashboard" className="hover:text-yellow-400">
                Dashboard
              </Link>
              <Link href="/admin/payments" className="hover:text-yellow-400">
                Manage Payments
              </Link>
              <Link href="/admin/users" className="hover:text-yellow-400">
                Manage User
              </Link>
            </>
          )}

          {!isSignedIn && (
            <Link href="/sign-in" className="hover:text-yellow-400">
              Login
            </Link>
          )}

          {isSignedIn && (
            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </div>
          )}
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <LuMusic2 size={22} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full bg-[#4A1A1A] text-white transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 font-semibold">
          {!isAdmin && (
            <>
              <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="/courses" onClick={() => setIsOpen(false)}>Courses</Link>
              <Link href="/product" onClick={() => setIsOpen(false)}>Product</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link href="/courses" onClick={() => setIsOpen(false)}>
                Manage Courses
              </Link>
            </>
          )}

          {!isSignedIn && (
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              Login
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
