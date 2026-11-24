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
  'doing', 'down', 'during', 'further', 'here', 'how', 'its', 'itself',
  'must', 'once', 'same', 'shall', 'since', 'there', 'these', 'those',
  'under', 'until', 'very', 'who', 'whom', 'why',
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
  'کر', 'کرنا', 'کرتا', 'کرتی', 'کرتے', 'گیا', 'گئے', 'گئی', 'رہا',
  'رہے', 'رہی', 'ایک', 'جب', 'تب', 'ہم', 'تم', 'آپ', 'انکا', 'انکی', 'انکے',
  'اسکا', 'اسکی', 'اسکے', 'نہیں', 'کے', 'کی', 'کا', 'کو'
]);

export const ROMAN_URDU_MARKERS = new Set([
  'hai', 'hain', 'tha', 'thi', 'the', 'yeh', 'ye', 'woh', 'wo', 'aur', 'par',
  'mein', 'main', 'me', 'say', 'se', 'bhi', 'kya', 'kyun', 'kyunki', 'kese',
  'kaise', 'ke', 'ki', 'ka', 'ko', 'koi', 'kuch', 'meri', 'mera', 'mere',
  'apna', 'apni', 'apne', 'hoga', 'hogi', 'hoge', 'hota', 'hoti', 'hote',
  'kar', 'karna', 'karta', 'karti', 'karte', 'karein', 'karo', 'kiya',
  'gaya', 'gaye', 'gayi', 'raha', 'rahe', 'rahi', 'aik', 'ek', 'jab', 'tab',
  'hum', 'tum', 'aap', 'unka', 'unki', 'unke', 'iska', 'iski', 'iske',
  'nahi', 'nahin', 'lekin', 'magar', 'agar', 'phir', 'ab', 'ya', 'isliye',
  'taake', 'taky', 'bohot', 'bahut', 'zyada', 'kam', 'sahi', 'ghalat',
  'zaroori', 'aham', 'mazmoon', 'alfaz', 'jumlay', 'huroof', 'kitab',
  'taleem', 'sabak', 'waqt', 'tareeqa', 'mufeed', 'asaani', 'behtar',
  'behtareen', 'samajh', 'likhein', 'parhein', 'dekhein', 'chahiye',
  'sakta', 'sakti', 'sakte', 'wala', 'wali', 'wale', 'sab', 'har',
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
  isOver: boolean;
  statusMessage: string;
}

/**
 * Extract normalized word tokens from text across Latin, Urdu/Arabic, and numeric formats
 */
export function extractWordTokens(text: string): string[] {
  if (!text || text.trim().length === 0) return [];
  const rawWordTokens =
    text.trim().match(/(?:\p{N}+(?:[.,]\p{N}+)+|[\p{L}\p{M}\p{N}'’\-_]+)/gu) || [];
  return rawWordTokens.filter((token) => /[\p{L}\p{N}]/u.test(token));
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

  // 3. Words
  const wordTokens = extractWordTokens(text);
  const words = wordTokens.length;

  // 4. Paragraphs: split by single or multiple newlines with content
  const paragraphs = text
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // 5. Sentences: supports English . ! ? as well as Urdu marks ۔ (U+06D4) and ؟ (U+061F)
  const sentenceNormalizedText = text
    .replace(/(\d)\.(?=\d)/g, '$1')
    .replace(
      /\b(?:rs|no|fig|approx|inc|ltd|co|jr|sr|a\.m|p\.m|mr|mrs|ms|dr|prof|st|vs|etc|e\.g|i\.e|u\.s)\.(?=\s|$|[,;:)\]"'”’?!])/gi,
      (match) => match.replace(/\./g, '')
    );

  const rawSentences = sentenceNormalizedText
    .split(/[.!?۔؟\n]+/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

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

export interface SentenceBreakdownItem {
  index: number;
  text: string;
  words: number;
  characters: number;
}

export interface SentenceAnalysisResult {
  sentenceCount: number;
  totalWords: number;
  avgWordsPerSentence: number;
  shortestSentenceWords: number;
  longestSentenceWords: number;
  sentences: SentenceBreakdownItem[];
}

/**
 * Analyzes sentences individually with abbreviation and decimal awareness
 */
export function analyzeSentences(text: string): SentenceAnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      sentenceCount: 0,
      totalWords: 0,
      avgWordsPerSentence: 0,
      shortestSentenceWords: 0,
      longestSentenceWords: 0,
      sentences: [],
    };
  }

  // Replace decimal dots and abbreviation dots with placeholders of equal length so splitting preserves original substrings
  const masked = text
    .replace(/(\d)\.(?=\d)/g, '$1\u0000')
    .replace(
      /\b(?:rs|no|fig|approx|inc|ltd|co|jr|sr|a\.m|p\.m|mr|mrs|ms|dr|prof|st|vs|etc|e\.g|i\.e|u\.s)\.(?=\s|$|[,;:)\]"'”’?!])/gi,
      (match) => match.replace(/\./g, '\u0000')
    );

  const rawChunks: string[] = [];
  let start = 0;
  const delimRegex = /[.!?۔؟\n]+/g;
  let match: RegExpExecArray | null;
  while ((match = delimRegex.exec(masked)) !== null) {
    const end = match.index + (match[0].includes('\n') ? 0 : match[0].length);
    const segment = text.slice(start, end).trim();
    if (segment.length > 0 && /[\p{L}\p{N}]/u.test(segment)) {
      rawChunks.push(segment);
    }
    start = match.index + match[0].length;
  }
  const trailing = text.slice(start).trim();
  if (trailing.length > 0 && /[\p{L}\p{N}]/u.test(trailing)) {
    rawChunks.push(trailing);
  }

  const items: SentenceBreakdownItem[] = rawChunks.map((chunk, idx) => {
    const words = extractWordTokens(chunk).length;
    return {
      index: idx + 1,
      text: chunk,
      words,
      characters: chunk.length,
    };
  });

  const totalWords = items.reduce((acc, s) => acc + s.words, 0);
  const sentenceCount = items.length;
  const wordLengths = items.map((s) => s.words);

  return {
    sentenceCount,
    totalWords,
    avgWordsPerSentence: sentenceCount > 0 ? Number((totalWords / sentenceCount).toFixed(1)) : 0,
    shortestSentenceWords: wordLengths.length > 0 ? Math.min(...wordLengths) : 0,
    longestSentenceWords: wordLengths.length > 0 ? Math.max(...wordLengths) : 0,
    sentences: items,
  };
}

export interface LineAnalysisResult {
  totalLines: number;
  nonEmptyLines: number;
  blankLines: number;
  totalWords: number;
  avgWordsPerLine: number;
  longestLineChars: number;
  lines: string[];
}

/**
 * Analyzes line metrics for line counter tool
 */
export function analyzeLines(text: string): LineAnalysisResult {
  if (!text) {
    return {
      totalLines: 0,
      nonEmptyLines: 0,
      blankLines: 0,
      totalWords: 0,
      avgWordsPerLine: 0,
      longestLineChars: 0,
      lines: [],
    };
  }

  const lines = text.split(/\r\n|\r|\n/);
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  const blankLines = lines.length - nonEmpty.length;
  const totalWords = extractWordTokens(text).length;
  const longestLineChars = lines.reduce((max, l) => Math.max(max, l.length), 0);

  return {
    totalLines: lines.length,
    nonEmptyLines: nonEmpty.length,
    blankLines,
    totalWords,
    avgWordsPerLine: nonEmpty.length > 0 ? Number((totalWords / nonEmpty.length).toFixed(1)) : 0,
    longestLineChars,
    lines,
  };
}

export function removeBlankLines(text: string): string {
  if (!text) return '';
  return text
    .split(/\r\n|\r|\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

export interface UniqueWordEntry {
  word: string;
  count: number;
  percentage: number;
}

export interface UniqueWordAnalysisResult {
  totalWords: number;
  uniqueWords: number;
  repeatedUniqueWords: number;
  singleOccurrenceWords: number;
  lexicalDiversityPct: number;
  entries: UniqueWordEntry[];
}

/**
 * Analyzes unique words and full frequency distribution
 */
export function analyzeUniqueWords(
  text: string,
  ignoreStopWords = false
): UniqueWordAnalysisResult {
  const tokens = extractWordTokens(text);
  if (tokens.length === 0) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      repeatedUniqueWords: 0,
      singleOccurrenceWords: 0,
      lexicalDiversityPct: 0,
      entries: [],
    };
  }

  const allNormalized = tokens.map((t) => t.toLowerCase());
  const allUniqueSet = new Set(allNormalized);

  const freqMap = new Map<string, number>();
  for (const word of allNormalized) {
    if (ignoreStopWords && STOP_WORDS.has(word)) continue;
    freqMap.set(word, (freqMap.get(word) || 0) + 1);
  }

  const totalForRatio = allNormalized.length;
  const entries: UniqueWordEntry[] = Array.from(freqMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([word, count]) => ({
      word,
      count,
      percentage: Number(((count / totalForRatio) * 100).toFixed(2)),
    }));

  const fullFreq = new Map<string, number>();
  for (const w of allNormalized) {
    fullFreq.set(w, (fullFreq.get(w) || 0) + 1);
  }
  let singleOccurrenceWords = 0;
  let repeatedUniqueWords = 0;
  for (const count of fullFreq.values()) {
    if (count === 1) singleOccurrenceWords += 1;
    else repeatedUniqueWords += 1;
  }

  return {
    totalWords: totalForRatio,
    uniqueWords: allUniqueSet.size,
    repeatedUniqueWords,
    singleOccurrenceWords,
    lexicalDiversityPct: Number(((allUniqueSet.size / totalForRatio) * 100).toFixed(1)),
    entries,
  };
}

export interface RomanUrduAnalysisResult {
  baseStats: CounterStats;
  uniqueWords: number;
  romanUrduMarkerHits: number;
  detectedMarkers: string[];
  lineCount: number;
}

/**
 * Analyzes Roman Urdu and mixed English academic text
 */
export function analyzeRomanUrdu(text: string): RomanUrduAnalysisResult {
  const baseStats = analyzeText(text);
  if (!text || text.trim().length === 0) {
    return {
      baseStats,
      uniqueWords: 0,
      romanUrduMarkerHits: 0,
      detectedMarkers: [],
      lineCount: 0,
    };
  }

  const tokens = extractWordTokens(text).map((t) => t.toLowerCase());
  const uniqueSet = new Set(tokens);
  let markerHits = 0;
  const detectedSet = new Set<string>();

  for (const token of tokens) {
    if (ROMAN_URDU_MARKERS.has(token)) {
      markerHits += 1;
      detectedSet.add(token);
    }
  }

  return {
    baseStats,
    uniqueWords: uniqueSet.size,
    romanUrduMarkerHits: markerHits,
    detectedMarkers: Array.from(detectedSet).slice(0, 12),
    lineCount: text.split(/\r\n|\r|\n/).length,
  };
}

export interface WordLimitCalculatorResult {
  targetLimit: number;
  tolerancePercent: number;
  minWords: number;
  maxWords: number;
  introWords: number;
  bodyWords: number;
  conclusionWords: number;
  suggestedParagraphs: number;
  currentWords: number;
  status: 'empty' | 'under' | 'within' | 'over';
  deltaFromTarget: number;
  deltaToRange: number;
}

/**
 * Calculates acceptable university word count window (+- tolerance) and 10-80-10 section budgets
 */
export function calculateAssignmentWordLimit(
  targetLimit: number,
  tolerancePercent: number,
  currentWords = 0
): WordLimitCalculatorResult {
  const safeTarget = Math.max(0, Math.round(targetLimit));
  const safeTolerance = Math.max(0, Math.min(50, tolerancePercent));
  const margin = Math.round(safeTarget * (safeTolerance / 100));
  const minWords = Math.max(0, safeTarget - margin);
  const maxWords = safeTarget + margin;

  const introWords = Math.round(safeTarget * 0.1);
  const conclusionWords = Math.round(safeTarget * 0.1);
  const bodyWords = Math.max(0, safeTarget - introWords - conclusionWords);
  const suggestedParagraphs = bodyWords > 0 ? Math.max(1, Math.round(bodyWords / 175)) : 0;

  const safeCurrent = Math.max(0, Math.round(currentWords));
  let status: WordLimitCalculatorResult['status'] = 'empty';
  let deltaToRange = 0;

  if (safeCurrent > 0 && safeTarget > 0) {
    if (safeCurrent < minWords) {
      status = 'under';
      deltaToRange = minWords - safeCurrent;
    } else if (safeCurrent > maxWords) {
      status = 'over';
      deltaToRange = safeCurrent - maxWords;
    } else {
      status = 'within';
      deltaToRange = 0;
    }
  }

  return {
    targetLimit: safeTarget,
    tolerancePercent: safeTolerance,
    minWords,
    maxWords,
    introWords,
    bodyWords,
    conclusionWords,
    suggestedParagraphs,
    currentWords: safeCurrent,
    status,
    deltaFromTarget: safeCurrent - safeTarget,
    deltaToRange,
  };
}

export interface WpmCalculationResult {
  wordsPerMinute: number;
  wordsPerSecond: number;
  charactersPerMinute: number;
  durationSeconds: number;
}

/**
 * Calculates Words Per Minute from word count, optional character count, and duration in seconds
 */
export function calculateWpm(
  wordCount: number,
  durationSeconds: number,
  charCount = 0
): WpmCalculationResult {
  const safeWords = Math.max(0, wordCount);
  const safeChars = Math.max(0, charCount);
  const safeSeconds = Math.max(0, durationSeconds);

  if (safeWords === 0 || safeSeconds <= 0) {
    return {
      wordsPerMinute: 0,
      wordsPerSecond: 0,
      charactersPerMinute: 0,
      durationSeconds: safeSeconds,
    };
  }

  const minutes = safeSeconds / 60;
  return {
    wordsPerMinute: Number((safeWords / minutes).toFixed(1)),
    wordsPerSecond: Number((safeWords / safeSeconds).toFixed(2)),
    charactersPerMinute: safeChars > 0 ? Math.round(safeChars / minutes) : 0,
    durationSeconds: safeSeconds,
  };
}
