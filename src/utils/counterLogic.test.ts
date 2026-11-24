import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeText,
  analyzeSentences,
  analyzeLines,
  removeBlankLines,
  analyzeUniqueWords,
  analyzeRomanUrdu,
  calculateAssignmentWordLimit,
  calculateWpm,
  calculateWordLimit,
  convertWordsToPages,
  formatTime,
} from './counterLogic';

test('analyzeText handles empty or whitespace-only text gracefully', () => {
  const result = analyzeText('   \n  \t ');
  assert.equal(result.words, 0);
  assert.equal(result.characters, 0);
  assert.equal(result.charactersNoSpaces, 0);
  assert.equal(result.sentences, 0);
  assert.equal(result.paragraphs, 0);
  assert.equal(result.readingTimeText, '0 sec');
  assert.equal(result.speakingTimeText, '0 sec');
  assert.deepEqual(result.topWords, []);
});

test('analyzeText correctly counts English sentences and words', () => {
  const text = 'This is the first sentence! Is this the second? Yes, it is.';
  const result = analyzeText(text);

  assert.equal(result.words, 12);
  assert.equal(result.sentences, 3);
  assert.equal(result.paragraphs, 1);
  assert.equal(result.characters, text.length);
  assert.equal(result.charactersNoSpaces, text.replace(/\s+/g, '').length);
});

test('analyzeText correctly recognizes Urdu punctuation marks (۔ and ؟)', () => {
  const urduText = 'یہ پہلا جملہ ہے۔ کیا آپ کو سمجھ آئی؟ بالکل آئی۔';
  const result = analyzeText(urduText);

  assert.equal(result.sentences, 3);
  assert.ok(result.words >= 9);
});

test('analyzeText handles Roman Urdu sentences properly', () => {
  const text = 'Yeh assignment bohot zaroori hai. Kya aapne time par submit kar diya? Haan maine kar diya.';
  const result = analyzeText(text);

  assert.equal(result.sentences, 3);
  assert.ok(result.words > 10);
});

test('formatTime calculates minutes and seconds accurately', () => {
  assert.equal(formatTime(0), '0 sec');
  assert.equal(formatTime(0.5), '30 sec');
  assert.equal(formatTime(1), '1 min');
  assert.equal(formatTime(1.5), '1 min 30 sec');
});

test('calculateWordLimit calculates words left and words over correctly', () => {
  const under = calculateWordLimit(80, 200);
  assert.equal(under.wordsLeft, 120);
  assert.equal(under.wordsOver, 0);
  assert.equal(under.isOver, false);
  assert.equal(under.statusMessage, '120 words left');

  const over = calculateWordLimit(235, 200);
  assert.equal(over.wordsLeft, 0);
  assert.equal(over.wordsOver, 35);
  assert.equal(over.isOver, true);
  assert.equal(over.statusMessage, '35 words over');

  const exact = calculateWordLimit(200, 200);
  assert.equal(exact.wordsLeft, 0);
  assert.equal(exact.wordsOver, 0);
  assert.equal(exact.statusMessage, 'Goal reached (target limit)');
});

test('analyzeText filters stop words and words < 3 characters in topWords', () => {
  const text = 'research analysis research student analysis research paper assignment writing assignment research';
  const result = analyzeText(text);

  assert.ok(result.topWords.length <= 5);
  assert.equal(result.topWords[0].word, 'research');
  assert.equal(result.topWords[0].count, 4);
});

test('convertWordsToPages calculates single, double, and handwritten pages accurately', () => {
  const result = convertWordsToPages(1000);
  assert.equal(result.singleSpacing, 2.0);
  assert.equal(result.doubleSpacing, 4.0);
  assert.equal(result.handwrittenA4, 5.7);

  const zero = convertWordsToPages(0);
  assert.equal(zero.singleSpacing, 0);
  assert.equal(zero.doubleSpacing, 0);
  assert.equal(zero.handwrittenA4, 0);
});

test('analyzeText ignores periods in common abbreviations when counting sentences', () => {
  const text =
    'Dr. Smith and Prof. Lee met Mr. Khan, Mrs. Ali, Ms. Zara, and St. Jude vs. local teams in the U.S. about e.g. topics, i.e. syntax, etc., in class. Then they left!';
  const result = analyzeText(text);

  assert.equal(result.sentences, 2);
});

test('analyzeText ignores decimal points in numbers when counting sentences', () => {
  const text = 'The average GPA rose from 3.5 to 3.85 this term. Did 98.6% pass? Yes!';
  const result = analyzeText(text);

  assert.equal(result.sentences, 3);
});

test('analyzeText handles decimals and abbreviations alongside Urdu sentence marks', () => {
  const text = 'Dr. Ahmed scored 3.5 out of 4.0. کیا یہ درست ہے؟ جی ہاں۔';
  const result = analyzeText(text);

  assert.equal(result.sentences, 3);
});

test('analyzeText counts Dr. Ali and Rs. 500 text as 11 words and 2 sentences', () => {
  const text = 'Dr. Ali bought 3.5 kg of apples. He paid Rs. 500.';
  const result = analyzeText(text);

  assert.equal(result.words, 11);
  assert.equal(result.sentences, 2);
});

