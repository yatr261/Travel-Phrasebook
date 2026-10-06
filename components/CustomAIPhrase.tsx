'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Volume2, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { CustomAIPhraseResult } from '../lib/types';
import { playTextToSpeech } from '../lib/utils/speech';

interface CustomAIPhraseProps {
  destination: string;
  language: string;
  ttsLangCode?: string;
}

export default function CustomAIPhrase({ destination, language, ttsLangCode = 'en-US' }: CustomAIPhraseProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CustomAIPhraseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/custom-phrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          destination,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate custom phrase');
      }

      setResult(data.result);
      setIsFallback(!!data.isFallback);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error communicating with Gemini AI.';
      console.error(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!result) return;
    setSpeaking(true);
    playTextToSpeech(result.originalPhrase, ttsLangCode);
    setTimeout(() => setSpeaking(false), 2000);
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `${result.originalPhrase} (${result.pronunciation}) - ${result.englishMeaning}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleQueries = [
    'I want to ask the hotel for late checkout.',
    'Could I have tap water instead of bottled?',
    'Is there a pharmacy open nearby right now?',
    'Please stop the meter, I will get down here.'
  ];

  return (
    <div className="w-full bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-indigo-500/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Ask AI for a Phrase
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Need a specific situation phrase in {language} for {destination}? Type your scenario below.
            </p>
          </div>
        </div>

        {/* Form Input */}
        <form onSubmit={handleAskAI} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`e.g. "I want to ask the hotel for late checkout."`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 backdrop-blur-md transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Asking Gemini...</span>
              </>
            ) : (
              <>
                <span>Ask AI</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Sample Prompts */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs text-slate-400 self-center font-medium">Try asking:</span>
          {sampleQueries.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(sample)}
              className="text-xs px-3 py-1 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50 transition-colors"
            >
              &ldquo;{sample}&rdquo;
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* AI Result Card */}
        {result && (
          <div className="mt-6 p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300 space-y-4">
            
            {isFallback && (
              <div className="text-[11px] px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">
                ℹ️ Demo Mode: Add GEMINI_API_KEY to .env.local for live custom AI phrases
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                  Target Phrase
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-wide">
                  {result.originalPhrase}
                </h4>
                <p className="text-sm font-mono text-emerald-300 mt-1">
                  🗣 {result.pronunciation}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayAudio}
                  className={`p-3 rounded-xl transition-all ${
                    speaking ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  title="Copy"
                >
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">English Meaning</span>
              <p className="text-base text-slate-100 font-medium mt-0.5">&ldquo;{result.englishMeaning}&rdquo;</p>
            </div>

            {/* Formal & Casual Variations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {result.formalVersion && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                  <span className="text-[11px] font-semibold text-purple-300 uppercase">Formal Version</span>
                  <p className="text-xs text-purple-100 mt-1 font-medium">{result.formalVersion}</p>
                </div>
              )}
              {result.casualVersion && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40">
                  <span className="text-[11px] font-semibold text-amber-300 uppercase">Casual Version</span>
                  <p className="text-xs text-amber-100 mt-1 font-medium">{result.casualVersion}</p>
                </div>
              )}
            </div>

            {/* Usage Tip */}
            {result.usageTip && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-400 block mb-0.5">Usage Tip:</span>
                  <span>{result.usageTip}</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
