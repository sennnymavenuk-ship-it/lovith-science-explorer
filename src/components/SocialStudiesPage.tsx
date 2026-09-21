import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { CONTINENTS } from '../data/socialStudiesData';
import { IndiaMap } from './IndiaMap';

export const SocialStudiesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState('asia');

  const selected = CONTINENTS.find((c) => c.id === selectedId)!;
  const biggest = Math.max(...CONTINENTS.map((c) => c.areaValue));

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-rose-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-orange-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-orange-950/80 text-orange-300 rounded-full text-sm font-black border border-orange-400/40 shadow-md">
            <Globe className="w-5 h-5 text-orange-400" />
            <span>Social Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our World & Communities 🌍
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Discover the continents, meet the helpers in our community, and learn how people live and work together.
          </p>
        </div>
      </section>

      {/* Continent Explorer */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-orange-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Continent Explorer 🗺️</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            Tap a continent. The bars show how big each one is compared with the others.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: size bars that double as buttons */}
          <div className="lg:col-span-5 space-y-2">
            {CONTINENTS.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                    isSelected
                      ? 'bg-orange-950/60 border-orange-400'
                      : 'bg-slate-950 border-indigo-500/30 hover:border-orange-400/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-sm font-black text-white mb-2">
                    <span>
                      {c.emoji} {c.name}
                    </span>
                    <span className="text-slate-400 font-bold">{c.areaValue} million km²</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.barColor}`}
                      style={{ width: `${(c.areaValue / biggest) * 100}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: details for the chosen continent */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl border-2 border-indigo-500/30 p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selected.emoji}</div>
              <div>
                <h3 className={`text-2xl sm:text-3xl font-black ${selected.textColor}`}>{selected.name}</h3>
                <p className="text-sm text-slate-300 font-bold">
                  Number {selected.sizeRank} biggest of the 7 continents
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div>
                <dt className="text-slate-400 font-bold">People living here</dt>
                <dd className="text-white font-black">{selected.people}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-bold">Countries</dt>
                <dd className="text-white font-black">{selected.countries}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-bold">Famous place</dt>
                <dd className="text-white font-black">{selected.famousPlace}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-bold">Animals to spot</dt>
                <dd className="text-white font-black">{selected.animals}</dd>
              </div>
            </dl>

            <div className="p-4 bg-orange-950/60 border-2 border-orange-400/40 rounded-2xl text-sm sm:text-base text-orange-100 font-bold leading-relaxed">
              <span className="font-black text-orange-300">Did you know? </span>
              {selected.funFact}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-bold">
          Numbers are rounded. Country counts can differ a little depending on the source.
        </p>
      </section>
        {/* India Map */}
      <IndiaMap />

    </div>
  );
};