import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Hash,
  AlignLeft,
  Languages,
  BookOpen,
  Clock,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';

interface MoreToolsSectionProps {
  currentPath?: string;
}

export const ALL_TOOLS = [
  {
    name: 'Word Counter for Assignment',
    path: '/',
    icon: FileText,
    badge: 'Popular',
    desc: 'Live word count, word limits, and keyword analysis for essays.',
  },
  {
    name: 'Urdu Word Counter',
    path: '/urdu-word-counter',
    icon: Languages,
    badge: 'اردو',
    desc: 'Count Urdu and Roman Urdu words, sentences (۔ ؟), and letters.',
  },
  {
    name: 'Words to Pages Converter',
    path: '/words-to-pages-converter',
    icon: FileSpreadsheet,
    badge: 'Calculator',
    desc: 'Convert words to single, double, and handwritten A4 pages.',
  },
  {
    name: 'Character Counter Online',
    path: '/character-counter',
    icon: Hash,
    desc: 'Count total characters with and without spaces for abstracts.',
  },
  {
    name: 'Sentence Counter',
    path: '/sentence-counter',
    icon: AlignLeft,
    desc: 'Detect sentences and check readability across English & Urdu.',
  },
  {
    name: 'Essay Word Counter',
    path: '/essay-word-counter',
    icon: BookOpen,
    desc: 'Section-by-section word allocation and 10% tolerance safety.',
  },
  {
    name: 'Paragraph Counter',
    path: '/paragraph-counter',
    icon: AlignLeft,
    desc: 'Measure paragraph count and average words per paragraph.',
  },
  {
    name: 'Reading Time Calculator',
    path: '/reading-time-calculator',
    icon: Clock,
    desc: 'Estimate silent reading (~200 wpm) and speaking time (~130 wpm).',
  },
];

export const MoreToolsSection: React.FC<MoreToolsSectionProps> = ({ currentPath = '' }) => {
  const filteredTools = ALL_TOOLS.filter((t) => t.path !== currentPath);

  return (
    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Explore Writing Tools
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            More Free Academic Tools for Students
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          All tools run 100% in your browser. Zero tracking, zero login, zero data uploads.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.path}
              to={tool.path}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  {tool.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1 group-hover:gap-2 transition-all">
                <span>Use tool free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
