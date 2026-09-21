import React, { useState } from 'react';
import { TopicId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { DigestiveSystemPage } from './components/DigestiveSystemPage';
import { SolarSystemPage } from './components/SolarSystemPage';
import { LivingNonLivingPage } from './components/LivingNonLivingPage';
import { PlantsAndUsesPage } from './components/PlantsAndUsesPage';
import { PollutionTypesPage } from './components/PollutionTypesPage';
import { ScienceQuizModal } from './components/ScienceQuizModal';
import { SocialStudiesPage } from './components/SocialStudiesPage';
import { GlobePage } from './components/GlobePage';
import { HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('home');
  const [checkedTipIds, setCheckedTipIds] = useState<Record<string, boolean>>({
    air_1: true,
    wat_1: true,
  });
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const toggleTipCheck = (tipId: string) => {
    setCheckedTipIds((prev) => ({
      ...prev,
      [tipId]: !prev[tipId],
    }));
  };

  const completedEcoTipsCount = Object.values(checkedTipIds).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        completedEcoTipsCount={completedEcoTipsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTopic === 'home' && <HomePage setActiveTopic={setActiveTopic} />}
        {activeTopic === 'digestive' && <DigestiveSystemPage />}
        {activeTopic === 'solar' && <SolarSystemPage />}
        {activeTopic === 'living' && <LivingNonLivingPage />}
        {activeTopic === 'plants' && <PlantsAndUsesPage />}
        {activeTopic === 'pollution' && (
          <PollutionTypesPage
            checkedTipIds={checkedTipIds}
            toggleTipCheck={toggleTipCheck}
            completedTipsCount={completedEcoTipsCount}
          />
        )}
          {activeTopic === 'social' && <SocialStudiesPage setActiveTopic={setActiveTopic} />}
          {activeTopic === 'globe' && <GlobePage setActiveTopic={setActiveTopic} />}
      </main>

      {/* Floating Science Quiz Quick Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsQuizOpen(true)}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-black rounded-full shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-all text-sm sm:text-base tracking-wide border-2 border-white/50 animate-bounce"
        >
          <HelpCircle className="w-6 h-6 animate-pulse" />
          <span>🚀 Take Science Quiz</span>
        </button>
      </div>

      {/* Science Quiz Modal */}
      <ScienceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        setActiveTopic={setActiveTopic}
      />

      {/* Footer */}
      <Footer setActiveTopic={setActiveTopic} />
    </div>
  );
}
