import React, { useState } from 'react';
import { convertWordsToPages, PagesResult } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { ChevronDown } from 'lucide-react';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';

const FAQS = [
  {
    q: 'How many words are on a standard single-spaced page?',
    a: 'Using a standard 12-point font with 1-inch margins, a single-spaced page holds approximately 500 words.',
  },
  {
    q: 'How many words are on a standard double-spaced page?',
    a: 'A double-spaced academic page (common for APA, MLA, and Chicago formatting) fits approximately 250 words per page.',
  },
  {
    q: 'How many words fit on a handwritten A4 page?',
    a: 'On lined A4 paper under typical exam conditions, average handwriting fits approximately 175 words per page, depending on handwriting size.',
  },
  {
    q: 'Essay kitne pages ka hona chahiye? (Roman Urdu)',
    a: 'Standard double spacing (250 words/page) ke mutabiq 1,000 words ka essay taqreeban 4 pages aur 1,500 words ka essay 6 pages ka hota hai. Single spacing (~500 words/page) mein yahi length 2 se 3 pages banti hai—lekin hamesha apne syllabus ki exact guideline zaroor check karein.',
  },
  {
    q: 'Why do different fonts change physical page count?',
    a: 'Different typefaces have distinct character widths and spacing. Condensed serif fonts fit slightly more words per line than wider sans-serif typefaces.',
  },
];

export const WordsToPagesPage: React.FC = () => {
  const [wordsInput, setWordsInput] = useState<number | ''>(1500);

  const wordCount =
    typeof wordsInput === 'number' && !isNaN(wordsInput) ? Math.max(0, wordsInput) : 0;
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
    url: buildCanonicalUrl('/words-to-pages-converter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Estimate words to pages for single spacing (~500 w/p), double spacing (~250 w/p), and handwritten A4 (~175 w/p).',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Words to Pages Converter', path: '/words-to-pages-converter' },
  ]);

  return (
    <>
      <SEOHead
        title="Words to Pages Converter – Single, Double & Handwritten"
        description="Free words to pages converter. Estimate page count for single spacing (~500 w/p), double spacing (~250 w/p), and handwritten A4 (~175 w/p)."
        canonicalPath="/words-to-pages-converter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-6 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Academic Page Length Estimator &middot; Client-Side Calculation
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Words to Pages Converter
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Estimate how many pages your assignment or thesis will cover across single spacing, double spacing, and handwritten A4 sheets.
          </p>
        </header>

        <section
          aria-label="Interactive Words to Pages Calculator"
          className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-8"
        >
          <div className="max-w-xl mx-auto space-y-3 text-center">
            <label
              htmlFor="word-count-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Enter Total Word Count
            </label>
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
              className="w-full max-w-sm mx-auto block text-center text-3xl sm:text-4xl font-bold px-5 py-3.5 rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-950 focus:outline-none focus:border-zinc-950 font-mono-num"
            />
            <p className="text-xs text-zinc-500">
              Roman Urdu Tip: Apne assignment ke words enter karein. Double spacing (~250 words/page) aur single spacing (~500 words/page) ka andaza dekhein.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setWordsInput(preset)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-colors cursor-pointer font-mono-num ${
                    wordsInput === preset
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-950'
                  }`}
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-200">
            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Single Spacing (1.0)
              </p>
              <p className="text-4xl font-bold text-zinc-950 font-mono-num">
                {result.singleSpacing}
              </p>
              <p className="text-xs font-semibold text-zinc-700">
                {result.singleSpacing === 1 ? 'Page' : 'Pages'}
              </p>
              <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-200">
                Estimate: ~500 words per page (12pt font, 1-inch margins).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 text-white border border-zinc-950 text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Double Spacing (2.0) &middot; Common Standard
              </p>
              <p className="text-4xl font-bold text-white font-mono-num">
                {result.doubleSpacing}
              </p>
              <p className="text-xs font-semibold text-zinc-200">
                {result.doubleSpacing === 1 ? 'Page' : 'Pages'}
              </p>
              <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                Estimate: ~250 words per page (APA, MLA, Harvard, Chicago drafts).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Handwritten (Lined A4)
              </p>
              <p className="text-4xl font-bold text-zinc-950 font-mono-num">
                {result.handwrittenA4}
              </p>
              <p className="text-xs font-semibold text-zinc-700">
                {result.handwrittenA4 === 1 ? 'Page' : 'Pages'}
              </p>
              <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-200">
                Estimate: ~175 words per sheet; varies by handwriting size.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Formatting Reference
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mt-1">
                How Words Convert to Physical Pages in Academic Writing
              </h2>
            </div>

            <div className="space-y-4 text-zinc-700 text-base leading-relaxed">
              <p>
                When an assignment brief asks for a specific page range instead of a word count, students need a practical estimate before submitting. Standard double-spaced essays in 12-point font with 1-inch margins average roughly 250 words per page, though actual page length shifts with headings, tables, and margins.
              </p>
              <p>
                Single-spaced reports place roughly 500 words per page, while handwritten lined A4 sheets usually fit around 175 words per page depending on letter size and line spacing. Always follow your own department formatting template.
              </p>
            </div>

            <div className="overflow-x-auto pt-4 border-t border-zinc-200">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase text-zinc-600">
                    <th className="py-2.5 px-3">Word Target</th>
                    <th className="py-2.5 px-3">Single Spaced (~500 w/p)</th>
                    <th className="py-2.5 px-3">Double Spaced (~250 w/p)</th>
                    <th className="py-2.5 px-3">Handwritten A4 (~175 w/p)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono-num text-xs text-zinc-800">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-zinc-950">500 words</td>
                    <td className="py-2.5 px-3">1.0 page</td>
                    <td className="py-2.5 px-3 font-semibold">2.0 pages</td>
                    <td className="py-2.5 px-3">2.9 pages</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-zinc-950">1,000 words</td>
                    <td className="py-2.5 px-3">2.0 pages</td>
                    <td className="py-2.5 px-3 font-semibold">4.0 pages</td>
                    <td className="py-2.5 px-3">5.7 pages</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-zinc-950">1,500 words</td>
                    <td className="py-2.5 px-3">3.0 pages</td>
                    <td className="py-2.5 px-3 font-semibold">6.0 pages</td>
                    <td className="py-2.5 px-3">8.6 pages</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-zinc-950">2,000 words</td>
                    <td className="py-2.5 px-3">4.0 pages</td>
                    <td className="py-2.5 px-3 font-semibold">8.0 pages</td>
                    <td className="py-2.5 px-3">11.4 pages</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-zinc-950">3,000 words</td>
                    <td className="py-2.5 px-3">6.0 pages</td>
                    <td className="py-2.5 px-3 font-semibold">12.0 pages</td>
                    <td className="py-2.5 px-3">17.1 pages</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Words to Pages FAQ</h2>
            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-zinc-950">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2.5 text-sm text-zinc-600 leading-relaxed pr-6">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MoreToolsSection currentPath="/words-to-pages-converter" />

        <PopularGuidesSection
          title="Words to Pages Formatting Guides"
          subtitle="Detailed page-count charts and section plans for 500, 1,000, 1,500, 2,000, 3,300, and 10,000-word assignments."
          guides={STATIC_BLOG_GUIDES.filter(
            (g) => g.cluster === 'pages' || g.cluster === 'hub'
          )}
        />
      </main>
    </>
  );
};
