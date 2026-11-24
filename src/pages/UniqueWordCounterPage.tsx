import React, { useMemo, useState } from 'react';
import { analyzeUniqueWords } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { Check, ChevronDown, Copy, FileText, Search, Trash2 } from 'lucide-react';

const UNIQUE_SAMPLE =
  'Academic research relies on clear evidence and precise terminology. Strong evidence supports each claim, while repetitive filler weakens clarity. Reviewing unique words helps writers spot overused verbs and diversify academic vocabulary across paragraphs.';

const FAQS = [
  {
    q: 'What is a unique word count?',
    a: 'Unique word count measures distinct vocabulary items in your text regardless of how many times each word repeats. It counts "research" and "Research" once rather than twice.',
  },
  {
    q: 'What does lexical diversity percentage show?',
    a: 'Lexical diversity divides unique words by total words (Unique Words / Total Words × 100). Higher percentages show broader vocabulary variety across shorter passages.',
  },
  {
    q: 'Why is there an Ignore Stop Words toggle?',
    a: 'Common function words such as "the", "and", "in", or "hai" naturally top every text. Filtering stop words surfaces the topical content words you may be over-repeating.',
  },
  {
    q: 'How can this help lower assignment word count?',
    a: 'Sorting the table by highest frequency helps identify crutch words and redundant phrases that can be consolidated during academic editing.',
  },
];

export const UniqueWordCounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [ignoreStopWords, setIgnoreStopWords] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(
    () => analyzeUniqueWords(text, ignoreStopWords),
    [text, ignoreStopWords]
  );

  const filteredEntries = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return analysis.entries;
    return analysis.entries.filter((e) => e.word.includes(q));
  }, [analysis.entries, filterQuery]);

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
    name: 'Unique Word Counter',
    url: buildCanonicalUrl('/unique-word-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Count distinct unique words, lexical diversity percentage, repeated words, and inspect full word frequency tables in your browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Unique Word Counter', path: '/unique-word-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="Unique Word Counter – Distinct Vocabulary & Frequency Table"
        description="Free online unique word counter and word frequency checker. Measure distinct words, lexical diversity, repeated words, and filter stop words locally."
        canonicalPath="/unique-word-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Lexical Diversity &amp; Word Frequency Checker
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Unique Word Counter
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Count distinct words, check lexical diversity percentage, filter stop words, and inspect how frequently each term appears in your assignment.
          </p>
        </header>

        <section className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3.5 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                Unique Words
              </div>
              <div className="text-2xl font-bold font-mono-num mt-0.5">
                {analysis.uniqueWords.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Total Words
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.totalWords.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Lexical Diversity
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.lexicalDiversityPct}%
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Repeated Terms
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.repeatedUniqueWords.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Single-Use Words
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.singleOccurrenceWords.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreStopWords}
                  onChange={(e) => setIgnoreStopWords(e.target.checked)}
                  className="rounded border-zinc-300 accent-zinc-950"
                />
                <span>Ignore common stop words in table</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setText(UNIQUE_SAMPLE)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Load Sample</span>
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
              aria-label="Unique word counter text editor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your essay or article here to count unique words and analyze word frequencies..."
              className="w-full min-h-[220px] p-5 bg-white text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none resize-y"
            />
          </div>

          {analysis.entries.length > 0 && (
            <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-zinc-950">
                  Word Frequency Table ({filteredEntries.length} terms)
                </h2>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    aria-label="Filter word list"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Filter words..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs text-zinc-950 focus:outline-none focus:border-zinc-950"
                  />
                </div>
              </div>
              <div className="overflow-x-auto max-h-[340px] overflow-y-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4">Word</th>
                      <th className="py-2.5 px-4 text-right">Count</th>
                      <th className="py-2.5 px-4 text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {filteredEntries.slice(0, 200).map((entry) => (
                      <tr key={entry.word}>
                        <td className="py-2 px-4 font-medium text-zinc-950">{entry.word}</td>
                        <td className="py-2 px-4 text-right font-mono-num text-zinc-950">
                          {entry.count}
                        </td>
                        <td className="py-2 px-4 text-right font-mono-num text-zinc-600">
                          {entry.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Unique Word Counter FAQ</h2>
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

        <MoreToolsSection currentPath="/unique-word-counter" />
        <PopularGuidesSection
          title="Editing & Vocabulary Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'counting' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
