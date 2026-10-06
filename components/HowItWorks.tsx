'use client';

import React from 'react';
import { MapPin, Languages, Layers, Sparkles, Brain } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose Destination',
      description: 'Select your target country or region e.g. Japan, France, India, Spain, UAE.',
      icon: MapPin,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      num: '02',
      title: 'Choose Language',
      description: 'Pick global languages or regional dialects like Hindi, Gujarati, Tamil, Marathi.',
      icon: Languages,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    {
      num: '03',
      title: 'Choose Situation',
      description: 'Select your current scenario: Restaurant, Hotel, Airport, Emergency, Shopping, Transit.',
      icon: Layers,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    },
    {
      num: '04',
      title: 'Get AI Phrasebook',
      description: 'Gemini AI instantly builds authentic phrases with phonetics, audio, and etiquette tips.',
      icon: Sparkles,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      num: '05',
      title: 'Practice with Quiz',
      description: 'Lock in your memory using interactive flashcards and audio sound quizzes.',
      icon: Brain,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide border border-emerald-500/20">
            <span>Simple 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How Travel Phrasebook Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From arrival at the airport to dining in local cafes, get tailored phrases in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                      {step.num}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
