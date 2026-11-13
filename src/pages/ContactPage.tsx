import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactEmail = 'mzadi084@gmail.com';

  return (
    <>
      <SEOHead
        title="Contact Us – Word Counter for Assignment"
        description="Contact Word Counter for Assignment at mzadi084@gmail.com to share student feedback, report word counting bugs, or suggest new academic tool features."
        canonicalPath="/contact"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Student Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We appreciate hearing from students, teachers, and academic writers. Email us directly with your feedback, bug reports, or tool suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Direct Contact Card */}
          <div className="space-y-6 md:col-span-1">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Direct Email</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For academic tool questions, bug reports, or feature requests, email us directly:
              </p>

              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900">
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                  Support Email
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Response Time: Usually within a few days</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>Languages: English, Urdu & Roman Urdu</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
              <span className="font-bold block mb-1">Roman Urdu Note:</span>
              <p>Agar aapko kisi feature mein masla aa raha ho ya koi naya tool add karwana ho to aap Roman Urdu mein bhi email par rabta kar sakte hain.</p>
            </div>
          </div>

          {/* Email Guidance Card (No Fake Form) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2 space-y-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              How to Contact Support by Email
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We handle all inquiries directly through email so your browser never submits private form data to third-party scripts. Click below to open your mail app and send a message to <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 font-semibold underline">{contactEmail}</a>.
            </p>
            <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Helpful details to include:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Which tool page you were using (e.g., Word Counter, Urdu Counter, or Words to Pages).</li>
                <li>Your browser and device if reporting a layout or counting issue.</li>
                <li>Non-confidential example text if a hyphenated word, abbreviation, or Urdu punctuation mark counted unexpectedly.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We read every email carefully and reply usually within a few days.
            </p>
            <div>
              <a
                href={`mailto:${contactEmail}?subject=Word%20Counter%20for%20Assignment%20Feedback`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email {contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
