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
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 p-6 sm:p-8 lg:p-10 rounded-[32px] border-2 border-blue-200/90 shadow-xs">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 text-blue-900 rounded-full text-xs font-bold border border-blue-200">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Astronomy & Space Science</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Solar System & Planetary Orbits
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Our solar system consists of our central star—the Sun—and eight major planets bound by gravity in elliptical orbits. Explore each planet's size, moons, distances, and unique cosmic traits!
          </p>
        </div>
      </section>

      {/* Visual Ordering Layout showing Sun + All Planets with relative size cues */}
      <section className="bg-slate-950 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl space-y-6 border-2 border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              Planetary Order & Relative Size Comparison
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Ordered by distance from the Sun. Node sizes indicate relative planetary dimensions.
            </p>
          </div>

          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 transition-colors flex items-center gap-2 border border-slate-700 shadow-xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>{isAnimating ? 'Pause Orbit Animation' : 'Animate Orbits'}</span>
          </button>
        </div>

        {/* Horizontal Planetary Array */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center gap-4 min-w-[760px] justify-between px-2">
            {/* The Sun */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 shadow-lg shadow-amber-500/50 flex items-center justify-center font-black text-slate-950 text-xs tracking-wider animate-pulse">
                SUN
              </div>
              <span className="text-xs font-bold text-amber-400">Star</span>
            </div>

            {/* 8 Planets in Order */}
            {PLANETS.map((planet) => {
              const isSelected = selectedPlanet.id === planet.id;
              // Visual size calculation
              const sizePx = Math.max(20, Math.min(64, planet.relativeSize * 6.5));

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
                      boxShadow: isSelected ? `0 0 20px ${planet.glowColor}` : 'none',
                    }}
                    className={`rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
                      isSelected
                        ? 'border-white scale-110 ring-4 ring-blue-500/40'
                        : 'border-slate-700 group-hover:scale-105'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-950 opacity-80">
                      {planet.name.substring(0, 2)}
                    </span>
                  </div>

                  <div className="text-center">
                    <p
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? 'text-blue-400' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {planet.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {planet.type.split(' ')[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solar System Orbit Interactive Canvas + Selected Planet Fact Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Circular Orbit Diagram around the Sun */}
        <div className="lg:col-span-7 bg-slate-950 rounded-[32px] p-6 sm:p-7 border-2 border-slate-800 shadow-xl text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Circular Orbit Diagram around the Sun
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Click a planet ring to select</span>
          </div>

          {/* Concentric Orbit Visual Diagram */}
          <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center p-4">
            {/* Central Sun */}
            <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-xl shadow-amber-500/60 z-20 flex items-center justify-center font-bold text-[10px] text-slate-950">
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
                      ? 'border-blue-400 border-dashed border-2 shadow-xs'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {/* Orbiting Planet Dot */}
                  <div
                    style={{
                      backgroundColor: planet.glowColor,
                      animationDuration: isAnimating ? `${(idx + 1) * 8}s` : '0s',
                    }}
                    className={`absolute -top-2 w-4 h-4 rounded-full border border-white shadow-xs ${
                      isAnimating ? 'animate-spin origin-bottom' : ''
                    }`}
                    title={`${planet.name} (${planet.type})`}
                  />
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-slate-400 italic">
            Orbital radii shown proportionally for clarity. Terrestrial planets are closer to the Sun; Gas/Ice giants sit in outer orbits.
          </div>
        </div>

        {/* Right Column (5 cols): Selected Planet Detailed Fact Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span
                style={{ backgroundColor: selectedPlanet.glowColor }}
                className="px-3.5 py-1 rounded-full text-xs font-black text-slate-950 shadow-2xs"
              >
                {selectedPlanet.type}
              </span>
              <span className="text-xs font-bold text-slate-600">
                Orbit Period: {selectedPlanet.orbitPeriod}
              </span>
            </div>

            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-2">
              {selectedPlanet.name}
            </h3>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">Distance from Sun</span>
                <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                  {selectedPlanet.distanceFromSun}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">Known Moons</span>
                <span className="font-black text-blue-700 block text-sm sm:text-base">
                  {selectedPlanet.satellites} {selectedPlanet.satellites === 1 ? 'Moon' : 'Moons'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">Temperature</span>
                <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                  {selectedPlanet.temperature}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">Relative Size</span>
                <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                  Scale {selectedPlanet.relativeSize} / 10
                </span>
              </div>
            </div>

            {/* Fact Box */}
            <div className="p-4.5 bg-blue-50/90 rounded-2xl border-2 border-blue-200 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-900 font-black text-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Interesting Planet Fact</span>
              </div>
              <p className="text-xs text-blue-950 font-bold leading-relaxed">
                {selectedPlanet.funFact}
              </p>
            </div>
          </div>

          {/* General Info Box: What is the Solar System & How Orbits Work */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-[32px] p-6.5 shadow-xl space-y-3 border-2 border-blue-800">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-300" />
              <h3 className="text-base font-black">How Do Planetary Orbits Work?</h3>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed drop-shadow-xs">
              <strong>Gravity</strong> is the invisible pulling force created by mass. Because the Sun contains 99.8% of all mass in our solar system, its massive gravitational pull holds all planets in orbit. Planets don't fall into the Sun because their continuous forward motion (velocity) balances gravity in a steady curved path called an <em>orbit</em>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
