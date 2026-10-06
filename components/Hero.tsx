'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Volume2, Shield, Globe, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-500/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>AI-Powered Travel Language Assistant</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Speak Confidently <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600">
                Wherever You Go.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Your AI-powered travel companion for learning useful local phrases, pronunciation, cultural etiquette and emergency communication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/phrasebook"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Build My Phrasebook</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200 text-center shadow-sm"
              >
                Explore Features
              </a>
            </div>

            {/* Feature / Trust Badges */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>50+ Global Languages</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Volume2 className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Native TTS Voices</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Shield className="w-4 h-4 text-rose-500 shrink-0" />
                <span>24/7 Emergency SOS</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>9 Indian Regional Dialects</span>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Visual Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Outer Shell */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative">
                
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Live AI Phrase Generator
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-medium">
                    Tokyo, Japan 🇯🇵
                  </span>
                </div>

                {/* Phrase Preview Block */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-3 border border-indigo-500/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                      Polite Restaurant Phrase
                    </span>
                    <span className="text-xs text-slate-400">Japanese</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-wide">
                    お会計をお願いします
                  </h3>
                  
                  <p className="text-xs font-mono text-emerald-400">
                    🗣 O-kaikei o onegaishimasu
                  </p>

                  <p className="text-sm font-medium text-slate-200 pt-1">
                    &ldquo;Could I please have the bill?&rdquo;
                  </p>
                </div>

                {/* Simulated AI Prompt Result */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">Cultural Etiquette Tip:</span>
                    <span>In Japan, tipping is not customary. Saying this phrase politely to staff when finishing your meal is standard etiquette.</span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    🇮🇳
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Visiting India?</p>
                    <p className="text-[11px] text-slate-500">Supports Hindi, Tamil, Gujarati & more</p>
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
