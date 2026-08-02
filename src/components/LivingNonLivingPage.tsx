import React, { useState } from 'react';
import {
  LIVING_CHARACTERISTICS,
  COMPARISON_ITEMS,
} from '../data/scienceData';
import {
  Sparkles,
  TrendingUp,
  Wind,
  HeartHandshake,
  Footprints,
  Zap,
  CheckCircle2,
  XCircle,
  Flower2,
  Dog,
  UserCheck,
  Sprout,
  Fish,
  Mountain,
  Waves,
  Armchair,
  Car,
  Smartphone,
  HelpCircle,
  RotateCcw,
  Award,
} from 'lucide-react';

export const LivingNonLivingPage: React.FC = () => {
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flower2':
        return <Flower2 className="w-6 h-6 text-emerald-600" />;
      case 'Dog':
        return <Dog className="w-6 h-6 text-amber-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-sky-600" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-green-600" />;
      case 'Fish':
        return <Fish className="w-6 h-6 text-teal-600" />;
      case 'Mountain':
        return <Mountain className="w-6 h-6 text-slate-600" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-blue-600" />;
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-orange-600" />;
      case 'Car':
        return <Car className="w-6 h-6 text-rose-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-600" />;
    }
  };

  const getCharacteristicIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-sky-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Footprints':
        return <Footprints className="w-5 h-5 text-amber-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-purple-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  const toggleReveal = (id: string) => {
    if (!revealedItems[id]) {
      setRevealedItems((prev) => ({ ...prev, [id]: true }));
      setScore((prev) => prev + 1);
    }
  };

  const resetInteractive = () => {
    setRevealedItems({});
    setScore(0);
  };

  const livingItems = COMPARISON_ITEMS.filter((i) => i.category === 'living');
  const nonLivingItems = COMPARISON_ITEMS.filter((i) => i.category === 'non-living');

  return (
    <div className="space-y-10 pb-16">
      {/* Page Title Banner */}
      <section className="bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-green-500/15 p-6 sm:p-8 lg:p-10 rounded-[32px] border-2 border-emerald-200/90 shadow-xs">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Biology Fundamentals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Living Things vs. Non-Living Things
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Look around you: everything in our environment can be classified into living organisms (plants, animals, humans) or non-living matter (rocks, water, machines). Discover what makes living things unique!
          </p>
        </div>
      </section>

      {/* 5 Characteristics of Living Things Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            5 Key Characteristics of Living Things
          </h2>
          <span className="text-xs font-bold text-slate-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            All living organisms share these 5 traits
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LIVING_CHARACTERISTICS.map((trait) => (
            <div
              key={trait.id}
              className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold">
                  {getCharacteristicIcon(trait.iconName)}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{trait.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{trait.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-emerald-900 font-bold italic bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
                <strong>Example:</strong> {trait.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pictorial Side-by-Side Comparison Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Living Things */}
        <div className="bg-emerald-50/70 rounded-[32px] p-6 sm:p-7 border-2 border-emerald-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-200 pb-4">
            <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-xs font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Living Things</h3>
              <p className="text-xs text-emerald-900 font-bold">
                Organisms made of cells that carry out life processes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {livingItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4.5 rounded-2xl border-2 border-emerald-100 shadow-xs space-y-2 hover:shadow-md transition-all hover:border-emerald-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl font-bold">
                    {getItemIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Living Organism
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Non-Living Things */}
        <div className="bg-slate-100/90 rounded-[32px] p-6 sm:p-7 border-2 border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="p-2.5 bg-slate-800 text-white rounded-2xl shadow-xs font-bold">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Non-Living Things</h3>
              <p className="text-xs text-slate-700 font-bold">
                Inanimate objects that lack cellular respiration & biological growth
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nonLivingItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4.5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-2 hover:shadow-md transition-all hover:border-slate-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-100 rounded-xl font-bold">
                    {getItemIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      Inanimate Matter
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Interactive Discovery Widget: Click to Reveal Classification */}
      <section className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              Interactive Classification Discovery Game
            </h2>
            <p className="text-xs text-slate-500">
              Test your intuition! Click any item card below to test whether it is Living or Non-Living and reveal the scientific reason.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {score > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{score} / 10 Discovered</span>
              </div>
            )}
            <button
              onClick={resetInteractive}
              className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors text-xs flex items-center gap-1 border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {COMPARISON_ITEMS.map((item) => {
            const isRevealed = !!revealedItems[item.id];
            const isLiving = item.category === 'living';

            return (
              <div
                key={item.id}
                onClick={() => toggleReveal(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center justify-between space-y-3 ${
                  isRevealed
                    ? isLiving
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200'
                      : 'bg-slate-100 border-slate-300 ring-2 ring-slate-200'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="p-3 bg-white rounded-2xl shadow-2xs border border-slate-100">
                  {getItemIcon(item.iconName)}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                  {!isRevealed ? (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                      Click to Reveal
                    </span>
                  ) : (
                    <span
                      className={`inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isLiving
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-slate-300 text-slate-900'
                      }`}
                    >
                      {isLiving ? '✓ LIVING' : '✗ NON-LIVING'}
                    </span>
                  )}
                </div>

                {isRevealed && (
                  <p className="text-[11px] text-slate-700 leading-tight pt-1 border-t border-slate-200/60 font-medium">
                    {item.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
