'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Volume2, Copy, Check, MessageSquare, AlertCircle, RefreshCw, Trash2, HelpCircle, User, Info, Layers } from 'lucide-react';
import { AskAIResult, AskAIHistoryItem, AskAISubItem } from '../lib/types';
import { playTextToSpeech } from '../lib/utils/speech';

interface CustomAIPhraseProps {
  destination?: string;
  language?: string;
  languageCode?: string;
  situation?: string;
  ttsLangCode?: string;
  isRTL?: boolean;
}

export function getTTSLangCode(langNameOrCode: string): string {
  if (!langNameOrCode) return 'en-US';
  const l = langNameOrCode.toLowerCase().trim();
  if (l.includes('gujarati') || l === 'gu') return 'gu-IN';
  if (l.includes('hindi') || l === 'hi') return 'hi-IN';
  if (l.includes('marathi') || l === 'mr') return 'mr-IN';
  if (l.includes('punjabi') || l === 'pa') return 'pa-IN';
  if (l.includes('bengali') || l === 'bn') return 'bn-IN';
  if (l.includes('tamil') || l === 'ta') return 'ta-IN';
  if (l.includes('telugu') || l === 'te') return 'te-IN';
  if (l.includes('kannada') || l === 'kn') return 'kn-IN';
  if (l.includes('malayalam') || l === 'ml') return 'ml-IN';
  if (l.includes('japan') || l === 'ja') return 'ja-JP';
  if (l.includes('italian') || l === 'it') return 'it-IT';
  if (l.includes('german') || l === 'de') return 'de-DE';
  if (l.includes('french') || l === 'fr') return 'fr-FR';
  if (l.includes('arabic') || l === 'ar') return 'ar-SA';
  if (l.includes('spanish') || l === 'es') return 'es-ES';
  if (l.includes('russian') || l === 'ru') return 'ru-RU';
  if (l.includes('chinese') || l === 'zh') return 'zh-CN';
  if (l.includes('korean') || l === 'ko') return 'ko-KR';
  if (l.includes('english') || l === 'en') return 'en-US';
  return 'en-US';
}

export function checkIsRTL(langNameOrCode: string): boolean {
  if (!langNameOrCode) return false;
  const l = langNameOrCode.toLowerCase().trim();
  return l.includes('arabic') || l === 'ar' || l.includes('hebrew') || l.includes('urdu');
}

