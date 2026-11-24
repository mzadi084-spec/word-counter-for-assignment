import React from 'react';
import { TOOLS_CONFIG, ToolConfig } from '../data/toolsData';
import { CounterTool } from '../components/CounterTool';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { ChevronDown } from 'lucide-react';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';

interface ToolPageProps {
  toolKey: keyof typeof TOOLS_CONFIG;
}

export const ToolPage: React.FC<ToolPageProps> = ({ toolKey }) => {
  const config: ToolConfig = TOOLS_CONFIG[toolKey] || TOOLS_CONFIG.home;

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

  const schemas: Array<Record<string, unknown>> = [webAppSchema, faqSchema];
  if (toolKey !== 'home') {
    schemas.push(
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: config.title, path: config.path },
      ])
    );
  }

  return (
    <>
      <SEOHead
        title={config.metaTitle}
        description={config.metaDescription}
        canonicalPath={config.path}
        schema={schemas}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        {/* Focused Compact Header so Counter & Stats appear immediately above the fold */}
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Free browser-based student utility &middot; English, Urdu &amp; Roman Urdu &middot; No login required
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            {config.h1}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            {config.tagline}
          </p>
        </header>

        {/* Core Interactive Counter Tool (Stats + Textarea immediately visible above fold) */}
        <section aria-label="Interactive Text Counter Tool">
          <CounterTool
            highlightStat={config.highlightStat}
            romanUrduTip={config.romanUrduTip}
          />
        </section>

        {/* How the Tool Works & Guide Section */}
        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Tool Guide
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mt-1">
                {config.guideTitle}
              </h2>
            </div>

            <div className="space-y-4 text-zinc-700 text-base leading-relaxed">
              {config.guideParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* 3-Step Usage Breakdown */}
            <div className="pt-6 border-t border-zinc-200">
              <h3 className="text-base font-bold text-zinc-950 mb-4">
                How to Use This Tool in 3 Steps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1.5">01.</p>
                  <h4 className="font-bold text-sm text-zinc-950 mb-1">Paste or Type Text</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Paste your assignment draft into the main editor above, or type directly in English, Urdu, or Roman Urdu.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1.5">02.</p>
                  <h4 className="font-bold text-sm text-zinc-950 mb-1">Set Optional Word Limit</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Enter your required essay target to see how many words remain or how far over the limit your draft sits.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1.5">03.</p>
                  <h4 className="font-bold text-sm text-zinc-950 mb-1">Review &amp; Copy Draft</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Check live words, characters, sentences, paragraphs, reading time, speaking time, and repeated words, then copy text back cleanly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Students Use This Tool / Academic Tips */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Academic Benefits
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">
                {config.tipsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-700 leading-relaxed"
                >
                  <span className="font-mono-num text-xs font-bold text-zinc-400 mr-2">
                    0{idx + 1}.
                  </span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Frequently Asked Questions
              </p>
              <h2 className="text-2xl font-bold text-zinc-950 mt-1">
                Common Assignment Word Count Questions
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {config.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-zinc-950 focus-visible:outline-2 focus-visible:outline-zinc-950 rounded">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2.5 text-sm text-zinc-600 leading-relaxed pr-6">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Internal Links */}
        <MoreToolsSection currentPath={config.path} />

        {/* Blog Guides Internal Links */}
        <PopularGuidesSection
          guides={
            toolKey === 'home'
              ? STATIC_BLOG_GUIDES.slice(0, 12)
              : STATIC_BLOG_GUIDES.filter((g) =>
                  [
                    '/blog/assignment-word-count-guide.html',
                    '/blog/university-assignment-word-count.html',
                    '/blog/how-to-calculate-assignment-word-limits.html',
                    '/blog/how-to-check-word-count-in-a-document.html',
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
