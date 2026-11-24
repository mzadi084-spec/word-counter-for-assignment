import React, { useMemo, useState } from 'react';
import { analyzeText, calculateAssignmentWordLimit } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the assignment word limit tolerance rule work?',
    a: 'Many university departments permit ±5% or ±10% around the stated word target (for example, 1,800 to 2,200 words for a 2,000-word essay under ±10%), while strict exams enforce a 0% hard cap. Enter your course percentage above to check your exact safe range.',
  },
  {
    q: 'How are introduction, body, and conclusion words planned?',
    a: 'A balanced academic heuristic uses the 10-80-10 rule: roughly 10% for the introduction, 80% for body paragraphs, and 10% for the conclusion.',
  },
  {
    q: 'Does every university allow ±10% tolerance?',
    a: 'No. Some courses specify ±5% or custom tolerances, and timed exams or scholarship portals enforce a strict ceiling with 0% above the limit. Always check your module handbook.',
  },
  {
    q: 'Can I paste my draft here to see if it falls inside the safe window?',
    a: 'Yes. Paste your current draft in the optional draft check box below the target settings to check instantly whether you are under, within the safe window, or over.',
  },
];

export const AssignmentWordLimitCalculatorPage: React.FC = () => {
  const [targetWords, setTargetWords] = useState<number>(2000);
  const [tolerance, setTolerance] = useState<number>(10);
  const [draftText, setDraftText] = useState<string>('');

  const draftStats = useMemo(() => analyzeText(draftText), [draftText]);
  const calc = useMemo(
    () => calculateAssignmentWordLimit(targetWords, tolerance, draftStats.words),
    [targetWords, tolerance, draftStats.words]
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
    name: 'Assignment Word Limit Calculator',
    url: buildCanonicalUrl('/assignment-word-limit-calculator'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Calculate safe 0%, ±5%, ±10%, or custom course word count windows, 10-80-10 essay section word budgets, and test drafts against limits.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Assignment Word Limit Calculator', path: '/assignment-word-limit-calculator' },
  ]);

  return (
    <>
      <SEOHead
        title="Assignment Word Limit Calculator – Custom % Range & Essay Sections"
        description="Free assignment word limit calculator. Calculate safe minimum and maximum ranges for 0%, ±5%, ±10%, or custom tolerances plus 10-80-10 essay section budgets."
        canonicalPath="/assignment-word-limit-calculator"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Academic Tolerance &amp; Section Planner &middot; 10-80-10 Structure
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Assignment Word Limit Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Calculate your safe minimum and maximum word count range using 0%, &plusmn;5%, &plusmn;10%, or a custom tolerance percentage, and generate a 10-80-10 essay section plan.
          </p>
        </header>

        <section className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
          {/* Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label htmlFor="target-limit-input" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Target Assignment Word Count
              </label>
              <input
                id="target-limit-input"
                type="number"
                min="50"
                step="100"
                value={targetWords}
                onChange={(e) => setTargetWords(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full px-4 py-3 text-2xl font-bold font-mono-num rounded-xl border border-zinc-300 focus:outline-none focus:border-zinc-950"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[500, 1000, 1500, 2000, 2500, 3000, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetWords(preset)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-mono-num font-medium border cursor-pointer ${
                      targetWords === preset
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-950'
                    }`}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="custom-tolerance-input"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-600"
              >
                Allowed Course Tolerance (%)
              </label>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <div className="grid grid-cols-4 gap-2 flex-1">
                  {[0, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTolerance(pct)}
                      className={`py-3 rounded-xl text-sm font-bold font-mono-num border transition-colors cursor-pointer ${
                        tolerance === pct
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-950'
                      }`}
                    >
                      &plusmn;{pct}%
                    </button>
                  ))}
                </div>
                <div className="relative sm:w-28">
                  <input
                    id="custom-tolerance-input"
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    aria-label="Custom course tolerance percentage"
                    value={tolerance}
                    onChange={(e) => {
                      const raw = e.target.value === '' ? 0 : Number(e.target.value);
                      const next = Number.isNaN(raw) ? 0 : Math.min(50, Math.max(0, Math.round(raw)));
                      setTolerance(next);
                    }}
                    className="w-full h-full px-3 py-2.5 pr-7 text-base font-bold font-mono-num rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-950 focus:outline-none focus:bg-white focus:border-zinc-950"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    %
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                Select 0% if your syllabus enforces a strict cap, or enter any course percentage up to &plusmn;50%.
              </p>
            </div>
          </div>

          {/* Safe Range Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-200">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Minimum Safe Words
              </div>
              <div className="text-3xl font-bold font-mono-num text-zinc-950 mt-1">
                {calc.minWords.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                Target Safe Window
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-num mt-1">
                {calc.minWords.toLocaleString()} &ndash; {calc.maxWords.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Maximum Safe Words
              </div>
              <div className="text-3xl font-bold font-mono-num text-zinc-950 mt-1">
                {calc.maxWords.toLocaleString()}
              </div>
            </div>
          </div>

          {/* 10-80-10 Section Breakdown */}
          <div className="pt-4 border-t border-zinc-200">
            <h2 className="text-sm font-bold text-zinc-950 mb-3">
              Recommended Section Word Budget (10-80-10 Guide)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="text-xs text-zinc-500 font-medium">Introduction (~10%)</div>
                <div className="text-xl font-bold font-mono-num text-zinc-950 mt-1">
                  ~{calc.introWords.toLocaleString()} words
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="text-xs text-zinc-500 font-medium">Body Paragraphs (~80%)</div>
                <div className="text-xl font-bold font-mono-num text-zinc-950 mt-1">
                  ~{calc.bodyWords.toLocaleString()} words
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="text-xs text-zinc-500 font-medium">Conclusion (~10%)</div>
                <div className="text-xl font-bold font-mono-num text-zinc-950 mt-1">
                  ~{calc.conclusionWords.toLocaleString()} words
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="text-xs text-zinc-500 font-medium">Est. Body Paragraphs</div>
                <div className="text-xl font-bold font-mono-num text-zinc-950 mt-1">
                  ~{calc.suggestedParagraphs} blocks
                </div>
              </div>
            </div>
          </div>

          {/* Optional Draft Verification */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="limit-draft-box" className="text-xs font-semibold text-zinc-700">
                Optional: Paste Draft to Check Compliance
              </label>
              {calc.status !== 'empty' && (
                <span className="text-xs font-semibold font-mono-num px-2.5 py-1 rounded-md border border-zinc-950 text-zinc-950 bg-zinc-50">
                  {calc.currentWords.toLocaleString()} words &middot;{' '}
                  {calc.status === 'within'
                    ? 'Within Safe Range'
                    : calc.status === 'under'
                    ? `${calc.deltaToRange.toLocaleString()} below minimum`
                    : `${calc.deltaToRange.toLocaleString()} above maximum`}
                </span>
              )}
            </div>
            <textarea
              id="limit-draft-box"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="Paste your draft here to check whether your current word count sits inside your safe minimum and maximum range..."
              className="w-full min-h-[150px] p-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-950 placeholder-zinc-400 text-sm leading-relaxed focus:outline-none focus:bg-white focus:border-zinc-950 resize-y"
            />
          </div>
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Word Limit Calculator FAQ</h2>
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

        <MoreToolsSection currentPath="/assignment-word-limit-calculator" />
        <PopularGuidesSection
          title="Word Limit & University Formatting Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'hub' || g.cluster === 'counting')}
        />
      </main>
    </>
  );
};
