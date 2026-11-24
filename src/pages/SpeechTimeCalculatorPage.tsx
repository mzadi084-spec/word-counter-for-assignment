import React, { useMemo, useState } from 'react';
import { analyzeText, formatTime } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { ChevronDown, Trash2 } from 'lucide-react';

const SPEAKING_SPEEDS = [
  { label: 'Slow / Deliberate', wpm: 110 },
  { label: 'Clear Academic', wpm: 130 },
  { label: 'Conversational', wpm: 150 },
  { label: 'Brisk Delivery', wpm: 170 },
];

const FAQS = [
  {
    q: 'What speaking pace is best for university presentations and vivas?',
    a: 'About 120 to 135 words per minute works well for academic presentations so listeners have time to absorb technical terms and charts.',
  },
  {
    q: 'How many words fit in a 10-minute presentation?',
    a: 'At approximately 130 words per minute, a 10-minute script contains roughly 1,200 to 1,300 spoken words, leaving small pauses for slides.',
  },
  {
    q: 'Why does this calculator include a pause or Q&A buffer?',
    a: 'Real presentations include transitions between slides, emphasis pauses, and brief audience questions. Adding a 1-to-2 minute buffer prevents getting cut off.',
  },
  {
    q: 'Does reading aloud take longer than silent reading?',
    a: 'Yes. Pronouncing every syllable clearly and pausing at punctuation typically reduces speed from ~200 WPM silently to roughly ~130 WPM aloud.',
  },
];

export const SpeechTimeCalculatorPage: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'count'>('text');
  const [scriptText, setScriptText] = useState('');
  const [manualWords, setManualWords] = useState<number | ''>(1300);
  const [speakingWpm, setSpeakingWpm] = useState<number>(130);
  const [bufferMinutes, setBufferMinutes] = useState<number>(1);

  const parsedStats = useMemo(() => analyzeText(scriptText), [scriptText]);
  const activeWords =
    mode === 'text'
      ? parsedStats.words
      : typeof manualWords === 'number' && !isNaN(manualWords)
      ? Math.max(0, manualWords)
      : 0;

  const baseMinutes = activeWords / speakingWpm;
  const totalWithBuffer = baseMinutes + (activeWords > 0 ? bufferMinutes : 0);

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
    name: 'Speech Time Calculator',
    url: buildCanonicalUrl('/speech-time-calculator'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Estimate oral presentation, viva, and speech time from a script or word count across slow, normal, and brisk speaking paces.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Speech Time Calculator', path: '/speech-time-calculator' },
  ]);

  return (
    <>
      <SEOHead
        title="Speech Time Calculator – Estimate Presentation & Speech Duration"
        description="Free speech time calculator for students and speakers. Calculate presentation duration from your script or word count at 110–170 WPM with pause buffers."
        canonicalPath="/speech-time-calculator"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Presentation &amp; Viva Timing Calculator &middot; 110 to 170 WPM
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Speech Time Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Calculate how long it takes to deliver your presentation, debate, or thesis defense script aloud—including optional slide and Q&amp;A buffer time.
          </p>
        </header>

        <section className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] uppercase tracking-wider text-zinc-300 font-medium">
                Speaking Duration ({speakingWpm} WPM)
              </div>
              <div className="text-3xl font-bold font-mono-num mt-1">
                {formatTime(baseMinutes)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                With +{bufferMinutes} min Buffer
              </div>
              <div className="text-3xl font-bold text-zinc-950 font-mono-num mt-1">
                {formatTime(totalWithBuffer)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                Script Word Count
              </div>
              <div className="text-3xl font-bold text-zinc-950 font-mono-num mt-1">
                {activeWords.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-zinc-200 py-4">
            <div className="inline-flex rounded-lg bg-zinc-100 p-1">
              <button
                type="button"
                onClick={() => setMode('text')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                  mode === 'text' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                Paste Script
              </button>
              <button
                type="button"
                onClick={() => setMode('count')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                  mode === 'count' ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                Enter Word Count
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">Pace:</span>
                {SPEAKING_SPEEDS.map((s) => (
                  <button
                    key={s.wpm}
                    type="button"
                    onClick={() => setSpeakingWpm(s.wpm)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                      speakingWpm === s.wpm
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-950'
                    }`}
                  >
                    {s.wpm} WPM
                  </button>
                ))}
              </div>

              <label className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700">
                <span>Buffer (min):</span>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={bufferMinutes}
                  onChange={(e) => setBufferMinutes(Math.max(0, Number(e.target.value) || 0))}
                  className="w-16 px-2 py-1 rounded-lg border border-zinc-300 font-mono-num text-xs focus:outline-none focus:border-zinc-950"
                />
              </label>
            </div>
          </div>

          {mode === 'text' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="speech-script" className="text-xs font-semibold text-zinc-700">
                  Paste speech or presentation script
                </label>
                <button
                  type="button"
                  onClick={() => setScriptText('')}
                  disabled={!scriptText}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-200 text-zinc-700 hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
              <textarea
                id="speech-script"
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                placeholder="Paste your presentation script here..."
                className="w-full min-h-[210px] p-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none focus:bg-white focus:border-zinc-950 resize-y"
              />
            </div>
          ) : (
            <div className="py-4 space-y-2 max-w-md">
              <label htmlFor="manual-speech-words" className="block text-xs font-semibold text-zinc-700">
                Word Count
              </label>
              <input
                id="manual-speech-words"
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

          <div className="pt-4 border-t border-zinc-200">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Target Script Lengths by Presentation Slot (~{speakingWpm} WPM)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[3, 5, 10, 15].map((mins) => (
                <div key={mins} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-xs font-semibold text-zinc-950">{mins}-Minute Slot</div>
                  <div className="text-sm font-mono-num text-zinc-700 mt-1">
                    ~{(mins * speakingWpm).toLocaleString()} words
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Speech Time Calculator FAQ</h2>
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

        <MoreToolsSection currentPath="/speech-time-calculator" />
        <PopularGuidesSection
          title="Presentation & Speaking Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'speaking' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
