'use client';

import React, { useState } from 'react';
import { PhoneCall, Volume2, Copy, Check } from 'lucide-react';
import { playTextToSpeech, stopSpeech } from '../lib/utils/speech';

export default function EmergencyBanner() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const emergencyCards = [
    {
      id: 'sos-1',
      native: '助けてください！',
      english: 'Please help me!',
      phonetic: 'Tasukete kudasai!',
      langCode: 'ja-JP',
      badge: 'Urgent SOS'
    },
    {
      id: 'sos-2',
      native: 'मदद करो! पुलिस को बुलाओ!',
      english: 'Help! Please call the police!',
      phonetic: 'Madad karo! Police ko bulaao!',
      langCode: 'hi-IN',
      badge: 'Police Alert'
    },
    {
      id: 'sos-3',
      native: 'Appelez une ambulance !',
      english: 'Call an ambulance immediately!',
      phonetic: 'Ah-play une om-bu-lans!',
      langCode: 'fr-FR',
      badge: 'Medical Help'
    }
  ];

  const handlePlay = (text: string, langCode: string, id: string) => {
    if (playingId === id) {
      stopSpeech();
      setPlayingId(null);
      return;
    }
    stopSpeech();
    setPlayingId(id);
    playTextToSpeech(text, langCode, 0.85, () => setPlayingId(null), () => setPlayingId(null));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-rose-950/40 via-[#07111F] to-[#0D1B3A] text-white relative overflow-hidden border-y border-rose-500/30">
      
      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text Information Column */}
          <div className="lg:col-span-6 space-y-6">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Instant Medical & Police Communication Anywhere
            </h2>

            <p className="text-base sm:text-lg text-rose-100/80 leading-relaxed font-medium">
              When unexpected travel emergencies arise, language barriers should never delay critical help. Access one-tap SOS phrase cards with high-contrast displays and native audio playback.
            </p>

            {/* Emergency Hotline Numbers Badge Preview */}
            <div className="p-4 rounded-2xl bg-[#0D1B3A] border border-rose-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-rose-400 animate-bounce" />
                <div>
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                    Global Tourist Emergency Numbers
                  </span>
                  <span className="text-sm font-semibold text-white">
                    India: 112 | Japan: 110/119 | EU: 112 | USA: 911
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Interactive Card Previews */}
          <div className="lg:col-span-6 space-y-3">
            {emergencyCards.map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-2xl bg-[#0D1B3A] border border-rose-500/30 hover:border-rose-400 backdrop-blur-md shadow-xl transition-all duration-200 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {card.badge}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1.5">
                    {card.native}
                  </h4>
                  <p className="text-xs font-mono text-rose-300 font-bold">
                    🗣 {card.phonetic}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    &ldquo;{card.english}&rdquo;
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handlePlay(card.native, card.langCode, card.id)}
                    className={`p-3 rounded-xl transition-all cursor-pointer ${
                      playingId === card.id ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
                    }`}
                    title="Play Emergency Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleCopy(`${card.native} (${card.phonetic}) - ${card.english}`, card.id)}
                    className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Copy Text"
                  >
                    {copiedId === card.id ? <Check className="w-5 h-5 text-[#00C9A7]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
