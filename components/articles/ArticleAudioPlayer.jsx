"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaRedo, 
  FaHeadphones,
  FaStepForward,
  FaStepBackward
} from "react-icons/fa";
import { GiSoundWaves, GiMusicalNotes } from "react-icons/gi";

export default function ArticleAudioPlayer({ audioUrl, title, durationSec }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSec || 0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback error", e));
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const skipSeconds = (sec) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + sec));
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!audioUrl) return null;

  return (
    <div className="my-8 bg-gradient-to-r from-[#200508] via-[#2d080e] to-[#1a0406] border-2 border-[#d4af37]/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Atmospheric ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col space-y-4">
        {/* Top Header */}
        <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#d4af37]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3b0d11] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shadow">
              <FaHeadphones className="text-xs animate-pulse" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#f5e6a8] uppercase tracking-wider block">
                Audio Recitation & Sangeet Commentary
              </span>
              <span className="text-[11px] text-stone-300 font-cormorant italic">
                Listen to the full audio edition narrated by the faculty
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleSpeed}
              className="px-2.5 py-1 rounded-lg bg-[#140305] hover:bg-[#3b0d11] border border-[#d4af37]/40 text-[#f5e6a8] font-cinzel text-xs font-bold transition shadow"
              title="Change Playback Speed"
            >
              {playbackRate}x Speed
            </button>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Main Play / Pause Button & Skip buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => skipSeconds(-10)}
              className="w-8 h-8 rounded-full bg-[#180305] hover:bg-[#3b0d11] border border-[#d4af37]/30 text-stone-300 hover:text-white flex items-center justify-center text-xs transition"
              title="Rewind 10s"
            >
              -10s
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-13 h-13 rounded-full gold-gradient-bg text-[#1a0406] flex items-center justify-center text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition active:scale-95"
              aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
            </button>

            <button
              type="button"
              onClick={() => skipSeconds(10)}
              className="w-8 h-8 rounded-full bg-[#180305] hover:bg-[#3b0d11] border border-[#d4af37]/30 text-stone-300 hover:text-white flex items-center justify-center text-xs transition"
              title="Forward 10s"
            >
              +10s
            </button>
          </div>

          {/* Progress Bar & Timers */}
          <div className="flex-1 w-full space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-[#f5e6a8]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-[#120204] rounded-lg appearance-none cursor-pointer accent-[#d4af37] border border-[#d4af37]/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
