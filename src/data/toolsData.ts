export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolConfig {
  id: string;
  path: string;
  title: string;
  metaTitle: string; // under 60 chars
  metaDescription: string; // under 155 chars
  h1: string;
  tagline: string;
  highlightStat: 'words' | 'characters' | 'charactersNoSpaces' | 'sentences' | 'paragraphs' | 'readingTime' | 'speakingTime';
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
    metaTitle: 'Word Counter for Assignment – Free Online Student Tool',
    metaDescription: 'Free online word counter for assignment writing with live word count, Urdu text support, word limit tracking, reading time, and words to pages converter.',
    h1: 'Free Word Counter for Assignment & Essays',
    tagline: 'Track words, characters, sentences, and paragraph limits instantly in English, Urdu, and Roman Urdu.',
    highlightStat: 'words',
    romanUrduTip: 'Apna assignment text yahan paste karein ya type karein taake exact word count aur word limit check kar sakein.',
    guideTitle: 'Complete Guide: Why Word Count Matters for Academic Assignments',
    guideParagraphs: [
      'Writing an academic assignment requires adhering strictly to university and college grading guidelines. Most professors and exam boards specify a word limit with an accepted margin of variation, typically plus or minus 10%. Submitting an assignment that falls short can mean missing critical analytical arguments, while exceeding the ceiling risks penalties or having excess paragraphs left unread by markers.',
      'Our Word Counter for Assignment is custom-built for university, college, and high-school students worldwide, with specialized character-set awareness for English, Urdu, and Roman Urdu. Because all text calculations execute directly inside your browser sandbox, your unpublished assignment drafts remain 100% confidential and safe from web scraping or cloud storage.',
      'Unlike basic word processors that hide punctuation nuances, our engine provides comprehensive live analytics: total words, character count with and without spaces, complete sentence metrics, paragraph density, estimated reading time, and speaking time for seminar presentations. The integrated Word Limit Tracker continuously updates as you write, preventing accidental deductions before final submission.'
    ],
    tipsTitle: 'Top Assignment Writing Tips for Students',
    tips: [
      'Check the 10% rule: Most universities allow 10% below or above the required word count (e.g., 1,800 to 2,200 words for a 2,000-word essay).',
      'Exclusions check: Always verify whether your lecturer includes citations, footnotes, abstract, and references in the total word count.',
      'Trim wordy phrases: Replace phrases like "due to the fact that" with "because", and "in the event that" with "if" to tighten your prose.',
      'Track paragraphs: Academic paragraphs are ideally 100 to 200 words long, developing a single clear argument supported by evidence.'
    ],
    faqs: [
      {
        question: 'Do in-text citations and reference lists count towards my assignment word limit?',
        answer: 'This depends on your university guidelines. Most UK, Australian, and US institutions count in-text citations (such as Harvard or APA author-date citations) in the core word count, but exclude the bibliography or reference list, appendices, and title pages. Always check your module syllabus or rubric.'
      },
      {
        question: 'How does the word counter handle hyphenated words and abbreviations?',
        answer: 'Standard academic word counters treat hyphenated compound terms (like "evidence-based" or "state-of-the-art") as single words unless separated by whitespace. Abbreviations with periods (like "e.g." or "i.e.") are treated as individual words without incorrectly splitting your sentences.'
      },
      {
        question: 'Is my assignment text stored or uploaded to any server?',
        answer: 'No. Our tool performs all calculations locally in your browser using modern client-side JavaScript. Your text is never transmitted over the internet, never sent to external servers, and never saved in any database, ensuring total academic privacy.'
      },
      {
        question: 'What is the acceptable word count tolerance in university grading?',
        answer: 'Most universities follow the standard plus or minus 10% margin. For a 3,000-word assignment, this means any submission between 2,700 and 3,300 words is accepted without penalty. If you are under 2,700 or over 3,300, marks may be deducted.'
      }
    ]
  },
  characterCounter: {
    id: 'character-counter',
    path: '/character-counter',
    title: 'Character Counter Online',
    metaTitle: 'Character Counter Online – Free Text & Space Counter',
    metaDescription: 'Free online character counter. Count characters with and without spaces, words, and sentences in real time. Ideal for assignments, abstracts, and applications.',
    h1: 'Online Character Counter with & without Spaces',
    tagline: 'Accurately count total characters, whitespace, and letters for university application forms and research abstracts.',
    highlightStat: 'characters',
    romanUrduTip: 'Characters with spaces aur without spaces count karein. Application forms aur journal abstracts ke liye bohot mufeed hai.',
    guideTitle: 'Understanding Character Limits in Academic Writing & Applications',
    guideParagraphs: [
      'While general coursework often specifies word limits, competitive scholarship forms, UCAS personal statements, conference abstracts, and job applications usually mandate strict character limits. For instance, UCAS applications enforce a 4,000 character maximum (including spaces), and many scientific journals cap structured abstracts at 1,500 to 2,500 characters.',
      'Our Character Counter helps students monitor their character metrics with real-time feedback. It distinguishes between total characters (including spaces, newlines, and punctuation) and characters excluding whitespace. This distinction is vital because some online submission portals count spaces while others only count alphanumeric symbols.',
      'By using this tool alongside our frequency detector, you can identify repetitive adjectives and unnecessary filler words that consume valuable character allotments, giving you the precision needed for tightly bounded submission fields.'
    ],
    tipsTitle: 'How to Cut Down Character Count Without Losing Meaning',
    tips: [
      'Eliminate passive voice: Changing "The experiment was carried out by the researcher" to "The researcher conducted the experiment" saves 11 characters.',
      'Avoid duplicate adjectives: Words like "completely unique" or "basic fundamentals" contain redundant characters that should be streamlined.',
      'Use active verbs: Strong verbs replace weak verb-noun pairings (e.g., use "decided" instead of "came to a decision").',
      'Format spaces cleanly: Avoid double spacing between sentences; single spacing is standard modern academic practice.'
    ],
    faqs: [
      {
        question: 'What is the difference between characters with spaces and without spaces?',
        answer: 'Characters with spaces include every keystroke: letters, numbers, punctuation marks, spacebar spaces, and line break returns. Characters without spaces exclude all whitespace characters (spaces, tabs, and newlines), counting only printable glyphs.'
      },
      {
        question: 'What is the character limit for a UCAS personal statement?',
        answer: 'A UCAS personal statement has a strict maximum of 4,000 characters (including spaces) and 47 lines of text, whichever limit is reached first.'
      },
      {
        question: 'Why do research journals ask for character counts rather than word counts?',
        answer: 'Print and digital journal layouts rely on physical column width and page volume. Measuring exact characters ensures abstracts and short communications fit onto designated column inches without awkward line breaks.'
      },
      {
        question: 'Are Urdu and Arabic characters calculated the same way as Latin letters?',
        answer: 'Yes. In Unicode character encoding, each Urdu glyph, diacritic, and punctuation mark is counted as one character glyph in your total character count.'
      }
    ]
  },
  sentenceCounter: {
    id: 'sentence-counter',
    path: '/sentence-counter',
    title: 'Sentence Counter Online',
    metaTitle: 'Sentence Counter Online – Detect & Count Sentences',
    metaDescription: 'Free sentence counter for students. Detect sentences accurately with English, Urdu (۔) and question marks (؟). Improve essay readability and structure.',
    h1: 'Online Sentence Counter & Readability Tool',
    tagline: 'Track sentence count, average sentence length, and sentence variety across English and Urdu texts.',
    highlightStat: 'sentences',
    romanUrduTip: 'Har sentence ka hisaab rakhein. Lambi sentences ko chota karein taake assignment ki readability behtar ho sake.',
    guideTitle: 'The Importance of Sentence Structure in Higher Education',
    guideParagraphs: [
      'Sentence structure directly influences how easily professors, tutors, and reviewers can digest your academic arguments. Run-on sentences that stretch over 40 or 50 words confuse the reader and obscure core theses, while an overabundance of short, choppy sentences makes academic writing feel simplistic.',
      'Our Sentence Counter accurately analyzes text by recognizing traditional western end-punctuation marks (periods, exclamation marks, and question marks) alongside non-Western and Islamic script marks including the Urdu full stop (۔) and the inverted question mark (؟). This ensures bilingual scholars writing in Urdu or mixed Roman Urdu receive precise sentence tallies.',
      'By dividing total words by the number of sentences, you can quickly evaluate your average sentence length. The optimal target for university academic writing is between 15 and 22 words per sentence, creating a rhythmic and persuasive reading flow.'
    ],
    tipsTitle: 'Strategies for Varied Sentence Length in Essays',
    tips: [
      'Aim for an average of 18–22 words per sentence to maintain clarity and academic gravity.',
      'Vary sentence openings: Avoid beginning consecutive sentences with "This shows", "The author", or "Furthermore".',
      'Split compound-complex sentences: If a sentence contains three separate clauses connected by "and" or "which", split it into two coherent sentences.',
      'Use transitions thoughtfully: Connect sentences using signposts like "Consequently", "In contrast", and "Simultaneously".'
    ],
    faqs: [
      {
        question: 'How does the sentence counter detect sentences?',
        answer: 'Our engine identifies sentence boundaries by checking for sentence-terminating punctuation marks (. ! ? and Urdu ۔ ؟) followed by whitespace, newlines, or text endings, while ignoring common abbreviation dots like etc., e.g., and Dr.'
      },
      {
        question: 'What is a good average sentence length for university assignments?',
        answer: 'Between 15 and 22 words per sentence is the sweet spot for academic essays, balancing scholarly depth with syntactic readability.'
      },
      {
        question: 'Can this tool detect run-on sentences?',
        answer: 'While it tallies total sentences, you can instantly compare your total word count against the sentence count. If 300 words yield only 3 sentences, your average sentence is 100 words—a clear indication of run-ons.'
      },
      {
        question: 'Does the tool support Urdu punctuation marks?',
        answer: 'Yes! The counter fully supports the Urdu full stop (۔ U+06D4) and Urdu question mark (؟ U+061F), making it the ideal tool for Urdu literature, journalism, and bilingual papers.'
      }
    ]
  },
  essayWordCounter: {
    id: 'essay-word-counter',
    path: '/essay-word-counter',
    title: 'Essay Word Counter',
    metaTitle: 'Essay Word Counter – Calculate Word Limits & Sections',
    metaDescription: 'Free essay word counter for students. Set target word limits, monitor introduction, body, and conclusion ratios, and prevent essay length penalties.',
    h1: 'Essay Word Counter & Academic Section Planner',
    tagline: 'Set custom word limits with live progress bar alerts. Balance introduction, body paragraphs, and conclusions effortlessly.',
    highlightStat: 'words',
    romanUrduTip: 'Essay ka word limit set karein. Green bar batayegi ke aap limit ke andar hain ya limit cross ho chuki hai.',
    guideTitle: 'Mastering Essay Word Distribution and Structure',
    guideParagraphs: [
      'A successful university essay is not merely a collection of words; it is an organized argument structured into well-proportioned sections. Academic conventions typically allocate 10% of the total word count to the introduction, 80% to the body paragraphs, and 10% to the concluding synthesis. For a 2,000-word paper, that equates to a 200-word introduction, approximately eight 200-word body paragraphs, and a 200-word conclusion.',
      'Our Essay Word Counter provides a built-in Target Word Limit feature with dynamic visual indicators. As you draft your paper, the interactive progress bar shifts smoothly from blue to green when approaching your goal, and turns red if you overshoot your assigned ceiling. Status banners immediately display how many words you have left or by how much you have exceeded the requirement.',
      'Additionally, our top 5 most used words breakdown highlights whether you have over-indexed on specific terminology or repeated key thesis words too frequently throughout your body sections.'
    ],
    tipsTitle: 'How to Allocate Words Across Essay Sections',
    tips: [
      'Introduction (10%): Hook the reader, outline background context, and state your definitive thesis statement.',
      'Body Paragraphs (80%): Dedicate each paragraph to one point using the PEEL method (Point, Evidence, Explanation, Link).',
      'Conclusion (10%): Synthesize findings, answer the research question, and discuss broader implications without introducing new evidence.',
      'Keep your word limit goal active: Use the target limit input box above to maintain steady pace as you write each section.'
    ],
    faqs: [
      {
        question: 'How do I know how many words each essay section should be?',
        answer: 'Use the standard 10-80-10 rule: 10% for Introduction, 80% for Body Paragraphs, and 10% for Conclusion. For example, a 1,500-word essay requires ~150 words for intro, ~1,200 words for body arguments, and ~150 words for the conclusion.'
      },
      {
        question: 'What happens if my essay exceeds the maximum word limit?',
        answer: 'Most universities penalize essays exceeding the 10% threshold by deducting 1 to 5 marks per 100 words over, or professors may refuse to read and grade any text past the limit.'
      },
      {
        question: 'Does the essay counter work for dissertation chapters?',
        answer: 'Yes. You can paste individual chapters (such as Literature Review or Methodology, typically 3,000 to 5,000 words) and set custom word targets to monitor each chapter separately.'
      },
      {
        question: 'Can I copy my edited essay directly back to Microsoft Word or Google Docs?',
        answer: 'Yes! Simply click the "Copy Text" button to copy your entire essay draft to your system clipboard, preserving line breaks and paragraph spacing.'
      }
    ]
  },
  paragraphCounter: {
    id: 'paragraph-counter',
    path: '/paragraph-counter',
    title: 'Paragraph Counter Online',
    metaTitle: 'Paragraph Counter Online – Count & Structure Paragraphs',
    metaDescription: 'Free online paragraph counter. Count paragraphs, average words per paragraph, and improve the flow and structure of your academic assignments.',
    h1: 'Online Paragraph Counter & Structure Analyzer',
    tagline: 'Track total paragraphs and ensure balanced academic argument chunks across essays and reports.',
    highlightStat: 'paragraphs',
    romanUrduTip: 'Paragraphs ki tadaad check karein. Bohat lambe paragraphs ko break karein taake examiner ko parhne mein asaani ho.',
    guideTitle: 'The Role of Effective Paragraphing in Assignment Grading',
    guideParagraphs: [
      'In academic assessment, clear paragraphing is a direct indicator of logical thinking. Examiners look for focused thematic units where each paragraph begins with a clear topic sentence, provides cited evidence or data, analyzes the implications, and concludes with a transitional link to the next theme.',
      'When students produce "mega-paragraphs" that span an entire page (over 350 words), examiners struggle to identify the main argument. Conversely, single-sentence paragraphs disrupt flow and signal undeveloped ideas. A healthy academic essay features paragraphs that average between 120 and 220 words.',
      'Our Paragraph Counter automatically breaks your text down into discrete thematic blocks by tracking newline returns. By comparing your total word count with the paragraph count, you can instantly gauge your average words-per-paragraph metric and refine your assignment layout.'
    ],
    tipsTitle: 'Best Practices for Academic Paragraphing',
    tips: [
      'Follow the PEEL model: Point (topic sentence), Evidence (quote/citation), Explanation (critical analysis), Link (connect to thesis).',
      'Optimal length: Strive for 4 to 8 sentences per paragraph, roughly 120 to 200 words.',
      'Break up text walls: If a paragraph fills more than two-thirds of a standard page, split it where a sub-argument begins.',
      'One main idea: Never pack two competing arguments into the same paragraph; give each point its own dedicated space.'
    ],
    faqs: [
      {
        question: 'How many paragraphs should a 1,000-word essay have?',
        answer: 'A standard 1,000-word essay typically contains between 5 and 7 paragraphs: 1 introduction paragraph (100–120 words), 3 to 5 body paragraphs (150–200 words each), and 1 conclusion paragraph (100–120 words).'
      },
      {
        question: 'How does the tool distinguish between paragraphs?',
        answer: 'The counter detects standard line breaks (Enter or Shift+Enter) separating text blocks, ignoring empty blank lines between them.'
      },
      {
        question: 'Can a paragraph be only one sentence in an academic assignment?',
        answer: 'In academic writing, one-sentence paragraphs should be avoided because a single sentence rarely provides sufficient evidence and critical analysis for an academic claim.'
      },
      {
        question: 'Why do examiners complain about long paragraphs?',
        answer: 'Long paragraphs burden the reader with multiple ideas at once, making it difficult to award marks for specific criteria in the assessment rubric.'
      }
    ]
  },
  readingTimeCalculator: {
    id: 'reading-time-calculator',
    path: '/reading-time-calculator',
    title: 'Reading Time Calculator',
    metaTitle: 'Reading Time Calculator – Reading & Speaking Speed',
    metaDescription: 'Free reading time calculator for students and speakers. Calculate silent reading time (200 wpm) and presentation speaking time (130 wpm) instantly.',
    h1: 'Online Reading Time & Presentation Speaking Calculator',
    tagline: 'Calculate accurate silent reading time and oral presentation delivery time for your assignments and defense slides.',
    highlightStat: 'readingTime',
    romanUrduTip: 'Apna speech ya presentation ka waqt calculate karein. Silent reading 200 words/min aur bolne ka waqt 130 words/min hota hai.',
    guideTitle: 'How to Time Academic Readings, Speeches, and Presentations',
    guideParagraphs: [
      'In academic environments, students frequently need to estimate how long a research paper or essay takes to read, or calibrate an oral presentation for a strict seminar slot. Delivering an assignment viva, conference presentation, or thesis defense requires careful pacing so you do not exceed your allocated time limit or rush through complex data.',
      'Scientifically, silent reading speed differs substantially from spoken verbal delivery. Research indicates that the average adult reads silently at approximately 200 to 250 words per minute (WPM), while natural, articulate academic speech runs at approximately 130 to 140 words per minute. Speaking any faster risks losing your audience, while speaking slower can lead to disengagement.',
      'Our Reading Time Calculator computes both metrics simultaneously. For written assignments and blog posts, it displays silent reading time based on 200 WPM. For presentation cue cards, speech scripts, and slides, it displays speaking time calibrated to the standard 130 WPM academic presentation pace.'
    ],
    tipsTitle: 'Presentation Timing Rules of Thumb',
    tips: [
      '5-minute presentation: Aim for 600 to 650 spoken words total to allow time for slide transitions and emphasis.',
      '10-minute presentation: Write between 1,200 and 1,300 words for your spoken script.',
      'Allow Q&A buffer: Always finish your oral delivery 1 to 2 minutes before the strict session cutoff.',
      'Practice with pauses: Intersperse deliberate 2-second pauses after introducing key equations, charts, or quotes.'
    ],
    faqs: [
      {
        question: 'What reading speed is used to calculate reading time?',
        answer: 'Our calculator uses the globally accepted benchmark of 200 words per minute (WPM) for silent reading, which represents comfortable comprehension for academic and professional texts.'
      },
      {
        question: 'What speaking speed is used for presentations and speeches?',
        answer: 'We calibrate speaking time to 130 words per minute (WPM), the proven standard for clear academic lectures, thesis defenses, and student presentations.'
      },
      {
        question: 'How many words can I speak in a 10-minute university presentation?',
        answer: 'At an optimal speaking rate of 130 WPM, a 10-minute presentation corresponds to approximately 1,200 to 1,300 words. Leaving 100 words of buffer ensures you do not get cut off by the session chair.'
      },
      {
        question: 'Does technical or mathematical terminology affect reading time?',
        answer: 'Yes. Heavily mathematical, medical, or legal texts often require slower reading (around 150 WPM) for full comprehension. You should allow 20% extra time when presenting highly technical material.'
      }
    ]
  }
};
