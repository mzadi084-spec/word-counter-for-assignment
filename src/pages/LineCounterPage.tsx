import React, { useMemo, useState } from 'react';
import { analyzeLines, removeBlankLines } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { Check, ChevronDown, Copy, FileText, Trash2 } from 'lucide-react';

const LINE_SAMPLE = `Introduction to Research Methods\n\nParagraph one introduces the main hypothesis and scope of study.\nParagraph two examines prior empirical literature.\n\nConclusion summarizes key outcomes and recommendations.`;

const FAQS = [
  {
    q: 'What is the difference between total lines and non-empty lines?',
    a: 'Total lines count every line break in your text including blank spacing lines. Non-empty lines count only lines containing at least one visible character.',
  },
  {
    q: 'Why do applications like UCAS limit both characters and lines?',
    a: 'Forms such as UCAS personal statements enforce a maximum line limit (such as 47 lines) alongside the 4,000-character limit so students cannot compress dozens of short bullet lines past visual review bounds.',
  },
  {
    q: 'How does the Remove Blank Lines button work?',
    a: 'Clicking Remove Blank Lines strips empty whitespace-only lines from your editor immediately so you can check compact non-empty lines or copy clean text.',
  },
  {
    q: 'Is any pasted text stored on a server?',
    a: 'No. Line counting and blank-line cleanup happen inside browser memory with zero network uploads.',
  },
];

export const LineCounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeLines(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

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
    name: 'Line Counter Online',
    url: buildCanonicalUrl('/line-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Free line counter online. Count total lines, non-empty lines, blank lines, average words per line, and remove empty lines in one click.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Line Counter', path: '/line-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="Line Counter Online – Count Total, Blank & Non-Empty Lines"
        description="Free online line counter for essays, code snippets, and forms. Count total lines, non-empty lines, blank lines, and remove blank lines in your browser."
        canonicalPath="/line-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Line &amp; Whitespace Analyzer &middot; UCAS &amp; List Checker
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Online Line Counter
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Count total lines, non-empty lines, blank lines, and longest line length—and strip empty lines cleanly in your browser.
          </p>
        </header>

        <section className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3.5 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                Total Lines
              </div>
              <div className="text-2xl font-bold font-mono-num mt-0.5">
                {stats.totalLines.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Non-Empty Lines
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {stats.nonEmptyLines.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Blank Lines
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {stats.blankLines.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Avg Words / Line
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {stats.avgWordsPerLine}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Longest Line
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {stats.longestLineChars} ch
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
              <span className="text-xs font-medium text-zinc-600">
                Words counted: <strong className="font-mono-num text-zinc-950">{stats.totalWords.toLocaleString()}</strong>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setText(LINE_SAMPLE)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Load Sample</span>
                </button>
                <button
                  type="button"
                  onClick={() => setText((prev) => removeBlankLines(prev))}
                  disabled={stats.blankLines === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  <span>Remove Blank Lines</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setText('')}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <textarea
              aria-label="Line counter editor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste text, lists, citations, or application lines here to count total lines and remove extra blank lines..."
              className="w-full min-h-[250px] p-5 bg-white text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none resize-y font-mono text-sm sm:text-base"
            />
          </div>
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Line Counter FAQ</h2>
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

        <MoreToolsSection currentPath="/line-counter" />
        <PopularGuidesSection
          title="Formatting & Document Counting Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'counting' || g.cluster === 'pages')}
        />
      </main>
    </>
  );
};
