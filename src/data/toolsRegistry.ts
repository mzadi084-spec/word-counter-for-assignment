export interface ToolRegistryItem {
  id: string;
  name: string;
  path: string;
  category: 'Core Counters' | 'Language Tools' | 'Academic Calculators' | 'Document & Text';
  description: string;
  isStandaloneStatic: boolean;
}

export const ALL_TOOLS_REGISTRY: ToolRegistryItem[] = [
  {
    id: 'home',
    name: 'Word Counter',
    path: '/',
    category: 'Core Counters',
    description: 'Count words, characters with and without spaces, sentences, paragraphs, and reading or speaking times.',
    isStandaloneStatic: false,
  },
  {
    id: 'urdu-word-counter',
    name: 'Urdu Word Counter',
    path: '/urdu-word-counter/',
    category: 'Language Tools',
    description: 'Count Urdu Nastaliq words, letters, and sentences with Urdu punctuation (۔ and ؟).',
    isStandaloneStatic: true,
  },
  {
    id: 'roman-urdu-word-counter',
    name: 'Roman Urdu Word Counter',
    path: '/roman-urdu-word-counter/',
    category: 'Language Tools',
    description: 'Count Roman Urdu and bilingual English drafts with particle detection and readability metrics.',
    isStandaloneStatic: false,
  },
  {
    id: 'words-to-pages-converter',
    name: 'Words to Pages Converter',
    path: '/words-to-pages-converter/',
    category: 'Academic Calculators',
    description: 'Estimate single-spaced, double-spaced, and handwritten A4 page lengths from word counts.',
    isStandaloneStatic: true,
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    path: '/character-counter/',
    category: 'Core Counters',
    description: 'Count characters with and without spaces against academic abstract, UCAS, and portal limits.',
    isStandaloneStatic: true,
  },
  {
    id: 'paragraph-counter',
    name: 'Paragraph Counter',
    path: '/paragraph-counter/',
    category: 'Core Counters',
    description: 'Count paragraphs, average words per paragraph, and evaluate essay block balance.',
    isStandaloneStatic: true,
  },
  {
    id: 'sentence-counter',
    name: 'Sentence Counter',
    path: '/sentence-counter/',
    category: 'Core Counters',
    description: 'Measure total sentences, average sentence length, and inspect individual sentence word counts.',
    isStandaloneStatic: false,
  },
  {
    id: 'reading-time-calculator',
    name: 'Reading Time Calculator',
    path: '/reading-time-calculator/',
    category: 'Academic Calculators',
    description: 'Estimate silent reading time from text or word counts across slow, average, and fast WPM speeds.',
    isStandaloneStatic: false,
  },
  {
    id: 'speech-time-calculator',
    name: 'Speech Time Calculator',
    path: '/speech-time-calculator/',
    category: 'Academic Calculators',
    description: 'Calculate presentation, viva, and speech durations with customizable WPM and Q&A buffer.',
    isStandaloneStatic: false,
  },
  {
    id: 'assignment-word-limit-calculator',
    name: 'Assignment Word Limit Calculator',
    path: '/assignment-word-limit-calculator/',
    category: 'Academic Calculators',
    description: 'Calculate 0%, ±5%, ±10%, or custom course word-limit windows and 10-80-10 section word budgets.',
    isStandaloneStatic: false,
  },
  {
    id: 'words-per-minute-calculator',
    name: 'Words Per Minute Calculator',
    path: '/words-per-minute-calculator/',
    category: 'Academic Calculators',
    description: 'Compute WPM speed from word count and duration or run a live reading/typing timer test.',
    isStandaloneStatic: false,
  },
  {
    id: 'line-counter',
    name: 'Line Counter',
    path: '/line-counter/',
    category: 'Document & Text',
    description: 'Count total, non-empty, and blank lines, longest line length, and remove extra blank lines.',
    isStandaloneStatic: false,
  },
  {
    id: 'unique-word-counter',
    name: 'Unique Word Counter',
    path: '/unique-word-counter/',
    category: 'Document & Text',
    description: 'Measure lexical diversity, single-use vocabulary, and view a full searchable word frequency table.',
    isStandaloneStatic: false,
  },
  {
    id: 'pdf-word-counter',
    name: 'PDF Word Counter',
    path: '/pdf-word-counter/',
    category: 'Document & Text',
    description: 'Extract text and count words, characters, and page-by-page totals from PDF files in your browser.',
    isStandaloneStatic: false,
  },
  {
    id: 'essay-word-counter',
    name: 'Essay Word Counter',
    path: '/essay-word-counter/',
    category: 'Core Counters',
    description: 'Set custom essay limits and track introduction, body, and conclusion section proportions.',
    isStandaloneStatic: false,
  },
];
