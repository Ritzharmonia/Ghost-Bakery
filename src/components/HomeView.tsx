import React from 'react';
import { DessertDefinition, DessertId } from '../types';
import { DESSERTS } from '../data/desserts';
import { DessertVisual } from './DessertVisual';
import { soundEngine } from '../utils/audio';
import { Sparkles, BookOpen, Heart, ArrowRight, Wand2 } from 'lucide-react';

interface HomeViewProps {
  onStartDecorating: () => void;
  onSelectDessert: (id: DessertId) => void;
  onOpenMyCreations: () => void;
  onOpenRecipeBook: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartDecorating,
  onSelectDessert,
  onOpenMyCreations,
  onOpenRecipeBook,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#070a12] text-[#fafaf9] overflow-y-auto">
      {/* HERO SECTION with Tim Burton Gothic Atmosphere */}
      <section className="relative overflow-hidden px-6 pt-12 pb-20 md:pt-20 md:pb-28 border-b border-indigo-950/60">
        {/* Tim Burton style gothic background scenery */}
        <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
          {/* Giant Full Glowing Moon */}
          <div className="absolute top-6 right-[10%] w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400/40 blur-sm shadow-[0_0_80px_rgba(251,191,36,0.35)]" />

          {/* Gothic Moon craters */}
          <div className="absolute top-16 right-[14%] w-14 h-14 rounded-full bg-amber-300/30 blur-xs" />
          <div className="absolute top-28 right-[18%] w-20 h-20 rounded-full bg-amber-300/25 blur-xs" />

          {/* Flying bats silhouette */}
          <svg className="absolute top-12 right-[28%] w-16 h-12 text-slate-900 fill-current animate-float-slow" viewBox="0 0 100 60">
            <path d="M50 30 C40 10 20 15 5 25 C15 35 25 35 35 30 C40 38 45 38 50 34 C55 38 60 38 65 30 C75 35 85 35 95 25 C80 15 60 10 50 30 Z" />
          </svg>
          <svg className="absolute top-24 right-[12%] w-10 h-8 text-slate-900 fill-current animate-float-drift" viewBox="0 0 100 60">
            <path d="M50 30 C40 10 20 15 5 25 C15 35 25 35 35 30 C40 38 45 38 50 34 C55 38 60 38 65 30 C75 35 85 35 95 25 C80 15 60 10 50 30 Z" />
          </svg>

