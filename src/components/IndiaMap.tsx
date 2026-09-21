import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { INDIA_REGIONS } from '../data/socialStudiesData';
import { IndiaRegion } from '../types';

// The shape of the data inside the @svg-maps/india package
interface SvgMapData {
  label: string;
  viewBox: string;
  locations: { id: string; name: string; path: string }[];
}

interface GameState {
  questions: string[]; // region ids, in the order they will be asked
  index: number;
  picked: string | null; // region id the child chose for this question
  score: number;
  finished: boolean;
}

interface Ring {
  cx: number;
  cy: number;
  r: number;
}

const GAME_ROUNDS = 10;
const RING_MAX_SIZE = 45; // shapes smaller than this get a ring so they are easy to spot

const REGION_BY_ID = new Map(INDIA_REGIONS.map((r) => [r.id, r]));
const REGION_BY_SHAPE = new Map(INDIA_REGIONS.flatMap((r) => r.shapeIds.map((s) => [s, r] as const)));
const GAME_REGION_IDS = INDIA_REGIONS.filter((r) => !r.small).map((r) => r.id);
const STATES = INDIA_REGIONS.filter((r) => r.type === 'State');
const TERRITORIES = INDIA_REGIONS.filter((r) => r.type === 'Union Territory');

// Pick n different items at random
function pickRandom<T>(items: T[], n: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export const IndiaMap: React.FC = () => {
  const [mapData, setMapData] = useState<SvgMapData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [game, setGame] = useState<GameState | null>(null);
  const [rings, setRings] = useState<Ring[]>([]);
  const shapeRefs = useRef<Record<string, SVGPathElement | null>>({});

  // Load the map data only when this section is opened
  useEffect(() => {
    let cancelled = false;
    import('@svg-maps/india')
      .then((module) => {
        if (!cancelled) setMapData(module.default as SvgMapData);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedRegion = selectedId ? REGION_BY_ID.get(selectedId) ?? null : null;
  const targetRegion = game && !game.finished ? REGION_BY_ID.get(game.questions[game.index]) ?? null : null;
  const pickedRegion = game?.picked ? REGION_BY_ID.get(game.picked) ?? null : null;

  // Draw a dashed ring around tiny regions so children can find them
  useLayoutEffect(() => {
    if (!mapData || game || !selectedRegion) {
      setRings([]);
      return;
    }
    const next: Ring[] = [];
    for (const shapeId of selectedRegion.shapeIds) {
      const el = shapeRefs.current[shapeId];
      if (!el) continue;
      const box = el.getBBox();
      const size = Math.max(box.width, box.height);
      if (size < RING_MAX_SIZE) {
        next.push({ cx: box.x + box.width / 2, cy: box.y + box.height / 2, r: size / 2 + 14 });
      }
    }
    setRings(next);
  }, [mapData, game, selectedRegion]);

  // One function handles a choice from the map AND from the list
  const handlePick = (regionId: string) => {
    if (!game) {
      setSelectedId(regionId);
      return;
    }
    if (game.finished || game.picked !== null) return; // already answered
    const correct = regionId === game.questions[game.index];
    setGame({ ...game, picked: regionId, score: game.score + (correct ? 1 : 0) });
  };

  const startGame = () => {
    setSelectedId(null);
    setGame({ questions: pickRandom(GAME_REGION_IDS, GAME_ROUNDS), index: 0, picked: null, score: 0, finished: false });
  };

  const nextQuestion = () => {
    if (!game) return;
    if (game.index + 1 >= game.questions.length) {
      setGame({ ...game, finished: true });
    } else {
      setGame({ ...game, index: game.index + 1, picked: null });
    }
  };

  const stopGame = () => setGame(null);

  const shapeClass = (region: IndiaRegion): string => {
    const base =
      region.type === 'State'
        ? 'fill-slate-600 hover:fill-slate-500'
        : 'fill-violet-500 hover:fill-violet-400';
    if (game) {
      if (game.picked !== null) {
        if (region.id === targetRegion?.id) return 'fill-emerald-400';
        if (region.id === game.picked) return 'fill-rose-500';
      }
      return base;
    }
    if (region.id === selectedId) return 'fill-orange-400 stroke-orange-300';
    return base;
  };

  const isAnswered = game !== null && game.picked !== null;
  const answeredCorrectly = isAnswered && game.picked === targetRegion?.id;

  return (
    <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-orange-400/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Explore India 🇮🇳</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold mt-1">
            India has 28 states and 8 Union Territories. Tap the map to meet each one.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={stopGame}
            aria-pressed={!game}
            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              !game
                ? 'bg-orange-400 text-slate-950 border-orange-300'
                : 'bg-slate-950 text-slate-200 border-indigo-500/30 hover:border-orange-400/60'
            }`}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={startGame}
            aria-pressed={!!game}
            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
              game
                ? 'bg-orange-400 text-slate-950 border-orange-300'
                : 'bg-slate-950 text-slate-200 border-indigo-500/30 hover:border-orange-400/60'
            }`}
          >
            Find it! game
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-slate-950 rounded-3xl border-2 border-indigo-500/30 p-4 sm:p-6 flex justify-center min-h-[300px] items-center">
            {loadFailed && (
              <p className="text-sm font-bold text-rose-300 text-center">
                The map could not load. Check your internet connection and refresh the page.
              </p>
            )}
            {!mapData && !loadFailed && (
              <p className="text-sm font-bold text-slate-300">Loading the map…</p>
            )}
            {mapData && (
              <svg
                viewBox={mapData.viewBox}
                role="img"
                aria-label="Map of India. Use the list next to the map to choose a state or Union Territory."
                className="w-full h-auto max-h-[75vh]"
              >
                {mapData.locations.map((shape) => {
                  const region = REGION_BY_SHAPE.get(shape.id);
                  if (!region) return null;
                  return (
                    <path
                      key={shape.id}
                      ref={(el) => {
                        shapeRefs.current[shape.id] = el;
                      }}
                      data-shape={shape.id}
                      d={shape.path}
                      strokeWidth={region.id === selectedId && !game ? 2.5 : 0.8}
                      className={`cursor-pointer stroke-slate-950 transition-colors ${shapeClass(region)}`}
                      onClick={() => handlePick(region.id)}
                    >
                      {/* Names show on hover only while exploring, so they never give away a game answer */}
                      {!game && <title>{region.name}</title>}
                    </path>
                  );
                })}
                {rings.map((ring, i) => (
                  <circle
                    key={i}
                    cx={ring.cx}
                    cy={ring.cy}
                    r={ring.r}
                    fill="none"
                    stroke="#fdba74"
                    strokeWidth={2.5}
                    strokeDasharray="5 4"
                    pointerEvents="none"
                  />
                ))}
              </svg>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-600 inline-block" aria-hidden="true" />
              State
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-violet-500 inline-block" aria-hidden="true" />
              Union Territory
            </span>
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* Explore panel */}
          {!game && (
            <div className="bg-slate-950 rounded-3xl border-2 border-indigo-500/30 p-6 space-y-3 min-h-[180px]">
              {selectedRegion ? (
                <>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
                      selectedRegion.type === 'State' ? 'bg-slate-700 text-slate-100' : 'bg-violet-500 text-white'
                    }`}
                  >
                    {selectedRegion.type}
                  </span>
                  <h3 className="text-2xl font-black text-orange-300">{selectedRegion.name}</h3>
                  <p className="text-sm sm:text-base">
                    <span className="text-slate-400 font-bold">Capital: </span>
                    <span className="text-white font-black">{selectedRegion.capital}</span>
                  </p>
                  {selectedRegion.note && (
                    <p className="text-sm text-orange-100 font-bold leading-relaxed p-3 bg-orange-950/60 border-2 border-orange-400/40 rounded-2xl">
                      {selectedRegion.note}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-base text-slate-300 font-bold leading-relaxed">
                  Tap a state or Union Territory on the map to see its name and capital. Can&apos;t find a tiny one? Choose it from the list below.
                </p>
              )}
            </div>
          )}

          {/* Game panel */}
          {game && !game.finished && targetRegion && (
            <div className="bg-slate-950 rounded-3xl border-2 border-orange-400/40 p-6 space-y-4 min-h-[180px]">
              <div className="flex justify-between text-xs sm:text-sm font-black text-orange-300">
                <span>
                  Question {game.index + 1} of {game.questions.length}
                </span>
                <span>Score: {game.score}</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white leading-snug">
                Tap <span className="text-orange-300">{targetRegion.name}</span> on the map
              </p>

              {isAnswered && (
                <div
                  className={`p-4 rounded-2xl border-2 text-sm sm:text-base font-bold leading-relaxed ${
                    answeredCorrectly
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100'
                      : 'bg-rose-950/70 border-rose-400 text-rose-100'
                  }`}
                  role="status"
                >
                  {answeredCorrectly ? (
                    <>Yes! That is {targetRegion.name}. </>
                  ) : (
                    <>
                      That is {pickedRegion?.name}. {targetRegion.name} is the green one.{' '}
                    </>
                  )}
                  Its capital is {targetRegion.capital}.
                </div>
              )}

              {isAnswered && (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-orange-400 hover:bg-orange-300 text-slate-950 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
                >
                  {game.index + 1 >= game.questions.length ? 'See my score' : 'Next question'}
                </button>
              )}
            </div>
          )}

          {game && game.finished && (
            <div className="bg-slate-950 rounded-3xl border-2 border-orange-400/40 p-6 space-y-4">
              <h3 className="text-2xl font-black text-white">
                You found {game.score} out of {game.questions.length}!
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-bold leading-relaxed">
                {game.score >= 8
                  ? 'Amazing map skills! You really know where things are in India.'
                  : game.score >= 5
                  ? 'Good work! Try again to find the ones you missed.'
                  : 'Nice try! Use Explore to look at the states, then play again.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-xl bg-orange-400 hover:bg-orange-300 text-slate-950 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
                >
                  Play again
                </button>
                <button
                  type="button"
                  onClick={stopGame}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-black border-2 border-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
                  Back to exploring
                </button>
              </div>
            </div>
          )}

          {/* List: also the way to reach tiny regions, and works with a keyboard */}
          <div className="space-y-2">
            <label htmlFor="india-region-select" className="block text-sm font-black text-slate-200">
              {game ? 'Or choose your answer from the list' : 'Or choose from the list'}
            </label>
            <select
              id="india-region-select"
              value={game ? game.picked ?? '' : selectedId ?? ''}
              disabled={game !== null && (game.finished || game.picked !== null)}
              onChange={(e) => {
                if (e.target.value) handlePick(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border-2 border-indigo-500/40 text-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-60"
            >
              <option value="">Choose a state or Union Territory…</option>
              <optgroup label="States">
                {STATES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories">
                {TERRITORIES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 font-bold leading-relaxed">
        Map shapes:{' '}
        
          href="https://github.com/VictorCazanave/svg-maps"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-300"
        >
          svg-maps by Victor Cazanave
        </a>
        , licensed{' '}
        
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-300"
        >
          CC BY 4.0
        </a>
        . Borders and names on any map can differ from official maps, so check your school textbook.
      </p>
    </section>
  );
};