import React, { useMemo, useState } from 'react';
import { ArrowLeft, Languages, Volume2, Award, RotateCcw, HelpCircle } from 'lucide-react';
import { TopicId } from '../types';
import {
  TAMIL_VOWELS,
  TAMIL_CONSONANTS,
  TAMIL_NUMBERS,
  TAMIL_WORDS,
  TAMIL_GREETINGS,
  TAMIL_COLORS,
  TAMIL_QUIZ_POOL,
  TamilQuizEntry,
} from '../data/tamilData';

interface TamilPageProps {
  setActiveTopic: (topic: TopicId) => void;
}

const QUIZ_ROUNDS = 8;

function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

interface Question {
  entry: TamilQuizEntry;
  options: TamilQuizEntry[]; // 4 options, one of which is the correct entry
}

function buildQuiz(): Question[] {
  const targets = pickRandom(TAMIL_QUIZ_POOL, QUIZ_ROUNDS);
  return targets.map((entry) => {
    const distractors = pickRandom(
      TAMIL_QUIZ_POOL.filter((e) => e.id !== entry.id),
      3
    );
    return { entry, options: pickRandom([entry, ...distractors], 4) };
  });
}

export const TamilPage: React.FC<TamilPageProps> = ({ setActiveTopic }) => {
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startQuiz = () => {
    setQuiz(buildQuiz());
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const current = quiz ? quiz[index] : null;

  const pick = (id: string) => {
    if (!current || picked) return;
    setPicked(id);
    if (id === current.entry.id) setScore((s) => s + 1);
  };

  const next = () => {
    if (!quiz) return;
    if (index + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-rose-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <button
            type="button"
            onClick={() => setActiveTopic('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/80 text-rose-300 text-sm font-black border border-rose-400/40 hover:border-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-rose-950/80 text-rose-300 rounded-full text-sm font-black border border-rose-400/40 shadow-md">
            <Languages className="w-5 h-5 text-rose-400" aria-hidden="true" />
            <span>Tamil Language Basics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            தமிழ் கற்போம்! 📝
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Let&apos;s learn Tamil! Meet the vowels and consonants, count to 10, pick up everyday words, and play the word match game at the end.
          </p>
        </div>
      </section>

      {/* Vowels */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Vowels · உயிர் எழுத்துகள்</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Tamil has 12 vowels. They are called <em>uyir ezhuthu</em>, which means &quot;life letters&quot;.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {TAMIL_VOWELS.map((v) => (
            <div
              key={v.letter}
              className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 hover:border-rose-400 transition-colors p-4 text-center space-y-1.5"
            >
              <p className="text-4xl font-black text-rose-200 leading-none">{v.letter}</p>
              <p className="text-sm font-black text-white">{v.transliteration}</p>
              <p className="text-[11px] text-slate-400 font-bold leading-snug">{v.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Consonants */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Consonants · மெய் எழுத்துகள்</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Tamil has 18 consonants, called <em>mei ezhuthu</em>, meaning &quot;body letters&quot;. Combine them with vowels to make full syllables.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {TAMIL_CONSONANTS.map((c) => (
            <div
              key={c.letter}
              className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 hover:border-rose-400 transition-colors p-4 text-center space-y-1.5"
            >
              <p className="text-4xl font-black text-pink-200 leading-none">{c.letter}</p>
              <p className="text-sm font-black text-white">{c.transliteration}</p>
              <p className="text-[11px] text-slate-400 font-bold leading-snug">{c.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">Numbers 1–10 · எண்கள்</h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {TAMIL_NUMBERS.map((n) => (
            <div
              key={n.digit}
              className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-3 text-center space-y-1"
            >
              <p className="text-xs font-black text-rose-400">{n.digit}</p>
              <p className="text-lg sm:text-xl font-black text-white leading-tight">{n.tamil}</p>
              <p className="text-[10px] text-slate-400 font-bold">{n.transliteration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Words + Greetings + Colors */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Everyday Words · சொற்கள்</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TAMIL_WORDS.map((w) => (
              <div key={w.id} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-4 text-center space-y-1.5">
                <div className="text-3xl" aria-hidden="true">{w.emoji}</div>
                <p className="text-lg font-black text-rose-200">{w.tamil}</p>
                <p className="text-[11px] text-slate-400 font-bold">{w.transliteration}</p>
                <p className="text-xs text-white font-black">{w.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-rose-950/60 rounded-[36px] p-7 border-2 border-rose-400/40 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-rose-300" aria-hidden="true" />
              Greetings
            </h2>
            <div className="space-y-3">
              {TAMIL_GREETINGS.map((g) => (
                <div key={g.tamil} className="bg-slate-950/60 rounded-2xl p-3.5 border border-rose-400/20">
                  <p className="text-lg font-black text-rose-200">{g.tamil}</p>
                  <p className="text-xs text-rose-300 font-bold">{g.transliteration}</p>
                  <p className="text-xs text-slate-300 font-bold mt-0.5">{g.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-[36px] p-7 border-2 border-rose-400/30 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white">Colours · நிறங்கள்</h2>
            <div className="grid grid-cols-3 gap-3">
              {TAMIL_COLORS.map((c) => (
                <div key={c.tamil} className="text-center space-y-1.5">
                  <div
                    className="w-full aspect-square rounded-xl border-2 border-white/20 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-black text-white">{c.tamil}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{c.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Word Match Game */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-rose-400" aria-hidden="true" />
              Word Match Game
            </h2>
            <p className="text-sm text-slate-300 font-bold mt-1">
              We show the English meaning, you tap the matching Tamil word.
            </p>
          </div>
          {!quiz && (
            <button
              type="button"
              onClick={startQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-fuchsia-400 hover:from-rose-300 hover:to-fuchsia-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
            >
              Start Game
            </button>
          )}
        </div>

        {quiz && !finished && current && (
          <div className="space-y-5">
            <div className="flex justify-between text-xs sm:text-sm font-black text-rose-300">
              <span>Question {index + 1} of {quiz.length}</span>
              <span className="text-amber-300">Score: {score}</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-rose-400/20">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-400 transition-all duration-300"
                style={{ width: `${((index + 1) / quiz.length) * 100}%` }}
              />
            </div>

            <p className="text-xl sm:text-2xl font-black text-white">
              Which word means <span className="text-rose-300">&quot;{current.entry.meaning}&quot;</span>?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {current.options.map((opt) => {
                const isPicked = picked === opt.id;
                const isCorrect = opt.id === current.entry.id;
                let cls = 'bg-slate-950 border-rose-400/20 text-slate-200 hover:border-rose-400';
                if (picked) {
                  if (isCorrect) cls = 'bg-emerald-950 border-emerald-400 text-emerald-200';
                  else if (isPicked) cls = 'bg-rose-950 border-rose-500 text-rose-200';
                  else cls = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60';
                }
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => pick(opt.id)}
                    className={`p-4 rounded-2xl border-2 text-2xl font-black transition-colors ${cls}`}
                  >
                    {opt.tamil}
                  </button>
                );
              })}
            </div>

            {picked && (
              <button
                type="button"
                onClick={next}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-fuchsia-400 hover:from-rose-300 hover:to-fuchsia-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
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
              {score >= 6 ? '🌟 Super! You know your Tamil words well.' : '🌱 Good try! Look at the words above and play again.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={startQuiz}
                className="px-5 py-3 rounded-2xl bg-slate-950 border-2 border-rose-400/30 hover:bg-slate-800 text-white text-sm font-black flex items-center gap-2"
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
