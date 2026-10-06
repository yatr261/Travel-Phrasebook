'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { DESTINATIONS } from '../../lib/data/destinations';
import { playTextToSpeech } from '../../lib/utils/speech';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Volume2,
  Copy,
  Check,
  Award,
  AlertOctagon,
  Building
} from 'lucide-react';

interface BusinessPhraseItem {
  originalPhrase: string;
  pronunciation: string;
  englishMeaning: string;
  formalVersion?: string;
  casualVersion?: string;
}

interface BusinessGuideData {
  phrases?: BusinessPhraseItem[];
  etiquetteTips?: string[];
  thingsToAvoid?: string[];
}

const BUSINESS_CATEGORIES = [
  'Meeting',
  'Greetings',
  'Self Introduction',
  'Business Cards',
  'Negotiation',
  'Scheduling',
  'Thank You',
  'Ending Meeting',
];

export default function BusinessPage() {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]); // Japan default
  const [selectedCategory, setSelectedCategory] = useState('Business Cards');

  const [guideData, setGuideData] = useState<BusinessGuideData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchBusinessGuide = useCallback(async () => {
    setLoading(true);
    setError(null);

    const languageName = selectedDest.languages[0] || 'Japanese';

    try {
      const response = await fetch('/api/generate-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: selectedDest.name,
          language: languageName,
          category: selectedCategory,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch business guide');

      setGuideData(data.data);
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Error generating business etiquette guide');
    } finally {
      setLoading(false);
    }
  }, [selectedDest.name, selectedDest.languages, selectedCategory]);

  // Auto-fetch business guide when selections change
  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        fetchBusinessGuide();
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchBusinessGuide]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-semibold border border-indigo-500/20">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>Corporate Cross-Cultural Companion</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Global Business Etiquette & Phrases
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Master formal greetings, business card exchange customs, negotiation etiquette, and formal vs casual phrasing.
            </p>
          </div>

          {/* Destination Selector Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-500" />
              <span>Select Destination Country</span>
            </h2>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDest(d)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    selectedDest.id === d.id
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-base">{d.flag}</span>
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Business Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {BUSINESS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Generating Business Etiquette Guide...
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Gemini is assembling formal business phrasing and etiquette rules for {selectedDest.name}.
              </p>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-semibold text-center">
              ⚠️ {error}
            </div>
          )}

          {/* Main Content View */}
          {!loading && guideData && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Business Phrases Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <span>Essential Business Phrases — {selectedCategory}</span>
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {selectedDest.flag} {selectedDest.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guideData.phrases?.map((p: BusinessPhraseItem, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                          Corporate Phrasing
                        </span>

                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white pt-1">
                          {p.originalPhrase}
                        </h3>

                        <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          🗣 {p.pronunciation}
                        </p>

                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          &ldquo;{p.englishMeaning}&rdquo;
                        </p>
                      </div>

                      {/* Formal vs Casual comparison */}
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                        {p.formalVersion && (
                          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <span className="font-bold text-purple-700 dark:text-purple-300 block text-[10px] uppercase">Formal</span>
                            <span className="text-slate-700 dark:text-slate-300">{p.formalVersion}</span>
                          </div>
                        )}
                        {p.casualVersion && (
                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <span className="font-bold text-amber-700 dark:text-amber-300 block text-[10px] uppercase">Casual</span>
                            <span className="text-slate-700 dark:text-slate-300">{p.casualVersion}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <button
                          onClick={() => playTextToSpeech(p.originalPhrase, 'en-US')}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </button>

                        <button
                          onClick={() => handleCopy(`${p.originalPhrase} (${p.pronunciation}) - ${p.englishMeaning}`, `p-${idx}`)}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1"
                        >
                          {copiedId === `p-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copy</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Business Etiquette Tips & Do's and Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Business Etiquette Tips */}
                <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Business Etiquette Do&apos;s for {selectedDest.name}</span>
                  </h3>

                  <ul className="space-y-3 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                    {guideData.etiquetteTips?.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Things to Avoid / Don'ts */}
                <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-3xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-rose-500" />
                    <span>Things to Avoid (Corporate Taboos)</span>
                  </h3>

                  <ul className="space-y-3 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
                    {guideData.thingsToAvoid?.map((avoid: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
