import React, { useState } from 'react';
import { PLANETS } from '../data/scienceData';
import { Planet } from '../types';
import {
  Sun,
  Globe,
  Compass,
  Sparkles,
  Layers,
  Thermometer,
  RotateCw,
  Info,
} from 'lucide-react';

export const SolarSystemPage: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[2]); // Default to Earth
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-blue-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-950/80 text-cyan-300 rounded-full text-sm font-black border border-cyan-400/40 shadow-md">
            <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span>Astronomy & Space Science</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            The Solar System & Planets 🚀
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Our solar system consists of our central star—the Sun—and eight major planets bound by gravity in elliptical orbits. Explore each planet's size, moons, distances, and unique cosmic traits!
          </p>
        </div>
      </section>

      {/* Visual Ordering Layout showing Sun + All Planets with relative size cues */}
      <section className="relative overflow-hidden bg-slate-950 rounded-[36px] p-7 sm:p-9 text-white shadow-2xl space-y-6 border-2 border-cyan-400/30">
        {/* Background Unsplash Space Banner Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
            alt="Deep space galaxy background with stars and nebula"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
            <div>
              <h2 className="text-2xl font-black flex items-center gap-3 text-white">
                <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
                Planetary Order & Relative Size Comparison
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300/80 font-bold">
                Ordered by distance from the Sun. Node sizes indicate relative planetary dimensions.
              </p>
            </div>

            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="px-4 py-2.5 bg-blue-950/80 hover:bg-blue-900 text-xs sm:text-sm font-black rounded-2xl text-cyan-300 transition-all flex items-center gap-2 border border-cyan-400/40 shadow-md backdrop-blur-md"
            >
              <RotateCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>{isAnimating ? 'Pause Orbit Animation' : 'Animate Orbits'}</span>
            </button>
          </div>

          {/* Horizontal Planetary Array */}
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="flex items-center gap-4 min-w-[760px] justify-between px-2">
              {/* The Sun */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 shadow-xl shadow-amber-500/50 flex items-center justify-center font-black text-slate-950 text-xs tracking-wider animate-pulse border-2 border-white">
                  SUN
                </div>
                <span className="text-xs font-black text-amber-300">Star</span>
              </div>

              {/* 8 Planets in Order */}
              {PLANETS.map((planet) => {
                const isSelected = selectedPlanet.id === planet.id;
                // Visual size calculation
                const sizePx = Math.max(24, Math.min(68, planet.relativeSize * 7));

                return (
                  <div
                    key={planet.id}
                    onClick={() => setSelectedPlanet(planet)}
                    className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
                  >
                    <div
                      style={{
                        width: `${sizePx}px`,
                        height: `${sizePx}px`,
                        backgroundColor: planet.glowColor,
                        boxShadow: isSelected ? `0 0 24px ${planet.glowColor}` : 'none',
                      }}
                      className={`rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
                        isSelected
                          ? 'border-white scale-125 ring-4 ring-cyan-400/60'
                          : 'border-slate-700 group-hover:scale-110'
                      }`}
                    >
                      <span className="text-[10px] font-black text-slate-950 opacity-90">
                        {planet.name.substring(0, 2)}
                      </span>
                    </div>

                    <div className="text-center">
                      <p
                        className={`text-xs sm:text-sm font-black transition-colors ${
                          isSelected ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {planet.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        {planet.type.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Solar System Orbit Interactive Canvas + Selected Planet Fact Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Circular Orbit Diagram around the Sun */}
        <div className="lg:col-span-7 bg-slate-950 rounded-[36px] p-7 sm:p-8 border-2 border-cyan-400/30 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3">
            <h3 className="text-lg font-black text-white flex items-center gap-2.5">
              <Globe className="w-6 h-6 text-cyan-400" />
              Circular Orbit Diagram around the Sun
            </h3>
            <span className="text-xs text-cyan-300/80 font-black">Click ring to select</span>
          </div>

          {/* Concentric Orbit Visual Diagram */}
          <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center p-4">
            {/* Central Sun */}
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-2xl shadow-amber-500/80 z-20 flex items-center justify-center font-black text-xs text-slate-950 border-2 border-white">
              SUN
            </div>

            {/* 8 Concentric Orbit Rings */}
            {PLANETS.map((planet, idx) => {
              const orbitRadiusPercent = 20 + idx * 9.5; // concentric radius spacing
              const isSelected = selectedPlanet.id === planet.id;

              return (
                <div
                  key={planet.id}
                  onClick={() => setSelectedPlanet(planet)}
                  style={{
                    width: `${orbitRadiusPercent * 2}%`,
                    height: `${orbitRadiusPercent * 2}%`,
                  }}
                  className={`absolute rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'border-cyan-300 border-dashed border-2 shadow-lg shadow-cyan-500/30'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {/* Orbiting Planet Dot */}
                  <div
                    style={{
                      backgroundColor: planet.glowColor,
                      animationDuration: isAnimating ? `${(idx + 1) * 8}s` : '0s',
                    }}
                    className={`absolute -top-2.5 w-5 h-5 rounded-full border-2 border-white shadow-md ${
                      isAnimating ? 'animate-spin origin-bottom' : ''
                    }`}
                    title={`${planet.name} (${planet.type})`}
                  />
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-slate-300 font-bold italic">
            Orbital radii shown proportionally for clarity. Terrestrial planets are closer to the Sun; Gas/Ice giants sit in outer orbits.
          </div>
        </div>

        {/* Right Column (5 cols): Selected Planet Detailed Fact Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 rounded-[36px] p-7 sm:p-8 border-2 border-cyan-400/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span
                style={{ backgroundColor: selectedPlanet.glowColor }}
                className="px-4 py-1.5 rounded-full text-xs font-black text-slate-950 shadow-md"
              >
                {selectedPlanet.type}
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-300">
                Orbit: {selectedPlanet.orbitPeriod}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-2.5">
              {selectedPlanet.name}
            </h3>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-1">
                <span className="text-slate-400 font-bold block text-[11px]">Distance from Sun</span>
                <span className="font-black text-white block text-xs sm:text-sm">
                  {selectedPlanet.distanceFromSun}
                </span>
              </div>

              <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-1">
                <span className="text-slate-400 font-bold block text-[11px]">Known Moons</span>
                <span className="font-black text-cyan-300 block text-sm sm:text-base">
                  {selectedPlanet.satellites} {selectedPlanet.satellites === 1 ? 'Moon' : 'Moons'}
                </span>
              </div>

              <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-1">
                <span className="text-slate-400 font-bold block text-[11px]">Temperature</span>
                <span className="font-black text-white block text-xs sm:text-sm">
                  {selectedPlanet.temperature}
                </span>
              </div>

              <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-1">
                <span className="text-slate-400 font-bold block text-[11px]">Relative Size</span>
                <span className="font-black text-white block text-xs sm:text-sm">
                  Scale {selectedPlanet.relativeSize} / 10
                </span>
              </div>
            </div>

            {/* Fact Box */}
            <div className="p-5 bg-blue-950/80 rounded-2xl border-2 border-cyan-400/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
                <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                <span>Interesting Planet Fact</span>
              </div>
              <p className="text-sm text-cyan-100 font-bold leading-relaxed">
                {selectedPlanet.funFact}
              </p>
            </div>
          </div>

          {/* General Info Box: What is the Solar System & How Orbits Work */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-[36px] p-8 shadow-2xl space-y-4 border-2 border-blue-400/40">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-cyan-300" />
              <h3 className="text-xl font-black">How Do Planetary Orbits Work?</h3>
            </div>
            <p className="text-sm text-cyan-100 font-bold leading-relaxed drop-shadow-xs">
              <strong>Gravity</strong> is the invisible pulling force created by mass. Because the Sun contains 99.8% of all mass in our solar system, its massive gravitational pull holds all planets in orbit. Planets don't fall into the Sun because their continuous forward motion (velocity) balances gravity in a steady curved path called an <em>orbit</em>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
