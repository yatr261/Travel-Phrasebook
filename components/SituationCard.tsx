'use client';

import React from 'react';
import Link from 'next/link';
import { Situation } from '../lib/types';
import {
  Utensils,
  Hotel,
  Bus,
  Plane,
  ShoppingBag,
  MapPin,
  MessageSquare,
  Briefcase,
  AlertTriangle,
  Cross,
  CreditCard,
  Users,
  Compass,
  Check,
  ArrowRight
} from 'lucide-react';

interface SituationCardProps {
  situation: Situation;
  isSelected?: boolean;
  onSelect?: () => void;
  onExplore?: () => void;
  destinationId?: string;
  languageCode?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  Hotel,
  Bus,
  Plane,
  ShoppingBag,
  MapPin,
  MessageSquare,
  Briefcase,
  AlertTriangle,
  Cross,
  CreditCard,
  Users,
  Compass
};

const emojiMap: Record<string, string> = {
  greetings: '👋',
  restaurant: '🍽',
  hotel: '🏨',
  transport: '🚆',
  airport: '✈️',
  shopping: '🛍',
  directions: '🧭',
  business: '💼',
  emergency: '🚨',
  medical: '🏥',
  money: '💳',
  social: '💬',
  local_travel: '🌍',
};

export default function SituationCard({
  situation,
  isSelected = false,
  onSelect,
  onExplore,
  destinationId,
  languageCode
}: SituationCardProps) {
  const IconComponent = iconMap[situation.icon] || MessageSquare;
  const emoji = emojiMap[situation.id] || '💬';

  const handleExploreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExplore) {
      onExplore();
    } else if (onSelect) {
      onSelect();
    }
  };

  const phrasebookUrl = `/phrasebook?situation=${situation.id}${
    destinationId ? `&destination=${destinationId}` : ''
  }${languageCode ? `&language=${languageCode}` : ''}`;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={`group relative text-left p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
        isSelected
          ? 'border-[#00C9A7] bg-[#00C9A7]/15 ring-2 ring-[#00C9A7]/30 shadow-[0_0_25px_rgba(0,201,167,0.3)] scale-[1.02]'
          : 'border-slate-800/80 bg-[#0B1630]/90 hover:border-[#00C9A7]/50 hover:bg-[#0D1B3A] hover:-translate-y-1 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Top Icon & Check Indicator */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl transition-transform group-hover:scale-110">{emoji}</span>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-[#00C9A7] group-hover:border-[#00C9A7]/40 transition-colors">
              <IconComponent className="w-4.5 h-4.5" />
            </div>
          </div>

          {isSelected ? (
            <span className="w-6 h-6 rounded-full bg-[#00C9A7] text-slate-950 flex items-center justify-center text-xs font-black shadow-md animate-in zoom-in-50">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          ) : (
            <span className="w-6 h-6 rounded-full border border-slate-700 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-base text-white group-hover:text-[#00C9A7] transition-colors">
          {situation.name}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
          {situation.description}
        </p>
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold">
        <span className="text-slate-400 font-mono">{situation.phraseCount} phrases</span>

        <Link
          href={phrasebookUrl}
          onClick={handleExploreClick}
          className="inline-flex items-center gap-1 text-[#00C9A7] font-bold hover:text-[#38BDF8] transition-all py-1 px-2.5 rounded-lg bg-[#00C9A7]/10 hover:bg-[#00C9A7]/20"
          title={`Explore ${situation.name} phrases`}
        >
          <span>Select</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
