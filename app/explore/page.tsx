'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import IndianLanguagesSection from '../../components/IndianLanguagesSection';
import { DESTINATIONS } from '../../lib/data/destinations';
import { Search, Globe, Compass, Sparkles, AlertOctagon, Utensils, Users, Briefcase } from 'lucide-react';
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
      greeting: 'Bow slightly (15° to 30°) when greeting. Avoid hugs or cheek kisses.',
      dining: 'Never stick chopsticks vertically into a bowl of rice (resembles funeral rites). Slurping noodles is considered a compliment to the chef.',
      public: 'Keep voices quiet on public transport. Do not eat or drink while walking on streets.',
      business: 'Exchange business cards (Meishi) with both hands. Treat received cards with high respect.',
      avoid: 'Tipping is not customary and can cause confusion. Never leave a tip on tables.'
    },
    india: {
      greeting: 'Fold hands together near chest and say "Namaste" or regional greetings ("Namaskar", "Vanakkam", "Jai Shree Krishna").',
      dining: 'Eat with your right hand when eating traditional meals on banana leaves or thalis.',
      public: 'Remove shoes before entering homes, temples, and places of worship.',
      business: 'Build personal rapport before diving into corporate negotiations. Meetings often begin with tea.',
      avoid: 'Never touch people or sacred items with your feet; feet are considered spiritually unclean.'
    },
    france: {
      greeting: 'Always say "Bonjour Madame/Monsieur" upon entering any shop or venue before asking questions.',
      dining: 'Keep hands visible above the table (not in your lap) during meals. Rest bread beside your plate.',
      public: 'Avoid speaking loudly in public spaces or metro trains.',
      business: 'Punctuality and formal language are valued. Address partners as Monsieur or Madame.',
      avoid: 'Do not rush meals or ask for tap water aggressively; take time to enjoy dining.'
    },
    spain: {
      greeting: 'Warm handshakes or two light cheek kisses (right then left) between acquaintances.',
      dining: 'Lunch is usually served between 2:00 PM and 4:00 PM; dinner starts around 9:00 PM or later.',
      public: 'Embrace a relaxed pace during afternoon Siesta hours in smaller towns.',
      business: 'Relationship building and face-to-face meetings are paramount before closing deals.',
      avoid: 'Avoid expecting early dinner service at traditional local restaurants before 8:30 PM.'
    }
  };

  const tips = culturalTipsData[selectedDestForTips.id] || culturalTipsData['japan'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>Global Travel & Cultural Etiquette Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Explore Destinations & Culture
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Discover travel countries, regional Indian languages, local emergency numbers, and essential cultural etiquette.
            </p>
          </div>

          {/* Featured Indian Regional Languages Hub */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
                  🇮🇳 Featured Travel Subcontinent
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Deep Support for Travelers Visiting India
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Explore 9 major regional languages: Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi.
                </p>
              </div>

              {/* Sample Showcase Card: Gujarati Shopping */}
              <div className="bg-slate-900/90 border border-amber-500/40 p-5 rounded-2xl space-y-2 shrink-0 max-w-xs">
                <div className="flex justify-between items-center text-[10px] font-bold text-amber-400">
                  <span>Gujarati Shopping Phrase</span>
                  <span>🇮🇳 Gujarat</span>
                </div>
                <h4 className="text-xl font-extrabold text-white">આ કેટલાનું છે?</h4>
                <p className="text-xs font-mono text-amber-300">🗣 Aa ketlaanu chhe?</p>
                <p className="text-xs text-slate-300">&ldquo;How much does this cost?&rdquo;</p>
              </div>
            </div>

            <IndianLanguagesSection />
          </div>

          {/* Destinations Grid & Filters */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search country or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {['All', 'Asia', 'Europe', 'Americas'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      activeRegion === region
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
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
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{dest.flag}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {dest.region}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {dest.summary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Languages:</span>
                        <span>{dest.languages.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Popular Cities:</span>
                        <span>{dest.popularCities.slice(0, 3).join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 font-semibold">
                        <span>Emergency Helpline:</span>
                        <span>{dest.emergencyNumbers.police} (Police) / {dest.emergencyNumbers.ambulance} (Med)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedDestForTips(dest)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs hover:bg-slate-300 transition-colors"
                    >
                      View Cultural Tips
                    </button>
                    <Link
                      href={`/phrasebook?destination=${dest.id}`}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs transition-colors text-center"
                    >
                      Generate Phrasebook →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Tips Showcase Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Destination Cultural Etiquette Guide — {selectedDestForTips.name} {selectedDestForTips.flag}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>Greeting Etiquette</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tips.greeting}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-500" />
                  <span>Dining Etiquette</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tips.dining}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Public Behavior</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tips.public}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <span>Business Etiquette</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tips.business}</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-2 lg:col-span-2">
                <h4 className="font-bold text-rose-900 dark:text-rose-300 text-sm flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span>Common Mistakes Tourists Should Avoid</span>
                </h4>
                <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed">{tips.avoid}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
