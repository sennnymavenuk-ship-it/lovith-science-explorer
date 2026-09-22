import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';
import { TopicId } from '../types';

interface ComingSoonPageProps {
  subject: string;
  emoji: string;
  tagline: string;
  gradient: string; // e.g. 'from-rose-500/20 via-pink-500/20 to-fuchsia-500/20'
  border: string; // e.g. 'border-rose-400/40'
  badgeBg: string; // e.g. 'bg-rose-950/80'
  badgeText: string; // e.g. 'text-rose-300'
  setActiveTopic: (topic: TopicId) => void;
}

// A simple placeholder for a subject that has no lessons yet.
// Once real content is ready, this page is swapped out for the real one.
export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  subject,
  emoji,
  tagline,
  gradient,
  border,
  badgeBg,
  badgeText,
  setActiveTopic,
}) => {
  return (
    <div className="space-y-10 pb-16">
      <section className={`bg-gradient-to-r ${gradient} p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 ${border} shadow-xl`}>
        <div className="max-w-4xl space-y-4">
          <button
            type="button"
            onClick={() => setActiveTopic('home')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeBg} ${badgeText} text-sm font-black border border-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {subject} {emoji}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">{tagline}</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto text-center bg-slate-900/90 rounded-[36px] border-2 border-indigo-500/30 shadow-xl p-10 sm:p-14 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-950 border-2 border-indigo-500/30 flex items-center justify-center text-cyan-300">
          <Construction className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Coming Soon!</h2>
        <p className="text-sm sm:text-base text-slate-300 font-bold leading-relaxed">
          We&apos;re building fun {subject} lessons and activities. Check back soon, or explore one of our other subjects in the meantime.
        </p>
        <button
          type="button"
          onClick={() => setActiveTopic('home')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 text-slate-950 font-black text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
        >
          Explore Other Subjects
        </button>
      </section>
    </div>
  );
};
