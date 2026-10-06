'use client';

import React, { useState, useEffect } from 'react';
import { GeminiPhrase } from '../lib/types';
import {
  Volume2,
  Square,
  RotateCcw,
  Copy,
  Heart,
  Share2,
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // TTS Controls
  const handlePlayAudio = () => {
    if (!isSpeechSupported()) {
      showToast('⚠️ Web Speech is not supported in this browser.');
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
        showToast('⚠️ Audio playback failed');
      }
    );

    if (!played) {
      setIsSpeaking(false);
      showToast('⚠️ Could not initiate speech synthesis.');
    }
  };

  const handleStopAudio = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  const handleReplayAudio = () => {
    handleStopAudio();
    setTimeout(() => handlePlayAudio(), 100);
  };

  // Copy Action
  const handleCopy = () => {
    const textToCopy = `${phrase.originalPhrase} (${phrase.pronunciation}) - "${phrase.englishMeaning}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Phrase copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Favorite Action
  const handleToggleFavorite = () => {
    const isNowAdded = toggleFavorite(phrase);
    setFavorited(isNowAdded);
    if (isNowAdded) {
      showToast('Added to favorites! ❤️');
    } else {
      showToast('Removed from favorites');
      if (onRemoveFavorite) onRemoveFavorite();
    }
  };

  // Share Action
  const handleShare = async () => {
    const shareText = `Learn phrase: "${phrase.originalPhrase}" (${phrase.pronunciation}) - "${phrase.englishMeaning}" via Travel Phrasebook AI`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Travel Phrase',
          text: shareText,
          url: window.location.href,
        });
        showToast('Shared successfully!');
      } catch {
        navigator.clipboard.writeText(shareText);
        showToast('Share link copied!');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      showToast('Share link copied!');
    }
  };

  const getFormalityBadge = (formality: string) => {
    switch (formality?.toLowerCase()) {
      case 'formal':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20';
      case 'casual':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20';
      case 'polite':
      default:
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-lg animate-in fade-in zoom-in duration-200 flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Top Bar: Badges & Favorite Toggle */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border capitalize tracking-wider ${getFormalityBadge(phrase.formality)}`}>
              {phrase.formality || 'polite'}
            </span>
            {phrase.languageName && (
              <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {phrase.languageName}
              </span>
            )}
          </div>

          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-xl transition-all ${
              favorited
                ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 scale-110'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Toggle Favorite"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Highly Visible Pronunciation Block */}
        <div className="space-y-3">
          {/* Native Script */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Native Script
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wide leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {phrase.originalPhrase}
            </h3>
          </div>

          {/* Pronunciation Badge */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              🗣 Pronunciation Guide:
            </span>
            <p className="text-sm font-mono font-bold text-emerald-900 dark:text-emerald-200 tracking-wide">
              {phrase.pronunciation}
            </p>
          </div>

          {/* English Meaning */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              English Meaning
            </span>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              &ldquo;{phrase.englishMeaning}&rdquo;
            </p>
          </div>
        </div>

        {/* Usage Context / Cultural Tip */}
        {phrase.usageContext && (
          <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Etiquette & Usage Tip</span>
            </div>
            <p className="leading-relaxed">{phrase.usageContext}</p>
          </div>
        )}
      </div>

      {/* Audio Controls & Actions Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/90 space-y-3">
        
        {/* Audio Controls Row */}
        <div className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
          
          {/* Speed Selector (Slow vs Normal) */}
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSpeechRate('slow')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                speechRate === 'slow'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Slow speed (0.6x)"
            >
              🐢 Slow
            </button>
            <button
              onClick={() => setSpeechRate('normal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                speechRate === 'normal'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Normal speed (0.9x)"
            >
              ▶ Normal
            </button>
          </div>

          {/* Audio Playback Buttons */}
          <div className="flex items-center space-x-1">
            {isSpeaking ? (
              <button
                onClick={handleStopAudio}
                className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-semibold text-xs transition-all flex items-center gap-1 animate-pulse"
                title="Stop Audio"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={handlePlayAudio}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5"
                title="Play Native Audio"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen</span>
              </button>
            )}

            <button
              onClick={handleReplayAudio}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Replay Audio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copy & Share Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition-colors"
            title="Copy original phrase"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Phrase</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition-colors"
            title="Share phrase"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

      </div>

    </div>
  );
}
