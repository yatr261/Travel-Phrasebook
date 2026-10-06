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
      title: '🤖 AI Phrasebook',
      description: 'Generates contextually perfect native phrases using Gemini AI tailored for your specific travel scenario.',
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
    },
    {
      icon: Volume2,
      title: '🔊 Pronunciation',
      description: 'Clear Latin phonetic guides and pronunciation scripts so you sound like a native speaker everywhere.',
      gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Mic,
      title: '🗣 Text-to-Speech',
      description: 'Instant crystal-clear native audio playback powered by browser Speech Synthesis in 50+ languages.',
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400'
    },
    {
      icon: Brain,
      title: '🧠 Quiz Practice',
      description: 'Interactive flashcards and quick multiple-choice quizzes to lock travel vocabulary into memory.',
      gradient: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
    },
    {
      icon: Award,
      title: '🇮🇳 Indian Regional Languages',
      description: 'Comprehensive phrasebooks for 9 Indian regional languages: Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi.',
      gradient: 'from-rose-500/10 to-amber-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
    },
    {
      icon: AlertTriangle,
      title: '🚨 Emergency Phrases',
      description: 'High-visibility SOS phrase cards for police, ambulance, medical emergencies, and lost belongings.',
      gradient: 'from-red-500/10 to-rose-500/10 border-red-500/20 text-red-600 dark:text-red-400'
    },
    {
      icon: Briefcase,
      title: '💼 Business Etiquette',
      description: 'Professional greetings, business card exchange norms, meeting etiquette, and corporate respect.',
      gradient: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: Globe,
      title: '🌍 Cultural Tips',
      description: 'Avoid cultural taboos with built-in Dos & Don\'ts, tipping guides, temple rules, and body language norms.',
      gradient: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide border border-emerald-500/20">
            <span>Powered by Next.js & Gemini AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need for Global Travel
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
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
                className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${feature.gradient}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
