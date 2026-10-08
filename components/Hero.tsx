'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Volume2, Shield, Globe, Award, MessageSquare, Plane } from 'lucide-react';

export default function Hero() {
  const floatingLanguageChips = [
    { name: '🇯🇵 Japanese', native: 'こんにちは', tag: 'Tokyo' },
    { name: '🇫🇷 French', native: 'Bonjour', tag: 'Paris' },
    { name: '🇩🇪 German', native: 'Guten Tag', tag: 'Berlin' },
    { name: '🇮🇳 Gujarati', native: 'કેમ છો', tag: 'Gujarat' },
    { name: '🇮🇳 Hindi', native: 'नमस्ते', tag: 'Delhi' },
    { name: '🇪🇸 Spanish', native: 'Hola', tag: 'Madrid' },
  ];

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-[#07111F] via-[#0B1630] to-[#07111F]">
      
      {/* Background Abstract Grid & Radial Glowing Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#00C9A7]/20 via-[#38BDF8]/15 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Floating Animated Airplane & Travel Particles */}
      <div className="absolute top-12 right-12 text-[#38BDF8]/20 animate-float pointer-events-none hidden lg:block">
        <Plane className="w-16 h-16 transform -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Speak Confidently. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-emerald-300">
                Travel Freely.
              </span>
            </h1>

            {/* Subtitle & Explanation */}
            <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xl sm:text-2xl font-bold text-slate-200">
                Your AI-powered multilingual travel companion.
              </p>
              <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                Break language barriers effortlessly across 50+ countries. Instantly generate native phrases, phonetic guides, etiquette tips, and offline emergency cards.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="/phrasebook"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] hover:opacity-95 shadow-xl shadow-[#00C9A7]/25 hover:shadow-2xl hover:shadow-[#00C9A7]/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/phrasebook#ask-ai"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-[#0B1630] hover:bg-slate-800 border border-slate-700/80 hover:border-[#38BDF8]/50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-5 h-5 text-[#38BDF8]" />
                <span>Ask AI</span>
              </Link>
            </div>

            {/* Feature Trust Metrics */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Globe className="w-4 h-4 text-[#00C9A7] shrink-0" />
                <span>50+ Global Languages</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Volume2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Native Audio TTS</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                <span>24/7 Emergency SOS</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <Award className="w-4 h-4 text-[#F5B942] shrink-0" />
                <span>9 Indian Regional Dialects</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border Box */}
              <div className="relative bg-[#0D1B3A]/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00C9A7] animate-pulse" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#00C9A7] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#00C9A7]" /> Live AI Phrasebook
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    🇯🇵 Tokyo, Japan
                  </span>
                </div>

                {/* Phrase Preview Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#07111F] to-[#0B1630] border border-[#00C9A7]/30 text-white space-y-3 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#00C9A7]/20 text-[#00C9A7] px-2.5 py-0.5 rounded border border-[#00C9A7]/30">
                      🍽 Restaurant Situation
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Japanese</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
                    お会計をお願いします
                  </h3>
                  
                  <p className="text-xs font-mono font-bold text-[#00C9A7]">
                    🗣 O-kaikei o onegaishimasu
                  </p>

                  <p className="text-sm font-semibold text-slate-200 pt-1">
                    &ldquo;Could I please have the check / bill?&rdquo;
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[#00C9A7]/10 text-[#00C9A7] font-bold text-[10px]">
                      ✓ Polite Formal
                    </span>
                    <span className="px-2 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] font-bold text-[10px]">
                      🔊 Audio Ready
                    </span>
                  </div>
                </div>

                {/* Simulated Etiquette Tip */}
                <div className="p-3.5 rounded-2xl bg-[#F5B942]/10 border border-[#F5B942]/30 text-xs text-slate-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#F5B942] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F5B942] block mb-0.5">Local Etiquette Tip:</span>
                    <span className="text-slate-300">Tipping is not customary in Japan. Hand payments directly to staff or place money on the tray.</span>
                  </div>
                </div>

                {/* Floating Language Chips Ribbon */}
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Supported Travel Languages:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {floatingLanguageChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5"
                      >
                        <span>{chip.name}</span>
                        <span className="text-[10px] text-[#00C9A7] font-mono">({chip.native})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating Bottom Left Badge */}
                <div className="absolute -bottom-5 -left-5 bg-[#0B1630] border border-slate-700 rounded-2xl p-3 shadow-2xl flex items-center gap-3 hidden sm:flex">
                  <div className="w-9 h-9 rounded-xl bg-[#F5B942]/15 text-[#F5B942] flex items-center justify-center font-bold text-lg">
                    🇮🇳
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Indian Regional Dialects</p>
                    <p className="text-[10px] text-slate-400">Hindi, Gujarati, Marathi & more</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
