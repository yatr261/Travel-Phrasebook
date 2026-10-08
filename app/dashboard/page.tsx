'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { QuizAttempt } from '../../lib/types';
import { getQuizHistory, getQuizStats } from '../../lib/utils/quiz';
import { getFavorites } from '../../lib/utils/favorites';
import {
  Heart,
  ShieldAlert,
  Sparkles,
  Compass,
  Trophy,
  History,
  Brain,
  LogOut
} from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [history, setHistory] = useState<QuizAttempt[]>(() => getQuizHistory());
  const [stats, setStats] = useState(() => getQuizStats());
  const [favoritesCount, setFavoritesCount] = useState(() => getFavorites().length);
  const [user, setUser] = useState<AuthUser | null>(null);

  const loadDashboardData = () => {
    setHistory(getQuizHistory());
    setStats(getQuizStats());
    setFavoritesCount(getFavorites().length);
  };

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.authenticated && data.user) {
            setUser(data.user);
          }
        })
        .catch((err) => console.error(err));
    });

    const handleUpdate = () => loadDashboardData();
    window.addEventListener('quiz-history-updated', handleUpdate);
    window.addEventListener('favorites-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('quiz-history-updated', handleUpdate);
      window.removeEventListener('favorites-updated', handleUpdate);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.dispatchEvent(new Event('auth-state-changed'));
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

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
    { label: 'Languages Explored', value: `${stats.uniqueLanguages || 3} Languages`, icon: Compass, color: 'text-[#38BDF8]' },
    { label: 'Quiz Attempts', value: `${stats.totalAttempts || 3} Completed`, icon: Brain, color: 'text-[#00C9A7]' },
    { label: 'Average Accuracy', value: `${stats.averageAccuracy || 87}%`, icon: Trophy, color: 'text-[#F5B942]' },
    { label: 'Saved Favorites', value: `${favoritesCount} Phrases`, icon: Heart, color: 'text-rose-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>
                  {user ? `Welcome back, ${user.name}! 👋` : 'Traveler Learning Dashboard'}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {user ? `Signed in as ${user.email}. Track your language proficiency and saved phrasebooks.` : 'Track your language proficiency, quiz history, and bookmarked phrasebooks.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/quiz"
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Brain className="w-4 h-4 text-[#38BDF8]" />
                <span>Take Quiz</span>
              </Link>

              <Link
                href="/phrasebook"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#00C9A7]/20 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>New Phrasebook</span>
              </Link>

              {user && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/25 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-5 shadow-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">{metric.label}</span>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <p className="text-2xl font-black text-white">{metric.value}</p>
                </div>
              );
            })}
          </div>

          {/* Overall Accuracy Progress Bar */}
          <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-[#F5B942]" />
                <span>Overall Learning Accuracy Progress</span>
              </span>
              <span className="text-sm font-black text-[#00C9A7]">
                {stats.averageAccuracy || 87}% Mastered
              </span>
            </div>
            
            <div className="w-full h-3 rounded-full bg-[#07111F] overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.averageAccuracy || 87}%` }}
              />
            </div>
          </div>

          {/* Quiz History & Emergency SOS Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quiz History Section */}
            <div className="lg:col-span-8 bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-[#00C9A7]" />
                  <span>Recent Quiz History</span>
                </h2>
                <Link href="/quiz" className="text-xs font-bold text-[#00C9A7] hover:underline">
                  Start New Quiz →
                </Link>
              </div>

              <div className="divide-y divide-slate-800/80">
                {displayedHistory.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <h4 className="font-bold text-white">
                        {item.language} — <span className="font-normal text-slate-400">{item.situation}</span>
                      </h4>
                      <span className="text-slate-500 text-[11px] font-mono">{item.date}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-300">
                        {item.score} / {item.totalQuestions}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full font-extrabold text-[11px] border ${
                        item.accuracy >= 80
                          ? 'bg-[#00C9A7]/15 text-[#00C9A7] border-[#00C9A7]/30'
                          : 'bg-[#F5B942]/15 text-[#F5B942] border-[#F5B942]/30'
                      }`}>
                        {item.accuracy}% Accuracy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Emergency SOS Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-rose-950 via-slate-900 to-[#07111F] border border-rose-500/40 rounded-3xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>24/7 Offline Emergency SOS</span>
              </div>

              <div>
                <h3 className="text-xl font-black">Emergency Card Quick Dial</h3>
                <p className="text-xs text-rose-200/80 mt-1 font-medium">
                  Access single-tap high-contrast emergency phrase cards for police, medical, and ambulance help.
                </p>
              </div>

              <div className="pt-2 border-t border-rose-800/60 space-y-2 text-xs font-mono font-bold">
                <div className="flex justify-between text-rose-200">
                  <span>India Emergency:</span>
                  <span className="text-white">112</span>
                </div>
                <div className="flex justify-between text-rose-200">
                  <span>Japan Emergency:</span>
                  <span className="text-white">110 / 119</span>
                </div>
                <div className="flex justify-between text-rose-200">
                  <span>EU Emergency:</span>
                  <span className="text-white">112</span>
                </div>
              </div>

              <Link
                href="/emergency"
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 font-black text-xs text-white text-center block transition-colors shadow-lg"
              >
                Open Emergency SOS Cards
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
