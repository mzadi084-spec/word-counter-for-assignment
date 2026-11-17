import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { STATIC_BLOG_GUIDES, StaticBlogGuide } from '../data/staticBlogGuides';

interface PopularGuidesSectionProps {
  title?: string;
  subtitle?: string;
  guides?: StaticBlogGuide[];
  showViewAll?: boolean;
}

export const PopularGuidesSection: React.FC<PopularGuidesSectionProps> = ({
  title = 'Popular Assignment & Word Count Guides',
  subtitle = 'Step-by-step student guides for page estimates, document counting, Urdu text, speaking pace, and staying within word limits.',
  guides = STATIC_BLOG_GUIDES,
  showViewAll = true,
}) => {
  return (
    <section
      aria-label="Popular guides"
      className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Student Writing Guides</span>
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>
        {showViewAll && (
          <a
            href="/blog/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>All Blog Guides</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <a
            key={guide.href}
            href={guide.href}
            className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5">
                {guide.tag}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {guide.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {guide.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
              <span>Read guide</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
