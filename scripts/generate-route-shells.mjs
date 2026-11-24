import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://wordcounterforassignment.com';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_PATH)) {
  console.error('Missing dist/index.html. Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_PATH, 'utf8');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const TOOL_AND_LEGAL_SHELLS = [
  {
    outRel: 'roman-urdu-word-counter/index.html',
    canonical: `${SITE_URL}/roman-urdu-word-counter/`,
    title: 'Roman Urdu Word Counter – Count Roman Urdu Words & Sentences',
    description:
      'Free Roman Urdu word counter for students. Count Roman Urdu and bilingual English words, characters, sentences, paragraphs, and detected particles locally.',
    h1: 'Roman Urdu Word Counter',
    summary:
      'Count Roman Urdu and mixed English assignment drafts, detect common Roman Urdu particles, and check reading and speaking times in your browser.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'sentence-counter/index.html',
    canonical: `${SITE_URL}/sentence-counter/`,
    title: 'Sentence Counter Online – Count Sentences & Average Length',
    description:
      'Free online sentence counter supporting English (. ! ?) and Urdu (۔ ؟) punctuation. Measure total sentences, average sentence length, and inspect individual sentences.',
    h1: 'Sentence Counter Online',
    summary:
      'Count sentences across English, Urdu, and Roman Urdu drafts, inspect individual sentence lengths, and balance paragraph readability.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'essay-word-counter/index.html',
    canonical: `${SITE_URL}/essay-word-counter/`,
    title: 'Essay Word Counter – Track Word Limits & Sections',
    description:
      'Free essay word counter for students. Set target word limits, monitor introduction, body, and conclusion ratios, and prevent length penalties.',
    h1: 'Essay Word Counter & Academic Section Planner',
    summary:
      'Set custom essay word limits with live progress tracking and keep introductions, body paragraphs, and conclusions balanced.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'reading-time-calculator/index.html',
    canonical: `${SITE_URL}/reading-time-calculator/`,
    title: 'Reading Time Calculator – Estimate Silent Reading Duration',
    description:
      'Free reading time calculator for students and writers. Paste text or enter a word count to estimate silent reading time across 150, 200, 250, and 300 WPM.',
    h1: 'Reading Time Calculator',
    summary:
      'Estimate how long an essay, seminar reading, or dissertation chapter takes to read silently across multiple words-per-minute presets.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'speech-time-calculator/index.html',
    canonical: `${SITE_URL}/speech-time-calculator/`,
    title: 'Speech Time Calculator – Estimate Presentation & Speech Duration',
    description:
      'Calculate presentation, viva, and speech duration from pasted scripts or word counts across slow, standard (130 WPM), and fast speaking paces.',
    h1: 'Speech Time Calculator',
    summary:
      'Time university presentations, vivas, and speech scripts from text or word counts with optional question-and-answer buffer time.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'assignment-word-limit-calculator/index.html',
    canonical: `${SITE_URL}/assignment-word-limit-calculator/`,
    title: 'Assignment Word Limit Calculator – Custom % Range & Essay Sections',
    description:
      'Calculate university 0%, ±5%, ±10%, or custom tolerance word-limit windows, 10-80-10 introduction/body/conclusion section budgets, and compare your draft word count.',
    h1: 'Assignment Word Limit Calculator',
    summary:
      'Calculate exact minimum and maximum assignment word windows under 0%, ±5%, ±10%, or custom course tolerances and distribute words across sections.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'words-per-minute-calculator/index.html',
    canonical: `${SITE_URL}/words-per-minute-calculator/`,
    title: 'Words Per Minute Calculator – WPM Formula & Live Timer Test',
    description:
      'Calculate reading or speaking words per minute (WPM) from word count and duration, or run a live built-in stopwatch timer on any practice passage.',
    h1: 'Words Per Minute (WPM) Calculator',
    summary:
      'Compute reading, speaking, or typing words per minute from any passage and elapsed time, or measure your pace with a live browser timer.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'line-counter/index.html',
    canonical: `${SITE_URL}/line-counter/`,
    title: 'Line Counter Online – Count Total, Blank & Non-Empty Lines',
    description:
      'Free online line counter to measure total lines, non-empty lines, blank lines, average words per line, and remove empty lines with one click.',
    h1: 'Line Counter Online',
    summary:
      'Count total, non-empty, and blank lines in coursework notes, poetry, scripts, and references, and strip extra blank lines locally.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'unique-word-counter/index.html',
    canonical: `${SITE_URL}/unique-word-counter/`,
    title: 'Unique Word Counter – Distinct Vocabulary & Frequency Table',
    description:
      'Analyze unique words, lexical diversity ratio, single-use words, and searchable word frequency tables inside your browser.',
    h1: 'Unique Word Counter & Frequency Analyzer',
    summary:
      'Measure vocabulary variety, inspect repeated terms in essays, filter common stop words, and search your full word frequency table.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'pdf-word-counter/index.html',
    canonical: `${SITE_URL}/pdf-word-counter/`,
    title: 'PDF Word Counter – Count Words in PDF Files Locally',
    description:
      'Count words, characters, sentences, and page-by-page word totals inside digital PDF files locally inside your browser without uploading PDFs to an application server.',
    h1: 'PDF Word Counter',
    summary:
      'Select any digital PDF assignment or research paper to inspect total words, characters, and a page-by-page breakdown directly in browser memory.',
    schemaType: 'WebApplication',
  },
  {
    outRel: 'disclaimer/index.html',
    canonical: `${SITE_URL}/disclaimer/`,
    title: 'Disclaimer – Word Counter for Assignment',
    description:
      'Academic accuracy, word count variation, client-side PDF limitation, and browser-based estimation disclaimer for Word Counter for Assignment.',
    h1: 'Disclaimer',
    summary:
      'Educational estimation notice, university formatting responsibility, and client-side PDF extraction limitations.',
    schemaType: 'WebPage',
  },
];

