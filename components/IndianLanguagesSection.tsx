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
    <section className="py-16 sm:py-24 bg-[#07111F] text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Explore 9 Major Indian Regional Languages
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
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
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#00C9A7] text-slate-950 shadow-md scale-105'
                    : 'bg-[#0D1B3A] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{lang.name}</span>
                <span className="text-xs opacity-75 font-normal font-sans">({lang.nativeName})</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Card for Active Language */}
        <div className="max-w-4xl mx-auto bg-[#0D1B3A] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">🇮🇳</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeLang.name} ({activeLang.nativeName})
                  </h3>
                  <p className="text-xs text-[#00C9A7] font-bold">
                    Native Speech TTS Audio Supported
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00C9A7] shrink-0" />
                  <span><strong>Spoken in:</strong> {activeLang.statesSpoken.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span><strong>Speakers:</strong> {activeLang.speakers}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#07111F] border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F5B942] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Visiting landmarks in this region? Select <strong>{activeLang.name}</strong> in the Phrasebook builder to get tailored local transit, food, and cultural etiquette phrases.
                </span>
              </div>
            </div>

            {/* Right Interactive Sample Card */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#07111F] border border-[#00C9A7]/40 text-white shadow-xl space-y-4">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-[#00C9A7]/20 text-[#00C9A7] px-3 py-1 rounded-lg border border-[#00C9A7]/30">
                  Sample Phrase
                </span>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
                    {activeLang.samplePhrase.native}
                  </h4>
                  <p className="text-xs font-mono font-bold text-[#F5B942] mt-1">
                    🗣 {activeLang.samplePhrase.phonetic}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-200">
                    &ldquo;{activeLang.samplePhrase.english}&rdquo;
                  </span>
                  <button
                    onClick={() => handlePlay(activeLang.samplePhrase.native, activeLang.ttsLangCode, activeLang.id)}
                    className={`p-3 rounded-xl transition-all cursor-pointer ${
                      playingId === activeLang.id
                        ? 'bg-[#00C9A7] text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-[#00C9A7] hover:bg-slate-700'
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
