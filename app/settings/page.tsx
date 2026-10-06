'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Settings as SettingsIcon, Volume2, Key, Check } from 'lucide-react';

export default function SettingsPage() {
  const [speechRate, setSpeechRate] = useState('0.9');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <SettingsIcon className="w-8 h-8 text-emerald-500" />
              <span>Application Settings</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Customize TTS audio playback speed, preferred target languages, and API configurations.
            </p>
          </div>

          {/* Settings Section 1: Audio Playback */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Audio & Speech Synthesis (TTS)</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Speech Pronunciation Rate
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '0.8x (Slower)', val: '0.8' },
                    { label: '0.9x (Recommended)', val: '0.9' },
                    { label: '1.0x (Normal)', val: '1.0' },
                  ].map((rate) => (
                    <button
                      key={rate.val}
                      onClick={() => setSpeechRate(rate.val)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all ${
                        speechRate === rate.val
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {rate.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section 2: Gemini API Integration */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gemini AI Configuration</h2>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              The application uses server-side environment variables for secure Gemini API key handling.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-mono text-slate-700 dark:text-slate-300">
              <p><strong>Environment File Location:</strong> <code>.env.local</code></p>
              <p><strong>Variable Name:</strong> <code>GEMINI_API_KEY=your_key_here</code></p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors shadow-md flex items-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
