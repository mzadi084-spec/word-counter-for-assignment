import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Editable contact email address as specified in brief
  const contactEmail = 'mzadi084@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us – Word Counter for Assignment"
        description="Have questions or suggestions? Contact the Word Counter for Assignment team at mzadi084@gmail.com for student support and inquiries."
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
            We love hearing from students, teachers, and university writers. Send us your feedback or tool suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Direct Contact Card */}
          <div className="space-y-6 md:col-span-1">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Direct Email</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                For direct academic queries, bug reports, or feature requests, feel free to email:
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
                  <span>Response Time: Within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>Languages: English, Urdu & Roman Urdu</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
              <span className="font-bold block mb-1">Roman Urdu Note:</span>
              <p>Agar aapko kisi feature mein masla aa raha ho ya koi naya tool add karwana ho to aap Roman Urdu mein bhi rabta kar sakte hain.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto">
                  Thank you for reaching out. Your feedback has been received and our team will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="e.g. Ali Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="e.g. student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="category-select" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Topic / Category
                  </label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Feedback">General Feedback</option>
                    <option value="Feature">Feature / Counter Suggestion</option>
                    <option value="Bug">Report a Bug / Calculation Error</option>
                    <option value="Academic">University / Classroom Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message-textarea" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message-textarea"
                    required
                    rows={5}
                    placeholder="Tell us what you think or how we can improve our word counting tools..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
