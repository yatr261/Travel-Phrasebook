'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CustomAIPhrase from '../../components/CustomAIPhrase';
import {
  ShieldAlert,
  PhoneCall,
  Volume2,
  Square,
  Copy,
  Check,
  Languages,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { playTextToSpeech, stopSpeech, findBestVoice } from '../../lib/utils/speech';
import { LANGUAGES, getLanguageByCode } from '../../lib/data/languages';
import { getOfflineEmergencyPhrases } from '../../lib/data/emergencyPhrases';
import { EmergencyPhrase, Language } from '../../lib/types';

export default function EmergencyPage() {
  const [selectedLang, setSelectedLang] = useState<Language>(() => LANGUAGES[0]);
  const [phrases, setPhrases] = useState<EmergencyPhrase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchEmergencyPhrases = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPhrases([]);

    try {
      const response = await fetch('/api/generate-emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languageCode: selectedLang.code,
          languageName: selectedLang.name,
          nativeName: selectedLang.nativeName,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.phrases || data.phrases.length === 0) {
        const offline = getOfflineEmergencyPhrases(selectedLang.code);
        setPhrases(offline);
        setIsFallback(true);
      } else {
        setPhrases(data.phrases);
        setIsFallback(!!data.isFallback);
      }
    } catch (err: unknown) {
      console.error(err);
      const offline = getOfflineEmergencyPhrases(selectedLang.code);
      setPhrases(offline);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [selectedLang.code, selectedLang.name, selectedLang.nativeName]);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        stopSpeech();
        setPlayingId(null);
        fetchEmergencyPhrases();
      }
    });

    return () => {
      isMounted = false;
      stopSpeech();
    };
  }, [fetchEmergencyPhrases]);

  const handlePlayAudio = (phrase: EmergencyPhrase) => {
    if (playingId === phrase.id) {
      stopSpeech();
      setPlayingId(null);
      return;
    }

    stopSpeech();
    setPlayingId(phrase.id);

    const locale = selectedLang.speechLocale || selectedLang.ttsLangCode || 'en-US';
    const { matchType } = findBestVoice(locale);
    if (matchType === 'none' && !locale.startsWith('en')) {
      showToast(`⚠️ Native ${selectedLang.name} voice audio fallback.`);
    }

    const textToSpeak = phrase.translation;

    playTextToSpeech(
      textToSpeak,
      locale,
      0.85,
      () => setPlayingId(null),
      (errMsg) => {
        setPlayingId(null);
        showToast(`⚠️ Audio error: ${errMsg}`);
      }
    );
  };

  const handleCopy = (phrase: EmergencyPhrase) => {
    navigator.clipboard.writeText(`${phrase.translation} (${phrase.pronunciation}) - "${phrase.english}"`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-white selection:bg-rose-500 selection:text-white">
      <Navbar />

      <main className="flex-grow py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Toast Notification Popup */}
          {toastMessage && (
            <div className="fixed top-20 right-4 z-50 bg-[#0D1B3A] border border-rose-500/60 text-white px-4 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-center space-x-2 text-xs sm:text-sm font-bold">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Top High-Contrast Emergency Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-red-950 to-[#07111F] border border-rose-500/50 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                  <ShieldAlert className="w-7 h-7 animate-bounce text-rose-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                    24/7 Travel Emergency SOS Mode
                  </h1>
                  <p className="text-xs text-rose-200 mt-1 font-semibold">High-contrast, instant offline emergency cards & speaker audio</p>
                </div>
              </div>

              {/* Language Switcher Dropdown */}
              <div className="w-full md:w-auto bg-[#07111F]/90 p-3 rounded-2xl border border-rose-500/40 shadow-lg space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-rose-400" />
                  <span>Emergency Language:</span>
                </label>
                <select
                  value={selectedLang.code}
                  onChange={(e) => {
                    const newLang = getLanguageByCode(e.target.value);
                    setSelectedLang(newLang);
                  }}
                  className="w-full bg-[#0D1B3A] text-white text-sm sm:text-base font-black px-3.5 py-2 rounded-xl border border-rose-500/40 focus:outline-none focus:border-rose-400 cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#07111F] text-white">
                      {l.flag} {l.name} — {l.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language State Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#07111F]/80 p-3 rounded-2xl border border-rose-800/40">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-bold">Selected Emergency Language:</span>
                <span className="font-black text-white text-sm">
                  {selectedLang.flag} {selectedLang.name} ({selectedLang.nativeName})
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px]">
                  Locale: {selectedLang.speechLocale}
                </span>
              </div>
              {isFallback && (
                <span className="text-[11px] text-[#00C9A7] font-bold flex items-center gap-1">
                  ⚡ High-Speed Verified Offline Dictionary Active
                </span>
              )}
            </div>

            {/* Helpline Bar */}
            <div className="pt-2 border-t border-rose-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-rose-400" />
                Direct Tourist Helplines:
              </span>
              <div className="flex flex-wrap items-center gap-4 text-white font-mono font-bold">
                <span>🇮🇳 India: 112</span>
                <span>🇯🇵 Japan: 110 / 119</span>
                <span>🇪🇺 Europe: 112</span>
                <span>🇺🇸 USA: 911</span>
                <span>🇬🇧 UK: 999</span>
              </div>
            </div>
          </div>

          {/* Ask AI Emergency Assistant */}
          <CustomAIPhrase
            destination="Emergency SOS"
            language={selectedLang.name}
            languageCode={selectedLang.code}
            situation="Emergency SOS"
            ttsLangCode={selectedLang.ttsLangCode}
            isRTL={selectedLang.isRTL}
          />

          {/* Loading State */}
          {loading && (
            <div className="py-20 text-center space-y-4 bg-[#0D1B3A] rounded-3xl border border-rose-500/30 p-8 shadow-xl">
              <div className="w-12 h-12 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Generating Emergency Phrases for {selectedLang.name}...
              </h3>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-6 rounded-3xl bg-rose-950/80 border border-rose-500/50 text-center space-y-3">
              <p className="text-sm font-bold text-rose-300">
                ⚠️ Unable to generate {selectedLang.name} emergency phrases.
              </p>
              <button
                onClick={() => fetchEmergencyPhrases()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Core Emergency Phrase Cards Grid */}
          {!loading && phrases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
              {phrases.map((phrase) => {
                const isPlaying = playingId === phrase.id;

                return (
                  <div
                    key={phrase.id}
                    className={`bg-[#0D1B3A] border rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all ${
                      isPlaying
                        ? 'border-rose-400 ring-2 ring-rose-500/50 scale-[1.02]'
                        : 'border-rose-500/30 hover:border-rose-400'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded border border-rose-500/40">
                          Emergency SOS Card
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {selectedLang.flag} {selectedLang.name}
                        </span>
                      </div>

                      {/* English Meaning */}
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        &ldquo;{phrase.english}&rdquo;
                      </h3>

                      {/* Local Script Translation (Large & High Contrast) */}
                      <p
                        dir={selectedLang.isRTL ? 'rtl' : 'ltr'}
                        className="text-2xl sm:text-3xl font-black text-rose-400 tracking-wide pt-1 leading-snug"
                      >
                        {phrase.translation}
                      </p>

                      {/* Pronunciation Guide */}
                      <p className="text-xs font-mono font-bold text-slate-200 bg-[#07111F] p-3 rounded-2xl border border-slate-800">
                        🗣 {phrase.pronunciation}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                      {/* Listen / Stop Audio */}
                      <button
                        onClick={() => handlePlayAudio(phrase)}
                        className={`flex-1 py-3 px-4 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isPlaying
                            ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Square className="w-4 h-4 fill-current" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 stroke-[2.5]" />
                            <span>Listen Audio</span>
                          </>
                        )}
                      </button>

                      {/* Copy Phrase */}
                      <button
                        onClick={() => handleCopy(phrase)}
                        className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                        title="Copy phrase"
                      >
                        {copiedId === phrase.id ? (
                          <>
                            <Check className="w-4 h-4 text-[#00C9A7]" />
                            <span className="text-[#00C9A7]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
