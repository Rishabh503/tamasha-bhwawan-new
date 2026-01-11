"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async () => {
    if (!phone) return;

    setLoading(true);

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4ef]">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow">
        <h1 className="text-2xl font-semibold mb-2">
          Welcome to Tamasha Bhawan
        </h1>
        <p className="text-gray-600 mb-6">
          Please enter your phone number to continue
        </p>

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={submitHandler}
          disabled={loading}
          className="w-full bg-[#8b3a3a] text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
