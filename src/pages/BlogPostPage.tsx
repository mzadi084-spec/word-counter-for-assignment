import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { isPublicStandalonePath, getStaticPageHref, SITE_URL } from '../utils/seo';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-zinc-950">Article Not Found</h1>
        <p className="text-zinc-600">
          The requested guide could not be located. Browse all writing resources on our blog.
        </p>
        <a
          href="/blog/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </a>
      </main>
    );
  }

  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

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
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Word Counter for Assignment',
      url: SITE_URL,
    },
    datePublished: '2026-11-01',
    dateModified: '2026-11-22',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        type="article"
        noindex={false}
        schema={[articleSchema, breadcrumbSchema]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-500">
          <Link to="/" className="hover:text-zinc-950 hover:underline">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <a href="/blog/" className="hover:text-zinc-950 hover:underline">
            Blog
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-950 font-medium truncate">{article.title}</span>
        </nav>

        <header className="space-y-4 pb-7 border-b border-zinc-200">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="font-semibold uppercase tracking-wider text-zinc-950">
              {article.category}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{article.publishedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            {article.summary}
          </p>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-700">
            <span className="font-bold text-zinc-950 mr-1.5">Roman Urdu Summary:</span>
            <span>{article.romanUrduSummary}</span>
          </div>
        </header>

        <div className="my-7 p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-zinc-950">
            Recommended Tools for This Guide:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {article.relatedTools.map((tool) => {
              const toolClassName =
                'px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-950 font-medium text-xs hover:border-zinc-950 transition-colors inline-flex items-center gap-1';
              const content = (
                <>
                  <span>{tool.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </>
              );

              return isPublicStandalonePath(tool.path) ? (
                <a key={tool.path} href={getStaticPageHref(tool.path)} className={toolClassName}>
                  {content}
                </a>
              ) : (
                <Link key={tool.path} to={getStaticPageHref(tool.path)} className={toolClassName}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        <article className="max-w-none text-zinc-700 space-y-5 leading-relaxed text-base sm:text-lg">
          {article.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-bold text-zinc-950 mt-9 mb-3 pt-4 border-t border-zinc-200"
                >
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-zinc-950 mt-5 mb-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed === '---') {
              return <hr key={idx} className="my-7 border-zinc-200" />;
            }

            if (trimmed.startsWith('```')) {
              const codeClean = trimmed.replace(/```[a-z]*\n?|\n?```/g, '');
              return (
                <pre
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono overflow-x-auto text-zinc-900 my-4"
                >
                  {codeClean}
                </pre>
              );
            }

            if (trimmed.startsWith('|')) {
              const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
              if (rows.length >= 2) {
                const headerCols = rows[0]
                  .split('|')
                  .map((c) => c.trim())
                  .filter((c) => c.length > 0);
                const dataRows = rows.slice(2);

                return (
                  <div
                    key={idx}
                    className="my-6 overflow-x-auto rounded-xl border border-zinc-200"
                  >
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-zinc-50 font-semibold text-zinc-950 border-b border-zinc-200">
                        <tr>
                          {headerCols.map((h, i) => (
                            <th key={i} className="py-2.5 px-3">
                              {h.replace(/\*\*/g, '')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {dataRows.map((r, ri) => {
                          const cols = r
                            .split('|')
                            .map((c) => c.trim())
                            .filter((c) => c.length > 0);
                          return (
                            <tr key={ri}>
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

            if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').filter((i) => i.trim().length > 0);
              return (
                <ul key={idx} className="space-y-2 my-4 pl-5 list-disc">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-zinc-700">
                      {item.replace(/^(\d+\.|\-)\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-zinc-700 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </article>

        <section className="mt-14 p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to Check Your Assignment Word Count?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl">
            Paste your draft into our browser-based word counter to check words, sentences, paragraphs, and reading time locally inside your browser.
          </p>
          <div className="pt-1 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors"
            >
              Open Word Counter
            </Link>
            <a
              href="/words-to-pages-converter/"
              className="px-5 py-2.5 rounded-lg border border-zinc-700 text-white font-semibold text-sm hover:bg-zinc-900 transition-colors"
            >
              Convert Words to Pages
            </a>
          </div>
        </section>
      </main>
    </>
  );
};
