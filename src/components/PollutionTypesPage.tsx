import React, { useState } from 'react';
import { POLLUTION_CATEGORIES } from '../data/scienceData';
import { PollutionCategory } from '../types';
import {
  ShieldAlert,
  CloudRain,
  Droplets,
  Trash2,
  Volume2,
  Sun,
  CheckSquare,
  Square,
  Award,
  AlertTriangle,
  Flame,
  Leaf,
  Sparkles,
  Info,
} from 'lucide-react';

interface PollutionTypesPageProps {
  checkedTipIds: Record<string, boolean>;
  toggleTipCheck: (tipId: string) => void;
  completedTipsCount: number;
}

const POLLUTION_PHOTOS: Record<string, { url: string; alt: string }> = {
  air: {
    url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
    alt: 'Clean blue sky with green renewable wind turbine energy',
  },
  water: {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    alt: 'Pristine clean blue ocean water',
  },
  land: {
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    alt: 'Green seedling sprout growing in rich fertile soil',
  },
  noise: {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    alt: 'Quiet peaceful sunlit green forest',
  },
  light: {
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800',
    alt: 'Dark starry night sky free of light pollution',
  },
};

export const PollutionTypesPage: React.FC<PollutionTypesPageProps> = ({
  checkedTipIds,
  toggleTipCheck,
  completedTipsCount,
}) => {
  const getPollutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className="w-6 h-6 text-sky-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-blue-600" />;
      case 'Trash2':
        return <Trash2 className="w-6 h-6 text-amber-700" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6 text-purple-600" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-yellow-600" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-cyan-600" />;
    }
  };

  const totalTips = POLLUTION_CATEGORIES.reduce((acc, cat) => acc + cat.tips.length, 0);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-500/20 via-sky-500/20 to-emerald-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-cyan-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-teal-950/80 text-cyan-300 rounded-full text-sm font-black border border-cyan-400/40 shadow-md">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>Environmental Science & Conservation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Pollution Types & Eco Solutions 🌍
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Pollution occurs when harmful substances or contaminants enter our natural environment. Learn about Air, Water, Land, Noise, and Light pollution, understand their root causes and environmental impact, and track your daily actions to help protect Earth!
          </p>
        </div>
      </section>

      {/* Interactive Eco-Action Tracker Counter */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-8 sm:p-10 rounded-[36px] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-cyan-400/40">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-black text-sm">
            <Award className="w-6 h-6 text-amber-300 animate-bounce" />
            <span>Student Environmental Action Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Your Personal Eco Impact Score</h2>
          <p className="text-sm text-cyan-100 max-w-md font-bold">
            Check off the practical tips you practice in your daily life to earn points and help reduce environmental pollution!
          </p>
        </div>

        <div className="flex items-center gap-5 bg-slate-950/80 px-7 py-5 rounded-3xl border-2 border-cyan-400/40 shrink-0 shadow-xl">
          <div className="text-center">
            <span className="text-4xl font-black text-amber-300">{completedTipsCount}</span>
            <span className="text-xs text-cyan-300 font-black block">/ {totalTips} Completed</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white">
            🏆
          </div>
        </div>
      </section>

      {/* Grid of 5 Pollution Types Cards */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-cyan-400" />
            Detailed Breakdown of Pollution Categories
          </h2>
          <span className="text-xs sm:text-sm text-cyan-300/80 font-bold hidden sm:inline">Causes, Effects & Action Checklists</span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {POLLUTION_CATEGORIES.map((pollution) => {
            const photo = POLLUTION_PHOTOS[pollution.id];
            return (
              <div
                key={pollution.id}
                className="bg-slate-900/90 rounded-[36px] overflow-hidden border-2 border-cyan-400/30 shadow-xl space-y-6 text-white"
              >
                {/* Photo Header */}
                <div className="relative h-44 sm:h-52 overflow-hidden border-b border-indigo-500/30">
                  {photo && (
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-cyan-400/40 shadow-md">
                      <div className="p-1.5 rounded-xl bg-slate-900 font-black">
                        {getPollutionIcon(pollution.iconName)}
                      </div>
                      <span className="text-lg font-black text-white">{pollution.name}</span>
                    </div>

                    <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-black text-amber-300 border border-amber-400/40 shadow-md">
                      {pollution.tips.length} Action Tips
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-9 space-y-6 pt-0">
                  {/* Causes vs Effects Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                {/* Causes Box */}
                <div className="p-5 bg-rose-950/70 rounded-3xl border-2 border-rose-500/40 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-rose-300 font-black text-base">
                    <Flame className="w-5 h-5 text-rose-400" />
                    <span>Primary Causes:</span>
                  </div>
                  <ul className="space-y-2 text-rose-100 font-bold">
                    {pollution.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-black">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Effects Box */}
                <div className="p-5 bg-amber-950/70 rounded-3xl border-2 border-amber-500/40 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Environmental & Health Effects:</span>
                  </div>
                  <ul className="space-y-2 text-amber-100 font-bold">
                    {pollution.effects.map((effect, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-black">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ways to Avoid/Reduce Checklist */}
              <div className="p-6 sm:p-7 bg-emerald-950/70 rounded-[32px] border-2 border-emerald-400/40 space-y-4 shadow-lg">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 text-emerald-300 font-black text-base">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    <span>Ways to Avoid / Reduce {pollution.name} (Checklist)</span>
                  </div>
                  <span className="text-xs text-emerald-300 font-black bg-slate-950 px-3 py-1 rounded-xl border border-emerald-400/40">
                    Click box to track action
                  </span>
                </div>

                <div className="space-y-3">
                  {pollution.tips.map((tip) => {
                    const isChecked = !!checkedTipIds[tip.id];
                    return (
                      <div
                        key={tip.id}
                        onClick={() => toggleTipCheck(tip.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-emerald-900/90 border-emerald-400 text-white font-bold shadow-md scale-101'
                            : 'bg-slate-950 border-indigo-500/30 text-slate-200 hover:border-emerald-400/60'
                        }`}
                      >
                        <button className="pt-0.5 shrink-0 text-emerald-400">
                          {isChecked ? (
                            <CheckSquare className="w-6 h-6 text-emerald-400 font-black" />
                          ) : (
                            <Square className="w-6 h-6 text-slate-500" />
                          )}
                        </button>

                        <div className="flex-1 space-y-1">
                          <p className="text-sm leading-snug font-black text-white">{tip.text}</p>
                          <p className="text-xs text-cyan-300 font-bold">
                            💡 <em>Impact:</em> {tip.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
        </div>
      </section>
    </div>
  );
};
