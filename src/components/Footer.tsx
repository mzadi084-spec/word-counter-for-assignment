import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-zinc-50 text-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Summary */}
          <div className="space-y-3">
            <Link to="/" className="text-base font-extrabold tracking-tight text-zinc-950 block">
              Word Counter for Assignment
            </Link>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Free online word counting and academic writing calculators for students, teachers, and researchers in English, Urdu, and Roman Urdu. All text runs directly in your browser.
            </p>
          </div>

          {/* Core & Language Counters */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-3">
              Counters &amp; Language Tools
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/" className="hover:text-zinc-950 hover:underline">
                  Word Counter for Assignments
                </Link>
              </li>
              <li>
                <a href="/urdu-word-counter/" className="hover:text-zinc-950 hover:underline">
                  Urdu Word Counter
                </a>
              </li>
              <li>
                <Link to="/roman-urdu-word-counter/" className="hover:text-zinc-950 hover:underline">
                  Roman Urdu Word Counter
                </Link>
              </li>
              <li>
                <a href="/character-counter/" className="hover:text-zinc-950 hover:underline">
                  Character Counter
                </a>
              </li>
              <li>
                <a href="/paragraph-counter/" className="hover:text-zinc-950 hover:underline">
                  Paragraph Counter
                </a>
              </li>
              <li>
                <Link to="/sentence-counter/" className="hover:text-zinc-950 hover:underline">
                  Sentence Counter
                </Link>
              </li>
              <li>
                <Link to="/line-counter/" className="hover:text-zinc-950 hover:underline">
                  Line Counter
                </Link>
              </li>
              <li>
                <Link to="/unique-word-counter/" className="hover:text-zinc-950 hover:underline">
                  Unique Word Counter
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators & Document Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-3">
              Calculators &amp; Guides
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a href="/words-to-pages-converter/" className="hover:text-zinc-950 hover:underline">
                  Words to Pages Converter
                </a>
              </li>
              <li>
                <Link to="/assignment-word-limit-calculator/" className="hover:text-zinc-950 hover:underline">
                  Assignment Word Limit Calculator
                </Link>
              </li>
              <li>
                <Link to="/reading-time-calculator/" className="hover:text-zinc-950 hover:underline">
                  Reading Time Calculator
                </Link>
              </li>
              <li>
                <Link to="/speech-time-calculator/" className="hover:text-zinc-950 hover:underline">
                  Speech Time Calculator
                </Link>
              </li>
              <li>
                <Link to="/words-per-minute-calculator/" className="hover:text-zinc-950 hover:underline">
                  Words Per Minute Calculator
                </Link>
              </li>
              <li>
                <Link to="/pdf-word-counter/" className="hover:text-zinc-950 hover:underline">
                  PDF Word Counter
                </Link>
              </li>
              <li>
                <a href="/blog/" className="hover:text-zinc-950 hover:underline font-medium text-zinc-900">
                  Academic Writing Blog
                </a>
              </li>
              <li>
                <a href="/blog/assignment-word-count-guide.html" className="hover:text-zinc-950 hover:underline">
                  Assignment Word Count Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-3">
              Information &amp; Trust
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a href="/about/" className="hover:text-zinc-950 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact/" className="hover:text-zinc-950 hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy/" className="hover:text-zinc-950 hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms/" className="hover:text-zinc-950 hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <Link to="/disclaimer/" className="hover:text-zinc-950 hover:underline">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Word Counter for Assignment. Free for students, teachers, and writers.</p>
          <p>Client-side browser processing for text privacy.</p>
        </div>
      </div>
    </footer>
  );
};
