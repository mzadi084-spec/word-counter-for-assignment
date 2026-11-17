import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold text-base">
                Word Counter<span className="text-slate-900 dark:text-white"> for Assignment</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A free, privacy-first text analysis suite engineered for students, researchers, and essay writers. Supports English, Urdu, and Roman Urdu.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side • Zero Data Uploaded</span>
            </div>
          </div>

          {/* Quick Counter Tools */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Core Counters
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter for Assignment
                </Link>
              </li>
              <li>
                <a href="/character-counter/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Character Counter Online
                </a>
              </li>
              <li>
                <a href="/urdu-word-counter/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Urdu Word Counter</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 rounded">اردو</span>
                </a>
              </li>
              <li>
                <a href="/paragraph-counter/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Paragraph Counter
                </a>
              </li>
            </ul>
          </div>

          {/* Academic Calculators & Blog */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Calculators &amp; Blog
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/words-to-pages-converter/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Words to Pages Converter
                </a>
              </li>
              <li>
                <a href="/blog/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>All Blog Guides</span>
                </a>
              </li>
              <li>
                <a href="/blog/assignment-word-count-guide.html" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Assignment Word Count Guide
                </a>
              </li>
              <li>
                <a href="/blog/how-to-count-words-in-urdu.html" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Urdu Word Count Guide
                </a>
              </li>
              <li>
                <a href="/blog/how-many-pages-is-1000-words.html" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  How Many Pages Is 1,000 Words?
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              About & Trust
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/about/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="/privacy-policy/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Word Counter for Assignment. Free for students worldwide.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for English, Urdu & Roman Urdu students</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
