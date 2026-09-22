import React, { useMemo, useState } from 'react';
import { ArrowLeft, Languages, Volume2, Award, RotateCcw, HelpCircle } from 'lucide-react';
import { TopicId } from '../types';
import {
  TAMIL_VOWELS,
  TAMIL_AYTHAM,
  TAMIL_CONSONANTS,
  TAMIL_NUMBERS,
  TAMIL_WORDS,
  TAMIL_GREETINGS,
  TAMIL_COLORS,
  TAMIL_QUIZ_POOL,
  TamilQuizEntry,
  UYIRMEI_TABLE,
  AATHICHUDI_LINES,
  TAMIL_POEMS,
  TAMIL_PRONOUNS,
  PLURAL_EXAMPLES,
  CASE_MARKERS,
  QUESTION_WORDS,
  SENTENCE_BUILD_EXAMPLE,
  TRICKY_LETTER_GROUPS,
  LETTER_CHOICE_QUIZ_POOL,
  LetterChoiceQuestion,
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

  // Separate state for the second game, "Choose the Right Letter", so the
  // two quizzes on this page never interfere with each other.
  const [letterQuiz, setLetterQuiz] = useState<LetterChoiceQuestion[] | null>(null);
  const [letterIndex, setLetterIndex] = useState(0);
  const [letterPicked, setLetterPicked] = useState<string | null>(null);
  const [letterScore, setLetterScore] = useState(0);
  const [letterFinished, setLetterFinished] = useState(false);

  const startLetterQuiz = () => {
    setLetterQuiz(pickRandom(LETTER_CHOICE_QUIZ_POOL, Math.min(10, LETTER_CHOICE_QUIZ_POOL.length)));
    setLetterIndex(0);
    setLetterPicked(null);
    setLetterScore(0);
    setLetterFinished(false);
  };

  const currentLetterQ = letterQuiz ? letterQuiz[letterIndex] : null;

  const pickLetter = (letter: string) => {
    if (!currentLetterQ || letterPicked) return;
    setLetterPicked(letter);
    if (letter === currentLetterQ.correctLetter) setLetterScore((s) => s + 1);
  };

  const nextLetterQ = () => {
    if (!letterQuiz) return;
    if (letterIndex + 1 >= letterQuiz.length) {
      setLetterFinished(true);
    } else {
      setLetterIndex((i) => i + 1);
      setLetterPicked(null);
    }
  };

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

        <div className="bg-rose-950/40 rounded-2xl border-2 border-rose-400/30 p-5 flex items-center gap-4">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-950 border-2 border-rose-400/40 flex items-center justify-center text-4xl font-black text-rose-200">
            {TAMIL_AYTHAM.letter}
          </div>
          <div>
            <p className="text-sm font-black text-white">
              {TAMIL_AYTHAM.transliteration} · The 13th, special letter — ஆய்த எழுத்து (aytham)
            </p>
            <p className="text-xs text-slate-300 font-bold leading-snug mt-1">
              This one is neither a vowel nor a consonant — a unique letter of its own. {TAMIL_AYTHAM.hint}. Add it
              to the 12 vowels, 18 consonants and 216 uyirmei letters below, and Tamil has <strong>247 letters</strong> in all.
            </p>
          </div>
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

      {/* Uyirmei letters */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Uyirmei Letters · உயிர்மெய் எழுத்துகள்</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Combine each of the 18 consonants with each of the 12 vowels and you get all 216 uyirmei (&quot;life + body&quot;) letters. Together with the 12 vowels, 18 consonants and the special ஃ you just met, that&apos;s all 247 letters of the Tamil script. This is the same chart used in Tamil classrooms — scroll sideways to see it all.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border-2 border-rose-400/20">
          <table className="border-collapse text-center w-full">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-slate-950 text-[11px] font-black text-rose-300 p-2.5 border-b border-r border-rose-400/20">
                  +
                </th>
                {TAMIL_VOWELS.map((v) => (
                  <th key={v.letter} className="text-[11px] font-black text-rose-300 p-2.5 border-b border-rose-400/10 whitespace-nowrap">
                    {v.letter}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UYIRMEI_TABLE.map((row) => (
                <tr key={row.consonantTransliteration + row.cells[0].letter} className="even:bg-slate-950/40">
                  <th className="sticky left-0 z-10 bg-slate-950 text-sm font-black text-white p-2.5 border-r border-rose-400/20 whitespace-nowrap">
                    {row.cells[0].letter[0]}
                  </th>
                  {row.cells.map((cell) => (
                    <td key={cell.letter} className="p-2 hover:bg-rose-950/60 transition-colors">
                      <div className="text-lg sm:text-xl font-black text-rose-200 leading-none">{cell.letter}</div>
                      <div className="text-[9px] text-slate-500 font-bold mt-0.5">{cell.transliteration}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How we get to 247 letters */}
      <section className="bg-rose-950/40 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/40 shadow-xl space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Let&apos;s Add It Up: How Tamil Gets to 247 Letters</h2>
          <p className="text-sm text-slate-300 font-bold mt-1">
            You&apos;ve now met every piece. Here&apos;s how they add up to the full Tamil script.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
          {[
            { n: TAMIL_VOWELS.length, label: 'Vowels', sub: 'உயிர் எழுத்து', color: 'bg-rose-400 text-slate-950' },
            { n: TAMIL_CONSONANTS.length, label: 'Consonants', sub: 'மெய் எழுத்து', color: 'bg-pink-400 text-slate-950' },
            { n: 1, label: 'Special letter', sub: 'ஆய்த எழுத்து (ஃ)', color: 'bg-fuchsia-400 text-slate-950' },
            {
              n: UYIRMEI_TABLE.reduce((sum, row) => sum + row.cells.length, 0),
              label: 'Uyirmei letters',
              sub: `${TAMIL_CONSONANTS.length} × ${TAMIL_VOWELS.length} combined`,
              color: 'bg-rose-300 text-slate-950',
            },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="bg-slate-950 rounded-2xl border-2 border-rose-400/30 p-4 sm:p-5 w-32 sm:w-36 space-y-1.5">
                <div className={`w-11 h-11 mx-auto rounded-xl ${item.color} flex items-center justify-center text-xl font-black`}>
                  {item.n}
                </div>
                <p className="text-xs font-black text-white leading-tight">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-bold">{item.sub}</p>
              </div>
              {i < arr.length - 1 && <span className="text-2xl sm:text-3xl font-black text-rose-300" aria-hidden="true">+</span>}
            </React.Fragment>
          ))}
          <span className="text-2xl sm:text-3xl font-black text-rose-300" aria-hidden="true">=</span>
          <div className="bg-gradient-to-br from-rose-400 to-fuchsia-400 rounded-2xl p-4 sm:p-5 w-32 sm:w-36 space-y-1.5 shadow-lg">
            <div className="w-11 h-11 mx-auto rounded-xl bg-slate-950 text-white flex items-center justify-center text-xl font-black">
              {TAMIL_VOWELS.length +
                TAMIL_CONSONANTS.length +
                1 +
                UYIRMEI_TABLE.reduce((sum, row) => sum + row.cells.length, 0)}
            </div>
            <p className="text-xs font-black text-slate-950 leading-tight">Total letters</p>
            <p className="text-[10px] text-slate-900 font-bold">in the Tamil script</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-bold text-center">
          {TAMIL_VOWELS.length} + {TAMIL_CONSONANTS.length} + 1 + {UYIRMEI_TABLE.reduce((sum, row) => sum + row.cells.length, 0)} ={' '}
          {TAMIL_VOWELS.length + TAMIL_CONSONANTS.length + 1 + UYIRMEI_TABLE.reduce((sum, row) => sum + row.cells.length, 0)}
        </p>
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

      {/* Poems */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Poems · பாடல்கள்</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Two much-loved pieces every Tamil child grows up with.
          </p>
        </div>

        {/* Aathichudi */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-rose-200">ஆத்திசூடி · Aathichudi</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1">
              A classical set of one-line lessons by the poet Avvaiyar, taught to Tamil children for centuries. These
              first 12 lines are a perfect match for what you just learned: each one starts with a word beginning
              with the next vowel in order, from அ to ஔ!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AATHICHUDI_LINES.map((line, i) => (
              <div key={line.tamil} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-4 flex items-start gap-3">
                <span className="shrink-0 w-9 h-9 rounded-xl bg-rose-950 border border-rose-400/40 flex items-center justify-center text-lg font-black text-rose-300">
                  {TAMIL_VOWELS[i].letter}
                </span>
                <div>
                  <p className="text-base font-black text-white">{line.tamil}</p>
                  <p className="text-[11px] text-slate-400 font-bold leading-snug mt-0.5">{line.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bharathiyar poem */}
        {TAMIL_POEMS.map((poem) => (
          <div key={poem.id} className="bg-rose-950/50 rounded-3xl border-2 border-rose-400/30 p-6 sm:p-7 space-y-3">
            <div>
              <h3 className="text-xl font-black text-rose-200">{poem.title}</h3>
              <p className="text-xs text-rose-300 font-bold">{poem.author}</p>
            </div>
            <div className="space-y-1">
              {poem.lines.map((line) => (
                <p key={line} className="text-lg sm:text-xl font-black text-white leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed pt-3 border-t border-rose-400/20">
              {poem.note}
            </p>
          </div>
        ))}
      </section>

      {/* Grammar Basics */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Grammar Basics · இலக்கணம்</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            A few simple rules to help you start writing your own Tamil sentences.
          </p>
        </div>

        {/* Word order */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-200">1. Word Order: Subject + Object + Verb</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
            English says <em>Subject + Verb + Object</em> (&quot;I kicked the ball&quot;). Tamil puts the verb at the
            very end: <em>Subject + Object + Verb</em>.
          </p>
          <div className="flex flex-wrap items-stretch gap-3">
            {SENTENCE_BUILD_EXAMPLE.map((step, i) => (
              <React.Fragment key={step.tamil}>
                <div className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 px-4 py-3 text-center">
                  <p className="text-lg font-black text-rose-200">{step.tamil}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">{step.role}</p>
                </div>
                {i < SENTENCE_BUILD_EXAMPLE.length - 1 && (
                  <span className="self-center text-lg font-black text-rose-300" aria-hidden="true">+</span>
                )}
              </React.Fragment>
            ))}
            <span className="self-center text-lg font-black text-rose-300" aria-hidden="true">=</span>
            <div className="bg-rose-950/60 rounded-2xl border-2 border-rose-400/40 px-4 py-3 text-center">
              <p className="text-lg font-black text-white">&quot;I kicked the ball.&quot;</p>
            </div>
          </div>
        </div>

        {/* Pronouns */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-200">2. Pronouns</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TAMIL_PRONOUNS.map((p) => (
              <div key={p.tamil} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-3.5 text-center">
                <p className="text-lg font-black text-rose-200">{p.tamil}</p>
                <p className="text-[10px] text-slate-400 font-bold">{p.transliteration}</p>
                <p className="text-xs text-white font-black mt-1">{p.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plurals */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-200">3. Making a Word Plural: Add -கள்</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
            To talk about more than one of something, just add <strong className="text-rose-200">-கள்</strong> to
            the end of the word.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLURAL_EXAMPLES.map((p) => (
              <div key={p.singular} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-3.5 text-center">
                <p className="text-sm font-black text-white">
                  {p.singular} <span className="text-rose-300">→</span> {p.plural}
                </p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">{p.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case markers */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-200">4. Word Endings That Show &quot;Who Does What&quot;</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
            Tamil often adds a short ending to a noun to show its job in the sentence, instead of using a separate
            word the way English uses &quot;to&quot; or &quot;in&quot;.
          </p>
          <div className="space-y-2.5">
            {CASE_MARKERS.map((c) => (
              <div key={c.marker} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-4 flex items-start gap-4">
                <span className="shrink-0 w-16 text-center text-lg font-black text-rose-300 bg-rose-950/60 rounded-xl py-2 border border-rose-400/30">
                  {c.marker}
                </span>
                <div>
                  <p className="text-sm font-black text-white">{c.name}</p>
                  <p className="text-[11px] text-slate-400 font-bold">{c.meaning}</p>
                  <p className="text-xs text-rose-200 font-bold mt-1 italic">{c.exampleTamil}</p>
                  <p className="text-[11px] text-slate-400 font-bold">{c.exampleMeaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question words */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-rose-200">5. Question Words</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUESTION_WORDS.map((q) => (
              <div key={q.tamil} className="bg-slate-950 rounded-2xl border-2 border-rose-400/20 p-3.5 text-center">
                <p className="text-lg font-black text-rose-200">{q.tamil}</p>
                <p className="text-[10px] text-slate-400 font-bold">{q.transliteration}</p>
                <p className="text-xs text-white font-black mt-1">{q.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tricky Letter Pairs */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Tricky Letter Pairs</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Some Tamil letters sound very close to each other. Here&apos;s how to tell them apart.
          </p>
        </div>

        {TRICKY_LETTER_GROUPS.map((group) => (
          <div key={group.id} className="bg-slate-950 rounded-3xl border-2 border-rose-400/20 p-5 sm:p-6 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-rose-200">{group.title}</h3>

            <div className="flex flex-wrap gap-3">
              {group.letters.map((l) => (
                <div key={l.letter} className="bg-slate-900 rounded-2xl border border-rose-400/20 px-4 py-3 flex items-center gap-3 flex-1 min-w-[220px]">
                  <span className="text-3xl font-black text-rose-200 shrink-0">{l.letter}</span>
                  <p className="text-[11px] text-slate-400 font-bold leading-snug">{l.hint}</p>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-amber-200 font-bold leading-relaxed bg-amber-950/40 border border-amber-400/30 rounded-2xl p-3.5">
              💡 {group.rule}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {group.examples.map((ex) => (
                <div key={ex.word} className="bg-slate-900 rounded-xl border border-rose-400/10 p-3">
                  <p className="text-base font-black text-white">{ex.word}</p>
                  <p className="text-[10px] text-slate-400 font-bold leading-snug">{ex.meaning}</p>
                  <p className="text-[10px] text-rose-300 font-bold mt-1">uses {ex.letterUsed}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Choose the Right Letter game */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-rose-400/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-rose-400" aria-hidden="true" />
              Choose the Right Letter
            </h2>
            <p className="text-sm text-slate-300 font-bold mt-1">
              A word is missing one letter. Pick the correct one to complete it.
            </p>
          </div>
          {!letterQuiz && (
            <button
              type="button"
              onClick={startLetterQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-fuchsia-400 hover:from-rose-300 hover:to-fuchsia-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
            >
              Start Game
            </button>
          )}
        </div>

        {letterQuiz && !letterFinished && currentLetterQ && (
          <div className="space-y-5">
            <div className="flex justify-between text-xs sm:text-sm font-black text-rose-300">
              <span>Question {letterIndex + 1} of {letterQuiz.length}</span>
              <span className="text-amber-300">Score: {letterScore}</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-rose-400/20">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-400 transition-all duration-300"
                style={{ width: `${((letterIndex + 1) / letterQuiz.length) * 100}%` }}
              />
            </div>

            <p className="text-4xl sm:text-5xl font-black text-white text-center py-3 tracking-wide">
              {currentLetterQ.wordWithBlank}
            </p>
            <p className="text-sm text-slate-400 font-bold text-center">
              &quot;{currentLetterQ.meaning}&quot; — which letter completes the word?
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              {currentLetterQ.options.map((opt) => {
                const isPicked = letterPicked === opt;
                const isCorrect = opt === currentLetterQ.correctLetter;
                let cls = 'bg-slate-950 border-rose-400/20 text-slate-200 hover:border-rose-400';
                if (letterPicked) {
                  if (isCorrect) cls = 'bg-emerald-950 border-emerald-400 text-emerald-200';
                  else if (isPicked) cls = 'bg-rose-950 border-rose-500 text-rose-200';
                  else cls = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60';
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pickLetter(opt)}
                    className={`w-20 h-20 rounded-2xl border-2 text-3xl font-black transition-colors ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {letterPicked && (
              <div className="text-center space-y-3">
                <p className="text-sm font-bold text-slate-300">
                  The word is <strong className="text-white">{currentLetterQ.answerWord}</strong> — &quot;{currentLetterQ.meaning}&quot;
                </p>
                <button
                  type="button"
                  onClick={nextLetterQ}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-fuchsia-400 hover:from-rose-300 hover:to-fuchsia-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                >
                  {letterIndex + 1 >= letterQuiz.length ? 'See My Score' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        )}

        {letterFinished && letterQuiz && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border-2 border-amber-400/40">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              You scored {letterScore} out of {letterQuiz.length}!
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-bold">
              {letterScore >= Math.ceil(letterQuiz.length * 0.7)
                ? '🌟 Great ear for tricky letters!'
                : '🌱 These are tricky even for grown-ups — look at the examples above and try again.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={startLetterQuiz}
                className="px-5 py-3 rounded-2xl bg-slate-950 border-2 border-rose-400/30 hover:bg-slate-800 text-white text-sm font-black flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Play Again
              </button>
            </div>
          </div>
        )}
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
