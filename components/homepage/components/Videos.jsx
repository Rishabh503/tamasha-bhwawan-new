"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaYoutube, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import { GiFilmSpool, GiMusicalNotes } from "react-icons/gi";

const Videos = () => {
  const [activeVideoId, setActiveVideoId] = useState("R3N3vl6GRJc");

  const videoLessons = [
    {
      id: "R3N3vl6GRJc",
      title: "Gharana & Khayal Gayaki | UGC NET Music Preparation",
      desc: "An exhaustive masterclass exploring Gwalior, Agra, Kirana & Jaipur Gharana gayaki traditions, bandishes, and exam techniques.",
      duration: "20:29",
      category: "Gharana Gayaki",
      url: "https://www.youtube.com/watch?v=R3N3vl6GRJc",
      embedUrl: "https://www.youtube-nocookie.com/embed/R3N3vl6GRJc"
    },
    {
      id: "ntOPlCwpcvM",
      title: "Sarang Ang Ke Raag | Hindustani Classical Analysis",
      desc: "Detailed melodic framework, vadi-samvadi, pakad, and variations across Shuddha Sarang, Madhmad Sarang & Brindavani Sarang.",
      duration: "22:47",
      category: "Raga Analysis",
      url: "https://youtu.be/ntOPlCwpcvM",
      embedUrl: "https://www.youtube-nocookie.com/embed/ntOPlCwpcvM"
    },
    {
      id: "d9AKaut_bSk",
      title: "UGC NET Music: Sangeet Ke Granth (Part 1)",
      desc: "Chronological breakdown of ancient treatises: Natyashastra, Brihaddeshi, and Sangeet Ratnakar for competitive aspirants.",
      duration: "30:14",
      category: "Grantha Shastra",
      url: "https://www.youtube.com/watch?v=d9AKaut_bSk",
      embedUrl: "https://www.youtube-nocookie.com/embed/d9AKaut_bSk"
    }
  ];

  const currentVideo = videoLessons.find(v => v.id === activeVideoId) || videoLessons[0];

  return (
    <section id="videos" className="py-24 px-6 md:px-16 parchment-texture text-[#2b1810] relative border-t-2 border-b-2 border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-[#d4af37]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2e2c4] border border-[#d4af37]/50 text-[#631820] font-cinzel text-xs font-bold uppercase tracking-widest mb-3">
              <FaYoutube className="text-red-600 text-sm" /> Official Lecture Series
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2e080c] tracking-tight">
              Explore Our <span className="italic font-playfair font-normal text-[#8c1d27]">Video Masterclasses</span>
            </h2>
            <p className="font-cormorant text-xl text-[#4a2e20] max-w-2xl mt-2">
              Lectures on classical ragas, musicology, and UGC-NET syllabus from the <span className="font-semibold text-[#2e080c]">@TamashaBhawanMusic</span> YouTube channel.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@TamashaBhawanMusic"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2.5 shrink-0"
          >
            <FaYoutube className="text-lg" />
            Subscribe on YouTube →
          </a>
        </div>

        {/* Video Player + Playlist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Interactive Video Embed */}
          <div className="lg:col-span-7 bg-[#200508] p-3 sm:p-4 rounded-3xl shadow-2xl border-2 border-[#d4af37]/40">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <iframe
                src={currentVideo.embedUrl}
                title={currentVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-[#3b0d11] text-[#f5e6a8] border border-[#d4af37]/30 text-xs font-cinzel font-bold">
                  {currentVideo.category}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                  <FaClock /> {currentVideo.duration}
                </span>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {currentVideo.title}
              </h3>
              <p className="font-cormorant text-base text-stone-300 leading-relaxed mb-4">
                {currentVideo.desc}
              </p>

              <a
                href={currentVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#e5c158] hover:text-[#f5e6a8] transition font-cinzel uppercase tracking-wider"
              >
                Watch on YouTube App <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>

          {/* Playlist Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-cinzel font-bold text-sm uppercase tracking-wider text-[#2e080c] flex items-center gap-2">
                <GiFilmSpool className="text-lg text-[#8c1d27]" /> Select Lecture to Play
              </h4>
              <span className="text-xs font-mono font-semibold text-gray-500">{videoLessons.length} Lectures</span>
            </div>

            {videoLessons.map((vid, idx) => {
              const isSelected = vid.id === activeVideoId;

              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoId(vid.id)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "bg-white border-[#d4af37] shadow-lg ring-2 ring-[#d4af37]/30"
                      : "bg-white/70 border-[#d4af37]/20 hover:bg-white hover:border-[#d4af37]/50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3b0d11] text-[#f5e6a8] flex items-center justify-center shrink-0 text-sm font-bold shadow">
                    {isSelected ? <FaPlay className="text-xs text-[#e5c158] ml-0.5" /> : `0${idx + 1}`}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f2e2c4] text-[#631820]">
                        {vid.category}
                      </span>
                      <span className="text-xs font-mono text-gray-500 font-semibold">{vid.duration}</span>
                    </div>

                    <h5 className="font-cinzel font-bold text-sm text-[#2e080c] leading-snug line-clamp-2">
                      {vid.title}
                    </h5>
                  </div>
                </div>
              );
            })}

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#3b0d11] to-[#200508] text-white shadow-xl mt-6 border border-[#d4af37]/30 text-center">
              <h5 className="font-cinzel font-bold text-base text-[#f5e6a8] mb-1">Want Regular Lecture Updates?</h5>
              <p className="font-cormorant text-sm text-stone-300 mb-4">
                We regularly post new analytical breakdowns on UGC-NET musicology and classical ragas.
              </p>
              <a
                href="https://www.youtube.com/@TamashaBhawanMusic?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition shadow inline-flex items-center gap-2"
              >
                <FaYoutube /> Subscribe & Ring Bell
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Videos;