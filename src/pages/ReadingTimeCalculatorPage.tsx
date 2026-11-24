import React, { useMemo, useState } from 'react';
import { analyzeText, formatTime } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { ChevronDown, Trash2 } from 'lucide-react';

const SPEED_OPTIONS = [
  { label: 'Slow / Technical', wpm: 150 },
  { label: 'Careful Study', wpm: 175 },
  { label: 'Average Silent', wpm: 200 },
  { label: 'Fast Reader', wpm: 250 },
  { label: 'Skimming', wpm: 300 },
];

const FAQS = [
  {
    q: 'What reading speed is used as the default estimate?',
    a: 'The standard baseline uses approximately 200 words per minute (WPM), while letting you switch between 150 WPM (dense academic/technical prose) and 300 WPM (skimming) or set a custom speed.',
  },
  {
    q: 'How long does it take to read 1,000 words silently?',
    a: 'At an average pace of about 200 WPM, 1,000 words takes roughly 5 minutes to read silently. Dense research papers at 150 WPM take closer to 6 minutes 40 seconds.',
  },
  {
    q: 'Does silent reading take less time than speaking aloud?',
    a: 'Yes. Silent reading generally averages about 200 WPM, whereas clear presentations or reading aloud average roughly 130 WPM.',
  },
  {
    q: 'Can I estimate reading time from a word count without pasting text?',
    a: 'Yes. Switch to the Word Count tab above the calculator and enter any number of words.',
  },
];

export const ReadingTimeCalculatorPage: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'count'>('text');
  const [text, setText] = useState('');
  const [manualWords, setManualWords] = useState<number | ''>(1500);
  const [selectedWpm, setSelectedWpm] = useState<number>(200);

  const textStats = useMemo(() => analyzeText(text), [text]);
  const activeWords =
    mode === 'text'
      ? textStats.words
      : typeof manualWords === 'number' && !isNaN(manualWords)
      ? Math.max(0, manualWords)
      : 0;

  const estimatedText = formatTime(activeWords / selectedWpm);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reading Time Calculator',
    url: buildCanonicalUrl('/reading-time-calculator'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Estimate silent reading duration by pasting text or entering word counts across multiple reading speeds.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Reading Time Calculator', path: '/reading-time-calculator' },
  ]);

  return (
    <>
      <SEOHead
        title="Reading Time Calculator – Estimate Silent Reading Duration"
        description="Free reading time calculator for students and writers. Paste text or enter a word count to estimate reading duration across 150 to 300 WPM speeds."
        canonicalPath="/reading-time-calculator"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Silent Reading Estimator &middot; 150 to 300 WPM
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Reading Time Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Estimate how long an article, essay, or research chapter takes to read silently by pasting text or entering a word count.
          </p>
        </header>

        <section className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
          {/* Primary Result Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] uppercase tracking-wider text-zinc-300 font-medium">
                Estimated Reading Time ({selectedWpm} WPM)
              </div>
              <div className="text-3xl font-bold font-mono-num mt-1">{estimatedText}</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Total Words
              </div>
              <div className="text-3xl font-bold text-zinc-950 font-mono-num mt-1">
                {activeWords.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Reading Pace
              </div>
              <div className="text-3xl font-bold text-zinc-950 font-mono-num mt-1">
                {selectedWpm} WPM
              </div>
            </div>
          </div>

          {/* Mode Tabs & Speed Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-zinc-200 py-4">
            <div className="inline-flex rounded-lg bg-zinc-100 p-1">
              <button
                type="button"
                onClick={() => setMode('text')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'text' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                Paste Text
              </button>
              <button
                type="button"
                onClick={() => setMode('count')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'count' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                Enter Word Count
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-zinc-600">Speed:</span>
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt.wpm}
                  type="button"
                  onClick={() => setSelectedWpm(opt.wpm)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    selectedWpm === opt.wpm
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-950'
                  }`}
                >
                  {opt.wpm} WPM
                </button>
              ))}
              <input
                type="number"
                aria-label="Custom reading speed WPM"
                min="60"
                max="600"
                value={selectedWpm}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val > 0) setSelectedWpm(Math.min(1000, Math.max(20, val)));
                }}
                className="w-20 px-2.5 py-1.5 text-xs font-mono-num rounded-lg border border-zinc-300 focus:outline-none focus:border-zinc-950"
              />
            </div>
          </div>

          {mode === 'text' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="reading-text" className="text-xs font-semibold text-zinc-700">
                  Paste essay, notes, or article text
                </label>
                <button
                  type="button"
                  onClick={() => setText('')}
                  disabled={!text}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-200 text-zinc-700 hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
              <textarea
                id="reading-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here to calculate silent reading time..."
                className="w-full min-h-[210px] p-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none focus:bg-white focus:border-zinc-950 resize-y"
              />
            </div>
          ) : (
            <div className="py-4 space-y-3 max-w-md">
              <label htmlFor="manual-reading-words" className="block text-xs font-semibold text-zinc-700">
                Word Count
              </label>
              <input
                id="manual-reading-words"
                type="number"
                min="0"
                step="50"
                value={manualWords}
                onChange={(e) => {
                  const v = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                  setManualWords(v === '' || isNaN(v) ? '' : v);
                }}
                className="w-full px-4 py-3 text-2xl font-bold font-mono-num rounded-xl border border-zinc-300 focus:outline-none focus:border-zinc-950"
              />
            </div>
          )}

          {/* Speed Comparison Strip */}
          <div className="pt-4 border-t border-zinc-200">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Comparison Across Reading Speeds
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {SPEED_OPTIONS.map((opt) => (
                <div key={opt.wpm} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[11px] font-medium text-zinc-500">{opt.label}</div>
                  <div className="text-xs font-mono-num text-zinc-500 mb-1">{opt.wpm} WPM</div>
                  <div className="text-base font-bold font-mono-num text-zinc-950">
                    {formatTime(activeWords / opt.wpm)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Reading Time Calculator FAQ</h2>
            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {FAQS.map((faq, idx) => (
                <details key={idx} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-zinc-950">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed pr-6">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MoreToolsSection currentPath="/reading-time-calculator" />
        <PopularGuidesSection
          title="Reading & Speaking Time Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'speaking' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
