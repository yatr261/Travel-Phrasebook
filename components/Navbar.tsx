'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, Menu, X, Settings, User, LogOut, LogIn, UserPlus } from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) checkAuth();
    });

    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-state-changed', handleAuthChange);

    return () => {
      isMounted = false;
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.dispatchEvent(new Event('auth-state-changed'));
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/phrasebook', label: 'Phrasebook' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/emergency', label: 'SOS' },
    { href: '/business', label: 'Business' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && !path.includes('#') && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07111F]/85 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C9A7] via-[#38BDF8] to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-[#00C9A7]/25 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00C9A7] transition-colors flex items-center gap-1.5">
                Travel Phrasebook
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#00C9A7] uppercase font-bold flex items-center gap-1">
                AI TRAVEL TECH
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 bg-[#0B1630]/80 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-[#00C9A7] bg-[#00C9A7]/15 border border-[#00C9A7]/30 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/settings"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors border border-transparent hover:border-slate-700"
              title="Settings & Theme"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {!loading && user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#00C9A7] bg-[#00C9A7]/10 border border-[#00C9A7]/30 flex items-center gap-1.5 hover:bg-[#00C9A7]/20 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-[#00C9A7]" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium text-xs flex items-center gap-1 border border-rose-500/20"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="sr-only sm:not-sr-only">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00C9A7] to-[#38BDF8] hover:opacity-90 shadow-md shadow-[#00C9A7]/20 transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00C9A7]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#07111F]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive(link.href)
                    ? 'text-[#00C9A7] bg-[#00C9A7]/15 border border-[#00C9A7]/30 font-bold'
                    : 'text-slate-300 bg-slate-900/60 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-4 py-2 text-xs font-bold text-[#00C9A7] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Signed in as {user.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00C9A7] to-[#38BDF8]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
