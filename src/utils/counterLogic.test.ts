import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeText,
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

  // 3 sentences ending with ۔, ؟ and ۔
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
  // Under limit
  const under = calculateWordLimit(80, 200);
  assert.equal(under.wordsLeft, 120);
  assert.equal(under.wordsOver, 0);
  assert.equal(under.isOver, false);
  assert.equal(under.statusMessage, '120 words left');

  // Over limit
  const over = calculateWordLimit(235, 200);
  assert.equal(over.wordsLeft, 0);
  assert.equal(over.wordsOver, 35);
  assert.equal(over.isOver, true);
  assert.equal(over.statusMessage, '35 words over');

  // Target limit
  const exact = calculateWordLimit(200, 200);
  assert.equal(exact.wordsLeft, 0);
  assert.equal(exact.wordsOver, 0);
  assert.equal(exact.statusMessage, 'Goal reached (target limit)');
});

test('analyzeText filters stop words and words < 3 characters in topWords', () => {
  const text = 'research analysis research student analysis research paper assignment writing assignment research';
  const result = analyzeText(text);

  assert.ok(result.topWords.length <= 5);
  // 'research' appears 4 times
  assert.equal(result.topWords[0].word, 'research');
  assert.equal(result.topWords[0].count, 4);
});

test('convertWordsToPages calculates single, double, and handwritten pages accurately', () => {
  const result = convertWordsToPages(1000);
  // 1000 / 500 = 2.0
  assert.equal(result.singleSpacing, 2.0);
  // 1000 / 250 = 4.0
  assert.equal(result.doubleSpacing, 4.0);
  // 1000 / 175 = 5.714... => 5.7
  assert.equal(result.handwrittenA4, 5.7);

  const zero = convertWordsToPages(0);
  assert.equal(zero.singleSpacing, 0);
  assert.equal(zero.doubleSpacing, 0);
  assert.equal(zero.handwrittenA4, 0);
});
