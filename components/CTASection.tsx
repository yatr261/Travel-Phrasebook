'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-tr from-slate-900 via-indigo-950 to-emerald-950 text-white relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <Compass className="w-4 h-4 animate-spin-slow text-emerald-400" />
          <span>Your AI Travel Companion</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Ready for your next journey?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Generate custom phrases in seconds with Gemini AI, master native pronunciations, and explore local culture with confidence.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/phrasebook"
            className="px-9 py-4 rounded-2xl text-base font-extrabold text-slate-900 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-900" />
            <span>Create My Phrasebook</span>
            <ArrowRight className="w-5 h-5 text-slate-900" />
          </Link>
        </div>

      </div>
    </section>
  );
}
