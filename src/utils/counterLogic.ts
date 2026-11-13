/**
 * Pure text analysis and counting logic for Word Counter for Assignment
 */

// Stop words to filter out from top keywords: English, Roman Urdu, and Urdu script
export const STOP_WORDS = new Set([
  // English common stop words
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'has', 'had',
  'are', 'was', 'were', 'been', 'will', 'would', 'could', 'should', 'about',
  'your', 'they', 'them', 'their', 'what', 'which', 'when', 'where', 'then',
  'than', 'also', 'like', 'some', 'many', 'more', 'into', 'each', 'other',
  'only', 'just', 'over', 'even', 'most', 'such', 'through', 'because', 'while',
  'after', 'before', 'being', 'between', 'both', 'can', 'cannot', 'did', 'does',
  'doing', 'down', 'during', 'further', 'here', 'how', 'its', 'itself', 'more',
  'must', 'once', 'same', 'shall', 'since', 'some', 'such', 'than', 'that',
  'there', 'these', 'those', 'under', 'until', 'very', 'who', 'whom', 'why',
  // Roman Urdu stop words
  'hai', 'hain', 'tha', 'the', 'thi', 'yeh', 'woh', 'aur', 'par', 'mein', 'say',
  'se', 'bhi', 'kya', 'kyun', 'kese', 'kaise', 'kay', 'koi', 'kuch', 'meri',
  'mera', 'mere', 'apna', 'apni', 'apne', 'hoga', 'hogi', 'hoge', 'hota',
  'hoti', 'hote', 'kar', 'karna', 'karta', 'karti', 'karte', 'kiya', 'gaya',
  'gaye', 'gayi', 'raha', 'rahe', 'rahi', 'aik', 'jab', 'tab', 'hum', 'tum',
  'aap', 'unka', 'unki', 'unke', 'iska', 'iski', 'iske', 'nahi', 'nahin',
  // Urdu script stop words
  'ہے', 'ہیں', 'تھا', 'تھے', 'تھی', 'یہ', 'وہ', 'اور', 'پر', 'میں', 'سے',
  'بھی', 'کیا', 'کیوں', 'کیسے', 'کوئی', 'کچھ', 'میری', 'میرا', 'میرے',
  'اپنا', 'اپنی', 'اپنے', 'ہوگا', 'ہوگی', 'ہوگے', 'ہوتا', 'ہوتی', 'ہوتے',
  'کر', 'کرنا', 'کرتا', 'کرتی', 'کرتے', 'کیا', 'گیا', 'گئے', 'گئی', 'رہا',
  'رہے', 'رہی', 'ایک', 'جب', 'تب', 'ہم', 'تم', 'آپ', 'انکا', 'انکی', 'انکے',
  'اسکا', 'اسکی', 'اسکے', 'نہیں', 'کے', 'کی', 'کا', 'کو'
]);

export interface TopWord {
  word: string;
  count: number;
  percentage: number;
}

export interface CounterStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  readingTimeText: string;
  speakingTimeMinutes: number;
  speakingTimeText: string;
  topWords: TopWord[];
}

export interface WordLimitResult {
  limit: number;
  wordCount: number;
  wordsLeft: number;
  wordsOver: number;
  percentage: number;
  isOver: number | boolean;
  statusMessage: string;
}

/**
 * Counts all primary metrics for assignment text
 */
