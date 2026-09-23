"use client";
import { useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { FaClock, FaMapMarkerAlt, FaCheckCircle, FaTelegramPlane } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ sending: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: null });

    emailjs.send(
      "service_dt0wm0g",
      "template_pwg94dg",
      formData,
      'nx8l8Db3kmBQLw3R7'
    ).then(
      (response) => {
        setStatus({ sending: false, success: true, error: null });
        setFormData({ name: "", contact: "", email: "", subject: "", message: "" });
      },
      (error) => {
        setStatus({ sending: false, success: false, error: "Failed to send message. Please try again or reach out directly." });
      }
    );
  };

  return (
    <div className="min-h-screen dark-velvet-bg text-[#f5e6a8] font-sans-modern py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#800020]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] mb-2 shadow-lg">
            <GiMusicalNotes size={24} />
          </div>
          <span className="text-xs font-cinzel font-bold uppercase tracking-[0.3em] text-[#d4af37] block">
            Direct Communications & Inquiry
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-cinzel text-white tracking-wide">
            Get in Touch
          </h1>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-3"></div>
          <p className="text-base sm:text-xl text-[#f5e6a8]/90 font-cormorant italic leading-relaxed">
            Have questions regarding admissions, vocal audition auditions, or certified taaleem? Send us a message and our gurus will respond promptly.
          </p>
        </div>

        {/* 2-Column Split: Form (Left) and Contact Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 of 12 cols): Send a Message Form */}
          <div className="lg:col-span-7 bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
            <div className="border-b border-[#d4af37]/20 pb-4">
              <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                Message Dossier
              </span>
              <h2 className="text-2xl font-cinzel font-bold text-white tracking-wide mt-1">
                Dispatch an Inquiry
              </h2>
            </div>

            {status.success && (
              <div className="p-4 rounded-2xl bg-[#0d2818] border border-[#4ade80]/50 text-[#4ade80] text-sm font-sans flex items-center gap-3">
                <FaCheckCircle className="text-lg shrink-0" />
                <span>Your message has been safely received. Our team will contact you shortly!</span>
              </div>
            )}

            {status.error && (
              <div className="p-4 rounded-2xl bg-[#2b080d] border border-[#f87171]/50 text-[#f87171] text-sm font-sans">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold uppercase text-[#e6ca65]/90 tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Pt. Rishabh Sharma"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold uppercase text-[#e6ca65]/90 tracking-wider">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold uppercase text-[#e6ca65]/90 tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold uppercase text-[#e6ca65]/90 tracking-wider">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Admission / Exam Guidance"
                    className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-cinzel font-bold uppercase text-[#e6ca65]/90 tracking-wider">
                  Detailed Message *
                </label>
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your prior musical learning, gharana interest, or specific questions..."
                  className="w-full bg-[#120204] border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none rounded-2xl p-4 text-white text-sm resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={status.sending}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#160305] font-cinzel font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <IoIosSend className="text-lg" />
                <span>{status.sending ? "Transmitting..." : "Send Message"}</span>
              </button>
            </form>
          </div>

          {/* Right Column (5 of 12 cols): Contact Info & Business Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-[#1e0508]/90 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
              <div className="border-b border-[#d4af37]/20 pb-3">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                  Official Channels
                </span>
                <h3 className="text-xl font-cinzel font-bold text-white tracking-wide mt-0.5">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                <a 
                  href="mailto:tamashabhawan@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#140305]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center text-xl group-hover:scale-105 transition shrink-0">
                    <AiOutlineMail />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37] block">Official Email</span>
                    <span className="text-sm font-semibold text-white truncate block">tamashabhawan@gmail.com</span>
                  </div>
                </a>

                <a 
                  href="tel:9310395103"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#140305]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center text-xl group-hover:scale-105 transition shrink-0">
                    <AiOutlinePhone />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37] block">Helpline & WhatsApp</span>
                    <span className="text-sm font-semibold text-white truncate block">+91 93103 95103</span>
                  </div>
                </a>

                <a 
                  href="https://t.me/tamashabhawanmusic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#140305]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center text-xl group-hover:scale-105 transition shrink-0">
                    <FaTelegramPlane />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37] block">Telegram Channel</span>
                    <span className="text-sm font-semibold text-white truncate block">@tamashabhawanmusic</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#140305]/80 border border-[#d4af37]/20">
                  <div className="w-12 h-12 rounded-xl bg-[#2a070c] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center text-xl shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37] block">Sanctuary Location</span>
                    <span className="text-sm font-semibold text-white truncate block">Delhi, India • Serving Worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business & Riyaz Hours Card */}
            <div className="bg-gradient-to-b from-[#2e080c] to-[#1a0406] border-2 border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="border-b border-[#d4af37]/20 pb-3">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#d4af37] block">
                  Studio Schedule
                </span>
                <h3 className="text-xl font-cinzel font-bold text-white tracking-wide mt-0.5 flex items-center gap-2">
                  <FaClock className="text-[#d4af37] text-base" /> Sabha & Riyaz Hours
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-[#d4af37]/10">
                  <span className="text-stone-300 font-medium">Monday — Friday</span>
                  <span className="font-mono font-bold text-[#f5e6a8] bg-[#140305] px-2.5 py-0.5 rounded-lg border border-[#d4af37]/20">
                    9:00 AM — 9:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#d4af37]/10">
                  <span className="text-stone-300 font-medium">Saturday</span>
                  <span className="font-mono font-bold text-[#f5e6a8] bg-[#140305] px-2.5 py-0.5 rounded-lg border border-[#d4af37]/20">
                    9:00 AM — 6:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-stone-300 font-medium">Sunday</span>
                  <span className="font-mono font-bold text-[#f5e6a8] bg-[#140305] px-2.5 py-0.5 rounded-lg border border-[#d4af37]/20">
                    9:00 AM — 4:00 PM IST
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#e6ca65]/70 font-cormorant italic pt-2 border-t border-[#d4af37]/15">
                * Weekend live masterclasses and baithak sessions are conducted as per cohort announcements.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;