import React from 'react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms & Conditions – Word Counter for Assignment"
        description="Terms and conditions governing the use of Word Counter for Assignment. Free educational use, copyright retention, and academic guidelines."
        canonicalPath="/terms"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <header className="space-y-2 pb-6 border-b border-zinc-200">
          <p className="text-xs font-medium text-zinc-500">
            Educational Use Terms
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-zinc-500">
            Last Updated: November 14, 2026
          </p>
        </header>

        <div className="space-y-7 text-zinc-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">1. Acceptance of Terms</h2>
            <p>
              By accessing <strong>Word Counter for Assignment</strong>, you agree to comply with these Terms &amp; Conditions. If you disagree with any term, please discontinue use of the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">2. Free Educational Use</h2>
            <p>
              All counters, calculators, and writing guides on this site are provided free of charge for students, educators, and writers preparing coursework, theses, presentations, and general documents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">3. Ownership of Your Content</h2>
            <p>
              You retain full ownership and copyright over any text or PDF files you analyze in your browser. We claim no license or rights over your work.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">4. Estimates &amp; Academic Responsibility</h2>
            <p>
              Metrics such as reading time (~200 WPM), speaking time (~130 WPM), words-to-pages estimates (~500 single-spaced, ~250 double-spaced, ~175 handwritten words per page), and ±10% word limits are practical guidelines. Different software tools, fonts, and institutions count hyphenation, citations, and formatting differently. Students remain responsible for verifying submission rules with their own university syllabus or lecturer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">5. Prohibited Conduct</h2>
            <p>
              Automated scraping, denial-of-service attempts, or misuse of site resources that disrupts service availability for other users is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">6. Contact</h2>
            <p>
              Questions regarding these terms may be sent to{' '}
              <a href="mailto:mzadi084@gmail.com" className="font-semibold text-zinc-950 underline">
                mzadi084@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
