import React, { useEffect, useMemo, useState } from 'react';
import { calculateWpm, extractWordTokens } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { ChevronDown, Play, RotateCcw, Square } from 'lucide-react';

const PASSAGE_SAMPLE =
  'Effective academic writing depends on planning your thesis, checking paragraph balance, and confirming assignment word limits before submission. Reading your draft aloud helps uncover run-on sentences, awkward transitions, and repeated phrases that shorten clarity.';

const FAQS = [
  {
    q: 'How is Words Per Minute (WPM) calculated?',
    a: 'Words Per Minute divides your total word count by total elapsed time in minutes (words / (seconds / 60)). For example, 600 words read in 3 minutes equals 200 WPM.',
  },
  {
    q: 'What is a typical speaking vs reading vs typing WPM?',
    a: 'As general averages, clear oral speaking runs around 120 to 150 WPM, silent reading runs roughly 200 to 250 WPM, and everyday typing speeds range roughly 40 to 70 WPM.',
  },
  {
    q: 'Can I measure my own reading aloud pace here?',
    a: 'Yes. Switch to the Live Stopwatch Test tab, paste your presentation script or keep the default academic passage, press Start Timer, read aloud, and press Stop Timer to see your exact WPM.',
  },
  {
    q: 'Does this tool send any timing or text data online?',
    a: 'No. Both the formula calculator and the live stopwatch run locally inside your browser.',
  },
];

export const WordsPerMinuteCalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formula' | 'stopwatch'>('formula');

  // Formula inputs
  const [words, setWords] = useState<number>(650);
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);

  // Stopwatch state
  const [passage, setPassage] = useState<string>(PASSAGE_SAMPLE);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formulaResult = useMemo(
    () => calculateWpm(words, minutes * 60 + seconds),
    [words, minutes, seconds]
  );

  const passageWords = useMemo(() => extractWordTokens(passage).length, [passage]);
  const stopwatchResult = useMemo(
    () => calculateWpm(passageWords, elapsedSeconds, passage.length),
    [passageWords, elapsedSeconds, passage.length]
  );

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
    name: 'Words Per Minute Calculator',
    url: buildCanonicalUrl('/words-per-minute-calculator'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Calculate Words Per Minute (WPM) from words and duration or run a live reading and speaking stopwatch test in your browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Words Per Minute Calculator', path: '/words-per-minute-calculator' },
  ]);

  return (
    <>
      <SEOHead
        title="Words Per Minute Calculator – WPM Formula & Live Timer Test"
        description="Free Words Per Minute (WPM) calculator. Compute WPM from words and minutes/seconds or use the built-in stopwatch to measure your speaking or reading speed."
        canonicalPath="/words-per-minute-calculator"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            WPM Rate Calculator &amp; Live Pace Stopwatch
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Words Per Minute (WPM) Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Calculate reading, speaking, or typing speed in words per minute (WPM), or use the built-in live stopwatch on your own draft.
          </p>
        </header>

        <section className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
          <div className="inline-flex rounded-lg bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('formula')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                activeTab === 'formula' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              WPM Formula Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stopwatch')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                activeTab === 'stopwatch'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Live Reading / Speaking Timer
            </button>
          </div>

          {activeTab === 'formula' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="wpm-words" className="block text-xs font-semibold text-zinc-700">
                    Total Words
                  </label>
                  <input
                    id="wpm-words"
                    type="number"
                    min="0"
                    value={words}
                    onChange={(e) => setWords(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3.5 py-2.5 text-xl font-bold font-mono-num rounded-xl border border-zinc-300 focus:outline-none focus:border-zinc-950"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="wpm-mins" className="block text-xs font-semibold text-zinc-700">
                    Minutes
                  </label>
                  <input
                    id="wpm-mins"
                    type="number"
                    min="0"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3.5 py-2.5 text-xl font-bold font-mono-num rounded-xl border border-zinc-300 focus:outline-none focus:border-zinc-950"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="wpm-secs" className="block text-xs font-semibold text-zinc-700">
                    Seconds
                  </label>
                  <input
                    id="wpm-secs"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) =>
                      setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0)))
                    }
                    className="w-full px-3.5 py-2.5 text-xl font-bold font-mono-num rounded-xl border border-zinc-300 focus:outline-none focus:border-zinc-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-950">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-300 font-medium">
                    Words Per Minute
                  </div>
                  <div className="text-3xl font-bold font-mono-num mt-1">
                    {formulaResult.wordsPerMinute} WPM
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                    Words Per Second
                  </div>
                  <div className="text-3xl font-bold font-mono-num text-zinc-950 mt-1">
                    {formulaResult.wordsPerSecond}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                    Total Time (Seconds)
                  </div>
                  <div className="text-3xl font-bold font-mono-num text-zinc-950 mt-1">
                    {formulaResult.durationSeconds}s
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                      Elapsed Time
                    </div>
                    <div className="text-2xl font-bold font-mono-num text-zinc-950">
                      {Math.floor(elapsedSeconds / 60)}:
                      {String(elapsedSeconds % 60).padStart(2, '0')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                      Measured Pace
                    </div>
                    <div className="text-2xl font-bold font-mono-num text-zinc-950">
                      {stopwatchResult.wordsPerMinute} WPM
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                      Passage Words
                    </div>
                    <div className="text-2xl font-bold font-mono-num text-zinc-950">
                      {passageWords}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isRunning ? (
                    <button
                      type="button"
                      onClick={() => setIsRunning(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Timer</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsRunning(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>Stop Timer</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRunning(false);
                      setElapsedSeconds(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-semibold hover:border-zinc-950 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="stopwatch-passage" className="block text-xs font-semibold text-zinc-700">
                  Practice Passage (paste your own script or read the sample)
                </label>
                <textarea
                  id="stopwatch-passage"
                  value={passage}
                  onChange={(e) => setPassage(e.target.value)}
                  className="w-full min-h-[160px] p-4 rounded-xl border border-zinc-200 bg-white text-zinc-950 text-sm leading-relaxed focus:outline-none focus:border-zinc-950"
                />
              </div>
            </div>
          )}
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">WPM Calculator FAQ</h2>
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

        <MoreToolsSection currentPath="/words-per-minute-calculator" />
        <PopularGuidesSection
          title="Speaking & Timing Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'speaking' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
