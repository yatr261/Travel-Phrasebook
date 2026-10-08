'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import IndianLanguagesSection from '../../components/IndianLanguagesSection';
import { DESTINATIONS } from '../../lib/data/destinations';
import { Search, Globe, Sparkles, AlertOctagon, Utensils, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedDestForTips, setSelectedDestForTips] = useState(DESTINATIONS[0]);

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = activeRegion === 'All' || d.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  const culturalTipsData: Record<string, { greeting: string; dining: string; public: string; business: string; avoid: string }> = {
    japan: {
      greeting: 'Bow slightly (15° to 30°) when greeting. Avoid hugs or cheek kisses in public.',
      dining: 'Never stick chopsticks vertically into rice. Slurping noodles loudly is a compliment to the chef.',
      public: 'Keep your voice quiet on public transport. Do not eat or drink while walking on streets.',
      business: 'Exchange business cards (Meishi) with both hands and treat received cards with high respect.',
      avoid: 'Tipping is not customary in Japan and can cause confusion or offence.'
    },
    india: {
      greeting: 'Fold hands together near chest and say "Namaste" or regional greetings ("Namaskar", "Vanakkam").',
      dining: 'Eat with your right hand when taking traditional meals on thalis or banana leaves.',
      public: 'Remove shoes before entering homes, temples, and places of worship.',
      business: 'Build warm personal rapport before diving into corporate negotiations over tea.',
      avoid: 'Never touch people or sacred items with your feet; feet are considered spiritually unclean.'
    },
    france: {
      greeting: 'Always say "Bonjour Madame/Monsieur" upon entering any shop or venue before asking questions.',
      dining: 'Keep hands visible above the table during meals. Rest bread beside your plate.',
      public: 'Avoid speaking loudly in public spaces or metro trains.',
      business: 'Punctuality and formal address (Monsieur / Madame) are highly valued.',
      avoid: 'Do not rush meals or expect fast dining service; take time to enjoy food.'
    },
    spain: {
      greeting: 'Warm handshakes or two light cheek kisses (right then left) between acquaintances.',
      dining: 'Lunch is served between 2:00 PM and 4:00 PM; dinner starts around 9:00 PM or later.',
      public: 'Embrace a relaxed pace during afternoon Siesta hours in smaller towns.',
      business: 'Relationship building and face-to-face trust are paramount before closing deals.',
      avoid: 'Avoid expecting early dinner service at traditional local restaurants before 8:30 PM.'
    }
  };

  const tips = culturalTipsData[selectedDestForTips.id] || culturalTipsData['japan'];

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Explore Destinations & Culture
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Discover travel countries, regional Indian languages, local emergency numbers, and essential etiquette tips.
            </p>
          </div>

          {/* Featured Indian Regional Languages Hub */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#F5B942]/15 via-[#0D1B3A] to-[#07111F] p-6 sm:p-8 rounded-3xl border border-[#F5B942]/30 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black">
                  Deep Support for Travelers Visiting India 🇮🇳
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
                  Explore 9 major regional languages with native audio: Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi.
                </p>
              </div>

              {/* Sample Showcase Card: Gujarati Shopping */}
              <div className="bg-[#07111F]/90 border border-[#F5B942]/40 p-5 rounded-2xl space-y-2 shrink-0 max-w-xs shadow-lg">
                <div className="flex justify-between items-center text-[10px] font-bold text-[#F5B942]">
                  <span>Gujarati Phrase Showcase</span>
                  <span>🇮🇳 Gujarat</span>
                </div>
                <h4 className="text-2xl font-black text-white">આ કેટલાનું છે?</h4>
                <p className="text-xs font-mono text-[#F5B942] font-bold">🗣 Aa ketlaanu chhe?</p>
                <p className="text-xs text-slate-300 font-medium">&ldquo;How much does this cost?&rdquo;</p>
              </div>
            </div>

            <IndianLanguagesSection />
          </div>

          {/* Destinations Grid & Filters */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D1B3A] p-4 rounded-3xl border border-slate-800 shadow-xl">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search country or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#07111F] border border-slate-700/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {['All', 'Asia', 'Europe', 'Americas'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeRegion === region
                        ? 'bg-[#00C9A7] text-slate-950 shadow-md'
                        : 'bg-[#07111F] text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="group bg-[#0D1B3A] border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#00C9A7]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{dest.flag}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#07111F] text-[#38BDF8] border border-slate-800">
                        {dest.region}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-[#00C9A7] transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                        {dest.summary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-bold text-slate-400">Languages:</span>
                        <span className="font-semibold">{dest.languages.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="font-bold text-slate-400">Popular Cities:</span>
                        <span className="font-semibold">{dest.popularCities.slice(0, 3).join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-rose-400 font-bold">
                        <span>Emergency Numbers:</span>
                        <span>{dest.emergencyNumbers.police} (Police) / {dest.emergencyNumbers.ambulance} (Med)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#07111F] border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDestForTips(dest)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cultural Tips
                    </button>
                    <Link
                      href={`/phrasebook?destination=${dest.id}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#00C9A7] text-slate-950 font-extrabold text-xs transition-colors text-center shadow-md hover:opacity-95"
                    >
                      Build Phrasebook →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Etiquette Guide Drawer Card */}
          <div className="bg-[#0D1B3A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F5B942]" />
                <span>Destination Etiquette Guide — {selectedDestForTips.name} {selectedDestForTips.flag}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#07111F] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00C9A7]" />
                  <span>Greeting Etiquette</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{tips.greeting}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#07111F] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#F5B942]" />
                  <span>Dining Etiquette</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{tips.dining}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#07111F] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#38BDF8]" />
                  <span>Public Behavior</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{tips.public}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#07111F] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Business Etiquette</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{tips.business}</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2 lg:col-span-2">
                <h4 className="font-bold text-rose-300 text-sm flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>Common Mistakes Tourists Should Avoid</span>
                </h4>
                <p className="text-xs text-rose-200 leading-relaxed font-medium">{tips.avoid}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
