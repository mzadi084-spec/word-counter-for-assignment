export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolConfig {
  id: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  highlightStat:
    | 'words'
    | 'characters'
    | 'charactersNoSpaces'
    | 'sentences'
    | 'paragraphs'
    | 'readingTime'
    | 'speakingTime';
  romanUrduTip: string;
  guideTitle: string;
  guideParagraphs: string[];
  tipsTitle: string;
  tips: string[];
  faqs: ToolFAQ[];
}

export const TOOLS_CONFIG: Record<string, ToolConfig> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Word Counter for Assignment',
    metaTitle: 'Free Online Word Counter for Assignments | Word Counter for Assignment',
    metaDescription:
      'Free online word counter for assignments with live word count, character count with and without spaces, sentence, paragraph, reading and speaking time in your browser.',
    h1: 'Free Online Word Counter for Assignments',
    tagline:
      'Paste or type your draft to check live words, characters with and without spaces, sentences, paragraphs, and reading or speaking times in English, Urdu, and Roman Urdu.',
    highlightStat: 'words',
    romanUrduTip:
      'Apna assignment text yahan paste karein ya type karein taake live word count, sentences, aur word limit check kar sakein.',
    guideTitle: 'How This Free Online Word Counter Works',
    guideParagraphs: [
      'Word Counter for Assignment runs directly inside your web browser using client-side JavaScript. As soon as you paste or type coursework into the editor above, the counter scans word tokens, character counts with and without spaces, complete sentences (including English periods, question marks, exclamation points, and Urdu punctuation marks ۔ and ؟), and paragraphs.',
      'Drafts are processed locally inside your browser session rather than submitted to an external user-text database. That makes it practical for essays, university reports, thesis chapters, dissertation body sections, and study notes across desktop, tablet, and mobile screens.',
      'Beyond basic totals, you can set a target assignment word limit above the editor to track remaining or exceeded words against a goal, inspect your top five most repeated words to reduce filler, and open dedicated calculators for Roman Urdu, words-to-pages conversion, customizable assignment tolerance limits, reading/speaking times, line counting, unique words, and local PDF word counting.',
    ],
    tipsTitle: 'Why Students Use Word Counter for Assignment',
    tips: [
      'Prevent grading penalties across course limits: Some modules enforce strict 0% caps while others permit ±5% or ±10% margins (e.g., 1,800 to 2,200 words for a 2,000-word essay).',
      'Run counts locally in your browser: Counting happens inside browser memory with no account logins, paywalls, or draft upload forms.',
      'Verify bilingual & Urdu coursework: Recognizes Latin, Roman Urdu, and Unicode Urdu script plus Urdu full stop (۔) and question mark (؟).',
      'Spot repeated words before submitting: Review the Top Repeated Words strip to tighten repetitive phrasing and improve academic vocabulary.',
    ],
    faqs: [
      {
        question: 'Do in-text citations and reference lists count toward my assignment word limit?',
        answer:
          'Rules depend on your university or department syllabus. Most UK, US, and Australian institutions include in-text author-date citations in the word count while excluding the reference list or bibliography, appendices, and cover page. Always check your module handbook.',
      },
      {
        question: 'How does the word counter handle hyphenated words and abbreviations?',
        answer:
          'Standard academic counters treat hyphenated terms (such as "evidence-based" or "short-term") as one word when joined without spaces. Abbreviations like "e.g.", "i.e.", or "Dr." are handled without breaking your sentence tally prematurely.',
      },
      {
        question: 'Is my assignment text stored or uploaded to any server?',
        answer:
          'No. Counting runs locally in browser memory via JavaScript with no draft submission form or user database storing your pasted essays.',
      },
      {
        question: 'How does this free online word counter work for reading and speaking times?',
        answer:
          'Once you paste text, the counter estimates silent reading time at about 200 words per minute and presentation speaking time at about 130 words per minute. Actual times vary by reader, topic complexity, and speaking pace.',
      },
      {
        question: 'What is the usual word count tolerance in university assignments?',
        answer:
          'Many institutions allow a margin of plus or minus 10% around the stated word limit, meaning a 3,000-word target commonly accepts roughly 2,700 to 3,300 words. Some strict exams and journals enforce a hard maximum with zero tolerance above the limit.',
      },
    ],
  },
  characterCounter: {
    id: 'character-counter',
    path: '/character-counter',
    title: 'Character Counter Online',
    metaTitle: 'Character Counter Online – Free Text & Space Counter',
    metaDescription:
      'Free online character counter. Count characters with and without spaces, words, and sentences in real time for assignments, abstracts, and forms.',
    h1: 'Online Character Counter with & without Spaces',
    tagline:
      'Accurately count total characters, whitespace, and letters for university application forms, abstracts, and assignment portals.',
    highlightStat: 'characters',
    romanUrduTip:
      'Characters with spaces aur without spaces count karein. Application forms aur journal abstracts ke liye mufeed hai.',
    guideTitle: 'Understanding Character Limits in Academic Writing & Applications',
    guideParagraphs: [
      'While general coursework specifies word limits, scholarship forms, UCAS personal statements, conference abstracts, and online submission portals often impose strict character limits. Knowing whether spaces are included helps you stay inside box cutoffs.',
      'Our Character Counter distinguishes between total characters (including spaces, punctuation, and line breaks) and characters without spaces so you can verify exact portal constraints before pasting.',
      'Combine character metrics with the repeated-word breakdown below the editor to replace wordy phrases with clear active verbs.',
    ],
    tipsTitle: 'How to Cut Down Character Count Without Losing Meaning',
    tips: [
      'Use active verbs instead of passive constructions to shorten sentences naturally.',
      'Remove redundant modifiers such as "completely unique" or "basic fundamentals".',
      'Use single spaces after periods rather than double spacing between sentences.',
      'Check whether your submission portal counts spaces before trimming your draft.',
    ],
    faqs: [
      {
        question: 'What is the difference between characters with spaces and without spaces?',
        answer:
          'Characters with spaces include letters, numbers, punctuation marks, spaces, and line breaks. Characters without spaces exclude whitespace characters such as spaces, tabs, and line returns.',
      },
      {
        question: 'What is the character limit for a UCAS personal statement?',
        answer:
          'UCAS personal statements enforce a maximum of 4,000 characters including spaces (and 47 lines), depending on the active admission format.',
      },
      {
        question: 'Why do research portals ask for character counts rather than word counts?',
        answer:
          'Database fields, printed abstract booklets, and web forms allocate fixed visual space based on character count rather than word boundaries.',
      },
      {
        question: 'Are Urdu and Arabic letters counted accurately?',
        answer:
          'Yes. Unicode characters, punctuation marks, and spaces in Urdu and English scripts are counted accurately in your browser.',
      },
    ],
  },
  sentenceCounter: {
    id: 'sentence-counter',
    path: '/sentence-counter',
    title: 'Sentence Counter Online',
    metaTitle: 'Sentence Counter Online – Count Sentences & Average Length',
    metaDescription:
      'Free online sentence counter for assignments. Count English and Urdu sentences (۔ ؟), inspect average sentence length, and improve essay readability.',
    h1: 'Online Sentence Counter & Readability Tool',
    tagline:
      'Count total sentences, measure average sentence length, and inspect sentence-by-sentence word counts in English and Urdu.',
    highlightStat: 'sentences',
    romanUrduTip:
      'Har sentence ka hisaab rakhein. Lambay sentences ko chota karein taake assignment ki readability behtar ho.',
    guideTitle: 'Why Sentence Length Balance Matters in Academic Essays',
    guideParagraphs: [
      'Sentence variety affects how clearly lecturers and graders follow your argument. Very long sentences (over 35 to 45 words) frequently bury your main verb and obscure your claim, while an unbroken string of six-word sentences sounds choppy.',
      'University writing typically reads most clearly when sentences average roughly 15 to 22 words, mixing concise topic sentences with well-structured analytical explanations.',
      'Our Sentence Counter recognizes English terminal punctuation (. ! ?) as well as Urdu full stops (۔) and question marks (؟) while avoiding false splits inside numbers and common abbreviations such as "e.g.", "i.e.", and "Dr.".',
    ],
    tipsTitle: 'Strategies for Clearer Academic Sentences',
    tips: [
      'Aim for an overall average between 15 and 22 words per sentence.',
      'Split sentences over 35 words into two focused statements connected by clear transitions.',
      'Vary sentence openings instead of repeating "This shows" or "Furthermore" back-to-back.',
      'Check Urdu assignments using the Urdu full stop (۔) so sentences divide accurately.',
    ],
    faqs: [
      {
        question: 'How does the sentence counter detect sentence boundaries?',
        answer:
          'It detects terminal punctuation marks (. ! ? and Urdu ۔ ؟) plus line breaks while ignoring decimal numbers and common academic abbreviations such as e.g., i.e., Fig., and Dr.',
      },
      {
        question: 'What is a healthy average sentence length for university writing?',
        answer:
          'Most style guides suggest averaging roughly 15 to 22 words per sentence, mixing short direct claims with moderately detailed analysis sentences.',
      },
      {
        question: 'Can this tool highlight overly long run-on sentences?',
        answer:
          'Yes. The breakdown table lists each detected sentence alongside its individual word count so you can spot and split long sentences quickly.',
      },
      {
        question: 'Does the sentence counter work with Urdu punctuation?',
        answer:
          'Yes. It supports both the Urdu full stop (۔) and Urdu question mark (؟) alongside standard English punctuation.',
      },
    ],
  },
  essayWordCounter: {
    id: 'essay-word-counter',
    path: '/essay-word-counter',
    title: 'Essay Word Counter',
    metaTitle: 'Essay Word Counter – Track Word Limits & Sections',
    metaDescription:
      'Free essay word counter for students. Set target word limits, monitor introduction, body, and conclusion ratios, and prevent length penalties.',
    h1: 'Essay Word Counter & Academic Section Planner',
    tagline:
      'Set custom essay word limits with live progress tracking. Keep introductions, body paragraphs, and conclusions balanced.',
    highlightStat: 'words',
    romanUrduTip:
      'Essay ka word limit set karein aur live progress track karein taake introduction aur body paragraphs mutawazin rahein.',
    guideTitle: 'Mastering Essay Word Distribution and Structure',
    guideParagraphs: [
      'Strong essays allocate space intentionally across sections rather than spending 30% of the budget on background context. A widely taught planning baseline allocates roughly 10% to the introduction, 80% to body paragraphs, and 10% to the conclusion.',
      'For a 2,000-word essay, that equals about 200 words for the introduction, about 1,600 words across 7 to 9 focused body paragraphs, and about 200 words for the conclusion.',
      'Set your target limit above the editor to monitor live remaining words or overage, and review the repeated-words list before exporting back to Microsoft Word or Google Docs.',
    ],
    tipsTitle: 'How to Allocate Words Across Essay Sections',
    tips: [
      'Introduction (~10%): Present topic context, scope, and your thesis statement concisely.',
      'Body paragraphs (~80%): Dedicate roughly 150 to 220 words per paragraph to one clear analytical point.',
      'Conclusion (~10%): Synthesize main findings and answer the prompt without adding new citations.',
      'Check your department syllabus for whether citations and headings count toward your limit.',
    ],
    faqs: [
      {
        question: 'How do I allocate words across essay sections?',
        answer:
          'Use the 10-80-10 guideline as a starting point: about 10% for the introduction, 80% for body paragraphs, and 10% for the conclusion, adjusted for any rubric instructions.',
      },
      {
        question: 'What happens if my essay exceeds the maximum word limit?',
        answer:
          'Many courses apply mark deductions past a +10% margin or stop grading after the word cutoff. Always verify your syllabus policy.',
      },
      {
        question: 'Can I check individual thesis or dissertation chapters?',
        answer:
          'Yes. Paste any section such as your literature review or methodology chapter and enter that section word target.',
      },
      {
        question: 'Can I copy my edited essay back into Word or Google Docs?',
        answer:
          'Yes. Click Copy Text above the editor to copy your draft with line breaks intact.',
      },
    ],
  },
  paragraphCounter: {
    id: 'paragraph-counter',
    path: '/paragraph-counter',
    title: 'Paragraph Counter Online',
    metaTitle: 'Paragraph Counter Online – Count & Structure Paragraphs',
    metaDescription:
      'Free online paragraph counter. Count paragraphs, average words per paragraph, and improve the structure of your academic assignments.',
    h1: 'Online Paragraph Counter & Structure Analyzer',
    tagline:
      'Track total paragraphs and ensure balanced academic argument blocks across essays and reports.',
    highlightStat: 'paragraphs',
    romanUrduTip:
      'Paragraphs ki tadaad check karein. Bohat lambay paragraphs ko break karein taake parhne mein asaani ho.',
    guideTitle: 'The Role of Effective Paragraphing in Assignment Grading',
    guideParagraphs: [
      'Clear paragraph breaks help examiners trace each step of your argument. Overly long paragraphs spanning 350+ words make evidence difficult to locate, while single-sentence paragraphs often feel underdeveloped.',
      'Most academic essays read best when body paragraphs stay around 120 to 220 words, each focused on one claim supported by evidence and analysis.',
      'Our Paragraph Counter counts non-empty text blocks separated by line breaks in real time inside your browser.',
    ],
    tipsTitle: 'Best Practices for Academic Paragraphing',
    tips: [
      'Follow the PEEL structure: Point, Evidence, Explanation, and Link back to your thesis.',
      'Target roughly 120 to 200 words per analytical paragraph.',
      'Split long walls of text where a new piece of evidence or counterpoint starts.',
      'Reserve single-sentence transitions only where permitted by your discipline style.',
    ],
    faqs: [
      {
        question: 'How many paragraphs should a 1,000-word essay have?',
        answer:
          'A typical 1,000-word essay contains about 6 to 8 paragraphs: an introduction, 4 to 6 body paragraphs of around 140 to 180 words each, and a conclusion.',
      },
      {
        question: 'How does the paragraph counter count paragraphs?',
        answer:
          'It counts non-empty text blocks separated by line breaks while ignoring blank spacing lines.',
      },
      {
        question: 'Are one-sentence paragraphs acceptable in university essays?',
        answer:
          'Generally avoid one-sentence paragraphs in formal essays because a single sentence rarely provides sufficient claim, evidence, and analysis.',
      },
      {
        question: 'Why do markers comment on long paragraphs?',
        answer:
          'Dense multi-topic paragraphs blend separate arguments together, making it harder for readers to follow your reasoning.',
      },
    ],
  },
  readingTimeCalculator: {
    id: 'reading-time-calculator',
    path: '/reading-time-calculator',
    title: 'Reading Time Calculator',
    metaTitle: 'Reading Time Calculator – Estimate Silent Reading Duration',
    metaDescription:
      'Free reading time calculator for students. Estimate silent reading time across slow (~150 WPM), average (~200 WPM), and fast (~250 WPM) reading speeds.',
    h1: 'Online Reading Time Calculator',
    tagline:
      'Estimate silent reading duration by pasting text or entering a word count across slow, average, and fast reading speeds.',
    highlightStat: 'readingTime',
    romanUrduTip:
      'Apne essay ya article ko parhne ka andazan waqt dekhein. Aam silent reading speed taqreeban 200 words per minute hoti hai.',
    guideTitle: 'How Reading Time Estimates Work for Study Planning',
    guideParagraphs: [
      'Estimating reading time helps students budget study sessions before seminars and lets writers gauge how long a blog guide or report feels to read.',
      'Silent adult reading speeds commonly range around 200 words per minute for general prose, slower (~150 WPM) for dense technical or legal material, and faster (~250 to 300 WPM) when skimming familiar topics.',
      'Use either pasted text or a direct word count to compare reading durations across multiple speeds.',
    ],
    tipsTitle: 'Reading Speed Planning Tips',
    tips: [
      'Use ~150 WPM when scheduling reading time for technical, scientific, or statutory texts.',
      'Use ~200 WPM as a general planning average for essays, articles, and coursework.',
      'Include extra margin when taking notes, highlighting citations, or translating vocabulary.',
      'Switch to the Speech Time Calculator when preparing an oral presentation or viva.',
    ],
    faqs: [
      {
        question: 'What reading speed is used as the default estimate?',
        answer:
          'The default baseline uses about 200 words per minute (WPM), while also letting you compare slower (~150 WPM), faster (~250 WPM), or custom speeds.',
      },
      {
        question: 'How long does it take to read 1,000 words silently?',
        answer:
          'At an average speed of about 200 WPM, reading 1,000 words silently takes approximately 5 minutes. Dense academic papers can take 6 to 8 minutes.',
      },
      {
        question: 'Is silent reading faster than reading aloud?',
        answer:
          'Yes. Silent reading typically runs about 200 to 250 WPM, whereas clear oral speech typically averages about 120 to 150 WPM.',
      },
      {
        question: 'Can I calculate reading time without pasting my entire text?',
        answer:
          'Yes. Switch to the Word Count tab on the Reading Time Calculator to enter any numeric word count directly.',
      },
    ],
  },
};
