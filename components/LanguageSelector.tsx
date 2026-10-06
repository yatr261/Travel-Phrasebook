'use client';

import React, { useState } from 'react';
import { LANGUAGES } from '../lib/data/languages';
import { Language } from '../lib/types';
import { Search, Check } from 'lucide-react';

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
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search language (e.g. Japanese, Hindi, French, Gujarati...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-900 dark:text-white"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {filteredLanguages.map((language) => {
          const isSelected = selectedLanguage?.code === language.code;
          return (
            <button
              key={language.code}
              onClick={() => onSelect(language)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {language.name}
                    {language.isIndianRegion && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                        🇮🇳 Regional
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language.nativeName}
                  </p>
                </div>
              </div>
              {isSelected && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
