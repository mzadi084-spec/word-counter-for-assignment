import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Us – Word Counter for Assignment"
        description="Learn about Word Counter for Assignment: our mission, browser-local text processing, and support for English, Urdu, and Roman Urdu writers."
        canonicalPath="/about"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        <header className="space-y-2 pb-6 border-b border-zinc-200">
          <p className="text-xs font-medium text-zinc-500">
            Academic Writing Utility Suite &middot; Built for Students &amp; Educators
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            About Word Counter for Assignment
          </h1>
          <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
            Created and maintained by Farwa Naveed to give students, researchers, and educators fast, reliable, browser-based text tools without logins or fees.
          </p>
        </header>

        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-4">
          <h2 className="text-2xl font-bold text-zinc-950">Our Mission</h2>
          <p className="text-zinc-700 leading-relaxed">
            Every semester, university and college students risk mark deductions when essays fall outside required word limits or page estimates. General word processors frequently miscount Urdu punctuation marks or hide detailed breakdowns behind crowded menus.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            <strong>Word Counter for Assignment</strong> provides clean, focused tools for word counting, Urdu and Roman Urdu tracking, words-to-pages estimates, reading and speaking timers, unique word analysis, and local PDF counting—completely free and running inside your browser.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <h3 className="text-base font-bold text-zinc-950">Browser-Local Processing</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Text and PDF word counting run locally in browser memory via JavaScript and PDF.js without submitting drafts to a user database.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <h3 className="text-base font-bold text-zinc-950">English, Urdu &amp; Roman Urdu</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Dedicated counting rules for Latin scripts, Unicode Urdu Nastaliq typography, Urdu punctuation (۔ and ؟), and Roman Urdu vocabulary.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
            <h3 className="text-base font-bold text-zinc-950">Free Academic Access</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              No signups, no paywalls, and no account barriers. Every calculator and study guide remains open for students and teachers.
            </p>
          </div>
        </div>

        <section className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700">
          <h3 className="font-bold text-zinc-950 mb-1">Humara Maqsad (Roman Urdu)</h3>
          <p className="leading-relaxed">
            Yeh platform students ke liye banaya gaya hai jo English, Urdu ya Roman Urdu mein assignments aur essays likhte hain, taake har student baghair login ya fees ke accurate word count, sentences, aur pages ka hisaab asaani se dekh sake.
          </p>
        </section>

        <MoreToolsSection />
      </main>
    </>
  );
};
