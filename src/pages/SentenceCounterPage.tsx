import React, { useMemo, useState } from 'react';
import { analyzeSentences } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { Check, ChevronDown, Copy, FileText, Trash2 } from 'lucide-react';

const SAMPLE_SENTENCES =
  'Clear academic prose helps readers follow each argument step by step. For example, Dr. Khan noted that concise topic sentences improve grading clarity. Shorter sentences work well for direct claims! Longer analytical sentences should still stay focused and easy to read. اردو جملوں کے اختتام پر ۔ اور سوالیہ نشان ؟ بھی شمار ہوتے ہیں۔';

const FAQS = [
  {
    q: 'How does the Sentence Counter handle abbreviations like "e.g." or "Dr."?',
    a: 'Common abbreviations such as Dr., Prof., Mr., Mrs., e.g., i.e., Fig., and decimal numbers like 3.5 are preserved inside their parent sentence instead of triggering false sentence splits.',
  },
  {
    q: 'Does it support Urdu sentence endings?',
    a: 'Yes. It counts English sentence terminators (. ! ?) alongside the Urdu full stop (۔) and Urdu question mark (؟).',
  },
  {
    q: 'What is a good average sentence length for university essays?',
    a: 'Most academic writing guides recommend averaging roughly 15 to 22 words per sentence, mixing crisp 10-word topic claims with 20-to-25-word analytical sentences.',
  },
  {
    q: 'How can I spot run-on sentences with this tool?',
    a: 'Inspect the sentence breakdown table below the editor. Any sentence over 35 words is highlighted for length so you can decide whether to split it into two clearer statements.',
  },
];

export const SentenceCounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => analyzeSentences(text), [text]);

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
    name: 'Sentence Counter Online',
    url: buildCanonicalUrl('/sentence-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Free sentence counter for students. Count total sentences, average words per sentence, shortest/longest sentence, and inspect every sentence.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Sentence Counter', path: '/sentence-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="Sentence Counter Online – Count Sentences & Average Length"
        description="Free online sentence counter for essays. Count English and Urdu sentences (۔ ؟), check average sentence length, and review a sentence-by-sentence breakdown."
        canonicalPath="/sentence-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Sentence &amp; Readability Analyzer &middot; English &amp; Urdu Punctuation
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Online Sentence Counter &amp; Length Analyzer
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Count total sentences, measure average words per sentence, and review every sentence individually to catch run-ons before submitting.
          </p>
        </header>

        <section aria-label="Sentence Counter Tool" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3.5 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                Sentences
              </div>
              <div className="text-2xl font-bold font-mono-num mt-0.5">
                {analysis.sentenceCount.toLocaleString()}
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
                Avg Words / Sentence
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.avgWordsPerSentence}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Shortest
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.shortestSentenceWords} w
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Longest
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {analysis.longestSentenceWords} w
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
              <span className="text-xs font-medium text-zinc-600">
                Abbreviation-aware splitting (e.g., i.e., Dr., Fig., Urdu ۔ and ؟)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_SENTENCES)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Load Sample</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-950 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setText('')}
                  disabled={!text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <textarea
              aria-label="Sentence counter text editor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your essay or paragraph here to count sentences and inspect each sentence length..."
              className="w-full min-h-[240px] p-5 bg-white text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none resize-y"
            />
          </div>

          {analysis.sentences.length > 0 && (
            <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <h2 className="text-sm font-bold text-zinc-950">
                  Sentence-by-Sentence Breakdown ({analysis.sentences.length})
                </h2>
                <span className="text-xs text-zinc-500">
                  Target academic range: ~15 to 22 words
                </span>
              </div>
              <div className="overflow-x-auto max-h-[340px] overflow-y-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4 w-12">#</th>
                      <th className="py-2.5 px-4">Sentence</th>
                      <th className="py-2.5 px-4 text-right w-24">Words</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {analysis.sentences.slice(0, 100).map((item) => (
                      <tr key={item.index} className={item.words > 35 ? 'bg-zinc-50' : ''}>
                        <td className="py-2.5 px-4 font-mono-num text-zinc-500">{item.index}</td>
                        <td className="py-2.5 px-4 text-zinc-800">{item.text}</td>
                        <td className="py-2.5 px-4 text-right font-mono-num font-semibold text-zinc-950">
                          {item.words}
                          {item.words > 35 && (
                            <span className="block text-[10px] font-normal text-zinc-500">
                              Long
                            </span>
                          )}
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
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950">
              Improving Sentence Rhythm in Academic Writing
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              Strong university writing pairs concise topic claims (8 to 14 words) with well-paced analytical sentences (16 to 24 words). When several consecutive sentences stretch past 35 words, breaking the longest sentence into two clearer statements dramatically improves grading readability without removing evidence.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Sentence Counter FAQ</h2>
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

        <MoreToolsSection currentPath="/sentence-counter" />
        <PopularGuidesSection
          title="Sentence & Readability Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'counting' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
