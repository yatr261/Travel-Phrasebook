import { GeminiPhrase } from '../types';

const STORAGE_KEY = 'travel_phrasebook_favorites';

export function getFavorites(): GeminiPhrase[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading favorites from localStorage:', err);
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === id || f.originalPhrase === id);
}

export function toggleFavorite(phrase: GeminiPhrase): boolean {
  if (typeof window === 'undefined') return false;

  const favorites = getFavorites();
  const index = favorites.findIndex(
    (f) => f.id === phrase.id || f.originalPhrase === phrase.originalPhrase
  );

  let updated: GeminiPhrase[];
  let added = false;

  if (index >= 0) {
    updated = favorites.filter((_, idx) => idx !== index);
    added = false;
  } else {
    updated = [phrase, ...favorites];
    added = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
  } catch (err) {
    console.error('Error writing favorites to localStorage:', err);
  }

  return added;
}

export function removeFavorite(id: string): void {
  if (typeof window === 'undefined') return;

  const favorites = getFavorites();
  const updated = favorites.filter((f) => f.id !== id && f.originalPhrase !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
  } catch (err) {
    console.error('Error removing favorite from localStorage:', err);
  }
}
