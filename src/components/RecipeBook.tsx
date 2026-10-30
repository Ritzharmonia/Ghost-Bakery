import React, { useState } from 'react';
import { DessertId } from '../types';
import { DESSERTS } from '../data/desserts';
import { DessertVisual } from './DessertVisual';
import { soundEngine } from '../utils/audio';
import {
  BookOpen,
  Clock,
  Flame,
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Wand2,
  CheckCircle2,
} from 'lucide-react';

interface RecipeBookProps {
  initialDessertId?: DessertId;
  onSelectForDecorating: (id: DessertId) => void;
  onBackToHome: () => void;
}

export const RecipeBook: React.FC<RecipeBookProps> = ({
  initialDessertId = 'pumpkin-pie',
  onSelectForDecorating,
  onBackToHome,
}) => {
  const [selectedDessertId, setSelectedDessertId] = useState<DessertId>(initialDessertId);

  const activeDessert =
    DESSERTS.find((d) => d.id === selectedDessertId) || DESSERTS[0];
  const recipe = activeDessert.recipe;

  return (
    <div className="flex-1 flex flex-col bg-[#070a12] text-[#fafaf9] overflow-y-auto p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950/80 pb-4">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-1"
            >
              <ChevronLeft className="w-4 h-4 text-orange-400" />
              <span>Нүүр хуудас</span>
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-gothic tracking-wide">
                Шөнө дундын жорын ном
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Halloween-ийн 10 амттаныг бодитоор гал тогоондоо урлах нарийвчилсан жорууд.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playChime();
              onSelectForDecorating(activeDessert.id);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Wand2 className="w-4 h-4" />
            <span>Энэ амттаныг урлах</span>
          </button>
        </div>

        {/* 2-Column Storybook Layout: Desserts Selector (Left) + Active Recipe Display (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desserts List / Selector */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-medium text-slate-400 px-1 pb-1">
              Амттанаа сонгоно уу:
            </div>
            <div className="flex flex-col gap-1.5 max-h-[680px] overflow-y-auto pr-1">
              {DESSERTS.map((d) => {
                const isSelected = d.id === selectedDessertId;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDessertId(d.id);
                      soundEngine.playChime();
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-500/80 shadow-md shadow-purple-500/10 text-white'
                        : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-950 p-1 flex items-center justify-center shrink-0 border border-slate-800">
                        <DessertVisual
                          dessertId={d.id}
                          frostingId={d.defaultFrostingId}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{d.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {d.recipe.duration} · {d.recipe.temperature}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-purple-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Recipe Document */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-[#0d1222]/90 border border-indigo-950/80 shadow-2xl space-y-6">
            {/* Top Recipe Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-indigo-950/70 pb-6">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-[#090d18] p-3 flex items-center justify-center shrink-0 border border-slate-800 shadow-inner">
                <DessertVisual
                  dessertId={activeDessert.id}
                  frostingId={activeDessert.defaultFrostingId}
                  className="w-full h-full drop-shadow-md"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-purple-950/50 border border-purple-700/60 text-purple-300 text-[11px] font-medium">
                  {recipe.tagline}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-orange-300 font-gothic">
                  {recipe.name}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeDessert.description}
                </p>

                {/* Key Metrics: Duration, Temp, Servings, Difficulty */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 block">Болгох хугацаа</span>
                    <span className="font-semibold text-slate-200">{recipe.duration}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 block">Шарах температур</span>
                    <span className="font-semibold text-slate-200">{recipe.temperature}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Users className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 block">Орцын хэмжээ</span>
                    <span className="font-semibold text-slate-200">{recipe.servings}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Sparkles className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 block">Түвшин</span>
                    <span className="font-semibold text-slate-200">{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients & Exact Measurements */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-orange-300 font-gothic tracking-wide flex items-center gap-2">
                <span>Орц, найрлага</span>
                <span className="text-xs text-slate-400 font-sans font-normal">
                  ({recipe.ingredients.length} төрлийн орц)
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {recipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80"
                  >
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      <span>{ing.name}</span>
                    </span>
                    <span className="font-semibold text-orange-400 shrink-0 font-mono">
                      {ing.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-orange-300 font-gothic tracking-wide">
                Хийх дараалал
              </h3>

              <div className="space-y-2.5">
                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-300 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700/80 text-purple-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Baker Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-700/50 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-gothic">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Чихэрчний бяцхан нууц:</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed pl-6">
                {recipe.bakerTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
