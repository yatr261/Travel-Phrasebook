'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { LogIn, Eye, EyeOff, Lock, Mail, Compass, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password.');
      }

      setSuccess('✅ Signed in successfully! Redirecting...');
      window.dispatchEvent(new Event('auth-state-changed'));

      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-8 bg-[#0D1B3A] p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] flex items-center justify-center mx-auto mb-3">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Welcome Back, Traveler
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Sign in to access your saved phrases, quiz history, and personalized dashboard.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>❌ {error}</span>
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="p-4 rounded-2xl bg-[#00C9A7]/15 border border-[#00C9A7]/30 text-[#00C9A7] text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#00C9A7]" />
          <span>{success}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#07111F] border border-slate-700/80 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#07111F] border border-slate-700/80 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-slate-950 transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
            loading
              ? 'bg-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#00C9A7] via-[#38BDF8] to-[#00C9A7] hover:opacity-95 shadow-[#00C9A7]/25'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 stroke-[2.5]" />
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>

      </form>

      {/* Footer Navigation Link */}
      <div className="pt-4 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-400 font-medium">
          Don&apos;t have an account?{' '}
          <Link
            href={`/signup${redirectTo !== '/dashboard' ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="text-[#00C9A7] font-bold hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-slate-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-[#00C9A7]/30 border-t-[#00C9A7] rounded-full animate-spin mx-auto" />
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
