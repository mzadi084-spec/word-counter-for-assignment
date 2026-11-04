import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { FileCheck, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service – Word Counter for Assignment"
        description="Terms and conditions governing the use of Word Counter for Assignment. Free educational use, student copyright retention, and disclaimers."
        canonicalPath="/terms"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        <header className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Educational Use Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last Updated: November 2026 • Please read carefully before using our tools.
          </p>
        </header>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>Word Counter for Assignment</strong> (the "Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Free Educational License</h2>
            <p>
              Permission is granted to use our web tools, calculators, and educational guides for personal, academic, classroom, and non-commercial educational purposes without charge. You are free to calculate metrics for school essays, bachelor assignments, dissertations, and research drafts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Intellectual Property of Your Content</h2>
            <p>
              <strong>You retain 100% ownership, copyright, and moral rights</strong> in any text, essay, article, or manuscript you paste into or analyze with our tools. Because our application operates entirely on your client device, we do not claim any license, ownership, or rights in your academic work.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Academic Responsibility Disclaimer</h2>
            <p>
              While our calculation algorithms are engineered for maximum accuracy across English, Urdu, and Roman Urdu syntax, academic institutions and departments often have unique submission rules (such as specific citation counting exemptions or proprietary Turnitin filters).
            </p>
            <p>
              It remains the student's sole responsibility to confirm final submission requirements with their university syllabus, course instructor, or exam board. <strong>Word Counter for Assignment</strong> is provided "as is" without warranty of any kind, and we are not liable for any grading outcomes, mark deductions, or submission disqualifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Prohibited Uses</h2>
            <p>
              You agree not to use automated scripts, scrapers, or bot nets to overwhelm our hosting infrastructure, reverse engineer proprietary source assets, or use our platform in violation of any applicable local or international laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Contact & Questions</h2>
            <p>
              For any questions regarding these terms, contact us at: <a href="mailto:mzadi084@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">mzadi084@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
