'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                🌍 Travel Phrasebook
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your AI-powered travel companion for learning useful local phrases, pronunciation, cultural etiquette and emergency communication in 50+ languages.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link href="/explore" className="hover:text-emerald-400 transition-colors">Explore</Link></li>
                <li><Link href="/phrasebook" className="hover:text-emerald-400 transition-colors">Phrasebook</Link></li>
                <li><Link href="/quiz" className="hover:text-emerald-400 transition-colors">Quiz Practice</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">AI Generator</a></li>
                <li><Link href="/phrasebook" className="hover:text-emerald-400 transition-colors">TTS Audio</Link></li>
                <li><Link href="/favorites" className="hover:text-emerald-400 transition-colors">Saved Favorites</Link></li>
                <li><Link href="/explore" className="hover:text-emerald-400 transition-colors">Indian Languages</Link></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Travel Phrasebook AI. Built with Next.js & Gemini AI.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted for travelers worldwide</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
