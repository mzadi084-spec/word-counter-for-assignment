import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { SEOHead } from '../components/SEOHead';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Sparkles, Languages } from 'lucide-react';

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
        description="Read expert guides on checking assignment word counts, avoiding plagiarism, structuring introductions, and converting words to pages."
        canonicalPath="/blog"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Writing Guides & Tutorials</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assignment Writing & Word Count Blog
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practical, in-depth advice for university, college, and A-Level students. Master structural pacing, citation ethics, and length compliance.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles (e.g. plagiarism, pages, introduction)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article: BlogArticle) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all p-6 sm:p-7"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link to={`/blog/${article.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {article.summary}
                </p>

                {/* Roman Urdu summary card */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                    Roman Urdu Khulasa:
                  </span>
                  <p className="italic text-[11px]">{article.romanUrduSummary}</p>
                </div>
              </div>

              {/* Bottom link & Tools pills */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <span className="text-[11px] text-slate-400 font-medium">
                  {article.publishedDate}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No articles match your search criteria. Try a different keyword like "word count" or "essay".
          </div>
        )}
      </main>
    </>
  );
};
