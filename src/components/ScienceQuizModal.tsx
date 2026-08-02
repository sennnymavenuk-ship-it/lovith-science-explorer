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
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] shadow-2xl max-w-xl w-full p-6 sm:p-8 border-2 border-sky-200 animate-in zoom-in-95 duration-150 space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500 to-indigo-600 text-white rounded-2xl shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Student Science Explorer Quiz</h3>
              <p className="text-xs font-bold text-slate-500">Test your knowledge across all 5 topics</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {q.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === q.correctIndex;

                let btnStyle =
                  'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-300 hover:bg-slate-100/80';
                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-sky-50 border-sky-400 text-sky-900 font-bold ring-2 ring-sky-200';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isSubmitted && (
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-950 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold block text-sky-900">Explanation:</span>
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
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
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
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-slate-900">Quiz Completed!</h4>
              <p className="text-sm text-slate-600">
                You scored <strong className="text-sky-600">{score}</strong> out of{' '}
                <strong>{QUIZ_QUESTIONS.length}</strong> questions correctly!
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
              {score >= 4
                ? '🌟 Master Scientist! You have a great grasp on human biology, astronomy, living traits, plants, and environmental science.'
                : '🌱 Good Effort! Revisit the topic pages to review digestive steps, planetary orbits, plant parts, and eco tips!'}
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Quiz Again</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-sky-600 text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-sky-700"
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
