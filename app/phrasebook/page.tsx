'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

function PhrasebookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper matching functions for query parameters
  const matchDestination = (param: string | null): Destination => {
    if (!param) return DESTINATIONS[0];
    const p = param.toLowerCase().trim();
    return (
      DESTINATIONS.find((d) => d.id.toLowerCase() === p || d.name.toLowerCase() === p) ||
      DESTINATIONS[0]
    );
  };

  const matchLanguage = (param: string | null): Language => {
    if (!param) return LANGUAGES[0];
    const p = param.toLowerCase().trim();
    return (
      LANGUAGES.find((l) => l.code.toLowerCase() === p || l.id.toLowerCase() === p || l.name.toLowerCase() === p) ||
      LANGUAGES[0]
    );
  };

  const matchSituation = (param: string | null): Situation => {
    if (!param) return SITUATIONS[0];
    const p = param.toLowerCase().trim();
    return (
      SITUATIONS.find((s) => s.id.toLowerCase() === p || s.name.toLowerCase() === p) ||
      SITUATIONS[0]
    );
  };

  const [selectedDestination, setSelectedDestination] = useState<Destination>(() =>
    matchDestination(searchParams.get('destination'))
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() =>
    matchLanguage(searchParams.get('language'))
  );
  const [selectedSituation, setSelectedSituation] = useState<Situation>(() =>
    matchSituation(searchParams.get('situation'))
  );

  // Synchronize state when URL query parameters change
  const destParam = searchParams.get('destination');
  const langParam = searchParams.get('language');
  const sitParam = searchParams.get('situation');

  const currentSearchKey = `${destParam || ''}-${langParam || ''}-${sitParam || ''}`;
  const [prevSearchKey, setPrevSearchKey] = useState(currentSearchKey);

  if (prevSearchKey !== currentSearchKey) {
    setPrevSearchKey(currentSearchKey);
    if (destParam) {
      setSelectedDestination(matchDestination(destParam));
    }
    if (langParam) {
      setSelectedLanguage(matchLanguage(langParam));
    }
    if (sitParam) {
      setSelectedSituation(matchSituation(sitParam));
    }
  }

  // AI Personalization & Difficulty
  const [travellerType, setTravellerType] = useState('Solo Traveller');
  const [difficulty, setDifficulty] = useState('Beginner');

  const [phrases, setPhrases] = useState<GeminiPhrase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [topCulturalTip, setTopCulturalTip] = useState<string>('');

  // Real-time Search & Category Filter State
  const [phraseSearchQuery, setPhraseSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const fetchPhrases = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPhrases([]);
    setSelectedCategory('All');
    setTopCulturalTip('');

    try {
      const response = await fetch('/api/generate-phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: selectedDestination.name,
          language: selectedLanguage.name,
          languageCode: selectedLanguage.code,
          situation: selectedSituation.name,
          travellerType,
          difficulty,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || `Unable to generate your ${selectedSituation.name} phrases right now (Status ${response.status}).`
        );
      }

      if (data.culturalTip) {
        setTopCulturalTip(data.culturalTip);
      }

      const phrasesWithMeta = (data.phrases || []).map((p: GeminiPhrase) => ({
        ...p,
        languageName: selectedLanguage.name,
        situationName: selectedSituation.name,
        ttsLangCode: selectedLanguage.ttsLangCode,
      }));

      setPhrases(phrasesWithMeta);
      setIsFallback(!!data.isFallback);
    } catch (err: unknown) {
      console.error('fetchPhrases error:', err);
      const msg = err instanceof Error ? err.message : `Unable to generate your ${selectedSituation.name} phrases right now. Please try again.`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [
    selectedDestination.name,
    selectedLanguage.name,
    selectedLanguage.code,
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

  // URL Sync Handlers
  const handleDestinationSelect = (dest: Destination) => {
    setSelectedDestination(dest);
    const newUrl = `/phrasebook?destination=${dest.id}&language=${selectedLanguage.code}&situation=${selectedSituation.id}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    const newUrl = `/phrasebook?destination=${selectedDestination.id}&language=${lang.code}&situation=${selectedSituation.id}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleSituationSelect = (sit: Situation) => {
    setSelectedSituation(sit);
    const newUrl = `/phrasebook?destination=${selectedDestination.id}&language=${selectedLanguage.code}&situation=${sit.id}`;
    router.replace(newUrl, { scroll: false });
  };

  // Derive unique categories from returned phrases
  const categories = Array.from(
    new Set(phrases.map((p) => p.category).filter((c): c is string => Boolean(c)))
  );

  // Filter phrases based on selected category and search query
  const filteredPhrases = phrases.filter((phrase) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (phrase.category && phrase.category.toLowerCase() === selectedCategory.toLowerCase());

    if (!phraseSearchQuery.trim()) return matchesCategory;

    const q = phraseSearchQuery.toLowerCase().trim();
    const matchesSearch =
      phrase.englishMeaning.toLowerCase().includes(q) ||
      phrase.originalPhrase.toLowerCase().includes(q) ||
      phrase.pronunciation.toLowerCase().includes(q) ||
      (phrase.usageContext && phrase.usageContext.toLowerCase().includes(q)) ||
      (phrase.category && phrase.category.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const popularSearchTags = selectedSituation.id === 'restaurant'
    ? ['menu', 'bill', 'water', 'spicy', 'vegetarian', 'plate', 'receipt']
    : selectedSituation.id === 'medical'
    ? ['doctor', 'pharmacy', 'medicine', 'fever', 'headache', 'hospital']
    : ['hotel', 'restaurant', 'help', 'taxi', 'thank you', 'card'];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Create Your Travel Phrasebook
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-medium">
          Select your destination, language, and situation to generate instant native phrases with audio, phonetics, and etiquette.
        </p>
      </div>

      {/* Ask AI Section */}
      <CustomAIPhrase
        destination={selectedDestination.name}
        language={selectedLanguage.name}
        languageCode={selectedLanguage.code}
        situation={selectedSituation.name}
        ttsLangCode={selectedLanguage.ttsLangCode}
        isRTL={selectedLanguage.isRTL}
      />

      {/* AI Personalization & Difficulty Options Bar */}
      <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <UserCheck className="w-4.5 h-4.5 text-[#00C9A7]" />
            <span>AI Persona & Language Difficulty</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traveller Persona */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Traveller Persona:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {travellerOptions.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setTravellerType(opt.val)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    travellerType === opt.val
                      ? 'border-[#00C9A7] bg-[#00C9A7]/15 text-[#00C9A7] ring-1 ring-[#00C9A7]/40 shadow-sm'
                      : 'border-slate-800 bg-[#07111F] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Difficulty */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Language Difficulty Level:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {difficultyOptions.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setDifficulty(opt.val)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    difficulty === opt.val
                      ? 'border-[#00C9A7] bg-[#00C9A7]/15 text-[#00C9A7] ring-1 ring-[#00C9A7]/40 shadow-sm'
                      : 'border-slate-800 bg-[#07111F] text-slate-300 hover:border-slate-700'
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
      <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <DestinationSelector
          selectedDestination={selectedDestination}
          onSelect={handleDestinationSelect}
        />
      </div>

      {/* Step 2: Language Selection */}
      <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelect={handleLanguageSelect}
        />
      </div>

      {/* Step 3: Situation Selection */}
      <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] flex items-center justify-center text-xs font-black border border-[#00C9A7]/30">3</span>
            <span>SELECT SITUATION SCENARIO</span>
          </h2>
          <span className="text-xs font-bold text-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1 rounded-full border border-[#00C9A7]/30">
            Selected: {selectedSituation.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {SITUATIONS.map((sit) => {
            const isSelected = selectedSituation.id === sit.id;
            return (
              <SituationCard
                key={sit.id}
                situation={sit}
                isSelected={isSelected}
                onSelect={() => handleSituationSelect(sit)}
                onExplore={() => handleSituationSelect(sit)}
                destinationId={selectedDestination.id}
                languageCode={selectedLanguage.code}
              />
            );
          })}
        </div>
      </div>

      {/* Generated Phrasebook Section Header */}
      <div className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>{selectedLanguage.flag}</span>
              <span>{selectedLanguage.name} Phrasebook</span>
              <span className="text-base font-medium text-slate-400">
                for {selectedSituation.name}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tailored for {travellerType} • {difficulty} Level • Visiting {selectedDestination.name}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Link
              href={`/quiz?language=${encodeURIComponent(selectedLanguage.name)}&situation=${encodeURIComponent(selectedSituation.name)}`}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Start Quiz for {selectedSituation.name}</span>
            </Link>

            <button
              onClick={fetchPhrases}
              disabled={loading}
              className="px-3.5 py-2.5 rounded-2xl bg-[#00C9A7]/10 text-[#00C9A7] hover:bg-[#00C9A7]/20 font-bold text-xs transition-colors flex items-center gap-1.5 border border-[#00C9A7]/30 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Real-time Phrase Search Bar */}
        <div className="bg-[#0D1B3A] p-4 rounded-3xl border border-slate-800 shadow-lg space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search phrases (e.g. menu, bill, water, spicy, vegetarian, help...)"
              value={phraseSearchQuery}
              onChange={(e) => setPhraseSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#07111F] border border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 text-white placeholder:text-slate-500 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#38BDF8]" />
              Quick search:
            </span>
            {popularSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setPhraseSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                  phraseSearchQuery.toLowerCase() === tag
                    ? 'bg-[#00C9A7] text-slate-950 border-[#00C9A7]'
                    : 'bg-[#07111F] text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
            {phraseSearchQuery && (
              <button
                onClick={() => setPhraseSearchQuery('')}
                className="text-rose-400 hover:underline font-bold ml-2 cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        {!loading && categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#00C9A7] text-slate-950 border-[#00C9A7] shadow-md'
                  : 'bg-[#0D1B3A] text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              All ({phrases.length})
            </button>
            {categories.map((cat) => {
              const count = phrases.filter((p) => p.category === cat).length;
              const isCatSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                    isCatSelected
                      ? 'bg-[#00C9A7] text-slate-950 border-[#00C9A7] shadow-md'
                      : 'bg-[#0D1B3A] text-slate-300 border-slate-800 hover:border-[#00C9A7]/50'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Demo Fallback Notice */}
        {isFallback && (
          <div className="p-4 rounded-2xl bg-[#F5B942]/10 border border-[#F5B942]/30 text-[#F5B942] text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              <strong>Demo Mode Active:</strong> Verified phrasebook loaded. Add <code>GEMINI_API_KEY</code> in <code>.env.local</code> for real-time live Gemini AI phrasebooks.
            </span>
          </div>
        )}

        {/* Cultural Etiquette Tip Banner */}
        {!loading && topCulturalTip && (
          <div className="p-5 rounded-2xl bg-[#0D1B3A] border border-[#00C9A7]/30 text-slate-200 text-sm flex items-start gap-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-[#00C9A7] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#00C9A7] block">
                💡 {selectedDestination.name} • {selectedSituation.name} Cultural Etiquette Tip
              </span>
              <p className="leading-relaxed font-medium">{topCulturalTip}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton Placeholder State */}
        {loading && (
          <div className="py-16 text-center space-y-4 bg-[#0D1B3A] rounded-3xl border border-slate-800 p-8 shadow-xl">
            <div className="w-12 h-12 border-4 border-[#00C9A7]/30 border-t-[#00C9A7] rounded-full animate-spin mx-auto" />
            <h3 className="text-xl font-extrabold text-white">
              Generating your phrasebook...
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Assembling native {selectedLanguage.name} script, phonetics, and etiquette for {selectedDestination.name} ({travellerType}, {difficulty}).
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12 text-center space-y-4 bg-rose-500/10 border border-rose-500/30 rounded-3xl p-8">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-xl font-bold text-rose-300">
              Something went wrong
            </h3>
            <p className="text-xs text-rose-300 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchPhrases}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Matches Found Empty State */}
        {!loading && !error && phrases.length > 0 && filteredPhrases.length === 0 && (
          <div className="py-16 text-center bg-[#0D1B3A] rounded-3xl border border-slate-800 p-8 space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No matching phrases found</h3>
            <p className="text-xs text-slate-400">
              Try changing your search query or switching the category filter to &ldquo;All&rdquo;.
            </p>
            <button
              onClick={() => {
                setPhraseSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#00C9A7] text-slate-950 font-bold text-xs cursor-pointer mt-2"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Phrase Cards Grid */}
        {!loading && !error && filteredPhrases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredPhrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                ttsLangCode={selectedLanguage.ttsLangCode}
              />
            ))}
          </div>
        )}



      </div>

    </div>
  );
}

export default function PhrasebookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-[#00C9A7]/30 border-t-[#00C9A7] rounded-full animate-spin mx-auto" />
            </div>
          }
        >
          <PhrasebookContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
