import React, { useState } from 'react';
import { PLANT_TYPES, PLANT_PARTS } from '../data/scienceData';
import { PlantPart, PlantType } from '../types';
import {
  Leaf,
  Apple,
  Sparkles,
  Trees,
  Flower2,
  Maximize2,
  ArrowDownCircle,
  Info,
  CheckCircle2,
  Search,
} from 'lucide-react';

const PLANT_CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
  food_crops: {
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
    alt: 'Fresh fruits and vegetables representing food crops',
  },
  medicinal: {
    url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800',
    alt: 'Green botanical medicinal plants and herbs',
  },
  trees: {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800',
    alt: 'Tall majestic forest canopy trees',
  },
  flowers: {
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
    alt: 'Vibrant blooming spring flowers',
  },
};

export const PlantsAndUsesPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<PlantPart>(PLANT_PARTS[2]); // Default Leaf
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-5 h-5 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-green-700" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-pink-600" />;
      default:
        return <Leaf className="w-5 h-5 text-green-600" />;
    }
  };

  const filteredPlantTypes =
    activeCategoryFilter === 'all'
      ? PLANT_TYPES
      : PLANT_TYPES.filter((p) => p.id === activeCategoryFilter);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Title */}
      <section className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-emerald-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-950/80 text-emerald-300 rounded-full text-sm font-black border border-emerald-400/40 shadow-md">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>Botany & Ecosystems</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Plants & Their Uses 🌿🍎
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Plants are the green foundation of life on Earth. Through photosynthesis, they produce the oxygen we breathe, furnish our food crops, supply medicinal botanical extracts, and provide timber for shelter!
          </p>
        </div>
      </section>

      {/* SECTION 1: Interactive Plant Parts Diagram (Root, Stem, Leaf, Flower, Fruit) */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-emerald-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Leaf className="w-7 h-7 text-emerald-400" />
            Anatomy of a Plant & Functions of Each Part
          </h2>
          <p className="text-sm text-cyan-300/80 font-bold mt-1">
            Click any plant part on the diagram or list to highlight its structural role and function
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Col (5 cols): Interactive SVG Plant Model */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-3xl p-6 border-2 border-emerald-400/30 flex items-center justify-center min-h-[340px] shadow-inner">
            <svg
              viewBox="0 0 300 400"
              className="w-full max-w-xs h-auto drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soil Line */}
              <line x1="20" y1="290" x2="280" y2="290" stroke="#b45309" strokeWidth="3" strokeDasharray="6 4" />
              <text x="30" y="310" fontSize="11" fontWeight="900" fill="#f59e0b">SOIL LEVEL</text>

              {/* 1. Root System (Below Soil) */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[0])} className="cursor-pointer group">
                <path
                  d="M 150 290 Q 130 330, 110 380 M 150 290 Q 150 340, 150 390 M 150 290 Q 170 330, 190 380 M 130 330 Q 100 350, 80 360 M 170 330 Q 200 350, 220 360"
                  stroke={selectedPart.id === 'root' ? '#fbbf24' : '#d97706'}
                  strokeWidth={selectedPart.id === 'root' ? '6' : '3.5'}
                  strokeLinecap="round"
                />
                <circle cx="150" cy="340" r="15" fill={selectedPart.id === 'root' ? '#fbbf24' : '#1e293b'} stroke="#f59e0b" strokeWidth="2.5" />
                <text x="150" y="344" textAnchor="middle" fontSize="10" fontWeight="900" fill={selectedPart.id === 'root' ? '#000000' : '#fbbf24'}>ROOT</text>
              </g>

              {/* 2. Stem / Trunk */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[1])} className="cursor-pointer">
                <path
                  d="M 150 290 L 150 120"
                  stroke={selectedPart.id === 'stem' ? '#10b981' : '#34d399'}
                  strokeWidth={selectedPart.id === 'stem' ? '14' : '9'}
                  strokeLinecap="round"
                />
                <circle cx="150" cy="210" r="15" fill={selectedPart.id === 'stem' ? '#10b981' : '#1e293b'} stroke="#34d399" strokeWidth="2.5" />
                <text x="150" y="214" textAnchor="middle" fontSize="10" fontWeight="900" fill={selectedPart.id === 'stem' ? '#ffffff' : '#34d399'}>STEM</text>
              </g>

              {/* 3. Leaves (Photosynthesis) */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[2])} className="cursor-pointer">
                {/* Left Leaf */}
                <path
                  d="M 150 200 C 90 180, 80 140, 150 160 Z"
                  fill={selectedPart.id === 'leaf' ? '#10b981' : '#059669'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Right Leaf */}
                <path
                  d="M 150 170 C 210 150, 220 110, 150 130 Z"
                  fill={selectedPart.id === 'leaf' ? '#10b981' : '#059669'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <circle cx="95" cy="165" r="15" fill={selectedPart.id === 'leaf' ? '#10b981' : '#1e293b'} stroke="#34d399" strokeWidth="2.5" />
                <text x="95" y="169" textAnchor="middle" fontSize="10" fontWeight="900" fill={selectedPart.id === 'leaf' ? '#ffffff' : '#34d399'}>LEAF</text>
              </g>

              {/* 4. Flower */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[3])} className="cursor-pointer">
                <circle cx="150" cy="80" r="14" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <circle
                    key={deg}
                    cx={150 + Math.cos((deg * Math.PI) / 180) * 22}
                    cy={80 + Math.sin((deg * Math.PI) / 180) * 22}
                    r="12"
                    fill={selectedPart.id === 'flower' ? '#f43f5e' : '#fb7185'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
                <circle cx="150" cy="80" r="13" fill={selectedPart.id === 'flower' ? '#f43f5e' : '#1e293b'} stroke="#f43f5e" strokeWidth="2.5" />
                <text x="150" y="83" textAnchor="middle" fontSize="8" fontWeight="900" fill={selectedPart.id === 'flower' ? '#ffffff' : '#f43f5e'}>FLOWER</text>
              </g>

              {/* 5. Fruit */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[4])} className="cursor-pointer">
                <circle cx="210" cy="180" r="17" fill={selectedPart.id === 'fruit' ? '#ef4444' : '#f87171'} stroke="#ffffff" strokeWidth="2" />
                <text x="210" y="184" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">FRUIT</text>
              </g>
            </svg>
          </div>

          {/* Right Col (7 cols): Plant Parts Clickable Cards + Active Function Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PLANT_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <div
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-400 shadow-md scale-102'
                        : 'bg-slate-950 border-indigo-500/30 hover:border-emerald-400/60'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                      {part.name.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{part.name}</h4>
                      <p className="text-xs text-slate-300 font-bold line-clamp-1">{part.function}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Part Detail Box */}
            <div className="p-6 bg-emerald-950/70 rounded-3xl border-2 border-emerald-400/40 space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-emerald-300 font-black text-base">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>Function of {selectedPart.name}:</span>
              </div>
              <p className="text-sm sm:text-base text-white font-black leading-relaxed">
                "{selectedPart.function}"
              </p>
              <p className="text-xs sm:text-sm text-emerald-100 font-bold leading-relaxed pt-1">
                {selectedPart.details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Gallery of Common Plant Types & Their Uses */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <Trees className="w-7 h-7 text-emerald-400" />
              Gallery of Plant Categories & Human Uses
            </h2>
            <p className="text-sm text-cyan-300/80 font-bold mt-1">
              From nutrition and shade to lifesaving botanical medicines
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-black bg-slate-900/90 p-2 rounded-2xl border border-indigo-500/30">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeCategoryFilter === 'all'
                  ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Plant Types
            </button>
            {PLANT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveCategoryFilter(type.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeCategoryFilter === type.id
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {type.category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlantTypes.map((plant) => {
            const plantImg = PLANT_CATEGORY_IMAGES[plant.id];
            return (
              <div
                key={plant.id}
                className="bg-slate-900/90 rounded-[36px] overflow-hidden border-2 border-emerald-400/30 shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative h-48 overflow-hidden border-b border-indigo-500/30">
                  {plantImg && (
                    <img
                      src={plantImg.url}
                      alt={plantImg.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 shadow-md">
                      {plant.category}
                    </span>
                    <div className="p-2.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-emerald-400/30">
                      {getCategoryIcon(plant.iconName)}
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{plant.title}</h3>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-bold">
                      {plant.description}
                    </p>

                    {/* Examples Pills */}
                    <div className="space-y-2">
                      <span className="text-xs font-black text-amber-300">Common Examples:</span>
                      <div className="flex flex-wrap gap-2">
                        {plant.examples.map((ex) => (
                          <span
                            key={ex}
                            className="px-3.5 py-1.5 bg-slate-950 text-white rounded-full text-xs font-black border border-indigo-500/30 shadow-sm"
                          >
                            🌱 {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Uses Checklist */}
                  <div className="pt-4 border-t border-indigo-500/30 space-y-2.5">
                    <span className="text-xs font-black text-cyan-300">Primary Uses:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 font-bold">
                      {plant.uses.map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
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
