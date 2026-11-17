export interface StaticBlogGuide {
  href: string;
  title: string;
  tag: string;
  description: string;
  cluster: 'hub' | 'pages' | 'counting' | 'speaking' | 'urdu';
}

export const STATIC_BLOG_GUIDES: StaticBlogGuide[] = [
  {
    href: '/blog/assignment-word-count-guide.html',
    title: 'Assignment Word Count Guide: Limits, Counting & Tips',
    tag: 'Student Hub Guide',
    description:
      'Complete hub covering university word limits, section budgets, document checking, and editing.',
    cluster: 'hub',
  },
  {
    href: '/blog/university-assignment-word-count.html',
    title: 'University Assignment Word Count: Rules & Tips',
    tag: 'Academic Guidelines',
    description:
      'What usually counts toward university word limits, margins, and section planning.',
    cluster: 'hub',
  },
  {
    href: '/blog/how-many-pages-is-1000-words.html',
    title: 'How Many Pages Is 1,000 Words? Single & Double Spaced',
    tag: 'Academic Formatting',
    description:
      'Approximate single-spaced, double-spaced, and handwritten page counts for 1,000 words.',
    cluster: 'pages',
  },
  {
    href: '/blog/how-many-words-is-2-pages.html',
    title: 'How Many Words Is 2 Pages? Single & Double Spacing Guide',
    tag: 'Formatting & Layout',
    description:
      'Estimated word counts for 2 typed pages (single or double spaced) and handwritten sheets.',
    cluster: 'pages',
  },
  {
    href: '/blog/how-many-words-is-5-pages.html',
    title: 'How Many Words Is 5 Pages? Single & Double Spaced Guide',
    tag: 'Formatting & Layout',
    description:
      'Typical word targets and section breakdowns for 5-page essays and reports.',
    cluster: 'pages',
  },
  {
    href: '/blog/how-many-pages-is-3300-words.html',
    title: 'How Many Pages Is 3,300 Words? Single & Double Spaced',
    tag: 'Academic Formatting',
    description:
      'Estimated page counts, reading times, and a sample essay plan for 3,300 words.',
    cluster: 'pages',
  },
  {
    href: '/blog/how-many-pages-is-10000-words.html',
    title: 'How Many Pages Is 10,000 Words? Page Count Guide',
    tag: 'Long-Form Formatting',
    description:
      'Thesis and dissertation page-count estimates and chapter planning for 10,000 words.',
    cluster: 'pages',
  },
  {
    href: '/blog/how-to-check-word-count-in-a-document.html',
    title: 'How to Check Word Count in a Document (Word, Docs, Pages)',
    tag: 'How-To Guide',
    description:
      'Step-by-step instructions for Word, Google Docs, Apple Pages, phones, and private browser tools.',
    cluster: 'counting',
  },
  {
    href: '/blog/how-to-count-words-in-a-specific-section.html',
    title: 'How to Count Words in a Specific Section of Your Essay',
    tag: 'Editing & Structure',
    description:
      'Measure individual paragraphs or sections while excluding references and appendices.',
    cluster: 'counting',
  },
  {
    href: '/blog/how-to-reduce-word-count-in-assignment.html',
    title: 'How to Reduce Word Count in an Assignment: 10 Proven Tips',
    tag: 'Academic Editing',
    description:
      'Ten practical academic editing techniques to trim excess words without losing marks.',
    cluster: 'counting',
  },
  {
    href: '/blog/how-to-count-words-in-urdu.html',
    title: 'How to Count Words in Urdu Text: Urdu Word Counter Guide',
    tag: 'Urdu & Bilingual Writing',
    description:
      'How Urdu spaces, punctuation marks (۔ ؟), and Roman Urdu word counts work.',
    cluster: 'urdu',
  },
  {
    href: '/blog/how-many-words-per-minute-speaking.html',
    title: 'Words Per Minute Speaking: Speech Length Guide',
    tag: 'Speaking & Presentations',
    description:
      'Typical presentation speeds (~130 to 150 wpm), speech duration charts, and pacing advice.',
    cluster: 'speaking',
  },
  {
    href: '/blog/how-long-to-read-1300-words-aloud.html',
    title: 'How Long to Read 1,300 Words Aloud? Timing Guide',
    tag: 'Reading & Speaking Timing',
    description:
      'Estimated reading-aloud and silent reading times for a 1,300-word speech or script.',
    cluster: 'speaking',
  },
];
