'use client';

import React from 'react';
import {
  Sparkles,
  Volume2,
  Mic,
  Brain,
  Award,
  AlertTriangle,
  Briefcase,
  Globe
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: '🤖 Gemini AI Phrasebook',
      description: 'Generates contextually perfect native phrases using Gemini AI tailored for your specific travel scenario.',
      gradient: 'from-[#00C9A7]/20 to-[#38BDF8]/20 border-[#00C9A7]/30 text-[#00C9A7]'
    },
    {
      icon: Volume2,
      title: '🔊 Native Phonetics',
      description: 'Clear Latin phonetic guides and pronunciation scripts so you sound like a native speaker everywhere.',
      gradient: 'from-[#38BDF8]/20 to-indigo-500/20 border-[#38BDF8]/30 text-[#38BDF8]'
    },
    {
      icon: Mic,
      title: '🗣 Text-to-Speech Audio',
      description: 'Instant crystal-clear native audio playback powered by browser Speech Synthesis in 50+ languages.',
      gradient: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300'
    },
    {
      icon: Brain,
      title: '🧠 Interactive Quiz Practice',
      description: 'Multiple-choice quizzes and score tracking to lock travel vocabulary into long-term memory.',
      gradient: 'from-[#F5B942]/20 to-yellow-500/20 border-[#F5B942]/30 text-[#F5B942]'
    },
    {
      icon: Award,
      title: '🇮🇳 9 Indian Regional Languages',
      description: 'Deep phrasebook support for Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi.',
      gradient: 'from-rose-500/20 to-[#F5B942]/20 border-rose-500/30 text-rose-300'
    },
    {
      icon: AlertTriangle,
      title: '🚨 24/7 Emergency SOS Cards',
      description: 'High-visibility SOS phrase cards for police, ambulance, medical emergencies, and lost belongings.',
      gradient: 'from-rose-600/20 to-red-500/20 border-rose-500/30 text-rose-400'
    },
    {
      icon: Briefcase,
      title: '💼 Corporate Business Etiquette',
      description: 'Professional greetings, business card exchange norms, meeting etiquette, and corporate respect.',
      gradient: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-300'
    },
    {
      icon: Globe,
      title: '🌍 Cultural Etiquette & Taboos',
      description: 'Avoid cultural taboos with built-in Dos & Don\'ts, tipping guides, temple rules, and body language norms.',
      gradient: 'from-teal-500/20 to-[#00C9A7]/20 border-teal-500/30 text-[#00C9A7]'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Everything You Need for Global Travel
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Designed for modern globetrotters who want authentic local communication without language barriers.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-[#0D1B3A] border border-slate-800 hover:border-[#00C9A7]/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${feature.gradient}`}>
                    <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#00C9A7] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {feature.description}
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
