import { Language } from '../types';

export const LANGUAGES: Language[] = [
  // Global Popular Travel Languages
  {
    id: 'japanese',
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    locale: 'ja-JP',
    speechLocale: 'ja-JP',
    ttsLangCode: 'ja-JP',
    flag: '🇯🇵'
  },
  {
    id: 'french',
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    locale: 'fr-FR',
    speechLocale: 'fr-FR',
    ttsLangCode: 'fr-FR',
    flag: '🇫🇷'
  },
  {
    id: 'german',
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    locale: 'de-DE',
    speechLocale: 'de-DE',
    ttsLangCode: 'de-DE',
    flag: '🇩🇪'
  },
  {
    id: 'italian',
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    locale: 'it-IT',
    speechLocale: 'it-IT',
    ttsLangCode: 'it-IT',
    flag: '🇮🇹'
  },
  {
    id: 'spanish',
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    locale: 'es-ES',
    speechLocale: 'es-ES',
    ttsLangCode: 'es-ES',
    flag: '🇪🇸'
  },
  {
    id: 'arabic',
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    locale: 'ar-SA',
    speechLocale: 'ar-SA',
    ttsLangCode: 'ar-SA',
    flag: '🇦🇪'
  },
  {
    id: 'english',
    code: 'en',
    name: 'English',
    nativeName: 'English',
    locale: 'en-US',
    speechLocale: 'en-US',
    ttsLangCode: 'en-US',
    flag: '🇺🇸'
  },

  // Indian Regional Languages
  {
    id: 'hindi',
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    locale: 'hi-IN',
    speechLocale: 'hi-IN',
    ttsLangCode: 'hi-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'North & Central India',
    scriptName: 'Devanagari'
  },
  {
    id: 'gujarati',
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    locale: 'gu-IN',
    speechLocale: 'gu-IN',
    ttsLangCode: 'gu-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Gujarat',
    scriptName: 'Gujarati'
  },
  {
    id: 'punjabi',
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    locale: 'pa-IN',
    speechLocale: 'pa-IN',
    ttsLangCode: 'pa-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Punjab (Amritsar)',
    scriptName: 'Gurmukhi'
  },
  {
    id: 'marathi',
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    locale: 'mr-IN',
    speechLocale: 'mr-IN',
    ttsLangCode: 'mr-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Maharashtra (Mumbai)',
    scriptName: 'Devanagari'
  },
  {
    id: 'bengali',
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    locale: 'bn-IN',
    speechLocale: 'bn-IN',
    ttsLangCode: 'bn-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'West Bengal (Kolkata)',
    scriptName: 'Bengali'
  },
  {
    id: 'tamil',
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    locale: 'ta-IN',
    speechLocale: 'ta-IN',
    ttsLangCode: 'ta-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Tamil Nadu (Chennai)',
    scriptName: 'Tamil'
  },
  {
    id: 'telugu',
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    locale: 'te-IN',
    speechLocale: 'te-IN',
    ttsLangCode: 'te-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Andhra Pradesh & Telangana',
    scriptName: 'Telugu'
  },
  {
    id: 'kannada',
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    locale: 'kn-IN',
    speechLocale: 'kn-IN',
    ttsLangCode: 'kn-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Karnataka (Bengaluru)',
    scriptName: 'Kannada'
  },
  {
    id: 'malayalam',
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    locale: 'ml-IN',
    speechLocale: 'ml-IN',
    ttsLangCode: 'ml-IN',
    flag: '🇮🇳',
    isIndianRegion: true,
    regionName: 'Kerala (Kochi)',
    scriptName: 'Malayalam'
  }
];

export function getLanguageByCode(code: string): Language {
  const match = LANGUAGES.find(
    (l) => l.code.toLowerCase() === code.toLowerCase() || l.id.toLowerCase() === code.toLowerCase()
  );
  return match || LANGUAGES[0];
}

export function getLanguageByName(name: string): Language {
  const match = LANGUAGES.find(
    (l) => l.name.toLowerCase() === name.toLowerCase() || l.id.toLowerCase() === name.toLowerCase()
  );
  return match || LANGUAGES[0];
}
