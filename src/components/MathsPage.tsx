import React, { useMemo, useState } from 'react';
import { ArrowLeft, Calculator, Plus, Minus, Award, RotateCcw, HelpCircle } from 'lucide-react';
import { TopicId } from '../types';
import { OPERATIONS, OperationId } from '../data/mathsData';

interface MathsPageProps {
  setActiveTopic: (topic: TopicId) => void;
}

const MIN_NUM = 0;
const MAX_NUM = 10;

const OP_COLOR: Record<OperationId, { dot: string; ring: string; text: string; bg: string; grad: string }> = {
  add: { dot: 'bg-sky-400', ring: 'border-sky-400', text: 'text-sky-300', bg: 'bg-sky-950/60', grad: 'from-sky-400 to-cyan-400' },
  subtract: { dot: 'bg-rose-400', ring: 'border-rose-400', text: 'text-rose-300', bg: 'bg-rose-950/60', grad: 'from-rose-400 to-orange-400' },
  multiply: { dot: 'bg-violet-400', ring: 'border-violet-400', text: 'text-violet-300', bg: 'bg-violet-950/60', grad: 'from-violet-400 to-purple-400' },
  divide: { dot: 'bg-emerald-400', ring: 'border-emerald-400', text: 'text-emerald-300', bg: 'bg-emerald-950/60', grad: 'from-emerald-400 to-teal-400' },
};

