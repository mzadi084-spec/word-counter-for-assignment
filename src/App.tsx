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
import { RomanUrduWordCounterPage } from './pages/RomanUrduWordCounterPage';
import { WordsToPagesPage } from './pages/WordsToPagesPage';
import { SentenceCounterPage } from './pages/SentenceCounterPage';
import { ReadingTimeCalculatorPage } from './pages/ReadingTimeCalculatorPage';
import { SpeechTimeCalculatorPage } from './pages/SpeechTimeCalculatorPage';
import { AssignmentWordLimitCalculatorPage } from './pages/AssignmentWordLimitCalculatorPage';
import { WordsPerMinuteCalculatorPage } from './pages/WordsPerMinuteCalculatorPage';
import { LineCounterPage } from './pages/LineCounterPage';
import { UniqueWordCounterPage } from './pages/UniqueWordCounterPage';
import { PdfWordCounterPage } from './pages/PdfWordCounterPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

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
        <div className="min-h-screen flex flex-col bg-white text-zinc-950 font-sans selection:bg-zinc-950 selection:text-white">
          <Header />

          <div className="flex-1">
            <Routes>
              {/* Primary Tool */}
              <Route path="/" element={<ToolPage toolKey="home" />} />

              {/* Existing & Legacy-Mirrored Tools */}
              <Route path="/character-counter" element={<ToolPage toolKey="characterCounter" />} />
              <Route path="/character-counter/" element={<ToolPage toolKey="characterCounter" />} />
              <Route path="/paragraph-counter" element={<ToolPage toolKey="paragraphCounter" />} />
              <Route path="/paragraph-counter/" element={<ToolPage toolKey="paragraphCounter" />} />
              <Route path="/essay-word-counter" element={<ToolPage toolKey="essayWordCounter" />} />
              <Route path="/essay-word-counter/" element={<ToolPage toolKey="essayWordCounter" />} />
              <Route path="/urdu-word-counter" element={<UrduWordCounterPage />} />
              <Route path="/urdu-word-counter/" element={<UrduWordCounterPage />} />
              <Route path="/words-to-pages-converter" element={<WordsToPagesPage />} />
              <Route path="/words-to-pages-converter/" element={<WordsToPagesPage />} />

              {/* Dedicated Academic & Writing Tools */}
              <Route path="/roman-urdu-word-counter" element={<RomanUrduWordCounterPage />} />
              <Route path="/roman-urdu-word-counter/" element={<RomanUrduWordCounterPage />} />
              <Route path="/sentence-counter" element={<SentenceCounterPage />} />
              <Route path="/sentence-counter/" element={<SentenceCounterPage />} />
              <Route path="/reading-time-calculator" element={<ReadingTimeCalculatorPage />} />
              <Route path="/reading-time-calculator/" element={<ReadingTimeCalculatorPage />} />
              <Route path="/speech-time-calculator" element={<SpeechTimeCalculatorPage />} />
              <Route path="/speech-time-calculator/" element={<SpeechTimeCalculatorPage />} />
              <Route path="/assignment-word-limit-calculator" element={<AssignmentWordLimitCalculatorPage />} />
              <Route path="/assignment-word-limit-calculator/" element={<AssignmentWordLimitCalculatorPage />} />
              <Route path="/words-per-minute-calculator" element={<WordsPerMinuteCalculatorPage />} />
              <Route path="/words-per-minute-calculator/" element={<WordsPerMinuteCalculatorPage />} />
              <Route path="/line-counter" element={<LineCounterPage />} />
              <Route path="/line-counter/" element={<LineCounterPage />} />
              <Route path="/unique-word-counter" element={<UniqueWordCounterPage />} />
              <Route path="/unique-word-counter/" element={<UniqueWordCounterPage />} />
              <Route path="/pdf-word-counter" element={<PdfWordCounterPage />} />
              <Route path="/pdf-word-counter/" element={<PdfWordCounterPage />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              {/* Legal & Info Routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact/" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/terms/" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/disclaimer/" element={<DisclaimerPage />} />

              {/* Fallback */}
              <Route path="*" element={<ToolPage toolKey="home" />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
