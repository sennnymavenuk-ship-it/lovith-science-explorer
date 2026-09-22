import React, { useState } from 'react';
import { ArrowLeft, BookText, Award, RotateCcw, HelpCircle, Quote } from 'lucide-react';
import { TopicId } from '../types';
import {
  PARTS_OF_SPEECH,
  SENTENCE_TYPES,
  PUNCTUATION_MARKS,
  TENSES,
  GRAMMAR_QUIZ_POOL,
} from '../data/englishData';

interface EnglishPageProps {
  setActiveTopic: (topic: TopicId) => void;
}

const QUIZ_ROUNDS = 8;
const ANSWER_LABELS: Record<string, string> = Object.fromEntries(
  PARTS_OF_SPEECH.map((p) => [p.id, p.name.split(' ')[0]])
);

function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

// Renders a sentence with one word highlighted in bold colour
const HighlightedSentence: React.FC<{ sentence: string; word: string; className?: string }> = ({
  sentence,
  word,
  className = '',
}) => {
  const idx = sentence.indexOf(word);
  if (idx === -1) return <span className={className}>{sentence}</span>;
  return (
    <span className={className}>
      {sentence.slice(0, idx)}
      <strong className="text-amber-300 underline decoration-2 underline-offset-4">{word}</strong>
      {sentence.slice(idx + word.length)}
    </span>
  );
};

export const EnglishPage: React.FC<EnglishPageProps> = ({ setActiveTopic }) => {
  const [quiz, setQuiz] = useState<typeof GRAMMAR_QUIZ_POOL | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startQuiz = () => {
    setQuiz(pickRandom(GRAMMAR_QUIZ_POOL, QUIZ_ROUNDS));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const current = quiz ? quiz[index] : null;

  const pick = (id: string) => {
    if (!current || picked) return;
    setPicked(id);
    if (id === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (!quiz) return;
    if (index + 1 >= quiz.length) setFinished(true);
    else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  // 4 answer choices: the correct part of speech plus 3 random others
  const options = current
    ? pickRandom(
        [current.answer, ...pickRandom(PARTS_OF_SPEECH.map((p) => p.id).filter((id) => id !== current.answer), 3)],
        4
      )
    : [];

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-cyan-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-sky-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <button
            type="button"
            onClick={() => setActiveTopic('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-950/80 text-sky-300 text-sm font-black border border-sky-400/40 hover:border-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky-950/80 text-sky-300 rounded-full text-sm font-black border border-sky-400/40 shadow-md">
            <BookText className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <span>English Grammar Basics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Grammar Made Easy 📖
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Meet the building blocks of a sentence: parts of speech, sentence types, punctuation and simple tenses. Then test yourself in the quiz below.
          </p>
        </div>
      </section>

      {/* Parts of Speech */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">The 8 Parts of Speech</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PARTS_OF_SPEECH.map((p) => (
            <div key={p.id} className="bg-slate-900/90 rounded-3xl p-6 border-2 border-sky-400/30 shadow-xl space-y-3">
              <h3 className={`text-lg font-black ${p.color}`}>{p.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-bold">{p.definition}</p>
              <div className="pt-3 border-t border-indigo-500/30 text-xs text-slate-200 font-bold bg-slate-950 p-3 rounded-2xl">
                <HighlightedSentence sentence={p.example} word={p.highlighted} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sentence Types + Punctuation */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-sky-400/30 shadow-xl space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Types of Sentences</h2>
          <div className="space-y-3">
            {SENTENCE_TYPES.map((s) => (
              <div key={s.id} className="bg-slate-950 rounded-2xl p-4 border-2 border-sky-400/20 flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-sky-950 border border-sky-400/40 flex items-center justify-center text-lg font-black text-sky-300">
                  {s.endsWith[0]}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{s.name}</p>
                  <p className="text-xs text-slate-400 font-bold">{s.purpose}</p>
                  <p className="text-xs text-sky-200 font-bold mt-1 italic">&quot;{s.example}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-sky-950/60 rounded-[36px] p-7 border-2 border-sky-400/40 shadow-xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Quote className="w-6 h-6 text-sky-300" aria-hidden="true" />
            Punctuation Marks
          </h2>
          <div className="space-y-2.5">
            {PUNCTUATION_MARKS.map((m) => (
              <div key={m.name} className="flex items-start gap-3 bg-slate-950/60 rounded-xl p-3 border border-sky-400/20">
                <span className="text-2xl font-black text-sky-300 w-7 text-center shrink-0">{m.symbol}</span>
                <div>
                  <p className="text-xs font-black text-white">{m.name}</p>
                  <p className="text-[11px] text-slate-300 font-bold leading-snug">{m.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenses */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-sky-400/30 shadow-xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">Simple Tenses: When Did It Happen?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TENSES.map((t) => (
            <div key={t.id} className="bg-slate-950 rounded-2xl border-2 border-sky-400/20 p-5 space-y-2">
              <h3 className="text-base font-black text-sky-300">{t.name}</h3>
              <p className="text-xs text-slate-300 font-bold leading-relaxed">{t.explanation}</p>
              <p className="text-sm text-white font-black italic pt-2 border-t border-indigo-500/30">&quot;{t.example}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-sky-400/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-sky-400" aria-hidden="true" />
              Spot the Part of Speech
            </h2>
            <p className="text-sm text-slate-300 font-bold mt-1">
              We&apos;ll highlight a word in a sentence. Tap the part of speech it is.
            </p>
          </div>
          {!quiz && (
            <button
              type="button"
              onClick={startQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
            >
              Start Quiz
            </button>
          )}
        </div>

        {quiz && !finished && current && (
          <div className="space-y-5">
            <div className="flex justify-between text-xs sm:text-sm font-black text-sky-300">
              <span>Question {index + 1} of {quiz.length}</span>
              <span className="text-amber-300">Score: {score}</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-sky-400/20">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-300"
                style={{ width: `${((index + 1) / quiz.length) * 100}%` }}
              />
            </div>

            <p className="text-lg sm:text-xl font-black text-white leading-snug">
              <HighlightedSentence sentence={current.sentence} word={current.word} />
            </p>
            <p className="text-sm text-slate-400 font-bold">
              What part of speech is <strong className="text-amber-300">&quot;{current.word}&quot;</strong>?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {options.map((id) => {
                const isPicked = picked === id;
                const isCorrect = id === current.answer;
                let cls = 'bg-slate-950 border-sky-400/20 text-slate-200 hover:border-sky-400';
                if (picked) {
                  if (isCorrect) cls = 'bg-emerald-950 border-emerald-400 text-emerald-200';
                  else if (isPicked) cls = 'bg-rose-950 border-rose-500 text-rose-200';
                  else cls = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60';
                }
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pick(id)}
                    className={`p-4 rounded-2xl border-2 text-base font-black transition-colors ${cls}`}
                  >
                    {ANSWER_LABELS[id]}
                  </button>
                );
              })}
            </div>

            {picked && (
              <button
                type="button"
                onClick={next}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
              >
                {index + 1 >= quiz.length ? 'See My Score' : 'Next Question →'}
              </button>
            )}
          </div>
        )}

        {finished && quiz && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border-2 border-amber-400/40">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              You scored {score} out of {quiz.length}!
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-bold">
              {score >= 6 ? '🌟 Excellent! You know your grammar.' : '🌱 Good try! Review the parts of speech above and play again.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={startQuiz}
                className="px-5 py-3 rounded-2xl bg-slate-950 border-2 border-sky-400/30 hover:bg-slate-800 text-white text-sm font-black flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
