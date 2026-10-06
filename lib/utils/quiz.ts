import { QuizAttempt } from '../types';

const STORAGE_KEY = 'travel_quiz_history';

export function getQuizHistory(): QuizAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading quiz history:', err);
    return [];
  }
}

export function saveQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'date'>): QuizAttempt {
  const history = getQuizHistory();
  const newAttempt: QuizAttempt = {
    ...attempt,
    id: `quiz-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  const updated = [newAttempt, ...history];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('quiz-history-updated'));
    } catch (err) {
      console.error('Error saving quiz attempt:', err);
    }
  }

  return newAttempt;
}

export function getQuizStats() {
  const history = getQuizHistory();

  if (history.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      averageAccuracy: 0,
      uniqueLanguages: 0,
    };
  }

  const totalScore = history.reduce((acc, h) => acc + h.score, 0);
  const totalAccuracy = history.reduce((acc, h) => acc + h.accuracy, 0);
  const languages = new Set(history.map((h) => h.language));

  return {
    totalAttempts: history.length,
    averageScore: Math.round(totalScore / history.length),
    averageAccuracy: Math.round(totalAccuracy / history.length),
    uniqueLanguages: languages.size,
  };
}
