import React from 'react';
import { DessertDefinition, DessertId } from '../types';
import { DESSERTS } from '../data/desserts';
import { DessertVisual } from './DessertVisual';
import { soundEngine } from '../utils/audio';
import { Sparkles, Clock, Flame, ArrowRight, ChevronLeft } from 'lucide-react';

interface DessertPickerProps {
  onSelectDessert: (id: DessertId) => void;
  onBackToHome: () => void;
}

export const DessertPicker: React.FC<DessertPickerProps> = ({
  onSelectDessert,
  onBackToHome,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#070a12] text-[#fafaf9] overflow-y-auto p-6 md:p-10">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Back and Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950/80 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-2"
            >
              <ChevronLeft className="w-4 h-4 text-orange-400" />
              <span>Нүүр хуудас руу буцах</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-orange-300 font-gothic tracking-wide">
              Амттанаа сонгох
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Чимэглэх дуртай Halloween-ийн амттанаа сонгон шидэт тавцан дээр урлаарай.
            </p>
          </div>
        </div>

        {/* 10 Desserts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESSERTS.map((dessert) => (
            <div
              key={dessert.id}
              onClick={() => {
                soundEngine.playChime();
                onSelectDessert(dessert.id);
              }}
              className="group flex flex-col rounded-3xl bg-[#0d1222]/90 hover:bg-[#131b32] border border-indigo-950 hover:border-orange-500/70 shadow-xl hover:shadow-orange-500/15 transition-all duration-200 overflow-hidden cursor-pointer"
            >
              {/* Visual Preview on Dark Canvas Plate */}
              <div className="w-full aspect-[4/3] bg-[radial-gradient(ellipse_at_center,_#141b2f_0%,_#090d18_80%)] flex items-center justify-center p-4 relative border-b border-indigo-950/60 overflow-hidden">
                <DessertVisual
                  dessertId={dessert.id}
                  frostingId={dessert.defaultFrostingId}
                  className="w-full h-full transform group-hover:scale-108 transition-transform duration-300 drop-shadow-xl"
                />
              </div>

              {/* Details & Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-orange-300 transition-colors font-gothic">
                      {dessert.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {dessert.description}
                  </p>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{dessert.recipe.duration}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span>{dessert.recipe.temperature}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-purple-300">{dessert.recipe.servings}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-orange-400 group-hover:text-orange-300 flex items-center gap-1">
                    <span>Урлаж эхлэх</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {dessert.recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
