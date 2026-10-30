import React, { useState, useEffect } from 'react';
import { SavedCreation, DessertId } from '../types';
import { DESSERTS_MAP } from '../data/desserts';
import { DessertVisual } from './DessertVisual';
import { soundEngine } from '../utils/audio';
import {
  Heart,
  Calendar,
  Layers,
  Edit3,
  Download,
  Trash2,
  Sparkles,
  ChevronLeft,
  Plus,
} from 'lucide-react';

interface MyCreationsProps {
  onEditCreation: (creation: SavedCreation) => void;
  onStartNew: () => void;
  onBackToHome: () => void;
}

export const MyCreations: React.FC<MyCreationsProps> = ({
  onEditCreation,
  onStartNew,
  onBackToHome,
}) => {
  const [creations, setCreations] = useState<SavedCreation[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const loadCreations = () => {
    try {
      const raw = localStorage.getItem('halloween_creations');
      if (raw) {
        setCreations(JSON.parse(raw));
      } else {
        setCreations([]);
      }
    } catch {
      setCreations([]);
    }
  };

  useEffect(() => {
    loadCreations();
  }, []);

  const handleDelete = (id: string, name: string) => {
    soundEngine.playDelete();
    const next = creations.filter((c) => c.id !== id);
    setCreations(next);
    localStorage.setItem('halloween_creations', JSON.stringify(next));
    showToast(`"${name}" устгагдлаа`);
  };

  const handleDownloadThumbnail = (creation: SavedCreation) => {
    if (!creation.thumbnailDataUrl) {
      showToast('Зураг татахад бэлэн биш байна');
      return;
    }
    soundEngine.playChime();
    const link = document.createElement('a');
    link.download = `${creation.name.replace(/\s+/g, '_')}.png`;
    link.href = creation.thumbnailDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Зургийг амжилттай татаж авлаа');
  };

  // Format date in Mongolian style
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      return `${year} оны ${month}-р сарын ${day}, ${hours}:${mins}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070a12] text-[#fafaf9] overflow-y-auto p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header Breadcrumbs & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950/80 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer mb-2"
            >
              <ChevronLeft className="w-4 h-4 text-orange-400" />
              <span>Нүүр хуудас руу буцах</span>
            </button>
            <div className="flex items-center gap-2.5">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500/20" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-300 font-gothic tracking-wide">
                Миний бүтээлүүд
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Таны өмнө нь урлаж хадгалсан шидэт амттануудын цуглуулга.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playChime();
              onStartNew();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Шинээр амттан урлах</span>
          </button>
        </div>

        {/* Empty State */}
        {creations.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-[#0d1222]/50 border border-dashed border-indigo-950/80 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-orange-400" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="text-base font-bold text-slate-200 font-gothic">
                Одоогоор хадгалсан бүтээл алга байна
              </h3>
              <p className="text-xs text-slate-400">
                Та шидэт урлан руу орж, анхны Halloween-ийн амттанаа бүтээгээрэй.
              </p>
            </div>
            <button
              onClick={() => {
                soundEngine.playChime();
                onStartNew();
              }}
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              Амттанаа урлаж эхлэх
            </button>
          </div>
        )}

        {/* Saved Creations Grid */}
        {creations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((creation) => {
              const dessertDef = DESSERTS_MAP[creation.dessertId];
              return (
                <div
                  key={creation.id}
                  className="group flex flex-col rounded-3xl bg-[#0d1222]/90 border border-indigo-950 hover:border-orange-500/60 shadow-xl transition-all duration-200 overflow-hidden"
                >
                  {/* Thumbnail container */}
                  <div className="relative w-full aspect-square bg-[#090d18] flex items-center justify-center border-b border-indigo-950/60 overflow-hidden p-4">
                    {creation.thumbnailDataUrl ? (
                      <img
                        src={creation.thumbnailDataUrl}
                        alt={creation.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <DessertVisual
                        dessertId={creation.dessertId}
                        frostingId={creation.frostingId}
                        baseColorId={creation.baseColorId}
                        className="w-full h-full drop-shadow-md"
                      />
                    )}

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] text-orange-300 font-medium border border-orange-500/30">
                      {dessertDef?.name || 'Амттан'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-orange-300 transition-colors font-gothic line-clamp-1">
                        {creation.name}
                      </h3>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-purple-400" />
                          <span>{creation.items.length} чимэглэл</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">{formatDate(creation.savedAt)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Edit, Download, Delete */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          soundEngine.playChime();
                          onEditCreation(creation);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-orange-300 text-xs font-semibold transition-colors cursor-pointer"
                        title="Урланд дахин засварлах"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Дахин засах</span>
                      </button>

                      <button
                        onClick={() => handleDownloadThumbnail(creation)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                        title="Зураг татах (PNG)"
                      >
                        <Download className="w-4 h-4 text-sky-400" />
                      </button>

                      <button
                        onClick={() => handleDelete(creation.id, creation.name)}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 transition-colors cursor-pointer"
                        title="Бүтээлийг устгах"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-orange-500/60 text-orange-200 text-xs shadow-2xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
