import React from 'react';
import { TOOLS_CONFIG, ToolConfig } from '../data/toolsData';
import { CounterTool } from '../components/CounterTool';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import {
  HelpCircle,
  Lightbulb,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildCanonicalUrl } from '../utils/seo';

interface ToolPageProps {
  toolKey: keyof typeof TOOLS_CONFIG;
}

const NOINDEX_TOOL_KEYS = new Set<keyof typeof TOOLS_CONFIG>([
  'sentenceCounter',
  'essayWordCounter',
  'readingTimeCalculator',
]);

export const ToolPage: React.FC<ToolPageProps> = ({ toolKey }) => {
  const config: ToolConfig = TOOLS_CONFIG[toolKey] || TOOLS_CONFIG.home;
  const isNoindex = NOINDEX_TOOL_KEYS.has(toolKey);

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.title,
    url: buildCanonicalUrl(config.path),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description: config.metaDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <SEOHead
        title={config.metaTitle}
        description={config.metaDescription}
        canonicalPath={config.path}
        noindex={isNoindex}
        schema={[webAppSchema, faqSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header with exactly one H1 */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Student Tool • 100% Private</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {config.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {config.tagline}
          </p>
        </div>

        {/* Core Counter Tool */}
        <section aria-label="Interactive Text Counter Tool">
          <CounterTool
            highlightStat={config.highlightStat}
            romanUrduTip={config.romanUrduTip}
          />
        </section>

        {/* 300+ Words Guide Section */}
        <section className="mt-16 space-y-12">
          {/* Guide Article */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Comprehensive Student Guide</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {config.guideTitle}
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {config.guideParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* How to use checklist */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                How to Use This Tool in 3 Simple Steps:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Paste Your Draft</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Paste your assignment text into the main editor box above, or type directly.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Set Word Target</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Optionally enter your assignment limit to see remaining or exceeded words.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Review Metrics &amp; Copy</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Check your live words, characters, sentences, paragraphs, reading time, speaking time, and repetitive words, or copy clean text.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-blue-950/30 dark:to-slate-900 border border-blue-100 dark:border-blue-900/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Academic Advice</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {config.tipsTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {config.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 FAQs with <details> */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-3">
              {config.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white focus:outline-none">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 rounded-full p-1 text-slate-400 group-open:rotate-180 transition-transform">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* More Free Tools Internal Links */}
        <MoreToolsSection currentPath={config.path} />

        {/* Popular Blog Guides Internal Links */}
        <PopularGuidesSection
          guides={
            toolKey === 'home'
              ? STATIC_BLOG_GUIDES
              : STATIC_BLOG_GUIDES.filter((g) =>
                  [
                    '/blog/assignment-word-count-guide.html',
                    '/blog/university-assignment-word-count.html',
                    '/blog/how-to-check-word-count-in-a-document.html',
                    '/blog/how-to-count-words-in-a-specific-section.html',
                    '/blog/how-to-reduce-word-count-in-assignment.html',
                    '/blog/how-many-pages-is-1000-words.html',
                  ].includes(g.href)
                )
          }
        />
      </main>
    </>
  );
};
