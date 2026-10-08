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
      
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#00C9A7]" />
          <span>WHERE ARE YOU GOING?</span>
        </label>
        {selectedDestination && (
          <span className="text-xs font-bold text-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1 rounded-full border border-[#00C9A7]/30">
            Selected: {selectedDestination.flag} {selectedDestination.name}
          </span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search country (e.g. Japan, France, India, UAE, Germany...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#07111F] border border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 transition-all text-white placeholder:text-slate-500 font-medium"
        />
      </div>

      {/* Modern Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredDestinations.map((destination) => {
          const isSelected = selectedDestination?.id === destination.id;
          return (
            <button
              key={destination.id}
              onClick={() => onSelect(destination)}
              className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                isSelected
                  ? 'border-[#00C9A7] bg-[#00C9A7]/15 ring-2 ring-[#00C9A7]/30 shadow-[0_0_20px_rgba(0,201,167,0.25)] scale-[1.02]'
                  : 'border-slate-800 bg-[#0B1630]/90 hover:border-slate-600 hover:bg-[#0D1B3A] hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl transition-transform group-hover:scale-110">{destination.flag}</span>
                {isSelected ? (
                  <span className="w-6 h-6 rounded-full bg-[#00C9A7] text-slate-950 flex items-center justify-center text-xs font-black shadow-md animate-in zoom-in-50">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-white group-hover:text-[#00C9A7] transition-colors flex items-center justify-between">
                  <span>{destination.name}</span>
                </h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
                  <MapPin className="w-3 h-3 text-[#38BDF8]" />
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
