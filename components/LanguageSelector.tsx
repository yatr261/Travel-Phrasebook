'use client';

import React, { useState } from 'react';
import { LANGUAGES } from '../lib/data/languages';
import { Language } from '../lib/types';
import { Search, Check, Languages as LangIcon } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onSelect: (language: Language) => void;
}

export default function LanguageSelector({ selectedLanguage, onSelect }: LanguageSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.regionName && l.regionName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full space-y-4">
      
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <LangIcon className="w-4 h-4 text-[#38BDF8]" />
          <span>WHAT LANGUAGE DO YOU WANT TO SPEAK?</span>
        </label>
        {selectedLanguage && (
          <span className="text-xs font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full border border-[#38BDF8]/30">
            Selected: {selectedLanguage.flag} {selectedLanguage.name} ({selectedLanguage.nativeName})
          </span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search language (e.g. Gujarati, Hindi, Japanese, French, German...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#07111F] border border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all text-white placeholder:text-slate-500 font-medium"
        />
      </div>

      {/* Modern Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredLanguages.map((language) => {
          const isSelected = selectedLanguage?.code === language.code;
          return (
            <button
              key={language.code}
              onClick={() => onSelect(language)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer select-none ${
                isSelected
                  ? 'border-[#00C9A7] bg-[#00C9A7]/15 ring-2 ring-[#00C9A7]/30 shadow-[0_0_20px_rgba(0,201,167,0.25)] scale-[1.02]'
                  : 'border-slate-800 bg-[#0B1630]/90 hover:border-slate-600 hover:bg-[#0D1B3A] hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl shrink-0">{language.flag}</span>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5 truncate">
                    <span>{language.name}</span>
                    {language.isIndianRegion && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30 shrink-0">
                        🇮🇳 Regional
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium truncate">
                    {language.nativeName}
                  </p>
                </div>
              </div>
              {isSelected ? (
                <span className="w-5.5 h-5.5 rounded-full bg-[#00C9A7] text-slate-950 flex items-center justify-center text-xs font-black shadow-md shrink-0 animate-in zoom-in-50">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              ) : (
                <span className="w-5.5 h-5.5 rounded-full border border-slate-700 bg-slate-900/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