test('analyzeText counts numbers with thousands separators and decimals as one word', () => {
  const text = 'The total is 1,000.50 rupees.';
  const result = analyzeText(text);

  assert.equal(result.words, 5);
  assert.equal(result.sentences, 1);

  const integerFormatted = analyzeText('Population reached 1,000 and 2.75 million.');
  assert.equal(integerFormatted.words, 6);
  assert.equal(integerFormatted.sentences, 1);
});

test('analyzeText ignores extended abbreviation list case-insensitively in sentence count', () => {
  const text =
    'See Fig. 2, No. 5, and Acme Co., Inc. (approx. 10 Ltd. units) with Jr. and Sr. leads from 9:30 a.m. to 5:00 P.M. at Rs. 1,000.';
  const result = analyzeText(text);

  assert.equal(result.sentences, 1);
});

test('analyzeSentences extracts individual sentences with accurate word counts', () => {
  const text = 'Dr. Khan scored 3.8 GPA. His essay was concise! Did he revise it?';
  const res = analyzeSentences(text);

  assert.equal(res.sentenceCount, 3);
  assert.equal(res.totalWords, 13);
  assert.equal(res.shortestSentenceWords, 4);
  assert.equal(res.longestSentenceWords, 5);
  assert.equal(res.sentences[0].text, 'Dr. Khan scored 3.8 GPA.');
});

test('analyzeLines and removeBlankLines handle multiline text accurately', () => {
  const text = 'Line one here\n\nLine two is longer\n   \nEnd';
  const res = analyzeLines(text);

  assert.equal(res.totalLines, 5);
  assert.equal(res.nonEmptyLines, 3);
  assert.equal(res.blankLines, 2);
  assert.equal(res.totalWords, 8);
  assert.equal(res.longestLineChars, 18);
  assert.equal(removeBlankLines(text), 'Line one here\nLine two is longer\nEnd');
});

test('analyzeUniqueWords computes unique count, lexical diversity, and stop word filtering', () => {
  const text = 'The essay discusses research and research methods. The essay is strong.';
  const all = analyzeUniqueWords(text, false);
  const filtered = analyzeUniqueWords(text, true);

  assert.equal(all.totalWords, 11);
  assert.equal(all.uniqueWords, 8);
  assert.equal(all.repeatedUniqueWords, 3); // the, essay, research
  assert.equal(all.singleOccurrenceWords, 5);
  assert.ok(filtered.entries.every((e) => e.word !== 'the' && e.word !== 'and'));
  assert.equal(filtered.entries[0].count, 2);
});

test('analyzeRomanUrdu detects Roman Urdu vocabulary alongside base counts', () => {
  const text = 'Yeh mazmoon bohot aham hai aur is mein alfaz ki tadad check ki gayi hai.';
  const res = analyzeRomanUrdu(text);

  assert.equal(res.baseStats.words, 15);
  assert.ok(res.romanUrduMarkerHits >= 10);
  assert.ok(res.detectedMarkers.includes('mazmoon'));
});

test('calculateAssignmentWordLimit calculates +-10% range, section budgets, and status', () => {
  const under = calculateAssignmentWordLimit(2000, 10, 1750);
  assert.equal(under.minWords, 1800);
  assert.equal(under.maxWords, 2200);
  assert.equal(under.introWords, 200);
  assert.equal(under.bodyWords, 1600);
  assert.equal(under.conclusionWords, 200);
  assert.equal(under.status, 'under');
  assert.equal(under.deltaToRange, 50);

  const within = calculateAssignmentWordLimit(2000, 10, 1950);
  assert.equal(within.status, 'within');
  assert.equal(within.deltaToRange, 0);

  const over = calculateAssignmentWordLimit(2000, 10, 2300);
  assert.equal(over.status, 'over');
  assert.equal(over.deltaToRange, 100);

  const customTolerance = calculateAssignmentWordLimit(2000, 7, 1900);
  assert.equal(customTolerance.minWords, 1860);
  assert.equal(customTolerance.maxWords, 2140);
  assert.equal(customTolerance.status, 'within');

  const strictZero = calculateAssignmentWordLimit(1500, 0, 1520);
  assert.equal(strictZero.minWords, 1500);
  assert.equal(strictZero.maxWords, 1500);
  assert.equal(strictZero.status, 'over');
  assert.equal(strictZero.deltaToRange, 20);

  const clampedMax = calculateAssignmentWordLimit(1000, 80, 1400);
  assert.equal(clampedMax.minWords, 500);
  assert.equal(clampedMax.maxWords, 1500);
  assert.equal(clampedMax.status, 'within');
});

test('calculateWpm computes words per minute and per second accurately', () => {
  const res = calculateWpm(260, 120, 1400);
  assert.equal(res.wordsPerMinute, 130);
  assert.equal(res.wordsPerSecond, 2.17);
  assert.equal(res.charactersPerMinute, 700);

  const zero = calculateWpm(260, 0);
  assert.equal(zero.wordsPerMinute, 0);
});
