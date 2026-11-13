import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Cookie, Eye, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy – Word Counter for Assignment"
        description="Read our privacy policy. Word Counter for Assignment processes your text locally in your browser with zero server storage and no ad or analytics trackers."
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
            Last Updated: November 13, 2026 • Effective Date: January 1, 2026
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
              <span>2. Local Browser Storage & Essential Functionality</span>
            </h2>
            <p>
              We do not run advertising networks, behavioral tracking scripts, or third-party analytics trackers on your assignment text. Your browser may store basic technical preferences locally (such as theme preference) to keep the interface usable. You can clear or block site storage in your browser settings at any time without losing core counting features.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>3. Standard Server Logs & External Links</span>
            </h2>
            <p>
              Like most websites, our static hosting provider may record routine HTTP request metadata (such as requested page URL, browser user agent, and timestamp) strictly for security, uptime, and error diagnostics. None of the text you type or paste into our tools is ever sent in those requests.
            </p>
            <p>
              Our articles and guides may link to external educational or university resources. We are not responsible for the privacy practices of external third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Children's Online Privacy Protection (COPPA)</h2>
            <p>
              Our website is designed for students, educators, and general writers. We do not knowingly collect any personally identifiable information from children under the age of 13. Because our service requires no account registration, no personal data from minors is gathered or retained.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect operational or regulatory changes. Any updates will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy or your data protection rights, please contact us at: <a href="mailto:mzadi084@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">mzadi084@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
