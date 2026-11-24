import React from 'react';
import { ArrowRight } from 'lucide-react';
import { STATIC_BLOG_GUIDES, StaticBlogGuide } from '../data/staticBlogGuides';

interface PopularGuidesSectionProps {
  title?: string;
  subtitle?: string;
  guides?: StaticBlogGuide[];
  showViewAll?: boolean;
}

export const PopularGuidesSection: React.FC<PopularGuidesSectionProps> = ({
  title = 'Assignment Word Count & Writing Guides',
  subtitle = 'Practical reference guides on page conversions, university rules, document counting, Urdu text, and presentation pacing.',
  guides = STATIC_BLOG_GUIDES,
  showViewAll = true,
}) => {
  return (
    <section aria-label="Popular guides" className="mt-14 pt-12 border-t border-zinc-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Student Writing Guides
          </p>
          <h2 className="text-2xl font-bold text-zinc-950 mt-1 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>
        {showViewAll && (
          <a
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 hover:underline shrink-0"
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
            className="group p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 transition-colors flex flex-col justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                {guide.tag}
              </p>
              <h3 className="text-sm font-bold text-zinc-950 group-hover:underline leading-snug">
                {guide.title}
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                {guide.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center text-xs font-semibold text-zinc-950 gap-1">
              <span>Read guide</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
