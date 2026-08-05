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
    <div className="space-y-12 pb-16">
      {/* Page Title Header */}
      <section className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 p-8 sm:p-10 lg:p-12 rounded-[36px] border-2 border-amber-400/40 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-amber-950/80 text-amber-300 rounded-full text-sm font-black border border-amber-400/40 shadow-md">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>Human Body Biology</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            The Human Digestive System 🍎
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-bold leading-relaxed">
            Did you know that food travels through a 30-foot muscular tube inside your body? Follow the step-by-step journey of food from the first bite to energy absorption and waste elimination!
          </p>
        </div>
      </section>

      {/* Main Interactive Grid: Creative Labelled Diagram + Active Organ Info Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (7 cols): Creative Labelled SVG Digestive Organ Graphic & Simulator */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-[36px] p-7 sm:p-8 border-2 border-amber-400/30 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <HeartPulse className="w-6 h-6 text-amber-400 animate-pulse" />
                Interactive Digestive Anatomy Diagram
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300/80 font-bold">
                Click any organ node below to inspect its role in human digestion
              </p>
            </div>

            <button
              onClick={() => setSelectedStepIndex(0)}
              className="p-3 text-amber-300 hover:text-white rounded-2xl bg-amber-950/60 hover:bg-amber-900 transition-colors text-xs sm:text-sm font-black flex items-center gap-2 border border-amber-400/40"
              title="Reset Food Position to Mouth"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          </div>

          {/* Labelled Digestive Graphic Canvas */}
          <div className="relative bg-slate-950/80 rounded-3xl p-6 border-2 border-amber-400/30 min-h-[400px] flex items-center justify-center shadow-inner">
            {/* SVG Visual Body Outline & Digestive Tract */}
            <svg
              viewBox="0 0 400 480"
              className="w-full max-w-sm h-auto drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Human Head & Torso Subtle Contour */}
              <path
                d="M 200 20 C 160 20, 140 50, 140 80 C 140 100, 150 115, 160 125 L 155 150 C 120 170, 110 220, 110 320 L 110 430 Q 110 450, 130 450 L 270 450 Q 290 450, 290 430 L 290 320 C 290 220, 280 170, 245 150 L 240 125 C 250 115, 260 100, 260 80 C 260 50, 240 20, 200 20 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />

              {/* 1. Mouth */}
              <g
                onClick={() => setSelectedStepIndex(0)}
                className="cursor-pointer group"
              >
                <ellipse cx="200" cy="75" rx="20" ry="12" fill={selectedStepIndex === 0 ? "#f43f5e" : "#fb7185"} stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="75" r="4" fill="#ffffff" />
                <text x="235" y="80" fontSize="13" fontWeight="900" fill={selectedStepIndex === 0 ? "#f43f5e" : "#e2e8f0"}>
                  1. Mouth & Teeth
                </text>
              </g>

              {/* Esophagus Tube connecting Mouth to Stomach */}
              <path
                d="M 200 87 L 200 180"
                stroke={selectedStepIndex === 1 ? "#fb7185" : "#fda4af"}
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* 2. Esophagus Label & Interactive Zone */}
              <g onClick={() => setSelectedStepIndex(1)} className="cursor-pointer">
                <circle cx="200" cy="130" r="14" fill={selectedStepIndex === 1 ? "#fb7185" : "#1e293b"} stroke="#fb7185" strokeWidth="2.5" />
                <text x="200" y="134" textAnchor="middle" fontSize="12" fontWeight="900" fill={selectedStepIndex === 1 ? "#ffffff" : "#fb7185"}>2</text>
                <text x="235" y="134" fontSize="13" fontWeight="900" fill={selectedStepIndex === 1 ? "#fb7185" : "#e2e8f0"}>
                  2. Esophagus
                </text>
              </g>

              {/* 3. Stomach Pouch */}
              <g onClick={() => setSelectedStepIndex(2)} className="cursor-pointer">
                <path
                  d="M 200 180 C 180 180, 160 195, 160 220 C 160 245, 190 250, 215 235 C 230 220, 220 180, 200 180 Z"
                  fill={selectedStepIndex === 2 ? "#ef4444" : "#f87171"}
                  stroke="#ffffff"
                  strokeWidth="3"
                />
                <circle cx="185" cy="215" r="12" fill={selectedStepIndex === 2 ? "#ffffff" : "#991b1b"} stroke="#ffffff" strokeWidth="2" />
                <text x="185" y="219" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ffffff">3</text>
                <text x="75" y="220" fontSize="13" fontWeight="900" fill={selectedStepIndex === 2 ? "#ef4444" : "#e2e8f0"}>
                  3. Stomach
                </text>
              </g>

              {/* 4. Small Intestine (Coiled Tubes) */}
              <g onClick={() => setSelectedStepIndex(3)} className="cursor-pointer">
                <path
                  d="M 205 240 Q 180 270, 200 290 Q 220 310, 200 330 Q 185 345, 200 355"
                  fill="none"
                  stroke={selectedStepIndex === 3 ? "#f59e0b" : "#fbbf24"}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="200" cy="310" r="13" fill={selectedStepIndex === 3 ? "#f59e0b" : "#1e293b"} stroke="#fbbf24" strokeWidth="2.5" />
                <text x="200" y="314" textAnchor="middle" fontSize="12" fontWeight="900" fill={selectedStepIndex === 3 ? "#ffffff" : "#fbbf24"}>4</text>
                <text x="235" y="315" fontSize="13" fontWeight="900" fill={selectedStepIndex === 3 ? "#fbbf24" : "#e2e8f0"}>
                  4. Small Intestine
                </text>
              </g>

              {/* 5. Large Intestine (Surrounding Frame) */}
              <g onClick={() => setSelectedStepIndex(4)} className="cursor-pointer">
                <path
                  d="M 150 370 L 150 275 Q 150 260, 165 260 L 235 260 Q 250 260, 250 275 L 250 370"
                  fill="none"
                  stroke={selectedStepIndex === 4 ? "#10b981" : "#34d399"}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <circle cx="250" cy="330" r="13" fill={selectedStepIndex === 4 ? "#10b981" : "#1e293b"} stroke="#34d399" strokeWidth="2.5" />
                <text x="250" y="334" textAnchor="middle" fontSize="12" fontWeight="900" fill={selectedStepIndex === 4 ? "#ffffff" : "#34d399"}>5</text>
                <text x="270" y="360" fontSize="13" fontWeight="900" fill={selectedStepIndex === 4 ? "#34d399" : "#e2e8f0"}>
                  5. Large Intestine
                </text>
              </g>

              {/* 6. Rectum & Egestion */}
              <g onClick={() => setSelectedStepIndex(5)} className="cursor-pointer">
                <path
                  d="M 200 370 L 200 410"
                  stroke={selectedStepIndex === 5 ? "#06b6d4" : "#67e8f9"}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="400" r="12" fill={selectedStepIndex === 5 ? "#06b6d4" : "#1e293b"} stroke="#67e8f9" strokeWidth="2.5" />
                <text x="200" y="404" textAnchor="middle" fontSize="12" fontWeight="900" fill={selectedStepIndex === 5 ? "#ffffff" : "#67e8f9"}>6</text>
                <text x="225" y="415" fontSize="13" fontWeight="900" fill={selectedStepIndex === 5 ? "#67e8f9" : "#e2e8f0"}>
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
                r="8"
                fill="#facc15"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="animate-bounce drop-shadow-md"
              />
            </svg>
          </div>

          {/* Interactive "Track Food Journey" Controls */}
          <div className="bg-amber-950/60 p-5 rounded-2xl border-2 border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                {currentStep.number}
              </div>
              <div>
                <p className="text-xs text-amber-300 font-black uppercase tracking-wider">
                  Active Organ Step
                </p>
                <p className="text-lg font-black text-white">{currentStep.organ}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrevStep}
                className="flex-1 sm:flex-none px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-black rounded-xl border border-slate-700 transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 sm:flex-none px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <span>Advance Food Step</span>
                <Play className="w-4 h-4 fill-slate-950" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Detailed Breakdown Panel for Active Organ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 rounded-[36px] p-7 sm:p-8 border-2 border-amber-400/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-4 py-2 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                Step {currentStep.number} of 6
              </span>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{currentStep.duration}</span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-white">
              {currentStep.organ}
            </h3>

            <div className="p-5 bg-slate-950/90 rounded-2xl border border-indigo-500/30 text-base text-slate-200 leading-relaxed font-bold">
              {currentStep.description}
            </div>

            {/* Fun Fact Card */}
            <div className="p-5 bg-amber-950/70 rounded-2xl border-2 border-amber-400/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Digestion Fun Fact</span>
              </div>
              <p className="text-sm text-amber-100 font-bold leading-relaxed">
                {currentStep.funFact}
              </p>
            </div>
          </div>

          {/* "Did You Know?" Fact Box */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 rounded-[36px] p-8 text-white shadow-2xl space-y-4 border-2 border-white/30">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-amber-200" />
              <h3 className="text-xl font-black">Did You Know?</h3>
            </div>
            <p className="text-sm sm:text-base text-white font-bold leading-relaxed drop-shadow-xs">
              Your digestive system works completely automatically using smooth involuntary muscles! Even when you are sleeping or hanging upside down, peristalsis pushes food continuously toward your stomach.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Flow Diagram (Horizontal List with 1-line explanations) */}
      <section className="bg-slate-900/90 rounded-[36px] p-7 sm:p-9 border-2 border-amber-400/30 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Activity className="w-7 h-7 text-amber-400" />
            Sequential Food Path Flowchart
          </h2>
          <p className="text-sm text-cyan-300/80 font-bold mt-1">
            Follow the exact linear path food takes from entrance to egestion with a summary per stage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {DIGESTIVE_STEPS.map((step, index) => {
            const isSelected = selectedStepIndex === index;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepIndex(index)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400 shadow-lg scale-105'
                    : 'bg-slate-950 border-indigo-500/30 hover:border-amber-400/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {step.number}
                    </span>
                    {index < DIGESTIVE_STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-cyan-400 hidden lg:block" />
                    )}
                  </div>

                  <h4 className="text-sm font-black text-white">
                    {step.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-snug font-bold">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-indigo-500/30 flex items-center gap-1.5 text-xs text-amber-300 font-extrabold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
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
