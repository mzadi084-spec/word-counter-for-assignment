import React, { useRef, useState } from 'react';
import { analyzeText, CounterStats, extractWordTokens } from '../utils/counterLogic';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { Link } from 'react-router-dom';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';
import { Check, ChevronDown, Copy, FileUp, Trash2 } from 'lucide-react';

interface PageBreakdownItem {
  pageNumber: number;
  words: number;
  characters: number;
}

interface PdfResult {
  fileName: string;
  fileSizeBytes: number;
  numPages: number;
  extractedText: string;
  stats: CounterStats;
  pages: PageBreakdownItem[];
}

const FAQS = [
  {
    q: 'Are selected PDF files sent to any server?',
    a: 'No. PDF parsing runs locally inside your browser memory via PDF.js without uploading your PDF files to an application server.',
  },
  {
    q: 'Why does a scanned image PDF show 0 words?',
    a: 'Scanned PDFs saved strictly as photographs do not contain an embedded digital text layer. This tool reads digital text layers only; scanned pages require Optical Character Recognition (OCR) software first.',
  },
  {
    q: 'How can I count words in a PDF on iPhone or Android?',
    a: 'Tap Select PDF File above on Safari or Chrome on your iPhone, iPad, or Android device, choose your PDF from Files or Downloads, and review total words and per-page counts right in your mobile browser.',
  },
  {
    q: 'PDF ke words kaise count karein? (Roman Urdu)',
    a: 'Upar "Select PDF File" par click karke apni PDF file select karein. Tool browser memory mein text extract karke total words, characters aur har page ke words foran dikha dega. Scan ki hui tasveer-wali PDF ke liye pehle OCR zaroori hota hai.',
  },
  {
    q: 'Can this tool count words in password-protected PDFs?',
    a: 'No. Password-encrypted PDF files prevent browser-based text extraction unless unlocked beforehand.',
  },
  {
    q: 'Does PDF word count always match Microsoft Word exactly?',
    a: 'Small differences can happen if headers, footers, page numbers, reference lists, or ligatures were exported into the PDF text layer alongside your main essay text.',
  },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export const PdfWordCounterPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pdfResult, setPdfResult] = useState<PdfResult | null>(null);
  const [copied, setCopied] = useState(false);

  const processPdfFile = async (file: File) => {
    setErrorMessage(null);
    setPdfResult(null);

    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      setErrorMessage('Please select a valid PDF (.pdf) document.');
      return;
    }

    setIsParsing(true);
    try {
      const [pdfjsLib, workerModule] = await Promise.all([
        import('pdfjs-dist'),
        import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
      ]);
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;

      const buffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdfDoc = await loadingTask.promise;

      const pages: PageBreakdownItem[] = [];
      const pageTexts: string[] = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum += 1) {
        const page = await pdfDoc.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        pageTexts.push(pageText);
        pages.push({
          pageNumber: pageNum,
          words: extractWordTokens(pageText).length,
          characters: pageText.length,
        });
      }

      const fullText = pageTexts.filter(Boolean).join('\n\n');
      const stats = analyzeText(fullText);

      setPdfResult({
        fileName: file.name,
        fileSizeBytes: file.size,
        numPages: pdfDoc.numPages,
        extractedText: fullText,
        stats,
        pages,
      });

      if (fullText.trim().length === 0) {
        setErrorMessage(
          'No selectable text layer was detected in this PDF. It appears to be a scanned image-only PDF, which requires OCR outside this browser tool.'
        );
      }
    } catch (err) {
      const msg =
        err instanceof Error && /password/i.test(err.message)
          ? 'This PDF appears to be password-protected and cannot be read in the browser.'
          : 'Could not read this PDF file. Please verify that the file is an unencrypted digital PDF.';
      setErrorMessage(msg);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void processPdfFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void processPdfFile(file);
    }
  };

  const handleCopy = async () => {
    if (!pdfResult?.extractedText) return;
    try {
      await navigator.clipboard.writeText(pdfResult.extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleClear = () => {
    setPdfResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PDF Word Counter',
    url: buildCanonicalUrl('/pdf-word-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Count words, characters, sentences, and page-by-page totals inside PDF documents locally in your browser without file uploads.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'PDF Word Counter', path: '/pdf-word-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="PDF Word Counter – Count Words in PDF Files Locally"
        description="Free browser-based PDF word counter. Extract digital PDF text locally in your browser to count total words, characters, sentences, and words per page."
        canonicalPath="/pdf-word-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-5 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Client-Side PDF.js Reader &middot; Browser-Memory Parsing
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            PDF Word Counter
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            Select or drop a PDF file to count total words, characters, sentences, and page-by-page totals locally in browser memory without uploading PDFs to an application server.
          </p>
        </header>

        <section className="space-y-5">
          {/* File Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-8 rounded-2xl border-2 border-dashed transition-colors text-center space-y-4 ${
              isDragging
                ? 'border-zinc-950 bg-zinc-100'
                : 'border-zinc-300 bg-zinc-50 hover:border-zinc-950'
            }`}
          >
            <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center mx-auto">
              <FileUp className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-zinc-950">
                {isParsing ? 'Reading PDF in your browser...' : 'Choose or Drop a PDF Document'}
              </h2>
              <p className="text-xs text-zinc-600 max-w-md mx-auto">
                Digital text-based PDFs only. Image-only scanned PDFs without selectable text require OCR before counting.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                aria-label="Select PDF file"
                onChange={handleFileChange}
                className="sr-only"
                id="pdf-file-input"
              />
              <label
                htmlFor="pdf-file-input"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <span>{isParsing ? 'Processing...' : 'Select PDF File'}</span>
              </label>

              {pdfResult && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs font-semibold hover:border-zinc-950 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-zinc-50 border border-zinc-950 text-sm text-zinc-900"
            >
              <strong className="font-semibold block mb-0.5">Notice</strong>
              <span>{errorMessage}</span>
            </div>
          )}

          {pdfResult && (
            <div className="space-y-4">
              {/* File Summary Bar */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
                <div>
                  <strong className="text-zinc-950">{pdfResult.fileName}</strong>{' '}
                  &middot; {formatFileSize(pdfResult.fileSizeBytes)} &middot;{' '}
                  <span className="font-mono-num">{pdfResult.numPages}</span>{' '}
                  {pdfResult.numPages === 1 ? 'page' : 'pages'}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!pdfResult.extractedText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-900 font-semibold hover:border-zinc-950 disabled:opacity-40 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Text' : 'Copy Extracted Text'}</span>
                </button>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <div className="p-3.5 rounded-xl bg-zinc-950 text-white border border-zinc-950">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                    Total Words
                  </div>
                  <div className="text-2xl font-bold font-mono-num mt-0.5">
                    {pdfResult.stats.words.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    PDF Pages
                  </div>
                  <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                    {pdfResult.numPages.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    Characters
                  </div>
                  <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                    {pdfResult.stats.characters.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    No Spaces
                  </div>
                  <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                    {pdfResult.stats.charactersNoSpaces.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    Sentences
                  </div>
                  <div className="text-2xl font-bold text-zinc-950 font-mono-num mt-0.5">
                    {pdfResult.stats.sentences.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    Read Time
                  </div>
                  <div className="text-lg font-bold text-zinc-950 font-mono-num mt-1 truncate">
                    {pdfResult.stats.readingTimeText}
                  </div>
                </div>
              </div>

              {/* Page-by-Page Breakdown */}
              <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
                  <h2 className="text-sm font-bold text-zinc-950">
                    Page-by-Page PDF Word Count
                  </h2>
                </div>
                <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-4">Page</th>
                        <th className="py-2.5 px-4 text-right">Words</th>
                        <th className="py-2.5 px-4 text-right">Characters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 font-mono-num">
                      {pdfResult.pages.map((p) => (
                        <tr key={p.pageNumber}>
                          <td className="py-2 px-4 font-semibold text-zinc-950">
                            Page {p.pageNumber}
                          </td>
                          <td className="py-2 px-4 text-right text-zinc-950">
                            {p.words.toLocaleString()}
                          </td>
                          <td className="py-2 px-4 text-right text-zinc-600">
                            {p.characters.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Extracted Text Preview */}
              {pdfResult.extractedText && (
                <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
                    <h2 className="text-sm font-bold text-zinc-950">Extracted Text Preview</h2>
                  </div>
                  <textarea
                    readOnly
                    aria-label="Extracted PDF text"
                    value={pdfResult.extractedText}
                    className="w-full min-h-[180px] p-4 bg-white text-zinc-800 text-sm leading-relaxed focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-14 space-y-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-4">
            <h2 className="text-2xl font-bold text-zinc-950">
              How Local Browser PDF Word Counting Works
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              Instead of submitting coursework to an external server conversion queue, this tool parses PDF text layers inside your own browser memory via PDF.js and generates a quick page-by-page word summary.
            </p>
            <p className="text-zinc-700 leading-relaxed">
              Note that scanned documents saved strictly as images without an OCR text layer, and encrypted password-locked PDFs, cannot be read directly by browser-side PDF extraction. Checking a Microsoft Word (.docx) draft or specific thesis chapter without references? Paste your body text directly into our{' '}
              <Link to="/" className="font-semibold text-zinc-950 underline hover:no-underline">
                Word Counter for Assignment
              </Link>
              .
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5">
            <h2 className="text-2xl font-bold text-zinc-950">PDF Word Counter FAQ</h2>
            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {FAQS.map((faq, idx) => (
                <details key={idx} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-zinc-950">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed pr-6">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MoreToolsSection currentPath="/pdf-word-counter" />
        <PopularGuidesSection
          title="Document & Word Count Guides"
          guides={STATIC_BLOG_GUIDES.filter((g) => g.cluster === 'counting' || g.cluster === 'hub')}
        />
      </main>
    </>
  );
};
