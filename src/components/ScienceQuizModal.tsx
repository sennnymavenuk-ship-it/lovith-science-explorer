import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/scienceData';
import { TopicId } from '../types';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, X, Award, Sparkles } from 'lucide-react';

interface ScienceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTopic: (topic: TopicId) => void;
}

export const ScienceQuizModal: React.FC<ScienceQuizModalProps> = ({
  isOpen,
  onClose,
  setActiveTopic,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswerIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsSubmitted(true);
    if (selectedAnswerIndex === q.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-[36px] shadow-2xl max-w-xl w-full p-7 sm:p-9 border-2 border-cyan-400/40 space-y-6 relative overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-gradient-to-tr from-cyan-400 to-indigo-500 text-slate-950 rounded-2xl shadow-md font-black">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Student Science Quiz 🧪</h3>
              <p className="text-xs font-bold text-cyan-300/80">Test your knowledge across all 5 topics!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-2xl transition-colors border border-indigo-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm font-black text-cyan-300">
                <span>
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-amber-300">Score: {score}</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-indigo-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-xl font-black text-white leading-snug">
              {q.question}
            </h4>

            {/* Options List */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === q.correctIndex;

                let btnStyle =
                  'bg-slate-950 border-indigo-500/30 text-slate-200 hover:border-cyan-400 hover:bg-slate-800';
                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-300 font-black shadow-md';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-300 font-black shadow-md';
                  } else {
                    btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-50';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-cyan-950 border-cyan-400 text-cyan-200 font-black ring-2 ring-cyan-400 shadow-md';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-center justify-between font-bold ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isSubmitted && (
              <div className="p-4.5 bg-cyan-950/80 border-2 border-cyan-400/40 rounded-2xl text-xs sm:text-sm text-cyan-100 space-y-1 animate-in fade-in duration-200 font-bold">
                <span className="font-black block text-cyan-300">Explanation:</span>
                <p className="leading-relaxed">{q.explanation}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={selectedAnswerIndex === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-50 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all"
                >
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                    ? 'Next Question →'
                    : 'See Results 🎉'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto border-2 border-amber-400/40 shadow-xl">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h4 className="text-3xl font-black text-white">Quiz Completed! 🎉</h4>
              <p className="text-base text-slate-300 font-bold">
                You scored <strong className="text-amber-300 text-xl">{score}</strong> out of{' '}
                <strong>{QUIZ_QUESTIONS.length}</strong> questions correctly!
              </p>
            </div>

            <div className="p-5 bg-emerald-950/80 rounded-3xl border-2 border-emerald-400/40 text-sm text-emerald-200 leading-relaxed font-bold">
              {score >= 4
                ? '🌟 Master Scientist! You have a great grasp on human biology, astronomy, living traits, plants, and environmental science.'
                : '🌱 Good Effort! Revisit the topic pages to review digestive steps, planetary orbits, plant parts, and eco tips!'}
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-3 bg-slate-950 border-2 border-indigo-500/30 hover:bg-slate-800 text-white text-xs sm:text-sm font-black rounded-2xl flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Quiz Again</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs sm:text-sm font-black rounded-2xl shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
