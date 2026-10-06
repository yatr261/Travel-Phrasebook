export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis.getVoices() || [];
}

/**
 * Voice selection matching strategy:
 * 1. Exact locale match (e.g. "pa-IN")
 * 2. Language prefix match (e.g. "pa")
 * 3. Null if no matching voice exists for that language
 */
export function findBestVoice(speechLocale: string): {
  voice: SpeechSynthesisVoice | null;
  matchType: 'exact' | 'prefix' | 'none';
} {
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) {
    return { voice: null, matchType: 'none' };
  }

  const target = speechLocale.toLowerCase().replace('_', '-');
  const targetPrefix = target.split('-')[0];

  // 1. Exact locale match
  const exact = voices.find(
    (v) => v.lang.toLowerCase().replace('_', '-') === target
  );
  if (exact) {
    return { voice: exact, matchType: 'exact' };
  }

  // 2. Language prefix match
  const prefixMatch = voices.find((v) => {
    const voicePrefix = v.lang.toLowerCase().replace('_', '-').split('-')[0];
    return voicePrefix === targetPrefix;
  });

  if (prefixMatch) {
    return { voice: prefixMatch, matchType: 'prefix' };
  }

  return { voice: null, matchType: 'none' };
}

export function playTextToSpeech(
  text: string,
  speechLocale: string = 'en-US',
  rate: number = 0.9,
  onEnd?: () => void,
  onError?: (errMessage: string) => void
): boolean {
  if (!isSpeechSupported()) {
    const errMsg = 'Web Speech API is not supported in this browser.';
    console.warn(errMsg);
    if (onError) onError(errMsg);
    return false;
  }

  try {
    // Stop any current speech before starting new phrase
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLocale || 'en-US';
    utterance.rate = rate; // 0.6 for Slow 🐢, 0.9 for Normal ▶
    utterance.pitch = 1.0;

    const { voice, matchType } = findBestVoice(speechLocale);

    if (voice) {
      utterance.voice = voice;
    } else {
      // If language is not English and no native voice is installed
      const langPrefix = speechLocale.split('-')[0].toUpperCase();
      console.warn(`No native ${speechLocale} voice found in browser.`);
      if (matchType === 'none' && !speechLocale.startsWith('en')) {
        const warning = `Native ${langPrefix} speech voice is not installed in this browser. Audio will attempt playback with standard web speech engine.`;
        console.info(warning);
      }
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
    }

    if (onError) {
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        onError(`Audio playback error for ${speechLocale}`);
      };
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err: unknown) {
    const errorString = (err as Error)?.message || 'Audio playback failed.';
    console.error('TTS Play Error:', err);
    if (onError) onError(errorString);
    return false;
  }
}
