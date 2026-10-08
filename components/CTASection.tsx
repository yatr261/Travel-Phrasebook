'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-tr from-[#07111F] via-[#0B1630] to-[#0D1B3A] text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Ready for your next journey?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Generate custom phrases in seconds with Gemini AI, master native pronunciations, and explore local culture with confidence.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/phrasebook"
            className="px-9 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] hover:opacity-95 shadow-2xl shadow-[#00C9A7]/30 transition-all duration-200 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            <span>Create My Phrasebook</span>
            <ArrowRight className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
