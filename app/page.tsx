import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import IndianLanguagesSection from '../components/IndianLanguagesSection';
import EmergencyBanner from '../components/EmergencyBanner';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <IndianLanguagesSection />
        <EmergencyBanner />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
