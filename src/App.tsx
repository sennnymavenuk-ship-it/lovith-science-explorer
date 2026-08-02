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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-100 text-slate-800 font-sans flex flex-col selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navbar */}
      <Navbar
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        completedEcoTipsCount={completedEcoTipsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
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
      </main>

      {/* Floating Science Quiz Quick Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsQuizOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold rounded-full shadow-xl shadow-sky-500/25 hover:scale-105 transition-all text-xs sm:text-sm group border border-white/20"
        >
          <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Take Science Quiz</span>
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
