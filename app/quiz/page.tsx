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
  Brain,
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
        throw new Error(data.error || 'Failed to generate quiz');
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

    // Play TTS for the correct answer if available
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

  // Performance Rating Badge Helper
  const getRatingBadge = (acc: number) => {
    if (acc === 100) return { title: '🏆 Excellent!', desc: 'Flawless native score! You are ready for your trip.', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' };
    if (acc >= 80) return { title: '🔥 Great Job!', desc: 'High proficiency! You mastered most of these travel phrases.', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' };
    if (acc >= 60) return { title: '👍 Good!', desc: 'Solid foundation. A little more review and you will be fluent.', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' };
    return { title: '📚 Keep Practicing', desc: 'Review the phrasebook once more to sharpen your memory.', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' };
  };

  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Brain className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>AI-Generated Spaced-Repetition Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Travel Language Quiz
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Practice travel phrases for <strong>{selectedLanguage}</strong> ({selectedSituation})
        </p>
      </div>

      {/* Language & Situation Quick Select Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-500">Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.name}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>

          <label className="text-xs font-semibold text-slate-500 ml-2">Situation:</label>
          <select
            value={selectedSituation}
            onChange={(e) => setSelectedSituation(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
          >
            {SITUATIONS.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchQuizQuestions}
          disabled={loading}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1.5 border border-emerald-500/20 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>New Quiz</span>
        </button>
      </div>

      {/* Notice if Fallback */}
      {isFallback && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            ℹ️ Demo Mode Active: Add <code>GEMINI_API_KEY</code> to <code>.env.local</code> to generate real-time live AI quizzes with Gemini.
          </span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Gemini is creating your quiz...
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Assembling 5 customized questions for {selectedLanguage} ({selectedSituation}).
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-12 text-center space-y-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300">
            Failed to Load Quiz
          </h3>
          <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          <button
            onClick={fetchQuizQuestions}
            className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Active Question View */}
      {!loading && !error && questions.length > 0 && !quizCompleted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                <Trophy className="w-4 h-4" /> Score: {score}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              {selectedLanguage} Practice Question
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.englishPrompt}
            </h2>
          </div>

          {/* 4 Selectable Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correctAnswer;

              let optionClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';

              if (showExplanation) {
                if (isCorrect) {
                  optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  optionClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold ring-2 ring-rose-500/30';
                }
              }

              const optionLabels = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {optionLabels[idx] || idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Audio Feedback */}
          {showExplanation && (
            <div className={`p-5 rounded-2xl border text-xs space-y-3 animate-in fade-in duration-300 ${
              selectedOption === currentQuestion.correctAnswer
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm flex items-center gap-1.5">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>✅ Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>❌ Incorrect</span>
                    </>
                  )}
                </span>

                <button
                  onClick={() => playTextToSpeech(currentQuestion.correctAnswer, 'en-US')}
                  className="px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Pronunciation</span>
                </button>
              </div>

              <p className="leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.phonetic && (
                <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  🗣 Phonetic: {currentQuestion.phonetic}
                </p>
              )}
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Quiz Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Result Page View */}
      {quizCompleted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-8 animate-in zoom-in-95 duration-300">
          
          {/* Badge */}
          {(() => {
            const acc = Math.round((score / questions.length) * 100);
            const badge = getRatingBadge(acc);
            return (
              <div className="space-y-4">
                <div className={`inline-flex flex-col items-center p-6 rounded-3xl border ${badge.color} max-w-sm mx-auto space-y-2`}>
                  <Trophy className="w-12 h-12 animate-bounce" />
                  <h2 className="text-3xl font-extrabold">{badge.title}</h2>
                  <p className="text-xs font-medium">{badge.desc}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Final Score</span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{score} / {questions.length}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Accuracy</span>
                    <span className="text-2xl font-extrabold text-emerald-500">{acc}%</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 block font-semibold">Correct</span>
                    <span className="text-2xl font-extrabold text-emerald-600">{score}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                    <span className="text-xs text-rose-600 dark:text-rose-400 block font-semibold">Wrong</span>
                    <span className="text-2xl font-extrabold text-rose-600">{questions.length - score}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/phrasebook"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Phrasebook</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <Suspense fallback={
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500 mt-2">Loading quiz module...</p>
          </div>
        }>
          <QuizContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
