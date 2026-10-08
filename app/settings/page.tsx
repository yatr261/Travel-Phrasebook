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
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-slate-800">
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <SettingsIcon className="w-8 h-8 text-[#00C9A7]" />
              <span>Application Settings</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Customize TTS audio playback speed, preferred target languages, and API configurations.
            </p>
          </div>

          {/* Settings Section 1: Audio Playback */}
          <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-[#00C9A7]" />
              <h2 className="text-lg font-black text-white">Audio & Speech Synthesis (TTS)</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Default Speech Pronunciation Speed
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '0.6x (Slow 🐢)', val: '0.6' },
                    { label: '0.9x (Recommended)', val: '0.9' },
                    { label: '1.0x (Normal)', val: '1.0' },
                  ].map((rate) => (
                    <button
                      key={rate.val}
                      onClick={() => setSpeechRate(rate.val)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                        speechRate === rate.val
                          ? 'border-[#00C9A7] bg-[#00C9A7]/15 text-[#00C9A7] ring-1 ring-[#00C9A7]/40 shadow-sm'
                          : 'border-slate-800 bg-[#07111F] text-slate-300 hover:border-slate-700'
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
          <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-[#38BDF8]" />
              <h2 className="text-lg font-black text-white">Gemini AI Configuration</h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              The application uses server-side environment variables for secure Gemini API key handling.
            </p>

            <div className="p-4 rounded-2xl bg-[#07111F] border border-slate-800 text-xs space-y-2 font-mono text-slate-300">
              <p><strong>Environment File Location:</strong> <code>.env.local</code></p>
              <p><strong>Variable Name:</strong> <code>GEMINI_API_KEY=your_key_here</code></p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-7 py-3.5 rounded-2xl bg-[#00C9A7] text-slate-950 font-extrabold text-xs shadow-lg hover:opacity-90 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Preferences Saved!</span>
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
