'use client';

import React, { useState } from 'react';
import { DESTINATIONS } from '../lib/data/destinations';
import { Destination } from '../lib/types';
import { Search, MapPin, Check } from 'lucide-react';

interface DestinationSelectorProps {
  selectedDestination: Destination | null;
  onSelect: (destination: Destination) => void;
}

export default function DestinationSelector({ selectedDestination, onSelect }: DestinationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search destination (e.g. Japan, France, India, UAE...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-900 dark:text-white"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredDestinations.map((destination) => {
          const isSelected = selectedDestination?.id === destination.id;
          return (
            <button
              key={destination.id}
              onClick={() => onSelect(destination)}
              className={`group relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{destination.flag}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-sm">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                  {destination.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  {destination.region}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
