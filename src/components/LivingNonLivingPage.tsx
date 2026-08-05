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

const ITEM_PHOTOS: Record<string, { url: string; alt: string }> = {
  sunflower: {
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600',
    alt: 'Bright yellow sunflower blooming in sunlight',
  },
  puppy: {
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
    alt: 'Cute golden retriever puppy',
  },
  human: {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    alt: 'Young student discovering science',
  },
  mushroom: {
    url: 'https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&q=80&w=600',
    alt: 'Wild forest mushroom fungus',
  },
  fish: {
    url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    alt: 'Vibrant swimming goldfish',
  },
  rock: {
    url: 'https://images.unsplash.com/photo-1525857597365-5f6dbaf2e36e?auto=format&fit=crop&q=80&w=600',
    alt: 'Smooth granite river rocks',
  },
  water: {
    url: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&q=80&w=600',
    alt: 'Clean flowing river water stream',
  },
  chair: {
    url: 'https://images.unsplash.com/photo-1580481072645-022f9a6d85d4?auto=format&fit=crop&q=80&w=600',
    alt: 'Crafted wooden furniture chair',
  },
  car: {
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600',
    alt: 'Modern electric car',
  },
  phone: {
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    alt: 'Touchscreen smartphone device',
  },
};

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
    <div className="space-y-12 pb-16">
      {/* Page Title Banner */}
      <section className="bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-emerald-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-950/80 text-emerald-300 rounded-full text-sm font-black border border-emerald-400/40 shadow-md">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Biology Fundamentals</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Living vs. Non-Living Things 🐶🌱
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Look around you: everything in our environment can be classified into living organisms (plants, animals, humans) or non-living matter (rocks, water, machines). Discover what makes living things unique!
          </p>
        </div>
      </section>

      {/* 5 Characteristics of Living Things Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-emerald-400" />
            5 Key Characteristics of Living Things
          </h2>
          <span className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-400/40">
            All living organisms share these 5 traits
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {LIVING_CHARACTERISTICS.map((trait) => (
            <div
              key={trait.id}
              className="bg-slate-900/90 rounded-3xl p-6 border-2 border-emerald-400/30 shadow-xl hover:border-emerald-400 hover:scale-105 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-400/40 flex items-center justify-center font-black shadow-md">
                  {getCharacteristicIcon(trait.iconName)}
                </div>
                <h3 className="text-base font-black text-white">{trait.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-bold">{trait.description}</p>
              </div>

              <div className="pt-3 border-t border-indigo-500/30 text-xs text-emerald-300 font-extrabold bg-emerald-950/80 p-3 rounded-2xl border border-emerald-400/30">
                <strong>Example:</strong> {trait.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pictorial Side-by-Side Comparison Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Living Things */}
        <div className="bg-emerald-950/60 rounded-[36px] p-7 sm:p-8 border-2 border-emerald-400/40 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-emerald-400/30 pb-4">
            <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl shadow-md font-black">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Living Things</h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-bold">
                Organisms made of cells that carry out life processes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {livingItems.map((item) => {
              const photo = ITEM_PHOTOS[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 rounded-2xl border-2 border-emerald-400/30 overflow-hidden shadow-md flex flex-col justify-between hover:border-emerald-400 transition-all"
                >
                  <div className="relative h-28 overflow-hidden">
                    {photo && (
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-black text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                      Living Organism
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      {getItemIcon(item.iconName)}
                      <span>{item.name}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-bold">
                      {item.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Non-Living Things */}
        <div className="bg-slate-900/90 rounded-[36px] p-7 sm:p-8 border-2 border-indigo-500/30 shadow-xl space-y-6">
          <div className="flex items-center gap-3.5 border-b border-indigo-500/30 pb-4">
            <div className="p-3 bg-slate-700 text-white rounded-2xl shadow-md font-black">
              <XCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Non-Living Things</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-bold">
                Inanimate objects that lack cellular respiration & biological growth
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nonLivingItems.map((item) => {
              const photo = ITEM_PHOTOS[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-slate-950 rounded-2xl border-2 border-slate-700 overflow-hidden shadow-md flex flex-col justify-between hover:border-slate-500 transition-all"
                >
                  <div className="relative h-28 overflow-hidden">
                    {photo && (
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-85"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-black text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-600">
                      Inanimate Matter
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      {getItemIcon(item.iconName)}
                      <span>{item.name}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-bold">
                      {item.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Short Interactive Discovery Widget: Click to Reveal Classification */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-emerald-400/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-500/30 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-emerald-400" />
              Interactive Classification Discovery Game 🎮
            </h2>
            <p className="text-sm text-cyan-300/80 font-bold mt-1">
              Test your intuition! Click any item card below to test whether it is Living or Non-Living and reveal the scientific reason.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {score > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-400/40 rounded-full text-xs font-black shadow-md">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{score} / 10 Discovered</span>
              </div>
            )}
            <button
              onClick={resetInteractive}
              className="px-3.5 py-2 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors text-xs font-black flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
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
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center justify-between space-y-3 ${
                  isRevealed
                    ? isLiving
                      ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-lg scale-105'
                      : 'bg-slate-950 border-slate-600 ring-2 ring-slate-500 shadow-lg scale-105'
                    : 'bg-slate-950 hover:bg-slate-800 border-indigo-500/30 hover:border-emerald-400'
                }`}
              >
                <div className="p-3 bg-slate-900 rounded-2xl shadow-inner border border-slate-700">
                  {getItemIcon(item.iconName)}
                </div>

                <div>
                  <h4 className="text-sm font-black text-white">{item.name}</h4>
                  {!isRevealed ? (
                    <span className="inline-block mt-2 text-[10px] font-black text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-400/40">
                      Click to Reveal
                    </span>
                  ) : (
                    <span
                      className={`inline-block mt-2 text-[10px] font-black px-3 py-1 rounded-full ${
                        isLiving
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {isLiving ? '✓ LIVING' : '✗ NON-LIVING'}
                    </span>
                  )}
                </div>

                {isRevealed && (
                  <p className="text-xs text-slate-200 leading-tight pt-2 border-t border-indigo-500/30 font-bold">
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
