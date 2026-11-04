/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { ToolPage } from './pages/ToolPage';
import { UrduWordCounterPage } from './pages/UrduWordCounterPage';
import { WordsToPagesPage } from './pages/WordsToPagesPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors">
          <Header />

          <div className="flex-1">
            <Routes>
              {/* Core & Counter Tool Routes */}
              <Route path="/" element={<ToolPage toolKey="home" />} />
              <Route path="/character-counter" element={<ToolPage toolKey="characterCounter" />} />
              <Route path="/sentence-counter" element={<ToolPage toolKey="sentenceCounter" />} />
              <Route path="/essay-word-counter" element={<ToolPage toolKey="essayWordCounter" />} />
              <Route path="/paragraph-counter" element={<ToolPage toolKey="paragraphCounter" />} />
              <Route path="/reading-time-calculator" element={<ToolPage toolKey="readingTimeCalculator" />} />

              {/* Specialized Tool Routes */}
              <Route path="/urdu-word-counter" element={<UrduWordCounterPage />} />
              <Route path="/words-to-pages-converter" element={<WordsToPagesPage />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              {/* Legal & About Routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<ToolPage toolKey="home" />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
