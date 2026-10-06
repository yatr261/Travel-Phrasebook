'use client';

import React, { useState } from 'react';
import { INDIAN_LANGUAGES } from '../lib/data/indianLanguages';
import { Volume2, Sparkles, MapPin, Users } from 'lucide-react';
import { playTextToSpeech } from '../lib/utils/speech';

export default function IndianLanguagesSection() {
  const [activeLangId, setActiveLangId] = useState(INDIAN_LANGUAGES[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeLang = INDIAN_LANGUAGES.find((l) => l.id === activeLangId) || INDIAN_LANGUAGES[0];

  const handlePlay = (text: string, ttsLangCode: string, id: string) => {
    setPlayingId(id);
    playTextToSpeech(text, ttsLangCode);
    setTimeout(() => setPlayingId(null), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-500/5 via-slate-50 to-white dark:from-amber-950/10 dark:via-slate-900 dark:to-slate-950 border-y border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-wide border border-amber-500/20">
            <span>🇮🇳 Deep Support for Travelers to India</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore 9 Major Indian Regional Languages
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            India is home to vibrant linguistic diversity. Travel Phrasebook equips you with native scripts, phonetics, and pronunciation across key tourist regions.
          </p>
        </div>

        {/* 9 Language Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDIAN_LANGUAGES.map((lang) => {
            const isActive = lang.id === activeLangId;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLangId(lang.id)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{lang.name}</span>
                <span className="text-xs opacity-75 font-normal font-sans">({lang.nativeName})</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Card for Active Language */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">🇮🇳</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {activeLang.name} ({activeLang.nativeName})
                  </h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    Native TTS Voice Audio Supported
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Spoken in:</strong> {activeLang.statesSpoken.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span><strong>Speakers:</strong> {activeLang.speakers}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Visiting landmarks in this region? Select <strong>{activeLang.name}</strong> in the Phrasebook builder to get tailored local transit, food, and cultural etiquette phrases.
                </span>
              </div>
            </div>

            {/* Right Interactive Sample Card */}
            <div className="lg:col-span-6">
              <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${activeLang.gradient} text-white shadow-lg space-y-4`}>
                <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2.5 py-1 rounded-md">
                  Sample Traveler Phrase
                </span>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
                    {activeLang.samplePhrase.native}
                  </h4>
                  <p className="text-xs font-mono font-medium opacity-90 mt-1">
                    🗣 {activeLang.samplePhrase.phonetic}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    &ldquo;{activeLang.samplePhrase.english}&rdquo;
                  </span>
                  <button
                    onClick={() => handlePlay(activeLang.samplePhrase.native, activeLang.ttsLangCode, activeLang.id)}
                    className={`p-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all ${
                      playingId === activeLang.id ? 'scale-110 bg-white text-slate-900' : ''
                    }`}
                    title="Play Audio Pronunciation"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
