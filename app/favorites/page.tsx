'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PhraseCard from '../../components/PhraseCard';
import { GeminiPhrase } from '../../lib/types';
import { getFavorites, removeFavorite } from '../../lib/utils/favorites';
import { Heart, Search, Sparkles } from 'lucide-react';
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
    usageContext: 'Traditional respectful greeting with palms joined near the chest.',
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <span>My Saved Favorites</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Access your bookmarked phrases with offline audio pronunciation and phonetics.
              </p>
            </div>

            <Link
              href="/phrasebook"
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Phrasebook Builder</span>
            </Link>
          </div>

          {/* Search Filter for Favorites */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search saved phrases (e.g. hotel, taxi, help, thank you, Japanese...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-900 dark:text-white"
            />
          </div>

          {/* Cards Grid */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Saved Favorites Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Click the heart ❤️ icon on any phrase card in the phrasebook to bookmark phrases here for quick reference.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
