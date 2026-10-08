'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CustomAIPhrase from '../../components/CustomAIPhrase';
import { DESTINATIONS } from '../../lib/data/destinations';
import { playTextToSpeech } from '../../lib/utils/speech';
import {
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
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
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
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Global Business Etiquette & Phrases
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Master formal greetings, business card exchange customs, negotiation etiquette, and corporate phrasing.
            </p>
          </div>

          {/* Destination Selector Bar */}
          <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#38BDF8]" />
              <span>Select Destination Country</span>
            </h2>

            <div className="flex items-center space-x-2.5 overflow-x-auto pb-2">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDest(d)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    selectedDest.id === d.id
                      ? 'bg-[#00C9A7] text-slate-950 shadow-md scale-105'
                      : 'bg-[#07111F] text-slate-300 border border-slate-800 hover:bg-slate-800'
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
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00C9A7] text-slate-950 shadow-md scale-105'
                    : 'bg-[#0D1B3A] text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ask AI Business Assistant */}
          <CustomAIPhrase
            destination={selectedDest.name}
            language={selectedDest.languages[0] || 'English'}
            languageCode="en"
            situation={`Business - ${selectedCategory}`}
          />

          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center space-y-4 bg-[#0D1B3A] rounded-3xl border border-slate-800 p-8 shadow-xl">
              <div className="w-12 h-12 border-4 border-[#00C9A7]/30 border-t-[#00C9A7] rounded-full animate-spin mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Generating Business Etiquette Guide...
              </h3>
              <p className="text-xs text-slate-400">
                Assembling corporate phrasing and etiquette rules for {selectedDest.name}.
              </p>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
              ⚠️ {error}
            </div>
          )}

          {/* Main Content View */}
          {!loading && guideData && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Business Phrases Section */}
              <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#F5B942]" />
                    <span>Essential Business Phrases — {selectedCategory}</span>
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#07111F] text-[#38BDF8] border border-slate-800">
                    {selectedDest.flag} {selectedDest.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guideData.phrases?.map((p: BusinessPhraseItem, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-[#07111F] border border-slate-800 space-y-4 flex flex-col justify-between hover:border-[#00C9A7]/40 transition-colors"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#00C9A7]/15 text-[#00C9A7] px-2.5 py-0.5 rounded-lg border border-[#00C9A7]/30">
                          Corporate Phrasing
                        </span>

                        <h3 className="text-2xl font-black text-white pt-1">
                          {p.originalPhrase}
                        </h3>

                        <p className="text-xs font-mono font-bold text-[#F5B942]">
                          🗣 {p.pronunciation}
                        </p>

                        <p className="text-sm font-semibold text-slate-200">
                          &ldquo;{p.englishMeaning}&rdquo;
                        </p>
                      </div>

                      {/* Formal vs Casual comparison */}
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                        {p.formalVersion && (
                          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <span className="font-extrabold text-purple-300 block text-[10px] uppercase">Formal</span>
                            <span className="text-slate-300">{p.formalVersion}</span>
                          </div>
                        )}
                        {p.casualVersion && (
                          <div className="p-3 rounded-xl bg-[#F5B942]/10 border border-[#F5B942]/20">
                            <span className="font-extrabold text-[#F5B942] block text-[10px] uppercase">Casual</span>
                            <span className="text-slate-300">{p.casualVersion}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => playTextToSpeech(p.originalPhrase, 'en-US')}
                          className="px-3.5 py-2 rounded-xl bg-[#00C9A7] text-slate-950 font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Listen</span>
                        </button>

                        <button
                          onClick={() => handleCopy(`${p.originalPhrase} (${p.pronunciation}) - ${p.englishMeaning}`, `p-${idx}`)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-700"
                        >
                          {copiedId === `p-${idx}` ? <Check className="w-3.5 h-3.5 text-[#00C9A7]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === `p-${idx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Business Etiquette Do's and Taboos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Business Etiquette Do's */}
                <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-black text-[#00C9A7] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00C9A7]" />
                    <span>Business Etiquette Do&apos;s for {selectedDest.name}</span>
                  </h3>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200 font-medium">
                    {guideData.etiquetteTips?.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00C9A7] text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corporate Taboos / Don'ts */}
                <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-black text-rose-400 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-rose-400" />
                    <span>Corporate Taboos to Avoid</span>
                  </h3>

                  <ul className="space-y-3 text-xs sm:text-sm text-rose-200 font-medium">
                    {guideData.thingsToAvoid?.map((avoid: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{avoid}</span>
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
