import React, { useState, useMemo } from 'react';
import {
  analyzeText,
  calculateWordLimit,
  CounterStats,
} from '../utils/counterLogic';
import {
  Copy,
  Check,
  Trash2,
  Clock,
  Mic,
  AlignLeft,
  Hash,
  FileSpreadsheet,
  AlertCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';

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
  placeholder = 'Type or paste your assignment, essay, or research paper here...',
  romanUrduTip = 'Apna assignment text yahan paste karein live word count check karne ke liye.',
  initialText = '',
  isUrduRtl = false,
}) => {
  const [text, setText] = useState<string>(initialText);
  const [wordLimit, setWordLimit] = useState<number | ''>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Live text stats
  const stats: CounterStats = useMemo(() => {
    return analyzeText(text);
  }, [text]);

  // Word limit progress calculation
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
      // Fallback
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

  // Stat card definitions
  const statCards = [
    {
      id: 'words' as HighlightMetric,
      label: 'Words',
      romanLabel: 'Alfaz',
      value: stats.words.toLocaleString(),
      icon: FileSpreadsheet,
      tooltip: 'Standard academic words',
    },
    {
      id: 'characters' as HighlightMetric,
      label: 'Characters',
      romanLabel: 'Huroof (kul)',
      value: stats.characters.toLocaleString(),
      icon: Hash,
      tooltip: 'Total characters including spaces',
    },
    {
      id: 'charactersNoSpaces' as HighlightMetric,
      label: 'No-Space Chars',
      romanLabel: 'Bina space huroof',
      value: stats.charactersNoSpaces.toLocaleString(),
      icon: Hash,
      tooltip: 'Characters excluding whitespace',
    },
    {
      id: 'sentences' as HighlightMetric,
      label: 'Sentences',
      romanLabel: 'Jumlay',
      value: stats.sentences.toLocaleString(),
      icon: AlignLeft,
      tooltip: 'Recognizes . ! ? and Urdu ۔ ؟',
    },
    {
      id: 'paragraphs' as HighlightMetric,
      label: 'Paragraphs',
      romanLabel: 'Iqtibaas',
      value: stats.paragraphs.toLocaleString(),
      icon: AlignLeft,
      tooltip: 'Academic text blocks',
    },
    {
      id: 'readingTime' as HighlightMetric,
      label: 'Reading Time',
      romanLabel: 'Parhne ka waqt',
      value: stats.readingTimeText,
      icon: Clock,
      tooltip: 'Silent reading speed (~200 wpm)',
    },
    {
      id: 'speakingTime' as HighlightMetric,
      label: 'Speaking Time',
      romanLabel: 'Bolne ka waqt',
      value: stats.speakingTimeText,
      icon: Mic,
      tooltip: 'Presentation speech speed (~130 wpm)',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Top Roman Urdu / English helper banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
        <div className="flex items-center gap-2">
          <span className="font-semibold px-1.5 py-0.5 rounded bg-blue-200/70 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] uppercase tracking-wider">
            Roman Urdu Tip
          </span>
          <span>{romanUrduTip}</span>
        </div>
        <button
          type="button"
          onClick={handleLoadSample}
          className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Sample Text</span>
        </button>
      </div>

      {/* Main Textarea Area */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
        {/* Textarea Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">Assignment Text Editor</span>
            {isUrduRtl && (
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold">
                RTL اردو Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Copy text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* The Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          dir={isUrduRtl ? 'rtl' : 'ltr'}
          aria-label="Assignment text input"
          rows={10}
          className={`w-full p-4 sm:p-5 bg-transparent resize-y text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-base sm:text-lg leading-relaxed ${
            isUrduRtl ? 'urdu-text text-xl' : ''
          }`}
        />

        {/* Live bottom bar inside textarea card */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>Live counting active</span>
            {text.length > 0 && <span className="ml-2 font-mono text-slate-400">({stats.characters} glyphs)</span>}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Supports English, Urdu (۔ ؟), & Roman Urdu
          </div>
        </div>
      </div>

      {/* Word Limit Tracker Module */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <label htmlFor="word-limit-input" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Target Assignment Word Limit</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Optional)</span>
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set your professor's word ceiling to track your margin in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
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
                className="w-36 px-3 py-1.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                words
              </span>
            </div>
            {wordLimit !== '' && (
              <button
                type="button"
                onClick={() => setWordLimit('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Word limit progress bar and message */}
        {limitResult ? (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {stats.words.toLocaleString()} / {limitResult.limit.toLocaleString()} words ({limitResult.percentage}%)
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                  limitResult.isOver
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                }`}
              >
                {limitResult.isOver && <AlertCircle className="w-3 h-3" />}
                <span>{limitResult.statusMessage}</span>
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  limitResult.isOver
                    ? 'bg-gradient-to-r from-rose-500 to-red-600'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}
                style={{ width: `${Math.min(100, limitResult.percentage)}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">
            Tip: Enter your word count target (e.g., 1000, 2000, 3500) to see a live visual gauge with remaining words.
          </p>
        )}
      </div>

      {/* 7 Stat Cards Grid - Highlight active metric */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Live Text Statistics
          </h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Active view: <strong className="text-blue-600 dark:text-blue-400 capitalize">{highlightStat}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((card) => {
            const isHighlighted = card.id === highlightStat;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`relative p-4 rounded-2xl transition-all duration-200 border ${
                  isHighlighted
                    ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-400 dark:border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    Focus
                  </span>
                )}

                <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                  <span className="text-xs font-medium">{card.label}</span>
                  <Icon className={`w-4 h-4 ${isHighlighted ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                </div>

                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isHighlighted ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                }`}>
                  {card.value}
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="truncate">{card.romanLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 5 Most Used Words Module */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Top 5 Most Used Words (Keyword Density)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filters common stop words (the, and, in, ka, ki, hai) and words under 3 letters.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Ranked by frequency
          </span>
        </div>

        {stats.topWords.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
            {stats.topWords.map((item, idx) => (
              <div
                key={item.word}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-400">#{idx + 1}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{item.count}×</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate" title={item.word}>
                  {item.word}
                </div>
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Density:</span>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.min(100, item.percentage * 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            Type or paste your assignment text above to analyze the most frequent academic keywords.
          </div>
        )}
      </div>
    </div>
  );
};
