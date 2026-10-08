export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  region: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  image: string;
  summary: string;
  languages: string[];
  popularCities: string[];
  emergencyNumbers: {
    police: string;
    ambulance: string;
    general: string;
  };
}

export interface Language {
  id: string; // e.g. 'japanese', 'punjabi', 'hindi'
  code: string; // e.g. 'ja', 'pa', 'hi'
  name: string; // e.g. 'Punjabi'
  nativeName: string; // e.g. 'ਪੰਜਾਬੀ'
  locale: string; // BCP-47 e.g. 'pa-IN'
  speechLocale: string; // BCP-47 e.g. 'pa-IN'
  flag: string;
  isIndianRegion?: boolean;
  regionName?: string;
  scriptName?: string;
  ttsLangCode: string; // alias for speechLocale e.g. 'pa-IN'
  isRTL?: boolean;
}

export interface EmergencyPhrase {
  id: string;
  english: string;
  translation: string;
  pronunciation: string;
  languageCode: string;
  languageName?: string;
  speechLocale?: string;
}

export interface Situation {
  id: string;
  name: string;
  icon: string;
  description: string;
  phraseCount: number;
  category: 'essential' | 'transit' | 'dining' | 'emergency' | 'culture' | 'business';
  badgeColor: string;
}

export interface Phrase {
  id: string;
  english: string;
  targetText: string;
  phonetic: string;
  languageCode: string;
  destinationId?: string;
  situationId: string;
  importance: 'emergency' | 'essential' | 'helpful';
  culturalNote?: string;
  audioLangCode: string;
}

export interface GeminiPhrase {
  id: string;
  category?: string;
  originalPhrase: string;
  englishMeaning: string;
  pronunciation: string;
  formality: 'polite' | 'casual' | 'formal';
  usageContext: string;
  culturalTip?: string;
  priority?: string;
  languageName?: string;
  situationName?: string;
  ttsLangCode?: string;
}

export interface CustomAIPhraseResult {
  originalPhrase: string;
  englishMeaning: string;
  pronunciation: string;
  formalVersion: string;
  casualVersion: string;
  usageTip: string;
}

export interface AskAIAlternative {
  label: string;
  translation: string;
  pronunciation?: string;
  style?: string;
}

export interface AskAISubItem {
  language: string;
  languageCode?: string;
  translation?: string;
  pronunciation?: string;
  meaning?: string;
  usageContext?: string;
  formality?: 'polite' | 'casual' | 'formal';
  isRTL?: boolean;
}

export interface AskAIResult {
  answerType?: 'translation' | 'meaning' | 'pronunciation' | 'multi_language' | 'explanation' | 'general';
  detectedLanguage?: string;
  detectedLanguageCode?: string;
  originalText?: string;
  translation?: string;
  pronunciation?: string;
  meaning?: string;
  explanation?: string;
  usageContext?: string;
  formality?: 'polite' | 'casual' | 'formal';
  alternatives?: AskAIAlternative[];
  multiLanguageResults?: AskAISubItem[];
  ttsText?: string;
  isRTL?: boolean;
}

export interface AskAIHistoryItem {
  question: string;
  result: AskAIResult;
  detectedLanguage?: string;
}

export interface QuizQuestion {
  id: string;
  languageCode: string;
  situationId: string;
  englishPrompt: string;
  correctAnswer: string;
  options: string[];
  phonetic: string;
  explanation: string;
}

export interface IndianLanguageDetail {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  statesSpoken: string[];
  speakers: string;
  samplePhrase: {
    english: string;
    native: string;
    phonetic: string;
  };
  gradient: string;
  ttsLangCode: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  language: string;
  situation: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
}
