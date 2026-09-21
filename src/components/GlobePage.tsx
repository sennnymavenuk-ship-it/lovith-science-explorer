import React, { useCallback, useEffect, useRef, useState } from 'react';
import { geoOrthographic, geoPath, geoGraticule10, geoContains, geoDistance } from 'd3-geo';
import { merge } from 'topojson-client';
import { ArrowLeft, Globe, Pause, Play, RotateCcw } from 'lucide-react';
import { TopicId } from '../types';
import { CONTINENTS } from '../data/socialStudiesData';
import {
  ContinentId,
  CONTINENT_ORDER,
  FOCUS_POINTS,
  GLOBE_COLORS,
  GLOBE_LABELS,
  continentOf,
} from '../data/globeData';

interface GlobePageProps {
  setActiveTopic: (topic: TopicId) => void;
}

interface Shape {
  id: ContinentId | null; // null = a few far-away islands that belong to no continent
  geometry: any;
}

type Rotation = [number, number]; // [turn around the globe, tilt]

const START_ROTATION: Rotation = [-20, -15]; // starts facing Africa and Europe
const SPIN_DEGREES_PER_SECOND = 8;
const GRATICULE = geoGraticule10();
const OTHER_LAND_COLOR = '#64748b';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const GlobePage: React.FC<GlobePageProps> = ({ setActiveTopic }) => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selectedId, setSelectedId] = useState<ContinentId | null>(null);
  const [spinning, setSpinning] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Things that change many times a second live in refs, so React does not redraw the page each time
  const shapesRef = useRef<Shape[]>([]);
  const rotationRef = useRef<Rotation>([...START_ROTATION]);
  const selectedRef = useRef<ContinentId | null>(null);
  const spinningRef = useRef(spinning);
  const draggingRef = useRef(false);
  const dragRef = useRef<{ startX: number; startY: number; moved: boolean; rotation: Rotation } | null>(null);
  const tweenRef = useRef<{ from: Rotation; to: Rotation; start: number; duration: number } | null>(null);
  const projectionRef = useRef<any>(null);
  const sizeRef = useRef(0);
  const dprRef = useRef(1);
  const radiusRef = useRef(1);
  const needsDrawRef = useRef(true);

  const selected = CONTINENTS.find((c) => c.id === selectedId) ?? null;

  // ----- Load the world map data only when this page opens
  useEffect(() => {
    let cancelled = false;
    import('../data/countries-110m.json')
      .then((module) => {
        if (cancelled) return;
        const topology: any = module.default;
        const groups = new Map<ContinentId | null, any[]>();
        for (const country of topology.objects.countries.geometries) {
          const id = continentOf(country.properties.name);
          if (!groups.has(id)) groups.set(id, []);
          groups.get(id)!.push(country);
        }
        // Joining the countries of one continent together also removes the borders between them
        shapesRef.current = [...groups.entries()].map(([id, geometries]) => ({
          id,
          geometry: merge(topology, geometries),
        }));
        needsDrawRef.current = true;
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ----- Draw the globe
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const size = sizeRef.current;
    if (!canvas || !ctx || !size) return;

    const dpr = dprRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - size * 0.06;
    radiusRef.current = radius;

    const [turn, tilt] = rotationRef.current;
    const projection = geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .rotate([turn, tilt])
      .clipAngle(90);
    projectionRef.current = projection;
    const path = geoPath(projection, ctx);
    const sphere = { type: 'Sphere' } as any;

    // Glow around the planet
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.97, cx, cy, radius * 1.13);
    glow.addColorStop(0, 'rgba(125, 211, 252, 0.45)');
    glow.addColorStop(1, 'rgba(125, 211, 252, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.13, 0, Math.PI * 2);
    ctx.fill();

    // Ocean
    const ocean = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius);
    ocean.addColorStop(0, '#2b7fd8');
    ocean.addColorStop(0.6, '#1552a8');
    ocean.addColorStop(1, '#0a2660');
    ctx.beginPath();
    path(sphere);
    ctx.fillStyle = ocean;
    ctx.fill();

    // Lines of latitude and longitude
    ctx.beginPath();
    path(GRATICULE);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // Continents
    for (const shape of shapesRef.current) {
      const isSelected = shape.id !== null && shape.id === selectedRef.current;
      ctx.beginPath();
      path(shape.geometry);
      ctx.fillStyle = shape.id
        ? isSelected
          ? GLOBE_COLORS[shape.id].bright
          : GLOBE_COLORS[shape.id].fill
        : OTHER_LAND_COLOR;
      ctx.fill();
      ctx.lineWidth = isSelected ? 2.2 : 0.8;
      ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(15, 23, 42, 0.55)';
      ctx.stroke();
    }

    // Shading: light from the top left, darker towards the edge, so it looks round
    const shade = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.15, cx, cy, radius);
    shade.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    shade.addColorStop(0.55, 'rgba(255, 255, 255, 0)');
    shade.addColorStop(1, 'rgba(2, 6, 23, 0.6)');
    ctx.beginPath();
    path(sphere);
    ctx.fillStyle = shade;
    ctx.fill();
    ctx.strokeStyle = 'rgba(186, 230, 253, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Continent names, only for the ones facing us
    const facing: [number, number] = [-turn, -tilt];
    ctx.font = `800 ${Math.max(11, size * 0.032)}px Fredoka, Nunito, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    for (const id of CONTINENT_ORDER) {
      const focus = FOCUS_POINTS[id];
      if (geoDistance(focus, facing) > 1.15) continue;
      const point = projection(focus);
      if (!point) continue;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.85)';
      ctx.strokeText(GLOBE_LABELS[id], point[0], point[1]);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(GLOBE_LABELS[id], point[0], point[1]);
    }

    canvas.dataset.rotation = `${Math.round(turn)},${Math.round(tilt)}`;
  }, []);

  // ----- Keep the canvas sharp at any size
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const resize = () => {
      const size = Math.round(wrap.clientWidth);
      const dpr = window.devicePixelRatio || 1;
      if (!size) return;
      sizeRef.current = size;
      dprRef.current = dpr;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      needsDrawRef.current = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // ----- Animation loop: spin, glide to a continent, and redraw when something changed
  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const tween = tweenRef.current;
      if (tween) {
        const progress = tween.duration === 0 ? 1 : clamp((now - tween.start) / tween.duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const turnDistance = ((tween.to[0] - tween.from[0] + 540) % 360) - 180; // the short way round
        rotationRef.current = [tween.from[0] + turnDistance * eased, tween.from[1] + (tween.to[1] - tween.from[1]) * eased];
        if (progress >= 1) tweenRef.current = null;
        needsDrawRef.current = true;
      } else if (spinningRef.current && !draggingRef.current) {
        rotationRef.current = [rotationRef.current[0] + SPIN_DEGREES_PER_SECOND * dt, rotationRef.current[1]];
        needsDrawRef.current = true;
      }

      if (needsDrawRef.current) {
        needsDrawRef.current = false;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [draw]);

  // ----- Actions
  const turnTo = useCallback((longitude: number, latitude: number) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tweenRef.current = {
      from: [...rotationRef.current] as Rotation,
      to: [-longitude, clamp(-latitude, -90, 90)],
      start: performance.now(),
      duration: reduceMotion ? 0 : 900,
    };
  }, []);

  const setSpin = (on: boolean) => {
    spinningRef.current = on;
    setSpinning(on);
  };

  const choose = (id: ContinentId | null) => {
    selectedRef.current = id;
    setSelectedId(id);
    needsDrawRef.current = true;
  };

  const chooseAndTurn = (id: ContinentId) => {
    setSpin(false); // stop spinning so the continent stays in view
    choose(id);
    turnTo(...FOCUS_POINTS[id]);
  };

  const resetView = () => {
    choose(null);
    turnTo(-START_ROTATION[0], -START_ROTATION[1]);
  };

  // Which continent is under this point of the canvas?
  const continentAt = (clientX: number, clientY: number): ContinentId | null => {
    const canvas = canvasRef.current;
    const projection = projectionRef.current;
    if (!canvas || !projection) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * sizeRef.current;
    const y = ((clientY - rect.top) / rect.height) * sizeRef.current;
    const coords = projection.invert([x, y]);
    if (!coords || !isFinite(coords[0]) || !isFinite(coords[1])) return null; // outside the globe
    const hit = shapesRef.current.find((s) => s.id && geoContains(s.geometry, coords));
    return hit?.id ?? null;
  };

  // ----- Mouse, finger, and keyboard
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    tweenRef.current = null;
    draggingRef.current = true;
    dragRef.current = { startX: e.clientX, startY: e.clientY, moved: false, rotation: [...rotationRef.current] as Rotation };
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag) {
      if (e.pointerType === 'mouse') {
        e.currentTarget.style.cursor = continentAt(e.clientX, e.clientY) ? 'pointer' : 'grab';
      }
      return;
    }
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 4) drag.moved = true;
    if (!drag.moved) return;
    const degreesPerPixel = 180 / (Math.PI * radiusRef.current) * (sizeRef.current / e.currentTarget.getBoundingClientRect().width);
    rotationRef.current = [drag.rotation[0] + dx * degreesPerPixel, clamp(drag.rotation[1] - dy * degreesPerPixel, -90, 90)];
    needsDrawRef.current = true;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    draggingRef.current = false;
    e.currentTarget.style.cursor = 'grab';
    if (drag && !drag.moved) {
      const id = continentAt(e.clientX, e.clientY);
      if (id) {
        setSpin(false);
        choose(id);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    const step = 10;
    const [turn, tilt] = rotationRef.current;
    if (e.key === 'ArrowRight') rotationRef.current = [turn + step, tilt];
    else if (e.key === 'ArrowLeft') rotationRef.current = [turn - step, tilt];
    else if (e.key === 'ArrowUp') rotationRef.current = [turn, clamp(tilt + step, -90, 90)];
    else if (e.key === 'ArrowDown') rotationRef.current = [turn, clamp(tilt - step, -90, 90)];
    else return;
    e.preventDefault();
    tweenRef.current = null;
    needsDrawRef.current = true;
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-rose-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-orange-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <button
            type="button"
            onClick={() => setActiveTopic('social')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-950/80 text-orange-300 text-sm font-black border border-orange-400/40 hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Social Studies
          </button>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">The 3D Globe 🌍</h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Drag the Earth to spin it around. Tap a continent to find out about it, or pick one from the buttons.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Globe */}
        <div className="lg:col-span-7 space-y-4">
          <div ref={wrapRef} className="relative w-full max-w-[600px] mx-auto aspect-square">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="A 3D globe of the Earth. Drag to spin it, use the arrow keys to turn it, or choose a continent from the buttons below."
              tabIndex={0}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              style={{ touchAction: 'pan-y', cursor: 'grab' }}
              className="w-full h-full rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            />
            {status === 'loading' && (
              <p className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-300">Loading the globe…</p>
            )}
            {status === 'error' && (
              <p className="absolute inset-0 flex items-center justify-center text-center px-6 text-sm font-bold text-rose-300">
                The globe could not load. Check your internet connection and refresh the page.
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setSpin(!spinning)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm font-black border-2 border-indigo-500/30 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              {spinning ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
              {spinning ? 'Stop spinning' : 'Start spinning'}
            </button>
            <button
              type="button"
              onClick={resetView}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm font-black border-2 border-indigo-500/30 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Reset the view
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Choose a continent">
            {CONTINENT_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseAndTurn(id)}
                aria-pressed={selectedId === id}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-black border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                  selectedId === id
                    ? 'bg-orange-950/60 border-orange-400 text-white'
                    : 'bg-slate-950 border-indigo-500/30 text-slate-200 hover:border-orange-400/60'
                }`}
              >
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: GLOBE_COLORS[id].fill }} aria-hidden="true" />
                {GLOBE_LABELS[id]}
              </button>
            ))}
          </div>
        </div>

        {/* Facts */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/90 rounded-3xl border-2 border-indigo-500/30 p-6 sm:p-7 space-y-5 min-h-[240px]" aria-live="polite">
            {selected ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="text-5xl" aria-hidden="true">{selected.emoji}</div>
                  <div>
                    <h2 className={`text-2xl sm:text-3xl font-black ${selected.textColor}`}>{selected.name}</h2>
                    <p className="text-sm text-slate-300 font-bold">Number {selected.sizeRank} biggest of the 7 continents</p>
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
              </>
            ) : (
              <div className="flex items-start gap-3">
                <Globe className="w-7 h-7 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-base text-slate-200 font-bold leading-relaxed">
                  Tap a continent on the globe to see its people, animals and a fun fact. Antarctica is at the very bottom, so tilt the globe up to find it.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <p className="max-w-4xl mx-auto px-4 text-xs text-slate-400 font-bold leading-relaxed text-center">
        Russia, Turkey and Kazakhstan reach across two continents. Here they are coloured by their larger part, Asia. Map data: Natural Earth (public domain), through the world-atlas package.
      </p>
    </div>
  );
};
