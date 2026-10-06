'use client';

import React from 'react';
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
  Check
} from 'lucide-react';

interface SituationCardProps {
  situation: Situation;
  isSelected?: boolean;
  onSelect?: () => void;
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

export default function SituationCard({ situation, isSelected, onSelect }: SituationCardProps) {
  const IconComponent = iconMap[situation.icon] || MessageSquare;

  return (
    <button
      onClick={onSelect}
      className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/50 ring-2 ring-emerald-500/30 shadow-md scale-[1.02]'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 rounded-xl border ${situation.badgeColor}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          {isSelected && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              <Check className="w-3 h-3" />
            </span>
          )}
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {situation.name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
          {situation.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
        <span>{situation.phraseCount} phrases</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          Explore →
        </span>
      </div>
    </button>
  );
}
