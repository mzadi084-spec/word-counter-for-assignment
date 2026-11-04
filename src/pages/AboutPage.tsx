import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { ShieldCheck, Users, Globe2, BookOpen, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Us – Free Word Counter for Assignment"
        description="Learn about Word Counter for Assignment: our mission, student privacy guarantees, and support for English, Urdu, and Roman Urdu scholars."
        canonicalPath="/about"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <Users className="w-3.5 h-3.5" />
            <span>Built for Higher Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Word Counter for Assignment
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Empowering students, researchers, and academic writers worldwide with private, fast, and multilingual text analysis.
          </p>
        </div>

        {/* Mission Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every semester, millions of university and high school students risk unnecessary grade penalties because their assignment submissions unintentionally deviate from strict word limits or formatting guidelines. Traditional word processors often hide punctuation rules, lack accurate paragraph tracking, or fail to support non-Latin languages.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Word Counter for Assignment</strong> was created to solve this challenge. We set out to build a lightweight, completely free, and genuinely student-centric text utility that works on any phone, tablet, or desktop with instant response times and zero annoying popups.
          </p>
        </section>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All text calculations occur inside your browser memory. Your unpublished coursework drafts are never sent to external servers or stored in any database.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Urdu & Roman Urdu Support</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We provide full native support for Urdu script, Nastaliq typography, sentence endings (۔ and ؟), and Roman Urdu student vocabulary.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Always Free for Students</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No paywalls, no trial periods, and no forced logins. Every tool, calculator, and blog article is free for education.
            </p>
          </div>
        </div>

        {/* Roman Urdu Note */}
        <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-sm text-blue-900 dark:text-blue-200">
          <span className="font-bold block mb-1 text-blue-800 dark:text-blue-300">
            Humara Maqsad (Hamari Kahani):
          </span>
          <p className="leading-relaxed">
            Yeh platform khas taur par un students ke liye banaya gaya hai jo English, Urdu ya Roman Urdu mein assignments aur essays likhte hain. Humara maqsad hai ke har student baghair kisi fees ya login ke apne assignment ka accurate word count, sentences, aur pages ka hisaab asaani se laga sakay.
          </p>
        </section>

        <MoreToolsSection />
      </main>
    </>
  );
};
