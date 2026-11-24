import React from 'react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy – Word Counter for Assignment"
        description="Read our privacy policy. Word Counter for Assignment processes your pasted text and uploaded PDFs locally inside your browser without storing drafts on servers."
        canonicalPath="/privacy-policy"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <header className="space-y-2 pb-6 border-b border-zinc-200">
          <p className="text-xs font-medium text-zinc-500">
            Student Data &amp; Browser Privacy
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500">
            Last Updated: November 22, 2026
          </p>
        </header>

        <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
          <h2 className="text-base font-bold text-zinc-950">
            Your Drafts and Files Stay in Your Browser
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed">
            When you paste coursework, check Roman Urdu drafts, or select a PDF file on <strong>Word Counter for Assignment</strong>, calculations run locally inside your browser using JavaScript. Our application includes no draft-upload backend or user database to store your assignment text or PDF contents.
          </p>
        </div>

        <div className="space-y-7 text-zinc-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">1. Information We Do Not Collect</h2>
            <p>
              Word Counter for Assignment does not require account registration, passwords, or email signups. Text typed into our word counter, sentence counter, line counter, or unique word tools remains in browser memory during your session and disappears when you clear the editor or close the tab.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">2. Client-Side PDF Processing</h2>
            <p>
              Our PDF Word Counter parses selectable text layers locally inside browser memory using PDF.js rather than submitting your PDF document to an external conversion backend.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">3. Cookies, Advertising &amp; Third-Party Services</h2>
            <p>
              If Google AdSense or similar third-party advertising networks are enabled in the future to support free educational access, those third-party vendors may use cookies or standard web identifiers to serve relevant ads in accordance with Google&rsquo;s advertising policies. You can manage or disable cookies in your browser settings at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">4. Hosting Server Logs &amp; External Links</h2>
            <p>
              Our static web host may collect standard HTTP request logs (such as requested URL path, browser user agent, and timestamp) strictly for security, uptime, and delivery. Text entered inside our client-side tools is never included in HTTP request logs. Our guides also link to external university resources whose privacy policies are separate from ours.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">5. Children&rsquo;s Privacy</h2>
            <p>
              Because our site operates without user accounts or personal data submissions, we do not knowingly collect personally identifiable information from children under 13.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-950">6. Contact</h2>
            <p>
              Questions about this Privacy Policy may be sent to{' '}
              <a href="mailto:mzadi084@gmail.com" className="font-semibold text-zinc-950 underline">
                mzadi084@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
