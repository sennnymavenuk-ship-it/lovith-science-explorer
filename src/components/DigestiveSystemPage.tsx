import React, { useState } from 'react';
import { DIGESTIVE_STEPS, DIGESTION_FACTS } from '../data/scienceData';
import {
  Activity,
  ArrowRight,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  RotateCcw,
  Play,
  HeartPulse,
} from 'lucide-react';

export const DigestiveSystemPage: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentStep = DIGESTIVE_STEPS[selectedStepIndex];

  const handleNextStep = () => {
    setSelectedStepIndex((prev) => (prev + 1) % DIGESTIVE_STEPS.length);
  };

  const handlePrevStep = () => {
    setSelectedStepIndex((prev) => (prev - 1 + DIGESTIVE_STEPS.length) % DIGESTIVE_STEPS.length);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Page Title Header */}
      <section className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 p-6 sm:p-8 lg:p-10 rounded-[32px] border-2 border-amber-200/90 shadow-xs">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-200">
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Human Body Biology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Human Digestive System
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Did you know that food travels through a 30-foot muscular tube inside your body? Follow the step-by-step journey of food from the first bite to energy absorption and waste elimination.
          </p>
        </div>
      </section>

      {/* Main Interactive Grid: Creative Labelled Diagram + Active Organ Info Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (7 cols): Creative Labelled SVG Digestive Organ Graphic & Simulator */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-amber-500" />
                Interactive Digestive Anatomy Diagram
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Click any organ node below to inspect its role in human digestion
              </p>
            </div>

            <button
              onClick={() => setSelectedStepIndex(0)}
              className="p-2.5 text-slate-500 hover:text-amber-700 rounded-xl hover:bg-amber-50 transition-colors text-xs font-bold flex items-center gap-1.5 border border-slate-200/80"
              title="Reset Food Position to Mouth"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          </div>

          {/* Labelled Digestive Graphic Canvas */}
          <div className="relative bg-amber-50/50 rounded-2xl p-4 border border-amber-100 min-h-[380px] flex items-center justify-center">
            {/* SVG Visual Body Outline & Digestive Tract */}
            <svg
              viewBox="0 0 400 480"
              className="w-full max-w-sm h-auto drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Human Head & Torso Subtle Contour */}
              <path
                d="M 200 20 C 160 20, 140 50, 140 80 C 140 100, 150 115, 160 125 L 155 150 C 120 170, 110 220, 110 320 L 110 430 Q 110 450, 130 450 L 270 450 Q 290 450, 290 430 L 290 320 C 290 220, 280 170, 245 150 L 240 125 C 250 115, 260 100, 260 80 C 260 50, 240 20, 200 20 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* 1. Mouth */}
              <g
                onClick={() => setSelectedStepIndex(0)}
                className="cursor-pointer group"
              >
                <ellipse cx="200" cy="75" rx="20" ry="12" fill={selectedStepIndex === 0 ? "#f43f5e" : "#fba5a5"} stroke="#e11d48" strokeWidth="2" />
                <circle cx="200" cy="75" r="4" fill="#ffffff" />
                <text x="235" y="80" fontSize="12" fontWeight="700" fill={selectedStepIndex === 0 ? "#e11d48" : "#475569"}>
                  1. Mouth & Teeth
                </text>
              </g>

              {/* Esophagus Tube connecting Mouth to Stomach */}
              <path
                d="M 200 87 L 200 180"
                stroke={selectedStepIndex === 1 ? "#f43f5e" : "#fda4af"}
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* 2. Esophagus Label & Interactive Zone */}
              <g onClick={() => setSelectedStepIndex(1)} className="cursor-pointer">
                <circle cx="200" cy="130" r="14" fill={selectedStepIndex === 1 ? "#f43f5e" : "#ffffff"} stroke="#f43f5e" strokeWidth="2.5" />
                <text x="200" y="134" textAnchor="middle" fontSize="11" fontWeight="800" fill={selectedStepIndex === 1 ? "#ffffff" : "#f43f5e"}>2</text>
                <text x="235" y="134" fontSize="12" fontWeight="700" fill={selectedStepIndex === 1 ? "#f43f5e" : "#475569"}>
                  2. Esophagus
                </text>
              </g>

              {/* 3. Stomach Pouch */}
              <g onClick={() => setSelectedStepIndex(2)} className="cursor-pointer">
                <path
                  d="M 200 180 C 180 180, 160 195, 160 220 C 160 245, 190 250, 215 235 C 230 220, 220 180, 200 180 Z"
                  fill={selectedStepIndex === 2 ? "#ef4444" : "#fca5a5"}
                  stroke="#dc2626"
                  strokeWidth="3"
                />
                <circle cx="185" cy="215" r="12" fill={selectedStepIndex === 2 ? "#ffffff" : "#fee2e2"} stroke="#dc2626" strokeWidth="2" />
                <text x="185" y="219" textAnchor="middle" fontSize="11" fontWeight="800" fill="#dc2626">3</text>
                <text x="75" y="220" fontSize="12" fontWeight="700" fill={selectedStepIndex === 2 ? "#dc2626" : "#475569"}>
                  3. Stomach
                </text>
              </g>

              {/* 4. Small Intestine (Coiled Tubes) */}
              <g onClick={() => setSelectedStepIndex(3)} className="cursor-pointer">
                <path
                  d="M 205 240 Q 180 270, 200 290 Q 220 310, 200 330 Q 185 345, 200 355"
                  fill="none"
                  stroke={selectedStepIndex === 3 ? "#f59e0b" : "#fcd34d"}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="200" cy="310" r="13" fill={selectedStepIndex === 3 ? "#f59e0b" : "#ffffff"} stroke="#d97706" strokeWidth="2.5" />
                <text x="200" y="314" textAnchor="middle" fontSize="11" fontWeight="800" fill={selectedStepIndex === 3 ? "#ffffff" : "#d97706"}>4</text>
                <text x="235" y="315" fontSize="12" fontWeight="700" fill={selectedStepIndex === 3 ? "#d97706" : "#475569"}>
                  4. Small Intestine
                </text>
              </g>

              {/* 5. Large Intestine (Surrounding Frame) */}
              <g onClick={() => setSelectedStepIndex(4)} className="cursor-pointer">
                <path
                  d="M 150 370 L 150 275 Q 150 260, 165 260 L 235 260 Q 250 260, 250 275 L 250 370"
                  fill="none"
                  stroke={selectedStepIndex === 4 ? "#10b981" : "#a7f3d0"}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <circle cx="250" cy="330" r="13" fill={selectedStepIndex === 4 ? "#10b981" : "#ffffff"} stroke="#059669" strokeWidth="2.5" />
                <text x="250" y="334" textAnchor="middle" fontSize="11" fontWeight="800" fill={selectedStepIndex === 4 ? "#ffffff" : "#059669"}>5</text>
                <text x="270" y="360" fontSize="12" fontWeight="700" fill={selectedStepIndex === 4 ? "#059669" : "#475569"}>
                  5. Large Intestine
                </text>
              </g>

              {/* 6. Rectum & Egestion */}
              <g onClick={() => setSelectedStepIndex(5)} className="cursor-pointer">
                <path
                  d="M 200 370 L 200 410"
                  stroke={selectedStepIndex === 5 ? "#0f766e" : "#99f6e4"}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="400" r="12" fill={selectedStepIndex === 5 ? "#0f766e" : "#ffffff"} stroke="#0f766e" strokeWidth="2.5" />
                <text x="200" y="404" textAnchor="middle" fontSize="11" fontWeight="800" fill={selectedStepIndex === 5 ? "#ffffff" : "#0f766e"}>6</text>
                <text x="225" y="415" fontSize="12" fontWeight="700" fill={selectedStepIndex === 5 ? "#0f766e" : "#475569"}>
                  6. Egestion
                </text>
              </g>

              {/* Animated Food Particle Indicator */}
              <circle
                cx={
                  selectedStepIndex === 0 ? 200 :
                  selectedStepIndex === 1 ? 200 :
                  selectedStepIndex === 2 ? 185 :
                  selectedStepIndex === 3 ? 200 :
                  selectedStepIndex === 4 ? 250 : 200
                }
                cy={
                  selectedStepIndex === 0 ? 75 :
                  selectedStepIndex === 1 ? 130 :
                  selectedStepIndex === 2 ? 215 :
                  selectedStepIndex === 3 ? 310 :
                  selectedStepIndex === 4 ? 330 : 400
                }
                r="7"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
                className="animate-bounce"
              />
            </svg>
          </div>

          {/* Interactive "Track Food Journey" Controls */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                {currentStep.number}
              </div>
              <div>
                <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  Active Organ Step
                </p>
                <p className="text-sm font-bold text-slate-900">{currentStep.organ}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrevStep}
                className="flex-1 sm:flex-none px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 sm:flex-none px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Advance Food Step</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Detailed Breakdown Panel for Active Organ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-black shadow-2xs ${currentStep.color}`}>
                Step {currentStep.number} of 6
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{currentStep.duration}</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentStep.organ}
            </h3>

            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 text-sm text-slate-800 leading-relaxed font-semibold">
              {currentStep.description}
            </div>

            {/* Fun Fact Card */}
            <div className="p-4.5 bg-amber-50/90 rounded-2xl border-2 border-amber-200 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Digestion Fun Fact</span>
              </div>
              <p className="text-xs text-amber-950 font-bold leading-relaxed">
                {currentStep.funFact}
              </p>
            </div>
          </div>

          {/* "Did You Know?" Fact Box */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-[32px] p-6.5 text-white shadow-lg space-y-3 border-2 border-white/20">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-200" />
              <h3 className="text-base font-black">Did You Know?</h3>
            </div>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-xs">
              Your digestive system works completely automatically using smooth involuntary muscles! Even when you are sleeping or hanging upside down, peristalsis pushes food continuously toward your stomach.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Flow Diagram (Horizontal List with 1-line explanations) */}
      <section className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Sequential Food Path Flowchart
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Follow the exact linear path food takes from entrance to egestion with a one-line summary per stage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {DIGESTIVE_STEPS.map((step, index) => {
            const isSelected = selectedStepIndex === index;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepIndex(index)}
                className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                      {step.number}
                    </span>
                    {index < DIGESTIVE_STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 hidden lg:block" />
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-800">
                    {step.name}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
