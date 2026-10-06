'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DestinationSelector from '../../components/DestinationSelector';
import LanguageSelector from '../../components/LanguageSelector';
import SituationCard from '../../components/SituationCard';
import PhraseCard from '../../components/PhraseCard';
import CustomAIPhrase from '../../components/CustomAIPhrase';
import { DESTINATIONS } from '../../lib/data/destinations';
import { LANGUAGES } from '../../lib/data/languages';
import { SITUATIONS } from '../../lib/data/situations';
import { Destination, Language, Situation, GeminiPhrase } from '../../lib/types';
import { Sparkles, RefreshCw, AlertCircle, Search, Filter, UserCheck } from 'lucide-react';

export default function PhrasebookPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination>(DESTINATIONS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [selectedSituation, setSelectedSituation] = useState<Situation>(SITUATIONS[0]);

  // AI Personalization & Difficulty
  const [travellerType, setTravellerType] = useState('Solo Traveller');
  const [difficulty, setDifficulty] = useState('Beginner');

  const [phrases, setPhrases] = useState<GeminiPhrase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  // Real-time Phrase Search State
  const [phraseSearchQuery, setPhraseSearchQuery] = useState('');

  const fetchPhrases = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: selectedDestination.name,
          language: selectedLanguage.name,
          situation: selectedSituation.name,
          travellerType,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch phrases');
      }

      // Attach languageName and situationName metadata to each phrase for favorites storage
      const phrasesWithMeta = (data.phrases || []).map((p: GeminiPhrase) => ({
        ...p,
        languageName: selectedLanguage.name,
        situationName: selectedSituation.name,
        ttsLangCode: selectedLanguage.ttsLangCode,
      }));

      setPhrases(phrasesWithMeta);
      setIsFallback(!!data.isFallback);
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Error generating phrasebook with Gemini.');
    } finally {
      setLoading(false);
    }
  }, [
    selectedDestination.name,
    selectedLanguage.name,
    selectedLanguage.ttsLangCode,
    selectedSituation.name,
    travellerType,
    difficulty,
  ]);

  // Auto-generate phrases when selections change
  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        fetchPhrases();
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchPhrases]);

  // Filter phrases based on user search query
  const filteredPhrases = phrases.filter((phrase) => {
    if (!phraseSearchQuery.trim()) return true;
    const q = phraseSearchQuery.toLowerCase().trim();
    return (
      phrase.englishMeaning.toLowerCase().includes(q) ||
      phrase.originalPhrase.toLowerCase().includes(q) ||
      phrase.pronunciation.toLowerCase().includes(q) ||
      phrase.usageContext.toLowerCase().includes(q)
    );
  });

  const popularSearchTags = ['hotel', 'restaurant', 'help', 'taxi', 'thank you'];

  const travellerOptions = [
    { label: '🧳 Solo Traveller', val: 'Solo Traveller' },
    { label: '👨‍👩‍👧‍👦 Family Traveller', val: 'Family Traveller' },
    { label: '💼 Business Traveller', val: 'Business Traveller' },
    { label: '🎓 Student Traveller', val: 'Student Traveller' },
  ];

  const difficultyOptions = [
    { label: '🟢 Beginner', val: 'Beginner' },
    { label: '🟡 Intermediate', val: 'Intermediate' },
    { label: '🔴 Advanced', val: 'Advanced' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin-slow" />
              <span>Interactive AI Phrasebook Generator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Create Your Travel Phrasebook
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Select your destination, language, and situation to generate real-time phrases with native audio, phonetic guides, and etiquette tips.
            </p>
          </div>

          {/* AI Personalization & Difficulty Options Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>AI Personalization & Difficulty Level</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traveller Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Traveller Persona:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {travellerOptions.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setTravellerType(opt.val)}
                      className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                        travellerType === opt.val
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Language Difficulty:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {difficultyOptions.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setDifficulty(opt.val)}
                      className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                        difficulty === opt.val
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Destination Selection */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                <span>Select Destination</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                Selected: {selectedDestination.flag} {selectedDestination.name}
              </span>
            </div>
            <DestinationSelector
              selectedDestination={selectedDestination}
              onSelect={(dest) => setSelectedDestination(dest)}
            />
          </div>

          {/* Step 2: Language Selection */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                <span>Select Language</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                Selected: {selectedLanguage.flag} {selectedLanguage.name} ({selectedLanguage.nativeName})
              </span>
            </div>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelect={(lang) => setSelectedLanguage(lang)}
            />
          </div>

          {/* Step 3: Situation Selection */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                <span>Select Situation Scenario</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                Selected: {selectedSituation.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SITUATIONS.map((sit) => (
                <SituationCard
                  key={sit.id}
                  situation={sit}
                  isSelected={selectedSituation.id === sit.id}
                  onSelect={() => setSelectedSituation(sit)}
                />
              ))}
            </div>
          </div>

          {/* Generated Phrasebook Section Header */}
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedLanguage.flag}</span>
                  <span>{selectedLanguage.name} Phrasebook</span>
                  <span className="text-base font-normal text-slate-500">for {selectedSituation.name}</span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Tailored for {travellerType} • {difficulty} Level • Visiting {selectedDestination.name}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Link
                  href={`/quiz?language=${encodeURIComponent(selectedLanguage.name)}&situation=${encodeURIComponent(selectedSituation.name)}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Quiz for this Phrasebook</span>
                </Link>

                <button
                  onClick={fetchPhrases}
                  disabled={loading}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-semibold text-sm transition-colors flex items-center gap-1.5 border border-emerald-500/20"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Real-time Phrase Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter generated phrases (e.g. hotel, restaurant, help, taxi, thank you...)"
                  value={phraseSearchQuery}
                  onChange={(e) => setPhraseSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Quick search:
                </span>
                {popularSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setPhraseSearchQuery(tag)}
                    className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                      phraseSearchQuery.toLowerCase() === tag
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {phraseSearchQuery && (
                  <button
                    onClick={() => setPhraseSearchQuery('')}
                    className="text-rose-500 hover:underline font-semibold ml-2"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Notice if Demo Fallback */}
            {isFallback && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  <strong>Demo Mode Active:</strong> Add <code>GEMINI_API_KEY</code> in <code>.env.local</code> to generate real-time live Gemini AI phrasebooks.
                </span>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  AI is creating your personalized phrasebook...
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Gemini is assembling native script, phonetics, and etiquette tips for {selectedLanguage.name} in {selectedDestination.name} ({travellerType}, {difficulty}).
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="py-12 text-center space-y-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300">
                  Failed to Load Phrases
                </h3>
                <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
                <button
                  onClick={fetchPhrases}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Phrase Cards Grid */}
            {!loading && !error && filteredPhrases.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    ttsLangCode={selectedLanguage.ttsLangCode}
                  />
                ))}
              </div>
            )}

            {/* No matching search results state */}
            {!loading && !error && phrases.length > 0 && filteredPhrases.length === 0 && (
              <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  No phrases matching &ldquo;{phraseSearchQuery}&rdquo;
                </h4>
                <p className="text-xs text-slate-500">
                  Try searching for another keyword or clear your search filter.
                </p>
                <button
                  onClick={() => setPhraseSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* Ask AI Custom Phrase Component */}
          <div className="pt-8">
            <CustomAIPhrase
              destination={selectedDestination.name}
              language={selectedLanguage.name}
              ttsLangCode={selectedLanguage.ttsLangCode}
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
