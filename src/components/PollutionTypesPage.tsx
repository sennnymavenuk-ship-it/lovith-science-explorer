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
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-500/15 via-sky-500/15 to-emerald-500/15 p-6 sm:p-8 lg:p-10 rounded-[32px] border-2 border-teal-200/90 shadow-xs">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-200">
            <ShieldAlert className="w-4 h-4 text-teal-600" />
            <span>Environmental Science & Conservation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            5 Major Pollution Types & Practical Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Pollution occurs when harmful substances or contaminants enter our natural environment. Learn about Air, Water, Land, Noise, and Light pollution, understand their root causes and environmental impact, and track your daily actions to help protect Earth!
          </p>
        </div>
      </section>

      {/* Interactive Eco-Action Tracker Counter */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-6 sm:p-8 rounded-[32px] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-white/20">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-extrabold text-xs">
            <Award className="w-5 h-5 text-amber-300" />
            <span>Student Environmental Action Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Your Personal Eco Impact Score</h2>
          <p className="text-xs text-emerald-100 max-w-md font-medium">
            Check off the practical tips you practice in your daily life to earn points and help reduce environmental pollution!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md px-6 py-4.5 rounded-2xl border-2 border-white/30 shrink-0 shadow-md">
          <div className="text-center">
            <span className="text-3xl font-black text-amber-300">{completedTipsCount}</span>
            <span className="text-xs text-emerald-100 font-bold block">/ {totalTips} Completed</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md border border-amber-300">
            🏆
          </div>
        </div>
      </section>

      {/* Grid of 5 Pollution Types Cards */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-600" />
            Detailed Breakdown of Pollution Categories
          </h2>
          <span className="text-xs text-slate-500">Causes, Effects & Action Checklists</span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {POLLUTION_CATEGORIES.map((pollution) => (
            <div
              key={pollution.id}
              className={`bg-white rounded-[32px] p-6 sm:p-8 border-2 shadow-xs space-y-6 ${pollution.color}`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3.5 rounded-2xl ${pollution.bgColor} shadow-2xs font-bold`}>
                    {getPollutionIcon(pollution.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{pollution.name}</h3>
                    <p className="text-xs text-slate-600 font-bold">
                      Environmental Contamination Category
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 bg-slate-100/90 rounded-full text-xs font-extrabold text-slate-700 border border-slate-200">
                  {pollution.tips.length} Practical Action Tips
                </div>
              </div>

              {/* Causes vs Effects Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Causes Box */}
                <div className="p-4.5 bg-rose-50/80 rounded-2xl border-2 border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-black text-sm">
                    <Flame className="w-4.5 h-4.5 text-rose-600" />
                    <span>Primary Causes:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-800 font-semibold">
                    {pollution.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-black">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Effects Box */}
                <div className="p-4.5 bg-amber-50/80 rounded-2xl border-2 border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                    <span>Environmental & Health Effects:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-800 font-semibold">
                    {pollution.effects.map((effect, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-black">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ways to Avoid/Reduce Checklist */}
              <div className="p-5 sm:p-6 bg-emerald-50/80 rounded-[28px] border-2 border-emerald-300 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                    <Leaf className="w-4.5 h-4.5 text-emerald-600" />
                    <span>Ways to Avoid / Reduce {pollution.name} (Checklist)</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                    Click box to track action
                  </span>
                </div>

                <div className="space-y-2.5">
                  {pollution.tips.map((tip) => {
                    const isChecked = !!checkedTipIds[tip.id];
                    return (
                      <div
                        key={tip.id}
                        onClick={() => toggleTipCheck(tip.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-emerald-100/90 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400'
                        }`}
                      >
                        <button className="pt-0.5 shrink-0 text-emerald-600">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600 font-bold" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </button>

                        <div className="flex-1 space-y-0.5">
                          <p className="text-xs leading-snug font-bold">{tip.text}</p>
                          <p className="text-[11px] text-emerald-800 font-semibold">
                            💡 <em>Impact:</em> {tip.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
