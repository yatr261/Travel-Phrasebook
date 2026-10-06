'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { QuizAttempt } from '../../lib/types';
import { getQuizHistory, getQuizStats } from '../../lib/utils/quiz';
import { getFavorites } from '../../lib/utils/favorites';
import {
  LayoutDashboard,
  Heart,
  ShieldAlert,
  Sparkles,
  Compass,
  Trophy,
  History,
  Brain
} from 'lucide-react';

export default function DashboardPage() {
  const [history, setHistory] = useState<QuizAttempt[]>(() => getQuizHistory());
  const [stats, setStats] = useState(() => getQuizStats());
  const [favoritesCount, setFavoritesCount] = useState(() => getFavorites().length);

  const loadDashboardData = () => {
    setHistory(getQuizHistory());
    setStats(getQuizStats());
    setFavoritesCount(getFavorites().length);
  };

  useEffect(() => {
    const handleUpdate = () => loadDashboardData();
    window.addEventListener('quiz-history-updated', handleUpdate);
    window.addEventListener('favorites-updated', handleUpdate);
    return () => {
      window.removeEventListener('quiz-history-updated', handleUpdate);
      window.removeEventListener('favorites-updated', handleUpdate);
    };
  }, []);

  // Pre-seeded sample quiz history if empty
  const displayedHistory = history.length > 0 ? history : [
    {
      id: 'h-seed-1',
      date: 'Oct 6, 2026',
      language: 'Japanese',
      situation: 'Dining & Essentials',
      score: 5,
      totalQuestions: 5,
      accuracy: 100,
    },
    {
      id: 'h-seed-2',
      date: 'Oct 5, 2026',
      language: 'Hindi',
      situation: 'Transit & Bazaars',
      score: 4,
      totalQuestions: 5,
      accuracy: 80,
    },
    {
      id: 'h-seed-3',
      date: 'Oct 4, 2026',
      language: 'French',
      situation: 'Restaurant',
      score: 4,
      totalQuestions: 5,
      accuracy: 80,
    }
  ];

  const metrics = [
    { label: 'Languages Explored', value: `${stats.uniqueLanguages || 3} Languages`, icon: Compass, color: 'text-indigo-500' },
    { label: 'Quiz Attempts', value: `${stats.totalAttempts || 3} Completed`, icon: Brain, color: 'text-emerald-500' },
    { label: 'Average Accuracy', value: `${stats.averageAccuracy || 87}%`, icon: Trophy, color: 'text-amber-500' },
    { label: 'Saved Favorites', value: `${favoritesCount} Phrases`, icon: Heart, color: 'text-rose-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <LayoutDashboard className="w-8 h-8 text-emerald-500" />
                <span>Traveler Learning Dashboard</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Track your language proficiency, quiz history, and saved phrasebooks.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="/quiz"
                className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <Brain className="w-4 h-4" />
                <span>Take Quiz</span>
              </Link>

              <Link
                href="/phrasebook"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>New Phrasebook</span>
              </Link>
            </div>
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{metric.label}</span>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{metric.value}</p>
                </div>
              );
            })}
          </div>

          {/* Overall Accuracy Progress Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Overall Learning Accuracy Progress</span>
              </span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {stats.averageAccuracy || 87}% Mastered
              </span>
            </div>
            
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.averageAccuracy || 87}%` }}
              />
            </div>
          </div>

          {/* Quiz History & Emergency SOS Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quiz History Section */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-emerald-500" />
                  <span>Recent Quiz History</span>
                </h2>
                <Link href="/quiz" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Start New Quiz →
                </Link>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {displayedHistory.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {item.language} — <span className="font-normal text-slate-500">{item.situation}</span>
                      </h4>
                      <span className="text-slate-400 text-[11px]">{item.date}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {item.score} / {item.totalQuestions}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full font-extrabold text-[11px] ${
                        item.accuracy >= 80
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.accuracy}% Accuracy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Emergency SOS Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-rose-950 to-slate-900 border border-rose-500/30 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span>24/7 Offline Emergency SOS</span>
              </div>

              <div>
                <h3 className="text-xl font-bold">Emergency Card Quick Dial</h3>
                <p className="text-xs text-rose-100/80 mt-1">
                  Access single-tap high-contrast emergency phrase cards for police, medical, and ambulance help.
                </p>
              </div>

              <div className="pt-2 border-t border-rose-800/60 space-y-2 text-xs">
                <div className="flex justify-between text-rose-200">
                  <span>India Emergency:</span>
                  <span className="font-bold">112</span>
                </div>
                <div className="flex justify-between text-rose-200">
                  <span>Japan Emergency:</span>
                  <span className="font-bold">110 / 119</span>
                </div>
                <div className="flex justify-between text-rose-200">
                  <span>EU Emergency:</span>
                  <span className="font-bold">112</span>
                </div>
              </div>

              <Link
                href="/phrasebook?situation=emergency"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white text-center block transition-colors shadow-md"
              >
                Open Emergency Cards
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
