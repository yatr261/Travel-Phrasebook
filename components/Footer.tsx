'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07111F] text-slate-400 border-t border-slate-800/80 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C9A7] to-[#38BDF8] flex items-center justify-center text-slate-950 shadow-md">
                <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Travel Phrasebook
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
              Your AI-powered travel companion for learning useful local phrases, pronunciation, cultural etiquette and emergency communication in 50+ languages.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="/" className="hover:text-[#00C9A7] transition-colors">Home</Link></li>
                <li><Link href="/explore" className="hover:text-[#00C9A7] transition-colors">Explore</Link></li>
                <li><Link href="/phrasebook" className="hover:text-[#00C9A7] transition-colors">Phrasebook</Link></li>
                <li><Link href="/quiz" className="hover:text-[#00C9A7] transition-colors">Quiz Practice</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="/phrasebook#ask-ai" className="hover:text-[#00C9A7] transition-colors">Ask AI Assistant</Link></li>
                <li><Link href="/phrasebook" className="hover:text-[#00C9A7] transition-colors">TTS Audio</Link></li>
                <li><Link href="/favorites" className="hover:text-[#00C9A7] transition-colors">Saved Favorites</Link></li>
                <li><Link href="/emergency" className="hover:text-[#00C9A7] transition-colors">24/7 SOS Mode</Link></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Links</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link href="/explore" className="hover:text-[#00C9A7] transition-colors">About App</Link></li>
                <li><Link href="/settings" className="hover:text-[#00C9A7] transition-colors">Settings</Link></li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#00C9A7] transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4 text-[#38BDF8]" />
                    <span>GitHub Showcase</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Travel Phrasebook AI. Built with Next.js & Gemini AI.</p>
          <div className="flex items-center space-x-1 font-medium">
            <span>Crafted for travelers worldwide</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
