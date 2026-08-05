import React, { useState } from 'react';
import { TopicId } from '../types';
import {
  Compass,
  Activity,
  Sun,
  Sparkles,
  Leaf,
  ShieldAlert,
  Search,
  Menu,
  X,
  BookOpen,
  Award,
} from 'lucide-react';

interface NavbarProps {
  activeTopic: TopicId;
  setActiveTopic: (topic: TopicId) => void;
  completedEcoTipsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTopic,
  setActiveTopic,
  completedEcoTipsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navItems: { id: TopicId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'digestive', label: 'Digestive System', icon: Activity },
    { id: 'solar', label: 'Solar System', icon: Sun },
    { id: 'living', label: 'Living vs Non-Living', icon: Sparkles },
    { id: 'plants', label: 'Plants & Uses', icon: Leaf },
    { id: 'pollution', label: 'Pollution Types', icon: ShieldAlert },
  ];

  const searchIndex = [
    { topic: 'digestive' as TopicId, keyword: 'Digestive System, Mouth, Stomach, Intestines, Food Path, Digestion' },
    { topic: 'solar' as TopicId, keyword: 'Solar System, Sun, Planets, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Orbits' },
    { topic: 'living' as TopicId, keyword: 'Living vs Non-Living, Growth, Breathing, Cells, Organisms, Movement' },
    { topic: 'plants' as TopicId, keyword: 'Plants, Roots, Stem, Leaves, Photosynthesis, Flowers, Fruits, Medicinal' },
    { topic: 'pollution' as TopicId, keyword: 'Pollution, Air, Water, Land, Soil, Noise, Light, Recycling, Eco Tips' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = searchIndex.find((item) =>
      item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      setActiveTopic(match.topic);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-indigo-500/30 shadow-lg shadow-indigo-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTopic('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Compass className="w-7 h-7 animate-spin-slow text-slate-950" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                Science Explorer
              </span>
              <span className="block text-xs sm:text-sm font-bold text-cyan-300/80">
                ✨ Interactive Learning for Curious Minds
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-slate-900/90 p-2 rounded-2xl border border-indigo-500/30 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTopic === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTopic(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 text-white shadow-md shadow-cyan-500/25 scale-[1.05] border border-white/20'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-amber-300 animate-bounce' : 'text-cyan-400'
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Search & Eco Badge) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchModal(true)}
              className="px-4 py-2.5 text-slate-200 hover:text-cyan-300 hover:bg-slate-800 bg-slate-900 rounded-2xl transition-all flex items-center gap-2 text-xs sm:text-sm font-black border border-indigo-500/40 shadow-md hover:border-cyan-400"
              title="Search topics"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            {completedEcoTipsCount > 0 && (
              <div
                onClick={() => setActiveTopic('pollution')}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border border-emerald-300 rounded-full text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
                title="Eco Action Points Earned!"
              >
                <Award className="w-4 h-4 text-amber-900" />
                <span>{completedEcoTipsCount} Eco Actions</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-200 hover:bg-slate-800 rounded-xl border border-indigo-500/30"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-indigo-500/40 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTopic === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTopic(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-base font-black transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border border-cyan-300/40 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-cyan-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-900/95 rounded-3xl shadow-2xl max-w-lg w-full p-6 border-2 border-cyan-500/40 text-slate-100 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/30">
              <div className="flex items-center gap-2.5 text-cyan-300 font-black text-lg">
                <BookOpen className="w-6 h-6 text-fuchsia-400" />
                Search Science Topics
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-4 text-cyan-400" />
                <input
                  type="text"
                  placeholder="e.g. Stomach, Mars, Photosynthesis, Air Pollution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border-2 border-indigo-500/40 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-base font-bold"
                  autoFocus
                />
              </div>

              <div className="text-xs sm:text-sm text-slate-300 font-bold">
                Popular searches:
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Digestion', 'Planets', 'Living Characteristics', 'Plant Parts', 'Pollution Tips'].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                        }}
                        className="px-3 py-1.5 bg-indigo-950 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 rounded-xl text-xs sm:text-sm font-extrabold border border-indigo-500/40 transition-all"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-indigo-500/30">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-black text-slate-950 bg-gradient-to-r from-cyan-400 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 rounded-xl shadow-lg shadow-cyan-500/30"
                >
                  Go to Topic 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
