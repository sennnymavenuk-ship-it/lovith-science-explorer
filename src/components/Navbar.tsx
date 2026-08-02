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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-sky-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTopic('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-sky-300/40 group-hover:scale-105 transition-all">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Science Explorer
              </span>
              <span className="block text-xs font-semibold text-slate-500">
                Interactive Learning for Curious Minds
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTopic === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTopic(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-white text-sky-700 shadow-xs border border-sky-200 scale-[1.02]'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-sky-600' : 'text-slate-400'
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
              className="px-3 py-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 bg-slate-50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold border border-slate-200/80 shadow-2xs hover:border-sky-300"
              title="Search topics"
            >
              <Search className="w-4 h-4 text-sky-500" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            {completedEcoTipsCount > 0 && (
              <div
                onClick={() => setActiveTopic('pollution')}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white border border-emerald-400 rounded-full text-xs font-bold shadow-xs hover:bg-emerald-600 transition-colors"
                title="Eco Action Points Earned!"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{completedEcoTipsCount} Eco Actions</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-sky-100 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-200">
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 border border-sky-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-sky-700 font-semibold text-base">
                <BookOpen className="w-5 h-5 text-sky-500" />
                Search Science Topics
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Stomach, Mars, Photosynthesis, Air Pollution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                  autoFocus
                />
              </div>

              <div className="text-xs text-slate-500">
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
                        className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-md text-xs transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs"
                >
                  Go to Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