          {/* Crooked Gothic House & Twisted Tree Silhouettes at Bottom */}
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-48 md:h-64 text-[#04060b] fill-current"
            viewBox="0 0 1440 250"
            preserveAspectRatio="none"
          >
            {/* Crooked hill */}
            <path d="M 0 250 L 0 150 Q 250 110 500 160 T 1000 130 Q 1250 110 1440 150 L 1440 250 Z" />
            {/* Twisted Tree on Left */}
            <path d="M 120 220 Q 140 140 110 90 Q 90 60 60 50 Q 80 65 105 85 Q 120 110 135 150 Q 155 100 180 70 Q 200 45 220 40 Q 195 58 175 85 Q 150 135 145 220 Z" />
            {/* Crooked Gothic Manor Spire on Right */}
            <polygon points="1200,220 1200,100 1230,40 1260,100 1260,220" />
            <polygon points="1220,100 1230,30 1240,100" />
            {/* Small bats over tree */}
            <circle cx="95" cy="55" r="2" />
            <circle cx="170" cy="50" r="2.5" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6 z-10">
          {/* Tagline Slogan: Зууван хэлбэртэй ид шидийн үгийн бөмбөлөг */}
          <div className="inline-block relative">
            <div className="inline-flex items-center gap-2.5 px-8 py-2.5 rounded-[40px] bg-gradient-to-r from-orange-950/90 via-purple-950/90 to-orange-950/90 border-2 border-orange-500/60 text-orange-200 text-xs sm:text-sm font-semibold tracking-wider shadow-[0_0_25px_rgba(234,88,12,0.35)] animate-pulse-glow">
              <span className="text-sm">🕯️</span>
              <span>«Шөнө дундын ид шидээр амттанаа бүтээ.»</span>
              <span className="text-sm">🕯️</span>
            </div>
            {/* Word bubble decorative pointer */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-500/60 mx-auto -mt-[1px]" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-orange-200 via-orange-400 to-amber-600 font-gothic drop-shadow-[0_4px_16px_rgba(234,88,12,0.4)]">
            САФФИР ЧИХЭР ХХК
          </h1>

          {/* Subtitle in an authentic gothic Ghost's Oval (Зууван) Speech Bubble */}
          <div className="flex flex-col items-center gap-3 pt-1">
            <div className="relative max-w-2xl px-8 py-3.5 rounded-[45px] bg-[#0d1326]/95 border-2 border-purple-500/50 shadow-2xl backdrop-blur-md">
              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                «Шөнө дундын нарийн боовны газарт тавтай морил. Өөрийн хүссэн амттанаа сонгож, төсөөллөө амилуулаарай.»
              </p>
              {/* Little speech tail pointing down-left to ghost */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-purple-500/60" />
            </div>

            {/* Ghost mascot */}
            <div className="flex items-center gap-2 text-xs text-orange-400/90 font-medium">
              <span className="text-base animate-bounce">👻</span>
              <span>Саффир улсын турж үхсэн хүний сүнс</span>
            </div>
          </div>

          {/* 3 Primary Action Buttons in smooth oval (rounded-full) shape */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => {
                soundEngine.playChime();
                onStartDecorating();
              }}
              className="px-8 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-300 rounded-full shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Амттанаа урлах</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playChime();
                onOpenMyCreations();
              }}
              className="px-7 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Миний бүтээлүүд</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playChime();
                onOpenRecipeBook();
              }}
              className="px-7 py-3 text-sm font-semibold text-purple-200 bg-purple-950/60 hover:bg-purple-900/70 border border-purple-800/80 rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Жорын ном</span>
            </button>
          </div>
        </div>
      </section>

      {/* DESSERTS SHOWCASE GRID */}
      <section className="max-w-6xl mx-auto px-6 py-14 space-y-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-indigo-950/60 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-gothic tracking-wide">
              Шөнө дундын амттанууд
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Урлаж эхлэхийг хүссэн амттанаа сонгоод ид шидийн тавцан руу шилжинэ үү.
            </p>
          </div>

          <button
            onClick={onStartDecorating}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Бүгдийг үзэх</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Desserts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DESSERTS.map((dessert) => (
            <div
              key={dessert.id}
              onClick={() => {
                soundEngine.playChime();
                onSelectDessert(dessert.id);
              }}
              className="group relative flex flex-col p-3 rounded-2xl bg-[#0d1222]/80 hover:bg-[#12192e] border border-indigo-950 hover:border-orange-500/60 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              {/* Visual preview */}
              <div className="w-full aspect-square rounded-xl bg-[#090d18] flex items-center justify-center p-2 overflow-hidden border border-slate-900 group-hover:border-slate-800">
                <DessertVisual
                  dessertId={dessert.id}
                  frostingId={dessert.defaultFrostingId}
                  className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Tagline */}
              <div className="mt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-orange-300 transition-colors line-clamp-1">
                    {dessert.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {dessert.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-orange-400 font-medium">
                  <span>Урлаж эхлэх</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atmospheric Footer */}
      <footer className="mt-auto px-6 py-6 border-t border-indigo-950/60 bg-[#05070d] text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="tracking-wide">
          <span className="text-orange-400 font-gothic">TRICK OR TREAT</span> · Саффир Чихэр ХХК
        </p>
        <p className="text-slate-600">
          Шөнө дундын ид шидээр бүтээгдсэн амттаны интерактив тоглоом
        </p>
      </footer>
    </div>
  );
};
