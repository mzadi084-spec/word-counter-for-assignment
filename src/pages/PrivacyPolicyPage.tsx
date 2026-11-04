import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Cookie, Eye, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy – Word Counter for Assignment"
        description="Our privacy policy details client-side processing, cookies, Google Analytics, Google AdSense disclosures, and zero-retention data protection."
        canonicalPath="/privacy-policy"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        <header className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-900/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Student Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last Updated: November 2026 • Effective Date: Immediately
          </p>
        </header>

        {/* Highlight Banner */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>The Core Guarantee: Your Text Never Leaves Your Device</span>
          </div>
          <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
            When you type or paste your assignment drafts, essays, dissertations, or research papers into our Word Counter, all calculations take place locally inside your browser using client-side JavaScript. <strong>We do not transmit, read, record, or store any portion of your text on our servers.</strong>
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>1. Information We Do Not Collect</span>
            </h2>
            <p>
              Unlike cloud-hosted AI tools and subscription writing platforms, <strong>Word Counter for Assignment</strong> does not require user accounts, passwords, email registration, or credit card numbers. Your inputs in the word counter, character counter, or words to pages converter remain transient in your local device memory and disappear as soon as you close or refresh the browser tab.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-blue-600" />
              <span>2. Cookies and Tracking Technologies</span>
            </h2>
            <p>
              Cookies are small text files placed on your device to ensure website functionality, remember interface preferences (such as dark mode preferences), and analyze web traffic patterns. We may use both session cookies (which expire once you close your browser) and persistent cookies to enhance your browsing experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>3. Google Analytics Disclosure</span>
            </h2>
            <p>
              We use <strong>Google Analytics</strong> to analyze overall website usage trends, popular pages (e.g. which counter tools students use most), bounce rates, and referring websites. Google Analytics collects anonymized data such as your browser type, device category, approximate geographic location (country/city level), and time spent on site.
            </p>
            <p>
              Google Analytics does <strong>not</strong> have access to the text you paste into our word counter tools. You can opt out of Google Analytics tracking across all websites by installing the official <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>4. Google AdSense & Third-Party Advertising</span>
            </h2>
            <p>
              To maintain our service as 100% free for students worldwide without charging subscriptions, we may display third-party advertisements served by <strong>Google AdSense</strong>.
            </p>
            <p>
              Google and its advertising partners use cookies (such as the DoubleClick DART cookie) to serve relevant advertisements to users based on prior visits to our site and other websites on the internet.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Ads Settings</a> or <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Children's Online Privacy Protection (COPPA)</h2>
            <p>
              Our website is designed for students, educators, and general writers. We do not knowingly collect any personally identifiable information from children under the age of 13. Because our service requires no account registration, no personal data from minors is gathered or retained.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect operational or regulatory changes. Any updates will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy or your data protection rights, please contact our privacy officer at: <a href="mailto:mzadi084@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">mzadi084@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
