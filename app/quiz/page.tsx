'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { QuizQuestion } from '../../lib/types';
import { saveQuizAttempt } from '../../lib/utils/quiz';
import { playTextToSpeech } from '../../lib/utils/speech';
import { LANGUAGES } from '../../lib/data/languages';
import { SITUATIONS } from '../../lib/data/situations';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Sparkles,
  BookOpen,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

function QuizContent() {
  const searchParams = useSearchParams();
  const initialLang = searchParams.get('language') || 'Japanese';
  const initialSit = searchParams.get('situation') || 'Dining & Essentials';

  const [selectedLanguage, setSelectedLanguage] = useState(initialLang);
  const [selectedSituation, setSelectedSituation] = useState(initialSit);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const fetchQuizQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizCompleted(false);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          situation: selectedSituation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quiz questions');
      }

      setQuestions(data.questions || []);
      setIsFallback(!!data.isFallback);
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Error loading quiz questions');
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage, selectedSituation]);

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        fetchQuizQuestions();
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchQuizQuestions]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (showExplanation) return;

    setSelectedOption(option);
    setShowExplanation(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    playTextToSpeech(currentQuestion.correctAnswer, 'en-US', 0.9);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    const finalScore = score + (selectedOption === currentQuestion?.correctAnswer ? 1 : 0);
    const accuracy = Math.round((finalScore / questions.length) * 100);

    saveQuizAttempt({
      language: selectedLanguage,
      situation: selectedSituation,
      score: finalScore,
      totalQuestions: questions.length,
      accuracy,
    });
  };

  const handleRestart = () => {
    fetchQuizQuestions();
  };

  const getRatingBadge = (acc: number) => {
    if (acc === 100) return { title: '🏆 Excellent!', desc: 'Flawless native score! You are fully prepared for your trip.', color: 'text-[#F5B942] bg-[#F5B942]/10 border-[#F5B942]/30' };
    if (acc >= 80) return { title: '🔥 Great Job!', desc: 'High proficiency! You mastered most travel phrases.', color: 'text-[#00C9A7] bg-[#00C9A7]/10 border-[#00C9A7]/30' };
    if (acc >= 60) return { title: '👍 Good Effort!', desc: 'Solid foundation. A little more practice and you will be fluent.', color: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30' };
    return { title: '📚 Keep Practicing', desc: 'Review the phrasebook cards once more to sharpen your memory.', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Travel Language Quiz
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Practice travel vocabulary for <strong className="text-[#00C9A7]">{selectedLanguage}</strong> ({selectedSituation})
        </p>
      </div>

      {/* Language & Situation Quick Select Bar */}
      <div className="bg-[#0D1B3A] p-4 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400">Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#07111F] border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#00C9A7] cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.name} className="bg-[#07111F] text-white">
                {l.flag} {l.name}
              </option>
            ))}
          </select>

          <label className="text-xs font-bold text-slate-400 sm:ml-2">Situation:</label>
          <select
            value={selectedSituation}
            onChange={(e) => setSelectedSituation(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#07111F] border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-[#00C9A7] cursor-pointer"
          >
            {SITUATIONS.map((s) => (
              <option key={s.id} value={s.name} className="bg-[#07111F] text-white">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchQuizQuestions}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#00C9A7]/15 hover:bg-[#00C9A7]/25 text-[#00C9A7] text-xs font-bold transition-all flex items-center gap-1.5 border border-[#00C9A7]/30 shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>New Quiz</span>
        </button>
      </div>

      {/* Fallback Notice */}
      {isFallback && (
        <div className="p-4 rounded-2xl bg-[#F5B942]/10 border border-[#F5B942]/30 text-[#F5B942] text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Demo Mode Active: Offline quiz questions loaded. Add <code>GEMINI_API_KEY</code> in <code>.env.local</code> for live AI quizzes.</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center space-y-4 bg-[#0D1B3A] rounded-3xl border border-slate-800 p-8 shadow-xl">
          <div className="w-12 h-12 border-4 border-[#00C9A7]/30 border-t-[#00C9A7] rounded-full animate-spin mx-auto" />
          <h3 className="text-xl font-bold text-white">
            Creating quiz for {selectedLanguage}...
          </h3>
          <p className="text-xs text-slate-400">
            Assembling multiple choice travel scenario questions.
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-12 text-center space-y-4 bg-rose-500/10 border border-rose-500/30 rounded-3xl p-8">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-xl font-bold text-rose-300">
            Failed to Load Quiz
          </h3>
          <p className="text-xs text-rose-300">{error}</p>
          <button
            onClick={fetchQuizQuestions}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Active Question View */}
      {!loading && !error && questions.length > 0 && !quizCompleted && (
        <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-7">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-[#00C9A7] font-extrabold flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#F5B942]" /> Score: {score}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#07111F] overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#00C9A7] bg-[#00C9A7]/15 px-3 py-1 rounded-full border border-[#00C9A7]/30">
              {selectedLanguage} Question
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {currentQuestion.englishPrompt}
            </h2>
          </div>

          {/* 4 Large Selectable Answer Cards */}
          <div className="grid grid-cols-1 gap-3.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correctAnswer;

              let optionClass = 'border-slate-800 bg-[#07111F] hover:border-[#00C9A7]/50 hover:bg-[#0B1630] text-slate-200';

              if (showExplanation) {
                if (isCorrect) {
                  optionClass = 'border-[#00C9A7] bg-[#00C9A7]/20 text-white font-extrabold ring-2 ring-[#00C9A7]/40 shadow-[0_0_20px_rgba(0,201,167,0.2)]';
                } else if (isSelected) {
                  optionClass = 'border-rose-500 bg-rose-500/20 text-rose-200 font-extrabold ring-2 ring-rose-500/40';
                }
              }

              const optionLabels = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${optionClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-black shrink-0 border border-slate-700">
                      {optionLabels[idx] || idx + 1}
                    </span>
                    <span className="text-base font-bold">{option}</span>
                  </div>

                  {showExplanation && isCorrect && <CheckCircle2 className="w-6 h-6 text-[#00C9A7] shrink-0" />}
                  {showExplanation && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Audio Feedback Box */}
          {showExplanation && (
            <div className={`p-5 rounded-2xl border text-xs space-y-3 animate-in fade-in duration-300 ${
              selectedOption === currentQuestion.correctAnswer
                ? 'bg-[#00C9A7]/10 border-[#00C9A7]/30 text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm flex items-center gap-2">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#00C9A7]" />
                      <span className="text-[#00C9A7]">✓ Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span className="text-rose-400">Try Again Next Time</span>
                    </>
                  )}
                </span>

                <button
                  onClick={() => playTextToSpeech(currentQuestion.correctAnswer, 'en-US')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#00C9A7] text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Listen</span>
                </button>
              </div>

              <p className="leading-relaxed text-slate-200 font-medium text-sm">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.phonetic && (
                <p className="font-mono text-[#F5B942] font-bold text-xs">
                  🗣 Phonetic: {currentQuestion.phonetic}
                </p>
              )}
            </div>
          )}

          {/* Next Question / Finish Button */}
          {showExplanation && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-[#00C9A7]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Quiz Results'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Result Screen View */}
      {quizCompleted && (
        <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
          
          {/* Rating Badge */}
          {(() => {
            const acc = Math.round((score / questions.length) * 100);
            const badge = getRatingBadge(acc);
            return (
              <div className="space-y-5">
                <div className={`inline-flex flex-col items-center p-6 rounded-3xl border ${badge.color} max-w-md mx-auto space-y-2`}>
                  <Trophy className="w-14 h-14 animate-bounce" />
                  <h2 className="text-3xl font-black">{badge.title}</h2>
                  <p className="text-xs font-semibold text-slate-300">{badge.desc}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                  <div className="p-4 rounded-2xl bg-[#07111F] border border-slate-800">
                    <span className="text-xs text-slate-400 block font-bold">Your Score</span>
                    <span className="text-2xl font-black text-white">{score} / {questions.length}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#07111F] border border-slate-800">
                    <span className="text-xs text-slate-400 block font-bold">Accuracy</span>
                    <span className="text-2xl font-black text-[#00C9A7]">{acc}%</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#00C9A7]/10 border border-[#00C9A7]/30">
                    <span className="text-xs text-[#00C9A7] block font-bold">Correct</span>
                    <span className="text-2xl font-black text-[#00C9A7]">{score}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                    <span className="text-xs text-rose-400 block font-bold">Incorrect</span>
                    <span className="text-2xl font-black text-rose-400">{questions.length - score}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#00C9A7] text-slate-950 font-extrabold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Practice Again</span>
            </button>

            <Link
              href="/phrasebook"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Phrasebook</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-colors text-center border border-slate-800"
            >
              View Dashboard Stats
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <Suspense fallback={
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#00C9A7] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 mt-3">Loading quiz module...</p>
          </div>
        }>
          <QuizContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
