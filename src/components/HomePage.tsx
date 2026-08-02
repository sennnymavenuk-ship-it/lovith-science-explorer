import React, { useState } from 'react';
import { TopicId } from '../types';
import { QUICK_TOPICS, DIGESTION_FACTS } from '../data/scienceData';
import {
  Compass,
  ArrowRight,
  Activity,
  Sun,
  Sparkles,
  Leaf,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  Atom,
  HelpCircle,
  Heart,
} from 'lucide-react';

interface HomePageProps {
  setActiveTopic: (topic: TopicId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTopic }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-amber-600" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-green-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-cyan-600" />;
      default:
        return <Atom className="w-6 h-6 text-sky-600" />;
    }
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % DIGESTION_FACTS.length);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50/40 to-emerald-50/50 pt-10 pb-16 px-6 sm:px-10 lg:px-12 rounded-[32px] border-2 border-sky-100/90 shadow-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200/90 shadow-2xs">
              <Compass className="w-4 h-4 text-sky-600 animate-spin-slow" />
              <span>Interactive Student Science Explorer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Explore Science,{' '}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                One Question at a Time
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl">
              Welcome to your fun, visual guide to how the natural world works! From how your body digests food to the distant orbits of solar planets, the traits of living organisms, plant biology, and environmental stewardship.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTopic('digestive')}
                className="px-6 py-3.5 bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all flex items-center gap-2.5 text-sm hover:scale-[1.02]"
              >
                <span>Start Exploring Topics</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTopic('living')}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border-2 border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex items-center gap-2 text-sm"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Try Quick Quiz</span>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-sky-200/60 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Visual Diagrams</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Interactive Orbits & Flow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Practical Eco Checklist</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image / Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-sky-100 group">
              <img
                src="/src/assets/images/science_hero_banner_1785518281312.jpg"
                alt="Science Exploration Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100 shadow-lg flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0 font-bold">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Designed for Students</p>
                  <p className="text-[11px] text-slate-600 font-medium">Clear explanations, zero complex jargon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Paragraph & Learning Goals */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What Will You Discover Today?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Science is the art of asking questions about everything around us. Whether you want to know what happens to the apple you ate for lunch, how many moons revolve around Saturn, or how plants produce oxygen for us to breathe — we've got you covered with bite-sized, interactive learning!
        </p>

        {/* Dedicated Family Attribution Card */}
        <div className="pt-2">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl border-2 border-amber-200/80 shadow-xs text-left text-xs sm:text-sm">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            </div>
            <div>
              <p className="font-black text-amber-900 text-xs uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Family Creative Collaboration</span>
              </p>
              <p className="text-slate-800 font-semibold leading-relaxed">
                This page is made from <span className="text-amber-800 font-extrabold">Lovith Balaguhan's</span> creative thoughts and topic selection by his brother <span className="text-sky-800 font-extrabold">Hari Athilan</span>, and the web designed & prepared by his father & mother <span className="text-emerald-800 font-extrabold">Senthil Kumar & Sudha</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Featured Topic Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Atom className="w-6 h-6 text-sky-600" />
            5 Key Science Topics
          </h2>
          <span className="text-xs font-bold px-3 py-1 bg-sky-100 text-sky-800 rounded-full border border-sky-200">
            Click any card to begin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUICK_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className="group relative bg-white rounded-[28px] p-6 sm:p-7 border-2 border-slate-200/90 hover:border-sky-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl ${topic.bgLight} border border-slate-100/80`}>
                    {getTopicIcon(topic.iconName)}
                  </div>
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    Topic Card
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs font-bold text-sky-700 mb-2">
                    {topic.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {topic.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                <span>Explore Topic</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Science Curiosity Box */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600 rounded-[32px] p-7 text-white shadow-xl space-y-4 relative overflow-hidden border-2 border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-sky-100">
                Did You Know? Science Curiosity
              </span>
            </div>
            <button
              onClick={nextFact}
              className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs rounded-xl text-xs font-bold transition-all border border-white/30"
            >
              Next Fact ↻
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold leading-relaxed italic text-white drop-shadow-xs">
            "{DIGESTION_FACTS[currentFactIndex]}"
          </p>

          <p className="text-xs text-sky-100 font-medium">
            Click "Next Fact" above to discover more fascinating science trivia!
          </p>
        </div>
      </section>
    </div>
  );
};
