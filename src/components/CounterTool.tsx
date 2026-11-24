import React, { useState, useMemo } from 'react';
import { analyzeText, calculateWordLimit, CounterStats } from '../utils/counterLogic';
import { Copy, Check, Trash2, AlertCircle } from 'lucide-react';

export type HighlightMetric =
  | 'words'
  | 'characters'
  | 'charactersNoSpaces'
  | 'sentences'
  | 'paragraphs'
  | 'readingTime'
  | 'speakingTime';

interface CounterToolProps {
  highlightStat?: HighlightMetric;
  placeholder?: string;
  romanUrduTip?: string;
  initialText?: string;
  isUrduRtl?: boolean;
}

const SAMPLE_TEXT = `Higher education institutions worldwide increasingly prioritize academic integrity alongside research excellence. When students compose critical essays, they must rigorously evaluate scholarly peer-reviewed literature, articulate robust thesis arguments, and adhere to prescribed structural guidelines.

In particular, managing assignment word limits requires disciplined self-editing. Crafting focused paragraphs that develop a single conceptual theme prevents circular reasoning. Furthermore, comparing empirical data against existing theoretical models allows students to substantiate arguments without resorting to superfluous filler phrases.`;

export const CounterTool: React.FC<CounterToolProps> = ({
  highlightStat = 'words',
  placeholder = 'Type or paste your assignment, essay, or research draft here...',
  romanUrduTip = 'Apna assignment text yahan paste karein taake words, characters, sentences aur timing check kar sakein.',
  initialText = '',
  isUrduRtl = false,
}) => {
  const [text, setText] = useState<string>(initialText);
  const [wordLimit, setWordLimit] = useState<number | ''>('');
  const [copied, setCopied] = useState<boolean>(false);

  const stats: CounterStats = useMemo(() => analyzeText(text), [text]);

  const limitResult = useMemo(() => {
    if (typeof wordLimit !== 'number' || isNaN(wordLimit) || wordLimit <= 0) {
      return null;
    }
    return calculateWordLimit(stats.words, wordLimit);
  }, [stats.words, wordLimit]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText('');
  };

  const handleLoadSample = () => {
    setText(SAMPLE_TEXT);
    if (!wordLimit) {
      setWordLimit(150);
    }
  };

  const statCards = [
    {
      id: 'words' as HighlightMetric,
      label: 'Words',
      value: stats.words.toLocaleString(),
      sub: 'Total word count',
    },
    {
      id: 'characters' as HighlightMetric,
      label: 'Chars (Spaces)',
      value: stats.characters.toLocaleString(),
      sub: 'With whitespace',
    },
    {
      id: 'charactersNoSpaces' as HighlightMetric,
      label: 'Chars (No Space)',
      value: stats.charactersNoSpaces.toLocaleString(),
      sub: 'Letters & digits',
    },
    {
      id: 'sentences' as HighlightMetric,
      label: 'Sentences',
      value: stats.sentences.toLocaleString(),
      sub: 'English & Urdu (۔ ؟)',
    },
    {
      id: 'paragraphs' as HighlightMetric,
      label: 'Paragraphs',
      value: stats.paragraphs.toLocaleString(),
      sub: 'Text blocks',
    },
    {
      id: 'readingTime' as HighlightMetric,
      label: 'Reading Time',
      value: stats.readingTimeText,
      sub: 'About 200 wpm',
    },
    {
      id: 'speakingTime' as HighlightMetric,
      label: 'Speaking Time',
      value: stats.speakingTimeText,
      sub: 'About 130 wpm',
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Live 7-Metric Bar Immediately Visible Above the Editor */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {statCards.map((card, index) => {
          const isHighlighted = card.id === highlightStat;
          return (
            <div
              key={card.id}
              className={`p-3 rounded-xl border transition-colors ${
                index === 0 ? 'col-span-2 sm:col-span-1' : ''
              } ${
                isHighlighted
                  ? 'bg-zinc-950 text-white border-zinc-950'
                  : 'bg-zinc-50 text-zinc-950 border-zinc-200'
              }`}
            >
              <div
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isHighlighted ? 'text-zinc-300' : 'text-zinc-600'
                }`}
                title={card.label}
              >
                {card.label}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight font-mono-num mt-0.5">
                {card.value}
              </div>
              <div
                className={`text-[10px] mt-0.5 whitespace-nowrap ${
                  isHighlighted ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {card.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Textarea Workspace */}
      <div className="rounded-xl bg-white border border-zinc-300 focus-within:border-zinc-950 transition-colors overflow-hidden">
        {/* Minimal Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-zinc-50 border-b border-zinc-200">
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            <span className="font-semibold text-zinc-950">Assignment Text Editor</span>
            <span className="hidden sm:inline text-zinc-400">·</span>
            <span className="hidden sm:inline text-zinc-600">{romanUrduTip}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-medium transition-colors disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shrink-0"
              title="Copy text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shrink-0"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Large Working Text Editor */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          dir={isUrduRtl ? 'rtl' : 'ltr'}
          aria-label="Assignment text input"
          rows={9}
          className={`w-full p-4 sm:p-5 bg-white resize-y text-zinc-950 placeholder:text-zinc-400 focus:outline-none text-base leading-relaxed ${
            isUrduRtl ? 'urdu-text text-xl' : ''
          }`}
        />

        {/* Bottom Word Limit Bar inside workspace */}
        <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="word-limit-input" className="font-semibold text-zinc-950 whitespace-nowrap">
              Word Limit Target:
            </label>
            <input
              id="word-limit-input"
              type="number"
              min="1"
              step="50"
              placeholder="e.g. 2000"
              value={wordLimit}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                setWordLimit(val === '' || isNaN(val) ? '' : val);
              }}
              className="w-28 px-2.5 py-1 text-xs font-mono-num rounded-md border border-zinc-300 bg-white text-zinc-950 focus:outline-none focus:border-zinc-950"
            />
            {wordLimit !== '' && (
              <button
                type="button"
                onClick={() => setWordLimit('')}
                className="text-xs text-zinc-600 hover:text-zinc-950 underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {limitResult ? (
            <div className="flex items-center gap-3 flex-1 sm:max-w-md">
              <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-200 ${
                    limitResult.isOver ? 'bg-red-700' : 'bg-zinc-950'
                  }`}
                  style={{ width: `${Math.min(100, limitResult.percentage)}%` }}
                />
              </div>
              <span
                className={`text-xs font-semibold font-mono-num flex items-center gap-1 whitespace-nowrap ${
                  limitResult.isOver ? 'text-red-700' : 'text-zinc-950'
                }`}
              >
                {limitResult.isOver && <AlertCircle className="w-3.5 h-3.5" />}
                <span>
                  {stats.words.toLocaleString()}/{limitResult.limit.toLocaleString()} · {limitResult.statusMessage}
                </span>
              </span>
            </div>
          ) : (
            <div className="text-xs text-zinc-500">
              Supports English, Urdu (۔ ؟), and Roman Urdu · Processed locally in your browser
            </div>
          )}
        </div>
      </div>

      {/* Keyword Frequency Strip */}
      <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-950">
              Top 5 Repeated Words
            </h3>
            <p className="text-xs text-zinc-600">
              Filters common stop words and short words under 3 characters to help reduce repetition.
            </p>
          </div>
        </div>

        {stats.topWords.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {stats.topWords.map((item, idx) => (
              <div
                key={item.word}
                className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span>#{idx + 1}</span>
                  <span className="font-mono-num font-semibold text-zinc-950">{item.count}×</span>
                </div>
                <div className="text-sm font-bold text-zinc-950 truncate" title={item.word}>
                  {item.word}
                </div>
                <div className="mt-1.5 text-[11px] font-mono-num text-zinc-600">
                  {item.percentage}% of words
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-zinc-500 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
            Paste or type text above to see your most frequently repeated academic terms.
          </div>
        )}
      </div>
    </div>
  );
};