export default function CustomAIPhrase({
  destination = 'Global',
  language = 'Multilingual',
  languageCode = 'en',
  situation = 'General',
}: CustomAIPhraseProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyError, setEmptyError] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [history, setHistory] = useState<AskAIHistoryItem[]>([]);

  const sampleQueries = [
    'How do I say "I need a chair" in Gujarati?',
    'How do I say "Where is the railway station" in Japanese?',
    'German me politely kaise puchu ki ye kitne ka hai?',
    'What does "Danke" mean?',
    'How do I say "I need help" in Gujarati and Hindi?',
  ];

  const handleAskAI = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const q = (overrideQuery !== undefined ? overrideQuery : query).trim();

    if (!q) {
      setEmptyError(true);
      return;
    }

    setEmptyError(false);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion: q,
          destination,
          language,
          languageCode,
          situation,
          conversationHistory: history.map((h) => ({
            question: h.question,
            result: h.result,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Sorry, I couldn't generate an answer right now. Please try again.");
      }

      const newResult: AskAIResult = data.result;

      setHistory((prev) => [
        ...prev,
        {
          question: q,
          result: newResult,
          detectedLanguage: newResult.detectedLanguage || language,
        },
      ]);
      setQuery('');
    } catch (err: unknown) {
      console.error('Ask AI Error:', err);
      setError("Sorry, I couldn't generate an answer right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = (text: string, langNameOrCode: string, key: string = 'main') => {
    if (!text) return;
    const targetTTSCode = getTTSLangCode(langNameOrCode);
    setSpeakingKey(key);
    playTextToSpeech(text, targetTTSCode, 0.9, () => {
      setSpeakingKey(null);
    });
    setTimeout(() => {
      setSpeakingKey(null);
    }, 2500);
  };

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setError(null);
    setEmptyError(false);
  };

  return (
    <div id="ask-ai" className="w-full bg-[#0D1B3A] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/80">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00C9A7]/20 to-[#38BDF8]/20 border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7] shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Ask AI</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Ask any language, translation, etiquette, or pronunciation question in natural speech.
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition-colors flex items-center gap-1.5 ml-auto cursor-pointer font-semibold"
              title="Clear Session History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Ask AI Input Bar */}
        <form onSubmit={(e) => handleAskAI(e)} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder='Ask AI (e.g. "How do I say I need a chair in Gujarati?")'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (emptyError) setEmptyError(false);
              }}
              className={`w-full pl-12 pr-4 py-4 bg-[#07111F] border ${
                emptyError ? 'border-rose-500' : 'border-slate-700/80 focus:border-[#00C9A7]'
              } rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 font-medium transition-all`}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-xl shadow-[#00C9A7]/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed hover:opacity-95"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Asking AI...</span>
              </div>
            ) : (
              <>
                <span>Ask AI</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* AI IS THINKING ANIMATION */}
        {loading && (
          <div className="p-5 rounded-2xl bg-[#07111F] border border-[#00C9A7]/30 text-[#00C9A7] text-sm flex items-center justify-center gap-3 animate-shimmer">
            <Sparkles className="w-5 h-5 animate-spin text-[#00C9A7]" />
            <span className="font-extrabold tracking-wide">✨ AI is analyzing your intent & generating native translation...</span>
          </div>
        )}

        {/* Empty Input Warning */}
        {emptyError && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Please type a language question for Ask AI.</span>
          </div>
        )}

        {/* Sample Prompt Chips */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sample);
                  if (emptyError) setEmptyError(false);
                }}
                className="text-xs px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-[#00C9A7]/50 transition-all text-left font-medium cursor-pointer"
              >
                &ldquo;{sample}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && !loading && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleAskAI(undefined, history.length > 0 ? history[history.length - 1]?.question : query)}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Conversation Thread Items */}
        {history.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#00C9A7]" />
                <span>AI Conversational Stream ({history.length})</span>
              </h4>
            </div>

            <div className="space-y-6">
              {history.map((item, idx) => {
                const targetLang = item.result.detectedLanguage || item.detectedLanguage || language;
                const isRTL = checkIsRTL(targetLang);

                return (
                  <div key={idx} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* User Question bubble */}
                    <div className="flex items-start justify-end gap-2">
                      <div className="p-3.5 rounded-2xl bg-slate-800 text-slate-100 text-sm font-semibold max-w-lg border border-slate-700 shadow-md">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">You asked:</p>
                        <p>&ldquo;{item.question}&rdquo;</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    </div>

                    {/* AI Response Card */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#07111F] border border-[#00C9A7]/40 space-y-4 shadow-xl">
                      
                      {/* Top Language Badge & Info */}
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#00C9A7]" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            AI Answer
                          </span>
                        </div>

                        {targetLang && (
                          <div className="flex items-center gap-2">
                            {item.result.formality && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                                {item.result.formality}
                              </span>
                            )}
                            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30 shadow-sm">
                              Language: {targetLang}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* SINGLE LANGUAGE TRANSLATION DISPLAY */}
                      {item.result.translation && item.result.answerType !== 'multi_language' && (
                        <div className="space-y-3 bg-[#0B1630]/60 p-4 rounded-xl border border-slate-800">
                          
                          {/* Native Translation Script */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                              Translation:
                            </span>
                            <p
                              className="text-2xl sm:text-3xl font-black text-[#00C9A7] tracking-wide leading-relaxed"
                              dir={isRTL ? 'rtl' : 'ltr'}
                            >
                              {item.result.translation}
                            </p>
                          </div>

                          {/* Romanized Pronunciation */}
                          {item.result.pronunciation && (
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                                Romanized Pronunciation:
                              </span>
                              <p className="text-sm font-mono font-bold text-[#F5B942]">
                                🗣 {item.result.pronunciation}
                              </p>
                            </div>
                          )}

                          {/* English Meaning */}
                          {item.result.meaning && (
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                                Meaning:
                              </span>
                              <p className="text-sm font-semibold text-slate-200">
                                &ldquo;{item.result.meaning}&rdquo;
                              </p>
                            </div>
                          )}

                        </div>
                      )}

                      {/* MULTI-LANGUAGE RESULTS DISPLAY */}
                      {item.result.answerType === 'multi_language' && item.result.multiLanguageResults && (
                        <div className="space-y-3">
                          {item.result.explanation && (
                            <p className="text-xs text-slate-300 font-semibold">{item.result.explanation}</p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.result.multiLanguageResults.map((subItem: AskAISubItem, subIdx: number) => {
                              const subKey = `multi-${idx}-${subIdx}`;
                              return (
                                <div key={subIdx} className="p-4 rounded-xl bg-[#0B1630] border border-slate-800 space-y-2">
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                    <span className="text-xs font-bold text-[#38BDF8]">{subItem.language}</span>
                                    {subItem.formality && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                        {subItem.formality}
                                      </span>
                                    )}
                                  </div>

                                  {subItem.translation && (
                                    <p
                                      className="text-xl font-bold text-[#00C9A7]"
                                      dir={checkIsRTL(subItem.language) ? 'rtl' : 'ltr'}
                                    >
                                      {subItem.translation}
                                    </p>
                                  )}

                                  {subItem.pronunciation && (
                                    <p className="text-xs font-mono font-bold text-[#F5B942]">
                                      🗣 {subItem.pronunciation}
                                    </p>
                                  )}

                                  {subItem.meaning && (
                                    <p className="text-xs text-slate-300 italic">&ldquo;{subItem.meaning}&rdquo;</p>
                                  )}

                                  <div className="pt-1 flex items-center gap-2">
                                    {subItem.translation && (
                                      <button
                                        onClick={() => handlePlayAudio(subItem.translation!, subItem.language, subKey)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                          speakingKey === subKey
                                            ? 'bg-[#00C9A7] text-slate-950 animate-pulse'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                        }`}
                                      >
                                        <Volume2 className="w-3 h-3" />
                                        <span>Play</span>
                                      </button>
                                    )}
                                    {subItem.translation && (
                                      <button
                                        onClick={() => handleCopy(subItem.translation!, subKey)}
                                        className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 flex items-center gap-1"
                                      >
                                        {copiedKey === subKey ? (
                                          <Check className="w-3 h-3 text-[#00C9A7]" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                        <span>Copy</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* ALTERNATIVE PHRASES (e.g. Casual / Formal) */}
                      {item.result.alternatives && item.result.alternatives.length > 0 && (
                        <div className="space-y-2 pt-1 border-t border-slate-800/80">
                          <span className="text-[10px] font-mono text-[#38BDF8] uppercase font-bold tracking-wider block flex items-center gap-1">
                            <Layers className="w-3 h-3 text-[#38BDF8]" />
                            <span>Alternatives & Styles:</span>
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.result.alternatives.map((alt, altIdx) => {
                              const altKey = `alt-${idx}-${altIdx}`;
                              return (
                                <div key={altIdx} className="p-3 rounded-xl bg-[#0B1630] border border-slate-800/80 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{alt.label}</span>
                                    {alt.translation && (
                                      <button
                                        onClick={() => handlePlayAudio(alt.translation, targetLang, altKey)}
                                        className="p-1 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                                        title="Play audio"
                                      >
                                        <Volume2 className="w-3 h-3 text-[#00C9A7]" />
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-sm font-bold text-white">{alt.translation}</p>
                                  {alt.pronunciation && (
                                    <p className="text-xs font-mono text-[#F5B942]">🗣 {alt.pronunciation}</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* EXPLANATION / USAGE CONTEXT */}
                      {(item.result.explanation || item.result.usageContext) && (
                        <div className="p-3.5 rounded-xl bg-[#0B1630] border border-slate-800 text-xs text-slate-300 space-y-1.5">
                          {item.result.explanation && (
                            <div>
                              <span className="font-bold text-[#38BDF8] block flex items-center gap-1 mb-0.5">
                                <Info className="w-3.5 h-3.5 text-[#38BDF8]" /> Explanation:
                              </span>
                              <p className="leading-relaxed">{item.result.explanation}</p>
                            </div>
                          )}
                          {item.result.usageContext && (
                            <div>
                              <span className="font-bold text-[#00C9A7] block mb-0.5">💡 Traveler Usage Tip:</span>
                              <p className="leading-relaxed text-slate-300">{item.result.usageContext}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ACTION BUTTONS (PLAY AUDIO & COPY) */}
                      {item.result.translation && item.result.answerType !== 'multi_language' && (
                        <div className="pt-2 flex items-center gap-3 border-t border-slate-800/80">
                          <button
                            onClick={() => handlePlayAudio(item.result.translation!, targetLang, `main-${idx}`)}
                            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                              speakingKey === `main-${idx}`
                                ? 'bg-[#00C9A7] text-slate-950 animate-pulse shadow-md'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                            }`}
                            title="Play Native Speech Audio"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Play Audio</span>
                          </button>

                          <button
                            onClick={() => handleCopy(item.result.translation!, `main-${idx}`)}
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                            title="Copy translation text"
                          >
                            {copiedKey === `main-${idx}` ? (
                              <>
                                <Check className="w-4 h-4 text-[#00C9A7]" />
                                <span className="text-[#00C9A7]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy Phrase</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
