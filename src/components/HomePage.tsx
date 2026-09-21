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
  Globe,
} from 'lucide-react';

interface HomePageProps {
  setActiveTopic: (topic: TopicId) => void;
}

const TOPIC_IMAGES: Record<string, { url: string; alt: string }> = {
  digestive: {
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
    alt: 'Fresh colorful fruits and vegetables representing digestive nutrition',
  },
  solar: {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    alt: 'Cosmic space nebula and Earth from orbit',
  },
  living: {
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    alt: 'Green plant sprout growing in soil surrounded by natural elements',
  },
  plants: {
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    alt: 'Lush green tropical plant foliage',
  },
  pollution: {
    url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
    alt: 'Clean blue sky with renewable energy wind turbines',
  },
};

export const HomePage: React.FC<HomePageProps> = ({ setActiveTopic }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-7 h-7 text-amber-300" />;
      case 'Sun':
        return <Sun className="w-7 h-7 text-cyan-300" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-fuchsia-300" />;
      case 'Leaf':
        return <Leaf className="w-7 h-7 text-emerald-300" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-7 h-7 text-rose-300" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-orange-300" />;
      default:
        return <Atom className="w-7 h-7 text-cyan-300" />;
    }
  };

  const getTopicIconBg = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return 'bg-gradient-to-tr from-amber-500 to-orange-600 shadow-amber-500/30';
      case 'Sun':
        return 'bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-cyan-500/30';
      case 'Sparkles':
        return 'bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-fuchsia-500/30';
      case 'Leaf':
        return 'bg-gradient-to-tr from-emerald-400 to-teal-600 shadow-emerald-500/30';
      case 'ShieldAlert':
        return 'bg-gradient-to-tr from-rose-500 to-pink-600 shadow-rose-500/30';
      case 'Globe':
        return 'bg-gradient-to-tr from-orange-500 to-red-500 shadow-orange-500/30';
      default:
        return 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-indigo-500/30';
    }
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % DIGESTION_FACTS.length);
  };

  return (
    <div className="space-y-14 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 pt-12 pb-16 px-6 sm:px-10 lg:px-14 rounded-[36px] border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-cyan-950/80 text-cyan-300 text-sm font-black border border-cyan-400/40 shadow-md">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <span>Interactive Student Science Explorer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Explore Science,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                One Question at a Time! 🚀
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-bold max-w-2xl">
              Welcome to your fun, vibrant guide to how the universe works! From how your body digests food to the distant orbits of solar planets, living organisms, plant biology, and protecting Earth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTopic('digestive')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-3 text-base sm:text-lg border-2 border-white/40"
              >
                <span>Start Exploring Topics</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveTopic('living')}
                className="px-7 py-4 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-extrabold rounded-2xl border-2 border-cyan-400/40 shadow-md hover:border-cyan-400 transition-all flex items-center gap-2.5 text-base"
              >
                <HelpCircle className="w-5 h-5 text-amber-300" />
                <span>Try Quick Quiz</span>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-indigo-500/30 text-xs sm:text-sm font-extrabold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Visual Diagrams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Interactive Orbits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0" />
                <span>Eco Action Points</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image / Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-[32px] overflow-hidden shadow-2xl border-4 border-cyan-400/40 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=80&w=1000"
                alt="Students discovering science in laboratory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-cyan-400/30 shadow-xl flex items-center gap-3.5">
                <div className="p-3 bg-gradient-to-tr from-emerald-400 to-cyan-400 text-slate-950 rounded-xl shrink-0 font-bold shadow-md">
                  <Lightbulb className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Designed for Students (Ages 7-14)</p>
                  <p className="text-xs text-cyan-200/90 font-bold">Clear explanations, zero complex jargon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Paragraph & Learning Goals */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          What Will You Discover Today? 🤔
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-bold">
          Science is the super-power of asking questions about everything around us! Whether you want to know what happens to the apple you ate for lunch, how many moons revolve around Saturn, or how plants make oxygen — we've got you covered with bite-sized interactive learning!
        </p>

        {/* Dedicated Family Attribution Card */}
        <div className="pt-2">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 rounded-3xl border-2 border-amber-400/40 shadow-lg text-left text-sm sm:text-base">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
            </div>
            <div>
              <p className="font-black text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Family Creative Collaboration</span>
              </p>
              <p className="text-slate-100 font-bold leading-relaxed">
                This page is made from <span className="text-amber-300 font-black">Lovith Balaguhan's</span> creative thoughts and topic selection by his brother <span className="text-cyan-300 font-black">Hari Athilan</span>, and the web designed & prepared by his father & mother <span className="text-emerald-300 font-black">Senthil Kumar & Sudha</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Featured Topic Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white flex items-center gap-3">
            <Atom className="w-8 h-8 text-cyan-400 animate-spin-slow" />
            Key Topics
          </h2>
          <span className="text-xs sm:text-sm font-black px-4 py-2 bg-indigo-950 text-cyan-300 rounded-full border border-cyan-400/40 shadow-md">
            Click any card to begin ⚡
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUICK_TOPICS.map((topic) => {
            const topicImg = TOPIC_IMAGES[topic.id];
            return (
              <div
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className="group relative bg-slate-900/90 rounded-[32px] overflow-hidden border-2 border-indigo-500/30 hover:border-cyan-400 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2"
              >
                {/* Thumbnail Image Header */}
                <div className="relative h-44 overflow-hidden border-b border-indigo-500/30">
                  {topicImg && (
                    <img
                      src={topicImg.url}
                      alt={topicImg.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                    />
                  )}
                  {!topicImg && (
                    <div className="w-full h-full bg-gradient-to-br from-orange-500/40 via-amber-500/20 to-rose-500/30 flex items-center justify-center text-7xl" aria-hidden="true">🌍</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className={`p-3 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 ${getTopicIconBg(topic.iconName)}`}>
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-400/40">
                      Topic Card
                    </span>
                  </div>
                </div>

                <div className="p-7 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm font-extrabold text-amber-300 my-1.5">
                      {topic.tagline}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed font-bold">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-6 pt-3 border-t border-indigo-500/30 flex items-center justify-between text-sm font-black text-cyan-400 group-hover:text-cyan-300">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Science Curiosity Box */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 rounded-[36px] p-8 sm:p-10 text-white shadow-2xl space-y-5 relative overflow-hidden border-2 border-white/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-7 h-7 text-amber-300 animate-bounce" />
              <span className="text-sm font-black uppercase tracking-wider text-amber-200">
                Did You Know? Science Trivia
              </span>
            </div>
            <button
              onClick={nextFact}
              className="px-4 py-2 bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-md rounded-2xl text-xs sm:text-sm font-black transition-all border border-white/30 text-amber-300 hover:scale-105"
            >
              Next Fact ↻
            </button>
          </div>

          <p className="text-lg sm:text-2xl font-black leading-relaxed italic text-white drop-shadow-md">
            "{DIGESTION_FACTS[currentFactIndex]}"
          </p>

          <p className="text-xs sm:text-sm text-cyan-100 font-bold">
            💡 Click "Next Fact" above to discover more awesome science trivia!
          </p>
        </div>
      </section>
    </div>
  );
};
