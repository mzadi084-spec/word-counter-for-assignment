import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { SEOHead } from '../components/SEOHead';
import { ArrowRight, Search } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const q = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      article.romanUrduSummary.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <SEOHead
        title="Student Writing Blog – Assignment Tips & Word Limits"
        description="Read practical student guides on assignment word counts, page conversions, headings/references rules, Roman Urdu writing, and academic pacing."
        canonicalPath="/blog"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="max-w-3xl mb-8 space-y-3">
          <p className="text-xs font-medium text-zinc-500">
            Academic Writing Guides &amp; Formatting Tutorials
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Assignment Writing &amp; Word Count Blog
          </h1>

          <p className="text-base text-zinc-600 leading-relaxed">
            Practical, student-friendly advice on word limits, page length estimation, referencing rules, Roman Urdu conventions, and speaking pace.
          </p>

          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="Search blog articles"
                placeholder="Search articles (e.g. pages, citations, Urdu)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((article: BlogArticle) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 transition-colors p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-semibold uppercase tracking-wider">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-lg font-bold text-zinc-950 leading-snug">
                  <Link to={`/blog/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {article.summary}
                </p>

                <p className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
                  <span className="font-semibold text-zinc-950 block mb-0.5">Roman Urdu:</span>
                  {article.romanUrduSummary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-950 hover:underline group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <span className="text-xs text-zinc-500">{article.publishedDate}</span>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-sm text-zinc-500 border border-zinc-200 rounded-xl bg-zinc-50 mt-6">
            No articles match your search query. Try &ldquo;word count&rdquo;, &ldquo;essay&rdquo;, or &ldquo;pages&rdquo;.
          </div>
        )}

        <PopularGuidesSection
          title="Complete Assignment & Word Count Guides"
          subtitle="All 22 static HTML formatting, word limit, counting rules, Urdu, and speaking-pace guides."
          guides={STATIC_BLOG_GUIDES}
          showViewAll={false}
        />
      </main>
    </>
  );
};
