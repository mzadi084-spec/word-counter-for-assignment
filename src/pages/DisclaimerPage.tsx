import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Disclaimer – Word Counter for Assignment"
        description="Academic accuracy, word count variation, and browser-based estimation disclaimer for Word Counter for Assignment."
        canonicalPath="/disclaimer"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <header className="space-y-2 pb-6 border-b border-zinc-200">
          <p className="text-xs font-medium text-zinc-500">
            Academic &amp; Estimator Notice
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Disclaimer
          </h1>
          <p className="text-sm text-zinc-500">
            Last Updated: November 22, 2026
          </p>
        </header>

        <div className="space-y-7 text-zinc-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">1. Educational &amp; Planning Estimates</h2>
            <p>
              All counters, page converters, reading-time calculators, speech-time estimators, and writing guides on <strong>Word Counter for Assignment</strong> are offered strictly as free educational planning utilities. Figures for reading time (~200 WPM), speaking time (~130 WPM), single-spaced pages (~500 words/page), double-spaced pages (~250 words/page), and handwritten A4 sheets (~175 words/page) are practical estimates rather than universal guarantees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">2. Software &amp; University Variations</h2>
            <p>
              Different software editors (Microsoft Word, Google Docs, Apple Pages, Turnitin, LibreOffice) and academic departments count hyphenated words, numbers, footnotes, in-text citations, tables, and headings slightly differently. Students are solely responsible for checking official word count rules and formatting templates with their lecturer, supervisor, or examination handbook prior to submission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">3. Client-Side PDF Parsing Limitations</h2>
            <p>
              Our PDF Word Counter reads embedded digital text layers inside browser memory using PDF.js. Image-only scanned PDFs without embedded optical character text, password-encrypted files, or complex multi-column tables may return incomplete or zero extracted words.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">4. No Academic or Legal Warranty</h2>
            <p>
              Information and tools on this website are provided &ldquo;as is&rdquo; without warranty of any kind. Word Counter for Assignment is not affiliated with any university or examination board and assumes no responsibility for assignment grades, word-limit penalties, or submission outcomes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">5. Contact</h2>
            <p>
              If you spot a bug or would like to suggest an improvement, email{' '}
              <a href="mailto:mzadi084@gmail.com" className="font-semibold text-zinc-950 underline">
                mzadi084@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <MoreToolsSection currentPath="/disclaimer" />
      </main>
    </>
  );
};
