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
      color: 'bg-[#00C9A7]/15 text-[#00C9A7] border-[#00C9A7]/30'
    },
    {
      num: '02',
      title: 'Choose Language',
      description: 'Pick global languages or regional dialects like Hindi, Gujarati, Tamil, Marathi.',
      icon: Languages,
      color: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30'
    },
    {
      num: '03',
      title: 'Choose Situation',
      description: 'Select your scenario: Restaurant, Hotel, Airport, Emergency, Shopping, Transit.',
      icon: Layers,
      color: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
    },
    {
      num: '04',
      title: 'Get AI Phrasebook',
      description: 'Gemini AI builds authentic phrases with phonetics, audio, and etiquette tips.',
      icon: Sparkles,
      color: 'bg-[#F5B942]/15 text-[#F5B942] border-[#F5B942]/30'
    },
    {
      num: '05',
      title: 'Practice with Quiz',
      description: 'Lock in your memory using interactive flashcards and audio sound quizzes.',
      icon: Brain,
      color: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B1630] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            How Travel Phrasebook Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
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
                className="relative bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:border-[#00C9A7]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 font-mono">
                      {step.num}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${step.color}`}>
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
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
