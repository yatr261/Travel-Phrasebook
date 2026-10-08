'use client';

import React, { useState, useEffect } from 'react';
import { GeminiPhrase } from '../lib/types';
import {
  Volume2,
  Square,
  Copy,
  Heart,
  Check,
  Sparkles
} from 'lucide-react';
import { playTextToSpeech, stopSpeech, isSpeechSupported } from '../lib/utils/speech';
import { isFavorite, toggleFavorite } from '../lib/utils/favorites';

interface PhraseCardProps {
  phrase: GeminiPhrase;
  ttsLangCode?: string;
  onRemoveFavorite?: () => void;
}

export default function PhraseCard({
  phrase,
  ttsLangCode = 'en-US',
  onRemoveFavorite,
}: PhraseCardProps) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(() => isFavorite(phrase.id) || isFavorite(phrase.originalPhrase));
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<'normal' | 'slow'>('normal');

  const phraseKey = phrase.id + phrase.originalPhrase;
  const [prevKey, setPrevKey] = useState(phraseKey);

  if (prevKey !== phraseKey) {
    setPrevKey(phraseKey);
    setFavorited(isFavorite(phrase.id) || isFavorite(phrase.originalPhrase));
  }

  useEffect(() => {
    const handleUpdate = () => {
      setFavorited(isFavorite(phrase.id) || isFavorite(phrase.originalPhrase));
    };
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, [phrase.id, phrase.originalPhrase]);

  // TTS Controls
  const handlePlayAudio = () => {
    if (!isSpeechSupported()) {
      return;
    }

    const rate = speechRate === 'slow' ? 0.6 : 0.9;
    setIsSpeaking(true);

    const played = playTextToSpeech(
      phrase.originalPhrase,
      phrase.ttsLangCode || ttsLangCode,
      rate,
      () => setIsSpeaking(false),
      () => {
        setIsSpeaking(false);
      }
    );

    if (!played) {
      setIsSpeaking(false);
    }
  };

  const handleStopAudio = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  // Copy Action
  const handleCopy = () => {
    const textToCopy = `${phrase.originalPhrase} (${phrase.pronunciation}) - "${phrase.englishMeaning}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Favorite Action
  const handleToggleFavorite = () => {
    const isNowAdded = toggleFavorite(phrase);
    setFavorited(isNowAdded);
    if (!isNowAdded && onRemoveFavorite) {
      onRemoveFavorite();
    }
  };

  const getFormalityBadge = (formality?: string) => {
    switch (formality?.toLowerCase()) {
      case 'formal':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'casual':
        return 'bg-[#F5B942]/15 text-[#F5B942] border-[#F5B942]/30';
      case 'polite':
      default:
        return 'bg-[#00C9A7]/15 text-[#00C9A7] border-[#00C9A7]/30';
    }
  };

  return (
    <div className="group relative bg-[#0D1B3A]/90 border border-slate-700/70 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:border-[#00C9A7]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Section */}
      <div className="space-y-4">
        
        {/* Category Header & Favorite Icon */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {phrase.category && (
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30">
                {phrase.category}
              </span>
            )}
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl border ${getFormalityBadge(phrase.formality)}`}>
              {phrase.formality || 'polite'}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={handleToggleFavorite}
            aria-label="Add to favorites"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              favorited
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 scale-110'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-400' : ''}`} />
          </button>
        </div>

        {/* English Prompt */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
            English Phrase
          </span>
          <h3 className="text-lg font-bold text-slate-100">
            &ldquo;{phrase.englishMeaning}&rdquo;
          </h3>
        </div>

        {/* VISUAL FOCUS: Translated Phrase (Native Script) */}
        <div className="p-4 rounded-2xl bg-[#07111F] border border-slate-800 space-y-2 relative overflow-hidden group-hover:border-[#00C9A7]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#38BDF8]">
              Target Script
            </span>
            {isSpeaking && (
              <div className="flex items-center gap-1 text-[#00C9A7] text-xs font-bold animate-pulse">
                <span className="w-1.5 h-3 bg-[#00C9A7] eq-bar-1 rounded-full" />
                <span className="w-1.5 h-4 bg-[#00C9A7] eq-bar-2 rounded-full" />
                <span className="w-1.5 h-2 bg-[#00C9A7] eq-bar-3 rounded-full" />
                <span className="ml-1 text-[10px]">Playing Audio...</span>
              </div>
            )}
          </div>

          <p
            dir="auto"
            className="text-2xl sm:text-3xl font-black text-[#00C9A7] tracking-wide leading-tight pt-1"
          >
            {phrase.originalPhrase}
          </p>

          {/* Pronunciation */}
          {phrase.pronunciation && (
            <p className="text-xs font-mono font-bold text-slate-300 pt-1 border-t border-slate-800/80">
              🗣 <span className="text-[#F5B942]">{phrase.pronunciation}</span>
            </p>
          )}
        </div>

        {/* Usage Context */}
        {phrase.usageContext && (
          <div className="p-3 rounded-2xl bg-[#0B1630] border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-[#38BDF8] font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>Etiquette & Usage Context</span>
            </div>
            <p className="leading-relaxed font-medium">{phrase.usageContext}</p>
          </div>
        )}

      </div>

      {/* Footer Controls: Speaker (🔊), Copy (📋), Favorite (♡) */}
      <div className="mt-5 pt-4 border-t border-slate-800/90 flex items-center justify-between gap-2">
        
        {/* Speaker & Speed Controls */}
        <div className="flex items-center space-x-1.5">
          {isSpeaking ? (
            <button
              onClick={handleStopAudio}
              aria-label="Stop audio"
              className="px-3 py-1.5 rounded-xl bg-rose-500 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 animate-pulse"
              title="Stop Audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handlePlayAudio}
              aria-label="Play pronunciation"
              className="px-4 py-2 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-slate-950 font-extrabold text-xs shadow-md shadow-[#00C9A7]/20 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Play Pronunciation Audio"
            >
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
              <span>Listen</span>
            </button>
          )}

          <button
            onClick={() => setSpeechRate(speechRate === 'normal' ? 'slow' : 'normal')}
            className={`px-2 py-1.5 rounded-xl text-[10px] font-bold font-mono transition-colors ${
              speechRate === 'slow' ? 'bg-[#F5B942] text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle speech speed"
          >
            {speechRate === 'slow' ? '🐢 0.6x' : '1.0x'}
          </button>
        </div>

        {/* Copy Feedback */}
        <button
          onClick={handleCopy}
          aria-label="Copy phrase"
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
            copied
              ? 'bg-[#00C9A7]/20 text-[#00C9A7] border-[#00C9A7]/40'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          title="Copy phrase and pronunciation"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00C9A7]" />
              <span className="text-[#00C9A7]">✓ Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
}
