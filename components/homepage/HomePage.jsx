"use client";

import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Pathways from "./components/Pathways";
import Videos from "./components/Videos";
import MusicChronicle from "./components/MusicChronicle";
import Testimonials from "../general/Testimonials";
import CTA from "../general/CTA";

const HomePage = () => {
  return (
    <div className="bg-[#160305] text-[#2b1810] overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Tamasha Bhawan (No riyaz planner) */}
      <About />

      {/* 3. The 2 Signature Courses */}
      <Pathways />

      {/* 4. Video Lessons from YouTube @TamashaBhawanMusic */}
      <Videos />

      {/* 5. Music Reading & Lore Section */}
      <MusicChronicle />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Final Enrollment CTA */}
      <CTA />
    </div>
  );
};

export default HomePage;