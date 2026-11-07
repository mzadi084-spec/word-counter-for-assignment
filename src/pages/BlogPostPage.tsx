import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { SEOHead } from '../components/SEOHead';
import {
  Clock,
  Calendar,
  ArrowLeft,
  BookOpen,
  Share2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Article Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300">
          The requested guide could not be located. Browse all writing resources on our blog.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </main>
    );
  }

  // Article JSON-LD Schema
  const articleUrl = `https://wordcounterforassignment.com/blog/${article.slug}`;
  const siteUrl = 'https://wordcounterforassignment.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleUrl,
    url: articleUrl,
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Word Counter for Assignment',
      url: siteUrl,
    },
    datePublished: '2026-11-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
    },
  };

  return (
    <>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        type="article"
        schema={articleSchema}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header (One H1) */}
        <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-xs text-slate-400">•</span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.summary}
          </p>

          {/* Roman Urdu Callout Box */}
          <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs sm:text-sm text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <span className="font-bold shrink-0 px-2 py-0.5 rounded bg-blue-200/70 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs uppercase tracking-wider mt-0.5">
              Roman Urdu
            </span>
            <span className="leading-relaxed italic">{article.romanUrduSummary}</span>
          </div>
        </header>

        {/* Related Tools Quick Bar at Top */}
        <div className="my-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Tools Recommended for This Guide:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {article.relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors flex items-center gap-1"
              >
                <span>{tool.name}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed text-base sm:text-lg">
          {article.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            // H2
            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-10 mb-4 pt-4 border-t border-slate-100 dark:border-slate-800"
                >
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            // H3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            // Horizontal Rule
            if (trimmed === '---') {
              return <hr key={idx} className="my-8 border-slate-200 dark:border-slate-800" />;
            }

            // Code/diagram block
            if (trimmed.startsWith('```')) {
              const codeClean = trimmed.replace(/```[a-z]*\n?|\n?```/g, '');
              return (
                <pre
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-mono overflow-x-auto text-slate-800 dark:text-slate-200 my-4"
                >
                  {codeClean}
                </pre>
              );
            }

            // Table parsing (simple markdown table)
            if (trimmed.startsWith('|')) {
              const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
              if (rows.length >= 2) {
                const headerCols = rows[0]
                  .split('|')
                  .map((c) => c.trim())
                  .filter((c) => c.length > 0);
                const dataRows = rows.slice(2); // Skip separator row

                return (
                  <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white">
                        <tr>
                          {headerCols.map((h, i) => (
                            <th key={i} className="py-2.5 px-3">
                              {h.replace(/\*\*/g, '')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {dataRows.map((r, ri) => {
                          const cols = r
                            .split('|')
                            .map((c) => c.trim())
                            .filter((c) => c.length > 0);
                          return (
                            <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                              {cols.map((col, ci) => (
                                <td key={ci} className="py-2.5 px-3">
                                  {col.replace(/\*\*/g, '')}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // List items (numbered or bullets)
            if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').filter((i) => i.trim().length > 0);
              return (
                <ul key={idx} className="space-y-2 my-4 pl-4 list-disc list-outside">
                  {items.map((item, itemIdx) => {
                    const cleanItem = item.replace(/^(\d+\.|\-)\s+/, '');
                    return (
                      <li key={itemIdx} className="text-slate-700 dark:text-slate-300">
                        {cleanItem}
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // Regular paragraph (replace links or bold)
            return (
              <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Bottom CTA for Tools */}
        <section className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 space-y-4">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Practice Your Assignment Writing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Check Your Assignment Word Count?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl">
            Test your coursework now on our free browser-based word counter. Track word limits, paragraph density, and reading time with zero tracking.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
            >
              Open Word Counter
            </Link>
            <Link
              to="/words-to-pages-converter"
              className="px-5 py-2.5 rounded-xl bg-blue-800/80 text-white font-bold text-sm hover:bg-blue-800 transition-colors border border-blue-400/40"
            >
              Convert Words to Pages
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