function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A small row of coloured dots, used to visualise a quantity
const DotRow: React.FC<{ count: number; className?: string; faded?: boolean }> = ({ count, className = 'bg-sky-400', faded = false }) => (
  <div className="flex flex-wrap gap-1.5">
    {Array.from({ length: count }, (_, i) => (
      <span
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${className} ${faded ? 'opacity-25' : ''}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

// ---------- Practice quiz question generator ----------
type Difficulty = 'ones' | 'tens' | 'hundreds';

const DIFFICULTY_INFO: Record<Difficulty, { label: string; range: string }> = {
  ones: { label: 'Single Digit', range: '0 – 10' },
  tens: { label: '2-Digit Numbers', range: '10 – 99' },
  hundreds: { label: '3-Digit Numbers', range: '100 – 999' },
};

// The main number in each question is drawn from this range. Multiplication
// and division keep their second number (the multiplier / divisor) small and
// single-digit at every level, so the questions stay answerable by hand
// rather than turning into a calculator exercise.
const DIFFICULTY_RANGE: Record<Difficulty, [number, number]> = {
  ones: [0, 10],
  tens: [10, 99],
  hundreds: [100, 999],
};

interface MathQuestion {
  id: string;
  prompt: string;
  answer: number;
  options: number[];
}

function makeDistractors(correct: number, spread: number, min = 0): number[] {
  const set = new Set<number>([correct]);
  let guard = 0;
  while (set.size < 4 && guard < 50) {
    guard++;
    const offset = randInt(-spread, spread);
    const candidate = correct + (offset === 0 ? spread || 1 : offset);
    if (candidate >= min) set.add(candidate);
  }
  // Extremely small ranges may not yield 3 distinct distractors; fall back to nearby values.
  let filler = correct + 1;
  while (set.size < 4) {
    if (filler >= min) set.add(filler);
    filler++;
  }
  return [...set];
}

// Distractors scale with the size of the answer, so a 3-digit question gets
// plausibly-sized wrong options instead of ones that are obviously too small.
function spreadFor(answer: number): number {
  return Math.max(3, Math.round(Math.abs(answer) * 0.15));
}

function generateQuestion(op: OperationId, id: string, difficulty: Difficulty): MathQuestion {
  const [min, max] = DIFFICULTY_RANGE[difficulty];
  let a: number, b: number, answer: number;
  switch (op) {
    case 'add':
      a = randInt(min, max);
      b = randInt(min, max);
      answer = a + b;
      return { id, prompt: `${a} + ${b} = ?`, answer, options: pickRandom(makeDistractors(answer, spreadFor(answer)), 4) };
    case 'subtract':
      a = randInt(min, max);
      b = randInt(min, a); // guarantees a non-negative result, with b at least as large as the range's minimum
      answer = a - b;
      return { id, prompt: `${a} − ${b} = ?`, answer, options: pickRandom(makeDistractors(answer, spreadFor(answer || 5)), 4) };
    case 'multiply':
      a = randInt(min, max);
      b = randInt(2, 9); // second factor stays single-digit at every difficulty
      answer = a * b;
      return { id, prompt: `${a} × ${b} = ?`, answer, options: pickRandom(makeDistractors(answer, spreadFor(answer)), 4) };
    case 'divide':
    default: {
      const divisor = randInt(2, 9); // stays single-digit at every difficulty
      const qMin = Math.ceil(min / divisor);
      const qMax = Math.floor(max / divisor);
      const quotient = randInt(qMin, qMax);
      a = divisor * quotient;
      b = divisor;
      answer = quotient;
      return { id, prompt: `${a} ÷ ${b} = ?`, answer, options: pickRandom(makeDistractors(answer, spreadFor(answer || 5)), 4) };
    }
  }
}

const QUIZ_ROUNDS = 10;

function buildQuiz(difficulty: Difficulty): MathQuestion[] {
  // A pool with 3 of each operation, then a random 10 drawn from it, so every
  // quiz has a good, slightly-shuffled mix of all four operations.
  const pool: OperationId[] = (['add', 'subtract', 'multiply', 'divide'] as OperationId[]).flatMap((op) => [op, op, op]);
  const ops = pickRandom(pool, QUIZ_ROUNDS);
  return ops.map((op, i) => generateQuestion(op, `${op}-${i}`, difficulty));
}

export const MathsPage: React.FC<MathsPageProps> = ({ setActiveTopic }) => {
  const [numA, setNumA] = useState(3);
  const [numB, setNumB] = useState(2);
  const [operation, setOperation] = useState<OperationId>('add');

  const [quiz, setQuiz] = useState<MathQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('ones');

  const colors = OP_COLOR[operation];

  // ---------- Explorer: compute the result and what to show ----------
  const explorer = useMemo(() => {
    if (operation === 'add') {
      return { valid: true, equation: `${numA} + ${numB} = ${numA + numB}`, result: numA + numB };
    }
    if (operation === 'subtract') {
      if (numB > numA) {
        return { valid: false, message: `You only have ${numA}. You can't take away ${numB}! Try a second number of ${numA} or less.` };
      }
      return { valid: true, equation: `${numA} − ${numB} = ${numA - numB}`, result: numA - numB };
    }
    if (operation === 'multiply') {
      return { valid: true, equation: `${numA} × ${numB} = ${numA * numB}`, result: numA * numB };
    }
    // divide
    if (numB === 0) {
      return { valid: false, message: "We can't divide by zero! Choose a second number of 1 or more." };
    }
    const quotient = Math.floor(numA / numB);
    const remainder = numA % numB;
    return {
      valid: true,
      equation: remainder === 0 ? `${numA} ÷ ${numB} = ${quotient}` : `${numA} ÷ ${numB} = ${quotient} remainder ${remainder}`,
      result: quotient,
      remainder,
    };
  }, [numA, numB, operation]);

  const step = (which: 'a' | 'b', delta: number) => {
    const setter = which === 'a' ? setNumA : setNumB;
    setter((v) => Math.min(MAX_NUM, Math.max(MIN_NUM, v + delta)));
  };

  // ---------- Quiz handlers ----------
  const startQuiz = () => {
    setQuiz(buildQuiz(difficulty));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const current = quiz ? quiz[index] : null;

  const pick = (value: number) => {
    if (!current || picked !== null) return;
    setPicked(value);
    if (value === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (!quiz) return;
    if (index + 1 >= quiz.length) setFinished(true);
    else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-violet-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <button
            type="button"
            onClick={() => setActiveTopic('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-950/80 text-violet-300 text-sm font-black border border-violet-400/40 hover:border-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-violet-950/80 text-violet-300 rounded-full text-sm font-black border border-violet-400/40 shadow-md">
            <Calculator className="w-5 h-5 text-violet-400" aria-hidden="true" />
            <span>Basic Math Operations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Let&apos;s Do Some Maths! 🔢
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Meet the four basic operations, play with numbers in the explorer below to see how each one works, then practise in the quiz.
          </p>
        </div>
      </section>

      {/* Overview cards */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">The 4 Basic Operations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OPERATIONS.map((op) => {
            const c = OP_COLOR[op.id];
            return (
              <div key={op.id} className="bg-slate-900/90 rounded-3xl p-6 border-2 border-violet-400/30 shadow-xl space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${c.bg} border-2 ${c.ring} flex items-center justify-center text-2xl font-black ${c.text}`}>
                  {op.symbol}
                </div>
                <h3 className="text-lg font-black text-white">{op.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-bold">{op.definition}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-bold italic">{op.analogy}</p>
                <div className={`pt-3 border-t border-indigo-500/30 text-sm font-black ${c.text}`}>{op.example}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Explorer */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-violet-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Operation Explorer</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Pick two numbers and an operation. Watch the dots show you what&apos;s happening.
          </p>
        </div>

        {/* Operation picker */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an operation">
          {OPERATIONS.map((op) => {
            const isActive = operation === op.id;
            const c = OP_COLOR[op.id];
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setOperation(op.id)}
                aria-pressed={isActive}
                className={`px-5 py-2.5 rounded-2xl text-base font-black border-2 transition-colors ${
                  isActive ? `bg-gradient-to-r ${c.grad} text-slate-950 border-white/30` : 'bg-slate-950 border-indigo-500/30 text-slate-300 hover:border-white/40'
                }`}
              >
                {op.symbol} {op.name}
              </button>
            );
          })}
        </div>

        {/* Number steppers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(['a', 'b'] as const).map((which) => {
            const value = which === 'a' ? numA : numB;
            return (
              <div key={which} className="bg-slate-950 rounded-2xl border-2 border-violet-400/20 p-5 flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wide">
                  {which === 'a' ? 'First number' : 'Second number'}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => step(which, -1)}
                    disabled={value <= MIN_NUM}
                    aria-label={`Decrease ${which === 'a' ? 'first' : 'second'} number`}
                    className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-indigo-500/30 text-white flex items-center justify-center disabled:opacity-30 hover:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                  >
                    <Minus className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <span className="text-3xl font-black text-white w-10 text-center tabular-nums">{value}</span>
                  <button
                    type="button"
                    onClick={() => step(which, 1)}
                    disabled={value >= MAX_NUM}
                    aria-label={`Increase ${which === 'a' ? 'first' : 'second'} number`}
                    className="w-10 h-10 rounded-xl bg-slate-900 border-2 border-indigo-500/30 text-white flex items-center justify-center disabled:opacity-30 hover:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Result + visualisation */}
        <div className={`rounded-3xl border-2 ${colors.ring}/40 ${colors.bg} p-6 space-y-5`} aria-live="polite">
          {!explorer.valid ? (
            <p className="text-base sm:text-lg font-black text-white">{explorer.message}</p>
          ) : (
            <>
              <p className="text-2xl sm:text-3xl font-black text-white" data-equation>{explorer.equation}</p>

              {operation === 'add' && (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-slate-300 mb-1.5">Group A ({numA})</p>
                    <DotRow count={numA} className="bg-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300 mb-1.5">Group B ({numB})</p>
                    <DotRow count={numB} className="bg-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300 mb-1.5">Put together ({numA + numB})</p>
                    <DotRow count={numA + numB} className="bg-violet-400" />
                  </div>
                </div>
              )}

              {operation === 'subtract' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-300">
                    Start with {numA}, take away {numB}, {numA - numB} left over
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: numA }, (_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${
                          i < numA - numB ? 'bg-emerald-400' : 'bg-rose-500/40 line-through'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold">Green = kept · Faded = taken away</p>
                </div>
              )}

              {operation === 'multiply' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-300">
                    {numB} group{numB === 1 ? '' : 's'} of {numA} = {numA * numB}
                  </p>
                  <div className="space-y-1.5">
                    {Array.from({ length: numB }, (_, row) => (
                      <DotRow key={row} count={numA} className="bg-violet-400" />
                    ))}
                    {numB === 0 && <p className="text-xs text-slate-500 font-bold italic">Zero groups means zero total!</p>}
                  </div>
                </div>
              )}

              {operation === 'divide' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-300">
                    Sharing {numA} into groups of {numB}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: explorer.result ?? 0 }, (_, g) => (
                      <div key={g} className="p-2 rounded-xl border-2 border-emerald-400/40 bg-slate-950/60">
                        <DotRow count={numB} className="bg-emerald-400" />
                      </div>
                    ))}
                    {(explorer.remainder ?? 0) > 0 && (
                      <div className="p-2 rounded-xl border-2 border-amber-400/50 bg-slate-950/60">
                        <p className="text-[10px] font-black text-amber-300 mb-1">Left over</p>
                        <DotRow count={explorer.remainder ?? 0} className="bg-amber-400" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Practice Quiz */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-violet-400/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-violet-400" aria-hidden="true" />
              Practice Quiz
            </h2>
            <p className="text-sm text-slate-300 font-bold mt-1">
              A mix of addition, subtraction, multiplication and division questions.
            </p>
          </div>
          {!quiz && (
            <button
              type="button"
              onClick={startQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-300 hover:to-purple-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
            >
              Start Quiz
            </button>
          )}
        </div>

        {!quiz && (
          <div className="space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wide">Choose a difficulty</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a quiz difficulty">
              {(Object.keys(DIFFICULTY_INFO) as Difficulty[]).map((d) => {
                const info = DIFFICULTY_INFO[d];
                const isActive = difficulty === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    aria-pressed={isActive}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-black border-2 transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-400 to-purple-400 text-slate-950 border-white/30'
                        : 'bg-slate-950 border-indigo-500/30 text-slate-300 hover:border-white/40'
                    }`}
                  >
                    {info.label}
                    <span className={`block text-[10px] font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {info.range}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {quiz && !finished && current && (
          <div className="space-y-5">
            <div className="flex justify-between text-xs sm:text-sm font-black text-violet-300">
              <span>Question {index + 1} of {quiz.length} · {DIFFICULTY_INFO[difficulty].label}</span>
              <span className="text-amber-300">Score: {score}</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-violet-400/20">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300"
                style={{ width: `${((index + 1) / quiz.length) * 100}%` }}
              />
            </div>

            <p className="text-3xl sm:text-4xl font-black text-white text-center py-2">{current.prompt}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {current.options.map((opt) => {
                const isPicked = picked === opt;
                const isCorrect = opt === current.answer;
                let cls = 'bg-slate-950 border-violet-400/20 text-slate-200 hover:border-violet-400';
                if (picked !== null) {
                  if (isCorrect) cls = 'bg-emerald-950 border-emerald-400 text-emerald-200';
                  else if (isPicked) cls = 'bg-rose-950 border-rose-500 text-rose-200';
                  else cls = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60';
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(opt)}
                    className={`p-4 rounded-2xl border-2 text-2xl font-black transition-colors tabular-nums ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <button
                type="button"
                onClick={next}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-300 hover:to-purple-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
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
              {score >= Math.ceil(quiz.length * 0.7) ? '🌟 Fantastic maths skills!' : '🌱 Good try! Use the Operation Explorer above and play again.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={startQuiz}
                className="px-5 py-3 rounded-2xl bg-slate-950 border-2 border-violet-400/30 hover:bg-slate-800 text-white text-sm font-black flex items-center gap-2"
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