// Extract the 6 React blog article entries from src/data/blogArticles.ts
function readReactBlogArticles() {
  const srcPath = path.resolve(process.cwd(), 'src/data/blogArticles.ts');
  const content = fs.readFileSync(srcPath, 'utf8');
  const entries = [];
  const blockRegex =
    /slug:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?metaTitle:\s*'([^']+)'[\s\S]*?metaDescription:\s*'([^']+)'[\s\S]*?summary:\s*'([^']+)'/g;
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    entries.push({
      outRel: `blog/${match[1]}.html`,
      canonical: `${SITE_URL}/blog/${match[1]}`,
      title: match[3],
      description: match[4],
      h1: match[2],
      summary: match[5],
      schemaType: 'Article',
    });
  }
  return entries;
}

function buildShellHtml(route) {
  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${route.schemaType === 'Article' ? 'article' : 'website'}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${escapeHtml(route.canonical)}" />`
  );

  const schemaObj =
    route.schemaType === 'Article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.h1,
          description: route.description,
          url: route.canonical,
          dateModified: '2026-11-22',
          publisher: {
            '@type': 'Organization',
            name: 'Word Counter for Assignment',
            url: `${SITE_URL}/`,
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': route.schemaType,
          name: route.h1,
          url: route.canonical,
          description: route.description,
          ...(route.schemaType === 'WebApplication'
            ? {
                applicationCategory: 'EducationalApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              }
            : {}),
        };

  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

  // Replace the homepage WebApplication JSON-LD block if present, keeping WebSite & Organization intact
  html = html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "WebApplication"[\s\S]*?<\/script>/,
    jsonLdScript
  );

  // Update the visible crawler fallback inside #root
  html = html.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(route.h1)}</h1>`);
  html = html.replace(
    /<main>\s*<p>[\s\S]*?<\/p>/,
    `<main>\n        <p>${escapeHtml(route.summary)}</p>`
  );

  return html;
}

const allRoutes = [...TOOL_AND_LEGAL_SHELLS, ...readReactBlogArticles()];

for (const route of allRoutes) {
  const outPath = path.join(DIST_DIR, route.outRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buildShellHtml(route), 'utf8');
  console.log(`Generated route shell: dist/${route.outRel}`);
}

console.log(`Total pre-rendered route shells written: ${allRoutes.length}`);
