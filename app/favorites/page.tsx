'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PhraseCard from '../../components/PhraseCard';
import { GeminiPhrase } from '../../lib/types';
import { getFavorites, removeFavorite } from '../../lib/utils/favorites';
import { Heart, Search, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

const defaultInitialFavorites: GeminiPhrase[] = [
  {
    id: 'fav-seed-1',
    originalPhrase: 'こんにちは',
    englishMeaning: 'Hello / Good day',
    pronunciation: 'Konnichiwa',
    formality: 'polite',
    usageContext: 'Standard respectful greeting upon entering shops or meeting people in Japan.',
    languageName: 'Japanese',
    situationName: 'Greetings',
    ttsLangCode: 'ja-JP'
  },
  {
    id: 'fav-seed-2',
    originalPhrase: 'नमस्ते!',
    englishMeaning: 'Greetings & Respectful Welcome',
    pronunciation: 'Namaste!',
    formality: 'polite',
    usageContext: 'Traditional respectful greeting with palms joined near the chest in India.',
    languageName: 'Hindi',
    situationName: 'Greetings',
    ttsLangCode: 'hi-IN'
  },
  {
    id: 'fav-seed-3',
    originalPhrase: 'L\'addition, s\'il vous plaît',
    englishMeaning: 'The bill, please',
    pronunciation: 'Lah-dee-syon, seel voo pleh',
    formality: 'polite',
    usageContext: 'Say this to request the check at dining places in France.',
    languageName: 'French',
    situationName: 'Restaurant',
    ttsLangCode: 'fr-FR'
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<GeminiPhrase[]>(() => {
    const stored = getFavorites();
    return stored.length === 0 ? defaultInitialFavorites : stored;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const stored = getFavorites();
      setFavorites(stored.length === 0 ? defaultInitialFavorites : stored);
    };
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const filteredFavorites = favorites.filter((phrase) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      phrase.englishMeaning.toLowerCase().includes(q) ||
      phrase.originalPhrase.toLowerCase().includes(q) ||
      phrase.pronunciation.toLowerCase().includes(q) ||
      (phrase.languageName && phrase.languageName.toLowerCase().includes(q)) ||
      (phrase.situationName && phrase.situationName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                <span>My Saved Favorites</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Access your saved phrase cards with native audio, phonetics, and usage tips.
              </p>
            </div>

            <Link
              href="/phrasebook"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Explore Phrasebook</span>
            </Link>
          </div>

          {/* Search Filter */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search saved phrases (e.g. hotel, taxi, help, Japanese...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0D1B3A] border border-slate-800 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-white placeholder:text-slate-500 font-medium"
            />
          </div>

          {/* Cards Grid or Empty State */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {filteredFavorites.map((phrase) => (
                <PhraseCard
                  key={phrase.id}
                  phrase={phrase}
                  ttsLangCode={phrase.ttsLangCode || 'en-US'}
                  onRemoveFavorite={() => handleRemove(phrase.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#0D1B3A] rounded-3xl border border-slate-800 p-8 space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Save phrases you want to remember</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Click the heart ❤️ icon on any phrase card in the Phrasebook to bookmark phrases here for quick offline access during your trips.
              </p>
              <Link
                href="/phrasebook"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00C9A7] text-slate-950 font-bold text-xs shadow-md mt-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Go to Phrasebook</span>
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
