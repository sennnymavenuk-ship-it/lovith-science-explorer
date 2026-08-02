import React from 'react';
import { TopicId } from '../types';
import { Compass, Heart, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  setActiveTopic: (topic: TopicId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTopic }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t-2 border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Science Explorer</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-medium">
              Designed for curious students and young scientists. Exploring the human body,
              the solar system, life on Earth, botany, and environmental conservation through interactive diagrams and fun facts.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-300 bg-sky-950/80 border border-sky-800/80 px-3.5 py-2 rounded-2xl w-fit font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>"Science is magic that actually works!"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Featured Topics
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTopic('digestive')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Digestive System
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTopic('solar')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Solar System & Orbits
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTopic('living')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Living vs Non-Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTopic('plants')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Plants & Their Uses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTopic('pollution')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Pollution Types & Eco Tips
                </button>
              </li>
            </ul>
          </div>

          {/* Learning Values */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Student Corner
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Visual diagrams for clear step-by-step understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>Interactive discovery quizzes and self-checklists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Curiosity-driven facts that make learning fun!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Family Attribution Banner */}
        <div className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-emerald-500/15 rounded-2xl border border-amber-500/30 text-slate-200 shadow-inner flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md font-bold">
            <Heart className="w-6 h-6 text-rose-950 fill-rose-950" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Created with Love & Family Collaboration</span>
            </p>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
              This page is made from <strong className="text-amber-300 font-extrabold">Lovith Balaguhan's</strong> creative thoughts and topic selection by his brother <strong className="text-sky-300 font-extrabold">Hari Athilan</strong>, and the web designed & prepared by his father & mother <strong className="text-emerald-300 font-extrabold">Senthil Kumar & Sudha</strong>.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Science Explorer. Educational Resource for Students.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Crafted by the <strong className="text-amber-300">Senthil Kumar Family</strong> for young scientists</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