export function analyzeText(text: string): CounterStats {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      readingTimeText: '0 sec',
      speakingTimeMinutes: 0,
      speakingTimeText: '0 sec',
      topWords: [],
    };
  }

  // 1. Total characters
  const characters = text.length;

  // 2. Characters without spaces (including line breaks, tabs)
  const charactersNoSpaces = text.replace(/\s+/g, '').length;

  // 3. Words: match contiguous letters, digits, apostrophes, Urdu Arabic unicode letters
  // Matches Latin, Urdu/Arabic range (\u0600-\u06FF, \u0750-\u077F, \uFB50-\uFDFF, \uFE70-\uFEFF), numbers
  const wordTokens = text.trim().match(/[\p{L}\p{N}'’\-_]+/gu) || [];
  const words = wordTokens.length;

  // 4. Paragraphs: split by single or multiple newlines with content
  const paragraphs = text
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // 5. Sentences: supports English . ! ? as well as Urdu marks ۔ (U+06D4) and ؟ (U+061F)
  // Ignore decimal numbers (e.g. 3.5) and periods belonging to common abbreviations
  const sentenceNormalizedText = text
    .replace(/(\d)\.(?=\d)/g, '$1')
    .replace(/\b(?:mr|mrs|ms|dr|prof|st|vs|etc|e\.g|i\.e|u\.s)\.(?=\s|$|[,;:)\]"'”’?!])/gi, (match) =>
      match.replace(/\./g, '')
    );

  const rawSentences = sentenceNormalizedText
    .split(/[.!?۔؟\n]+/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  
  // Edge case: if user typed something with no ending punctuation, it is still at least 1 sentence if it has words
  const sentences = Math.max(words > 0 ? 1 : 0, rawSentences.length);

  // 6. Reading time (200 words per minute)
  const readingMinutesFloat = words / 200;
  const readingTimeText = formatTime(readingMinutesFloat);

  // 7. Speaking time (130 words per minute)
  const speakingMinutesFloat = words / 130;
  const speakingTimeText = formatTime(speakingMinutesFloat);

  // 8. Top 5 most used words (length >= 3, not in stop words)
  const frequencyMap = new Map<string, number>();
  for (const token of wordTokens) {
    const normalized = token.toLowerCase();
    if (normalized.length >= 3 && !STOP_WORDS.has(normalized)) {
      frequencyMap.set(normalized, (frequencyMap.get(normalized) || 0) + 1);
    }
  }

  const sortedWords = Array.from(frequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topWords: TopWord[] = sortedWords.map(([word, count]) => ({
    word,
    count,
    percentage: words > 0 ? Number(((count / words) * 100).toFixed(1)) : 0,
  }));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes: readingMinutesFloat,
    readingTimeText,
    speakingTimeMinutes: speakingMinutesFloat,
    speakingTimeText,
    topWords,
  };
}

/**
 * Format minutes into readable min and sec
 */
export function formatTime(minutesFloat: number): string {
  if (minutesFloat <= 0) return '0 sec';
  const totalSeconds = Math.round(minutesFloat * 60);
  if (totalSeconds < 60) {
    return `${Math.max(1, totalSeconds)} sec`;
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (secs === 0) {
    return `${mins} min`;
  }
  return `${mins} min ${secs} sec`;
}

/**
 * Calculates word limit status and progress
 */
export function calculateWordLimit(wordCount: number, limit: number): WordLimitResult {
  const safeLimit = Math.max(0, limit);
  if (safeLimit === 0) {
    return {
      limit: 0,
      wordCount,
      wordsLeft: 0,
      wordsOver: 0,
      percentage: 0,
      isOver: false,
      statusMessage: 'No word limit set',
    };
  }

  const isOver = wordCount > safeLimit;
  const wordsLeft = Math.max(0, safeLimit - wordCount);
  const wordsOver = Math.max(0, wordCount - safeLimit);
  const percentage = Math.min(100, Number(((wordCount / safeLimit) * 100).toFixed(1)));

  let statusMessage = '';
  if (wordCount === safeLimit) {
    statusMessage = 'Goal reached (target limit)';
  } else if (isOver) {
    statusMessage = `${wordsOver} ${wordsOver === 1 ? 'word' : 'words'} over`;
  } else {
    statusMessage = `${wordsLeft} ${wordsLeft === 1 ? 'word' : 'words'} left`;
  }

  return {
    limit: safeLimit,
    wordCount,
    wordsLeft,
    wordsOver,
    percentage,
    isOver,
    statusMessage,
  };
}

export interface PagesResult {
  words: number;
  singleSpacing: number; // 500 words/page
  doubleSpacing: number; // 250 words/page
  handwrittenA4: number; // 175 words/page
}

/**
 * Converts words to pages according to standard academic guidelines:
 * - Single spacing: 500 words per page
 * - Double spacing: 250 words per page
 * - Handwritten A4: 175 words per page
 * All values rounded to 1 decimal place.
 */
export function convertWordsToPages(wordsInput: number): PagesResult {
  const words = Math.max(0, wordsInput);
  if (words === 0) {
    return {
      words: 0,
      singleSpacing: 0,
      doubleSpacing: 0,
      handwrittenA4: 0,
    };
  }

  return {
    words,
    singleSpacing: Number((words / 500).toFixed(1)),
    doubleSpacing: Number((words / 250).toFixed(1)),
    handwrittenA4: Number((words / 175).toFixed(1)),
  };
}
