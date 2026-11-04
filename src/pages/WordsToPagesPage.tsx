import React, { useState } from 'react';
import { convertWordsToPages, PagesResult } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import {
  FileText,
  Calculator,
  PenTool,
  AlignJustify,
  Layers,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How many words are on a standard single-spaced page?',
    a: 'Using standard 12-point font (such as Times New Roman or Arial) with standard 1-inch margins, a single-spaced page holds approximately 500 words.'
  },
  {
    q: 'How many words are on a standard double-spaced page?',
    a: 'A double-spaced academic page (mandatory for APA, MLA, and Chicago formatting) accommodates roughly 250 words per page.'
  },
  {
    q: 'How many words can a student write on a handwritten A4 page?',
    a: 'On lined A4 paper under typical exam conditions, the average student handwriting size produces approximately 175 words per page.'
  },
  {
    q: 'Why do different fonts change physical page count?',
    a: 'Different typefaces feature different character widths and ascender/descender heights. Condensed serif fonts like Times New Roman fit more words per line than proportional sans-serif fonts like Arial or monospaced Courier New.'
  }
];

export const WordsToPagesPage: React.FC = () => {
  const [wordsInput, setWordsInput] = useState<number | ''>(1500);

  const wordCount = typeof wordsInput === 'number' && !isNaN(wordsInput) ? Math.max(0, wordsInput) : 0;
  const result: PagesResult = convertWordsToPages(wordCount);

  const presets = [250, 500, 1000, 1500, 2000, 2500, 3000, 5000, 10000];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Words to Pages Converter',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description: 'Convert words to pages instantly for single spacing (500 w/p), double spacing (250 w/p), and handwritten A4 (175 w/p).',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <SEOHead
        title="Words to Pages Converter – Single, Double & Handwritten"
        description="Free words to pages converter. Calculate page count for single spacing (500 w/p), double spacing (250 w/p), and handwritten A4 (175 w/p) instantly."
        canonicalPath="/words-to-pages-converter"
        schema={[webAppSchema, faqSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with single H1 */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <Calculator className="w-3.5 h-3.5" />
            <span>Academic Page Length Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Words to Pages Converter
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instantly calculate how many pages your assignment or thesis will be for single spacing, double spacing, and handwritten sheets.
          </p>
        </div>

        {/* Roman Urdu Helper Box */}
        <div className="mb-6 px-4 py-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
          <span className="font-semibold px-1.5 py-0.5 rounded bg-blue-200/70 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] uppercase tracking-wider">
            Roman Urdu Tip
          </span>
          <span>Apne assignment ke words enter karein. Double spacing (250 words/page) aur single spacing (500 words/page) ka hisaab dekhein.</span>
        </div>

        {/* Interactive Converter Card */}
        <section aria-label="Interactive Words to Pages Calculator" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          {/* Input field */}
          <div className="max-w-xl mx-auto space-y-3 text-center">
            <label htmlFor="word-count-input" className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Enter Total Word Count
            </label>
            <div className="relative inline-block w-full max-w-md">
              <input
                id="word-count-input"
                type="number"
                min="0"
                step="50"
                value={wordsInput}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  setWordsInput(val === '' || isNaN(val) ? '' : val);
                }}
                placeholder="e.g. 2000"
                className="w-full text-center text-3xl sm:text-4xl font-extrabold px-6 py-4 rounded-2xl border-2 border-blue-500/40 focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-mono"
              />
              <span className="block mt-1 text-xs text-slate-400">
                Number of words in your manuscript
              </span>
            </div>

            {/* Quick Presets */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 mr-2">Quick Presets:</span>
              <div className="inline-flex flex-wrap justify-center gap-1.5 mt-1">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWordsInput(preset)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                      wordsInput === preset
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display Grid (3 Big Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* 1. Single Spacing */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <AlignJustify className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Single Spacing (1.0)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white my-1 font-mono">
                  {result.singleSpacing}
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {result.singleSpacing === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Standard standard 500 words per page (12pt font, 1-inch margins).
              </p>
            </div>

            {/* 2. Double Spacing (Highlighted) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white dark:from-blue-950/40 dark:to-slate-900 border-2 border-blue-500 dark:border-blue-500 shadow-md shadow-blue-500/10 text-center space-y-3 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Academic Standard
              </span>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                  Double Spacing (2.0)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-blue-700 dark:text-blue-300 my-1 font-mono">
                  {result.doubleSpacing}
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {result.doubleSpacing === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-blue-100 dark:border-blue-900/60">
                Standard 250 words per page for APA, MLA, Harvard, & Chicago essay submissions.
              </p>
            </div>

            {/* 3. Handwritten A4 */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Handwritten (A4)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white my-1 font-mono">
                  {result.handwrittenA4}
                </div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {result.handwrittenA4 === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Standard 175 words per page for medium student handwriting on lined paper.
              </p>
            </div>
          </div>
        </section>

        {/* 300+ Words Guide Section */}
        <section className="mt-16 space-y-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Formatting Reference Guide</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How Words Convert to Physical Pages in Academic Writing
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p>
                When university professors ask for an "8-page research essay" or a "15-page dissertation chapter", students frequently struggle to translate digital word counts into physical printed sheets. Because text formatting varies based on typography, margins, and line spacing, knowing the underlying arithmetic is critical for coursework compliance.
              </p>
              <p>
                In higher education, the universal standard for typed essays is double-spacing (2.0 line spacing) using a 12-point serif or sans-serif font (such as Times New Roman, Calibri, or Arial) paired with 1-inch (2.54 cm) margins on all four sides. Under these strict parameters, a double-spaced page holds approximately <strong>250 words</strong>. This spacing is mandated to leave adequate vertical whitespace for examiners and teaching assistants to insert handwritten or digital correction annotations.
              </p>
              <p>
                By comparison, single-spaced manuscripts (often required for journal submissions, policy briefs, or executive summaries) compress twice as much text onto each page, averaging <strong>500 words per page</strong>. In timed in-person university examinations where students handwrite their answers on lined A4 booklets, the average medium handwriting yields approximately <strong>175 words per page</strong>.
              </p>
            </div>

            {/* Quick Conversion Reference Table */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Quick Word-to-Page Conversion Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      <th className="py-2.5 px-3">Word Target</th>
                      <th className="py-2.5 px-3">Single Spaced (500 w/p)</th>
                      <th className="py-2.5 px-3">Double Spaced (250 w/p)</th>
                      <th className="py-2.5 px-3">Handwritten A4 (175 w/p)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                    <tr>
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">500 words</td>
                      <td className="py-2 px-3">1.0 page</td>
                      <td className="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">2.0 pages</td>
                      <td className="py-2 px-3">2.9 pages</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">1,000 words</td>
                      <td className="py-2 px-3">2.0 pages</td>
                      <td className="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">4.0 pages</td>
                      <td className="py-2 px-3">5.7 pages</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">1,500 words</td>
                      <td className="py-2 px-3">3.0 pages</td>
                      <td className="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">6.0 pages</td>
                      <td className="py-2 px-3">8.6 pages</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">2,000 words</td>
                      <td className="py-2 px-3">4.0 pages</td>
                      <td className="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">8.0 pages</td>
                      <td className="py-2 px-3">11.4 pages</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">3,000 words</td>
                      <td className="py-2 px-3">6.0 pages</td>
                      <td className="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">12.0 pages</td>
                      <td className="py-2 px-3">17.1 pages</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Formatting Advice</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Key Formatting Tips for Precise Page Counts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Stick to standard 12pt fonts like Times New Roman or Calibri to prevent awkward line breaks.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Set margins to exactly 1-inch (2.54 cm) on top, bottom, left, and right sides.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Remember that block quotes, tables, and graphs take up extra vertical space.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Use our live word counter tool to confirm your exact text length before final submission.</span>
              </div>
            </div>
          </div>

          {/* 4 FAQs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Questions & Answers</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Words to Pages FAQ
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white focus:outline-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 rounded-full p-1 text-slate-400 group-open:rotate-180 transition-transform">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* More Tools */}
        <MoreToolsSection currentPath="/words-to-pages-converter" />
      </main>
    </>
  );
};
