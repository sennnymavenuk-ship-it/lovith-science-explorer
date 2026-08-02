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
    <div className="space-y-10 pb-16">
      {/* Header Title */}
      <section className="bg-gradient-to-r from-green-500/15 via-emerald-500/15 to-teal-500/15 p-6 sm:p-8 lg:p-10 rounded-[32px] border-2 border-green-200/90 shadow-xs">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-100 text-green-900 rounded-full text-xs font-bold border border-green-200">
            <Leaf className="w-4 h-4 text-green-600" />
            <span>Botany & Ecosystems</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Plants & Their Essential Uses
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Plants are the green foundation of life on Earth. Through photosynthesis, they produce the oxygen we breathe, furnish our food crops, supply medicinal botanical extracts, and provide timber for shelter.
          </p>
        </div>
      </section>

      {/* SECTION 1: Interactive Plant Parts Diagram (Root, Stem, Leaf, Flower, Fruit) */}
      <section className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Anatomy of a Plant & Functions of Each Part
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click any plant part on the diagram or list to highlight its structural role and one-line function
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Col (5 cols): Interactive SVG Plant Model */}
          <div className="lg:col-span-5 bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-center min-h-[320px]">
            <svg
              viewBox="0 0 300 400"
              className="w-full max-w-xs h-auto drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soil Line */}
              <line x1="20" y1="290" x2="280" y2="290" stroke="#92400e" strokeWidth="3" strokeDasharray="6 4" />
              <text x="30" y="310" fontSize="10" fontWeight="700" fill="#92400e">SOIL LEVEL</text>

              {/* 1. Root System (Below Soil) */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[0])} className="cursor-pointer group">
                <path
                  d="M 150 290 Q 130 330, 110 380 M 150 290 Q 150 340, 150 390 M 150 290 Q 170 330, 190 380 M 130 330 Q 100 350, 80 360 M 170 330 Q 200 350, 220 360"
                  stroke={selectedPart.id === 'root' ? '#d97706' : '#b45309'}
                  strokeWidth={selectedPart.id === 'root' ? '5' : '3'}
                  strokeLinecap="round"
                />
                <circle cx="150" cy="340" r="14" fill={selectedPart.id === 'root' ? '#d97706' : '#ffffff'} stroke="#b45309" strokeWidth="2" />
                <text x="150" y="344" textAnchor="middle" fontSize="10" fontWeight="800" fill={selectedPart.id === 'root' ? '#ffffff' : '#b45309'}>ROOT</text>
              </g>

              {/* 2. Stem / Trunk */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[1])} className="cursor-pointer">
                <path
                  d="M 150 290 L 150 120"
                  stroke={selectedPart.id === 'stem' ? '#059669' : '#10b981'}
                  strokeWidth={selectedPart.id === 'stem' ? '12' : '8'}
                  strokeLinecap="round"
                />
                <circle cx="150" cy="210" r="14" fill={selectedPart.id === 'stem' ? '#059669' : '#ffffff'} stroke="#059669" strokeWidth="2" />
                <text x="150" y="214" textAnchor="middle" fontSize="10" fontWeight="800" fill={selectedPart.id === 'stem' ? '#ffffff' : '#059669'}>STEM</text>
              </g>

              {/* 3. Leaves (Photosynthesis) */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[2])} className="cursor-pointer">
                {/* Left Leaf */}
                <path
                  d="M 150 200 C 90 180, 80 140, 150 160 Z"
                  fill={selectedPart.id === 'leaf' ? '#10b981' : '#a7f3d0'}
                  stroke="#047857"
                  strokeWidth="2"
                />
                {/* Right Leaf */}
                <path
                  d="M 150 170 C 210 150, 220 110, 150 130 Z"
                  fill={selectedPart.id === 'leaf' ? '#10b981' : '#a7f3d0'}
                  stroke="#047857"
                  strokeWidth="2"
                />
                <circle cx="95" cy="165" r="14" fill={selectedPart.id === 'leaf' ? '#047857' : '#ffffff'} stroke="#047857" strokeWidth="2" />
                <text x="95" y="169" textAnchor="middle" fontSize="10" fontWeight="800" fill={selectedPart.id === 'leaf' ? '#ffffff' : '#047857'}>LEAF</text>
              </g>

              {/* 4. Flower */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[3])} className="cursor-pointer">
                <circle cx="150" cy="80" r="14" fill="#facc15" stroke="#eab308" strokeWidth="2" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <circle
                    key={deg}
                    cx={150 + Math.cos((deg * Math.PI) / 180) * 22}
                    cy={80 + Math.sin((deg * Math.PI) / 180) * 22}
                    r="12"
                    fill={selectedPart.id === 'flower' ? '#f43f5e' : '#fecdd3'}
                    stroke="#e11d48"
                    strokeWidth="1.5"
                  />
                ))}
                <circle cx="150" cy="80" r="12" fill={selectedPart.id === 'flower' ? '#f43f5e' : '#ffffff'} stroke="#e11d48" strokeWidth="2" />
                <text x="150" y="83" textAnchor="middle" fontSize="8" fontWeight="800" fill={selectedPart.id === 'flower' ? '#ffffff' : '#e11d48'}>FLOWER</text>
              </g>

              {/* 5. Fruit */}
              <g onClick={() => setSelectedPart(PLANT_PARTS[4])} className="cursor-pointer">
                <circle cx="210" cy="180" r="16" fill={selectedPart.id === 'fruit' ? '#ef4444' : '#fca5a5'} stroke="#b91c1c" strokeWidth="2" />
                <text x="210" y="184" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">FRUIT</text>
              </g>
            </svg>
          </div>

          {/* Right Col (7 cols): Plant Parts Clickable Cards + Active Function Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLANT_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <div
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-green-50 border-green-400 ring-2 ring-green-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-green-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {part.name.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{part.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{part.function}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Part Detail Box */}
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 space-y-2">
              <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Function of {selectedPart.name}:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                "{selectedPart.function}"
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
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
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Trees className="w-5 h-5 text-green-600" />
              Gallery of Plant Categories & Human Uses
            </h2>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              From nutrition and shade to lifesaving botanical medicines
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-bold bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeCategoryFilter === 'all'
                  ? 'bg-white text-slate-900 font-black shadow-2xs border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Plant Types
            </button>
            {PLANT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveCategoryFilter(type.id)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeCategoryFilter === type.id
                    ? 'bg-green-600 text-white font-black shadow-xs border border-green-500'
                    : 'text-slate-600 hover:text-green-700'
                }`}
              >
                {type.category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlantTypes.map((plant) => (
            <div
              key={plant.id}
              className={`bg-white rounded-[32px] p-6 sm:p-7 border-2 border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 hover:border-green-400 ${plant.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl shadow-xs border border-slate-200">
                    {getCategoryIcon(plant.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {plant.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">{plant.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                {plant.description}
              </p>

              {/* Examples Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-slate-800">Common Examples:</span>
                <div className="flex flex-wrap gap-1.5">
                  {plant.examples.map((ex) => (
                    <span
                      key={ex}
                      className="px-3 py-1 bg-white text-slate-900 rounded-full text-xs font-bold border border-slate-200 shadow-2xs"
                    >
                      🌱 {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Uses Checklist */}
              <div className="pt-3 border-t border-slate-200/60 space-y-2">
                <span className="text-[11px] font-bold text-slate-700">Primary Uses:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {plant.uses.map((use, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
