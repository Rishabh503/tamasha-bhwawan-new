"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

const AuthContext = createContext({
  user: null,
  role: null,
  isAdmin: false,
  loading: true,
  isSignedIn: false,
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!isSignedIn) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const json = await res.json();
        setProfile(json?.data || null);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("[AuthContext] Error fetching profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (clerkLoaded) {
      if (isSignedIn) {
        fetchProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    }
  }, [clerkLoaded, isSignedIn, fetchProfile]);

  const isAdmin = profile?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user: profile,
        clerkUser,
        role: profile?.role || null,
        isAdmin,
        loading: !clerkLoaded || loading,
        isSignedIn: !!isSignedIn,
        refreshUser: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
