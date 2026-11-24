import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactEmail = 'mzadi084@gmail.com';

  return (
    <>
      <SEOHead
        title="Contact Us – Word Counter for Assignment"
        description="Contact Word Counter for Assignment at mzadi084@gmail.com to share student feedback, report counting bugs, or suggest new academic tools."
        canonicalPath="/contact"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        <header className="space-y-2 pb-6 border-b border-zinc-200">
          <p className="text-xs font-medium text-zinc-500">
            Support &amp; Student Feedback
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
            We welcome messages from students, teachers, and writers. Reach out directly by email with bug reports, questions, or tool suggestions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-5 md:col-span-1">
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
              <h2 className="text-lg font-bold text-zinc-950">Direct Email</h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                For questions, bug reports, or new calculator ideas:
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-0.5">
                  Support Email
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm font-bold text-zinc-950 hover:underline break-all"
                >
                  {contactEmail}
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-200 space-y-1.5 text-xs text-zinc-600">
                <p>Languages: English, Urdu &amp; Roman Urdu</p>
                <p>Maintained by: Farwa Naveed</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
              <span className="font-bold text-zinc-950 block mb-1">Roman Urdu Note:</span>
              Agar aapko kisi tool mein masla aaye ya koi naya calculator add karwana ho to aap Roman Urdu mein bhi email par rabta kar sakte hain.
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 md:col-span-2 space-y-5">
            <h2 className="text-xl font-bold text-zinc-950">
              How to Reach Support by Email
            </h2>
            <p className="text-sm text-zinc-700 leading-relaxed">
              We handle inquiries directly over email so your browser never sends form data to third-party scripts. Click below to open your email client and message{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-zinc-950 underline">
                {contactEmail}
              </a>.
            </p>
            <div className="space-y-2 text-sm text-zinc-700">
              <p className="font-semibold text-zinc-950">Helpful details to include:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Which tool page you were using (e.g., Word Counter, PDF Word Counter, or Roman Urdu Counter).</li>
                <li>Your browser and device if reporting a layout or PDF parsing issue.</li>
                <li>A short non-confidential example if punctuation or hyphenated words counted unexpectedly.</li>
              </ul>
            </div>
            <div>
              <a
                href={`mailto:${contactEmail}?subject=Word%20Counter%20for%20Assignment%20Feedback`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm transition-colors"
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
