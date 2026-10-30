import React from 'react';
import { ActiveScreen } from '../types';
import { Sparkles, BookOpen, Heart, CakeSlice, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeScreen, onNavigate, savedCount }) => {
  const [isMuted, setIsMuted] = React.useState(soundEngine.isMuted());

  const handleToggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-indigo-950/80 bg-[#080c16]/90 backdrop-blur-md sticky top-0 z-40 shrink-0">
      {/* Zone 1: Single text wordmark in display face */}
      <button
        onClick={() => {
          onNavigate('home');
          soundEngine.playChime();
        }}
        className="text-lg font-black tracking-wider text-orange-400 hover:text-orange-300 font-gothic whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span className="text-xl">🎃</span>
        <span>TRICK OR TREAT</span>
      </button>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => {
            onNavigate('choose');
            soundEngine.playChime();
          }}
          className={`hover:text-orange-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeScreen === 'choose' || activeScreen === 'workshop'
              ? 'text-orange-400 font-semibold'
              : ''
          }`}
        >
          Амттанаа урлах
        </button>

        <button
          onClick={() => {
            onNavigate('creations');
            soundEngine.playChime();
          }}
          className={`hover:text-orange-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
            activeScreen === 'creations' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          <span>Миний бүтээлүүд</span>
          {savedCount > 0 && (
            <span className="text-xs text-orange-400 font-mono">({savedCount})</span>
          )}
        </button>

        <button
          onClick={() => {
            onNavigate('recipes');
            soundEngine.playChime();
          }}
          className={`hover:text-orange-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeScreen === 'recipes' ? 'text-orange-400 font-semibold' : ''
          }`}
        >
          Жорын ном
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleToggleSound}
          className="p-2 text-slate-400 hover:text-orange-300 rounded-lg bg-slate-900/60 hover:bg-slate-800 transition-colors cursor-pointer"
          title={isMuted ? 'Дуу асаах' : 'Дуу хаах'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
        </button>

        <button
          onClick={() => {
            onNavigate('choose');
            soundEngine.playChime();
          }}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-lg shadow-sm shadow-orange-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          Амттанаа урлах
        </button>
      </div>
    </header>
  );
};
