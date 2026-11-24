import React, { useMemo, useState } from 'react';
import { analyzeRomanUrdu } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { Check, ChevronDown, Copy, FileText, Trash2 } from 'lucide-react';

const ROMAN_URDU_SAMPLE =
  'Taleem har shakhs ka buniyadi haq hai. Aaj ke dor mein university assignments aur research mazmoon aksar English ya Roman Urdu mein likhe jate hain. Jab students Roman Urdu mein apna kaam tayyar karte hain to alfaz ki sahi tadad aur sentences ki length check karna bohot zaroori hota hai taake assignment word limit ke mutabiq rahe.';

const FAQS = [
  {
    q: 'How does the Roman Urdu Word Counter count words?',
    a: 'It counts Latin-script Roman Urdu words, hyphenated compounds, and any mixed English academic terms separated by whitespace, while detecting common Roman Urdu grammatical particles such as hai, hain, mein, aur, ke, and ko.',
  },
  {
    q: 'Are spellings like "bohot" vs "bahut" or "mein" vs "main" both counted properly?',
    a: 'Yes. Whether a writer spells a Roman Urdu word as "bohot" or "bahut", "taake" or "taky", or "mein" or "main", each token counts accurately as one word and common spelling variants are recognized in the marker detector.',
  },
  {
    q: 'Can I paste mixed Roman Urdu and English university notes?',
    a: 'Yes. Bilingual drafts mixing English terminology with Roman Urdu explanations count accurately in the same editor without splitting words unexpectedly.',
  },
  {
    q: 'Is my Roman Urdu text stored on a server?',
    a: 'No. Counting runs locally inside browser memory with no account login or draft-storage database.',
  },
];

export const RomanUrduWordCounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => analyzeRomanUrdu(text), [text]);
  const { baseStats } = result;

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback if clipboard denied
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
    name: 'Roman Urdu Word Counter',
    url: buildCanonicalUrl('/roman-urdu-word-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Free Roman Urdu word counter for bilingual students. Count Roman Urdu words, characters, sentences, unique words, and Roman Urdu particles in your browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Roman Urdu Word Counter', path: '/roman-urdu-word-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="Roman Urdu Word Counter – Count Roman Urdu Words & Sentences"
        description="Free Roman Urdu word counter online. Count Roman Urdu and mixed English words, unique vocabulary, characters, and sentences instantly in your browser."
        canonicalPath="/roman-urdu-word-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Roman Urdu &amp; Bilingual Counter &middot; Browser-Local Analysis
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Roman Urdu Word Counter
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Count Roman Urdu and mixed English assignment words, characters, sentences, unique vocabulary, and detected Roman Urdu markers in real time.
          </p>
        </header>

        <section aria-label="Roman Urdu Counter Tool" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            <div className="p-3.5 rounded-xl bg-zinc-950 text-white border border-zinc-950">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                Words
              </div>
              <div className="text-2xl font-bold font-mono-num mt-0.5">
                {baseStats.words.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Unique Words
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {result.uniqueWords.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Urdu Markers
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {result.romanUrduMarkerHits.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Characters
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {baseStats.characters.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                No Spaces
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {baseStats.charactersNoSpaces.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Sentences
              </div>
              <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                {baseStats.sentences.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Read Time
              </div>
              <div className="text-lg font-bold text-zinc-950 font-mono-num mt-1 truncate">
                {baseStats.readingTimeText}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 bg-zinc-50">
              <span className="text-xs font-medium text-zinc-600">
                Roman Urdu Tip: Apna Roman Urdu ya mixed English text neeche paste karein.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setText(ROMAN_URDU_SAMPLE)}
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
              aria-label="Roman Urdu text editor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Apna Roman Urdu mazmoon, notes, ya bilingual assignment yahan paste karein..."
              className="w-full min-h-[250px] p-5 bg-white text-zinc-950 placeholder-zinc-400 text-base leading-relaxed focus:outline-none resize-y"
            />
          </div>

          {result.detectedMarkers.length > 0 && (
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-zinc-600">
                <span className="font-semibold text-zinc-950 mr-2">
                  Detected Roman Urdu Terms:
                </span>
                <span>{result.detectedMarkers.join(' · ')}</span>
              </div>
              <span className="text-xs font-mono-num font-semibold text-zinc-950">
                Lines: {result.lineCount.toLocaleString()}
              </span>
            </div>
          )}
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950">
              Counting Roman Urdu Assignments Accurately
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              Students across Pakistan, India, and international bilingual courses frequently outline essays, WhatsApp study summaries, and seminar notes in Roman Urdu before translating or submitting final drafts. Because Roman Urdu adapts Urdu grammar into the Latin alphabet, common postpositions like <em>mein</em>, <em>ka</em>, <em>ki</em>, <em>ke</em>, <em>aur</em>, and <em>hai</em> appear alongside English technical nouns.
            </p>
            <p className="text-zinc-700 leading-relaxed">
              This tool treats every meaningful Roman Urdu and English word consistently without inflating counts on stray punctuation, filters out common function particles when inspecting key topic words, and lets you convert drafts cleanly into page estimates or readable scripts.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">Roman Urdu Counter FAQ</h2>
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

        <MoreToolsSection currentPath="/roman-urdu-word-counter" />
        <PopularGuidesSection
          title="Urdu & Assignment Writing Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'urdu' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
