import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  DessertDefinition,
  PlacedItem,
  DecorationCategory,
  SavedCreation,
} from '../types';
import {
  FROSTING_OPTIONS,
  BASE_COLOR_OPTIONS,
  DECORATION_CATEGORIES,
  CREATURE_ITEMS,
  TOPPING_ITEMS,
  HALLOWEEN_ITEMS,
  SAUCE_ITEMS,
  ALL_DECORATIONS_MAP,
} from '../data/decorations';
import { DessertVisual } from './DessertVisual';
import { DecorationVisual } from './DecorationVisual';
import { soundEngine } from '../utils/audio';
import { exportSvgToPng, generateThumbnailDataUrl } from '../utils/exportImage';
import confetti from 'canvas-confetti';
import {
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Undo2,
  Redo2,
  Download,
  BookmarkCheck,
  Sparkles,
  RefreshCw,
  Check,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Layers,
  Sparkle,
} from 'lucide-react';

interface WorkshopProps {
  dessert: DessertDefinition;
  initialFrostingId?: string;
  initialBaseColorId?: string;
  initialItems?: PlacedItem[];
  savedCreationId?: string;
  savedCreationName?: string;
  onBackToDesserts: () => void;
  onOpenMyCreations: () => void;
  onOpenRecipeBook: () => void;
}

export const Workshop: React.FC<WorkshopProps> = ({
  dessert,
  initialFrostingId,
  initialBaseColorId,
  initialItems,
  savedCreationId,
  savedCreationName,
  onBackToDesserts,
  onOpenMyCreations,
  onOpenRecipeBook,
}) => {
  // Frosting & Base Color
  const [frostingId, setFrostingId] = useState<string>(
    initialFrostingId || dessert.defaultFrostingId
  );
  const [baseColorId, setBaseColorId] = useState<string>(
    initialBaseColorId || dessert.defaultBaseColorId || 'classic-amber'
  );
  const [customFrostingColor, setCustomFrostingColor] = useState<string>('#ea580c');
  const [customBaseColor, setCustomBaseColor] = useState<string>('#d97706');

  // Color Sub-mode: 'frosting' | 'base'
  const [colorMode, setColorMode] = useState<'frosting' | 'base'>('frosting');

  // Items on canvas & Selected Item
  const [items, setItems] = useState<PlacedItem[]>(initialItems || []);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Active Category in top shelf
  const [activeCategory, setActiveCategory] = useState<DecorationCategory>('creatures');

  // History stack for Undo/Redo
  const [history, setHistory] = useState<
    { items: PlacedItem[]; frostingId: string; baseColorId: string }[]
  >([
    {
      items: initialItems || [],
      frostingId: initialFrostingId || dessert.defaultFrostingId,
      baseColorId: initialBaseColorId || dessert.defaultBaseColorId || 'classic-amber',
    },
  ]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);

  // Modals & UI states
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false);
  const [creationName, setCreationName] = useState(
    savedCreationName || `${dessert.name} - Готик бүтээл`
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted());
  const [isExporting, setIsExporting] = useState(false);

  // Canvas Ref
  const canvasRef = useRef<SVGSVGElement | null>(null);

  // Robust Drag State using window pointer events
  const dragInfoRef = useRef<{
    isDragging: boolean;
    itemId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    canvasRect: DOMRect | null;
  } | null>(null);

  // Show temporary toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Push new state into history
  const pushHistory = useCallback(
    (newItems: PlacedItem[], newFrostingId: string, newBaseColorId: string) => {
      const nextHistory = history.slice(0, historyIdx + 1);
      nextHistory.push({
        items: newItems,
        frostingId: newFrostingId,
        baseColorId: newBaseColorId,
      });
      setHistory(nextHistory);
      setHistoryIdx(nextHistory.length - 1);
    },
    [history, historyIdx]
  );

  // Undo handler
  const handleUndo = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setItems(prev.items);
      setFrostingId(prev.frostingId);
      setBaseColorId(prev.baseColorId);
      setHistoryIdx(historyIdx - 1);
      setSelectedItemId(null);
      soundEngine.playChime();
      showToast('Үйлдлийг буцаалаа');
    }
  };

  // Redo handler
  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setItems(next.items);
      setFrostingId(next.frostingId);
      setBaseColorId(next.baseColorId);
      setHistoryIdx(historyIdx + 1);
      setSelectedItemId(null);
      soundEngine.playChime();
      showToast('Үйлдлийг сэргээлээ');
    }
  };

  // Select Frosting Color
  const handleSelectFrosting = (fId: string) => {
    setFrostingId(fId);
    pushHistory(items, fId, baseColorId);
    soundEngine.playFrosting();
    showToast('Кремэн өнгөлгөө солигдлоо');
  };

  // Select Base Dough Color
  const handleSelectBaseColor = (bId: string) => {
    setBaseColorId(bId);
    pushHistory(items, frostingId, bId);
    soundEngine.playFrosting();
    showToast('Суурийн өнгө солигдлоо');
  };

  // Add Item to canvas
  const handleAddItem = (decorationId: string, posX?: number, posY?: number) => {
    const meta = ALL_DECORATIONS_MAP[decorationId];
    const defaultScale = meta?.defaultScale || 1.15;

    const jitterX = posX !== undefined ? posX : 48 + (Math.random() * 8 - 4);
    const jitterY = posY !== undefined ? posY : 48 + (Math.random() * 8 - 4);

    const maxZ = items.reduce((max, i) => Math.max(max, i.zIndex), 0);

    const newItem: PlacedItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      decorationId,
      x: Math.max(8, Math.min(92, jitterX)),
      y: Math.max(8, Math.min(92, jitterY)),
      scale: defaultScale,
      rotation: Math.round(Math.random() * 16 - 8),
      zIndex: maxZ + 1,
    };

    const nextItems = [...items, newItem];
    setItems(nextItems);
    setSelectedItemId(newItem.id);
    pushHistory(nextItems, frostingId, baseColorId);
    soundEngine.playPop();
    showToast(`${meta?.name || 'Чимэглэл'} нэмэгдлээ`);
  };

  // Update selected item properties
  const updateSelectedItem = (updater: (prev: PlacedItem) => PlacedItem) => {
    if (!selectedItemId) return;
    const nextItems = items.map((it) => (it.id === selectedItemId ? updater(it) : it));
    setItems(nextItems);
  };

  // Commit updated items to history
  const commitItemChanges = () => {
    pushHistory(items, frostingId, baseColorId);
  };

  // Nudge selected item in cardinal directions
  const handleNudge = (dx: number, dy: number) => {
    if (!selectedItemId) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedItemId
          ? {
              ...it,
              x: Math.max(5, Math.min(95, it.x + dx)),
              y: Math.max(5, Math.min(95, it.y + dy)),
            }
          : it
      )
    );
    soundEngine.playChime();
    commitItemChanges();
  };

  // Delete selected item
  const handleDeleteSelected = () => {
    if (!selectedItemId) return;
    const nextItems = items.filter((it) => it.id !== selectedItemId);
    setItems(nextItems);
    setSelectedItemId(null);
    pushHistory(nextItems, frostingId, baseColorId);
    soundEngine.playDelete();
    showToast('Чимэглэлийг хаслаа');
  };

  // Duplicate selected item
  const handleDuplicateSelected = () => {
    const current = items.find((i) => i.id === selectedItemId);
    if (!current) return;
    const maxZ = items.reduce((max, i) => Math.max(max, i.zIndex), 0);
    const dup: PlacedItem = {
      ...current,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      x: Math.min(88, current.x + 6),
      y: Math.min(88, current.y + 6),
      zIndex: maxZ + 1,
    };
    const nextItems = [...items, dup];
    setItems(nextItems);
    setSelectedItemId(dup.id);
    pushHistory(nextItems, frostingId, baseColorId);
    soundEngine.playPop();
    showToast('Чимэглэлийг хувиллаа');
  };

  // Layering controls
  const handleBringForward = () => {
    if (!selectedItemId) return;
    const current = items.find((i) => i.id === selectedItemId);
    if (!current) return;
    const nextItems = items.map((it) =>
      it.id === selectedItemId ? { ...it, zIndex: it.zIndex + 2 } : it
    );
    setItems(nextItems);
    pushHistory(nextItems, frostingId, baseColorId);
    soundEngine.playChime();
    showToast('Давхаргыг урагшлуулав');
  };

  const handleSendBackward = () => {
    if (!selectedItemId) return;
    const current = items.find((i) => i.id === selectedItemId);
    if (!current) return;
    const nextItems = items.map((it) =>
      it.id === selectedItemId ? { ...it, zIndex: Math.max(1, it.zIndex - 2) } : it
    );
    setItems(nextItems);
    pushHistory(nextItems, frostingId, baseColorId);
    soundEngine.playChime();
    showToast('Давхаргыг хойшлуулав');
  };

  // Clear All
  const handleConfirmClear = () => {
    setItems([]);
    setSelectedItemId(null);
    pushHistory([], frostingId, baseColorId);
    setIsClearModalOpen(false);
    soundEngine.playDelete();
    showToast('Бүх чимэглэлийг арилгалаа');
  };

  // HTML5 Drag & Drop from Shelf
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const decorationId = e.dataTransfer.getData('text/plain');
    if (!decorationId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    handleAddItem(decorationId, percentX, percentY);
  };

  // ROBUST DRAGGING ENGINE WITH WINDOW LISTENERS
  const startDragging = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemId(id);
    soundEngine.playChime();

    const targetItem = items.find((it) => it.id === id);
    if (!targetItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    dragInfoRef.current = {
      isDragging: true,
      itemId: id,
      startX: e.clientX,
      startY: e.clientY,
      origX: targetItem.x,
      origY: targetItem.y,
      canvasRect: rect,
    };
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const info = dragInfoRef.current;
      if (!info || !info.isDragging || !info.canvasRect) return;

      const deltaPxX = e.clientX - info.startX;
      const deltaPxY = e.clientY - info.startY;

      const deltaPercentX = (deltaPxX / info.canvasRect.width) * 100;
      const deltaPercentY = (deltaPxY / info.canvasRect.height) * 100;

      const newX = Math.max(5, Math.min(95, Math.round((info.origX + deltaPercentX) * 10) / 10));
      const newY = Math.max(5, Math.min(95, Math.round((info.origY + deltaPercentY) * 10) / 10));

      setItems((prev) =>
        prev.map((it) => (it.id === info.itemId ? { ...it, x: newX, y: newY } : it))
      );
    };

    const handleGlobalPointerUp = () => {
      if (dragInfoRef.current?.isDragging) {
        dragInfoRef.current = null;
        commitItemChanges();
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: false });
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [items, frostingId, baseColorId]);

  // Save to My Creations
  const handleSaveCreation = async () => {
    if (!canvasRef.current) return;
    try {
      const thumbnail = await generateThumbnailDataUrl(canvasRef.current);
      const creationId = savedCreationId || `creation-${Date.now()}`;
      const creation: SavedCreation = {
        id: creationId,
        name: creationName.trim() || `${dessert.name} - Готик бүтээл`,
        dessertId: dessert.id,
        frostingId,
        baseColorId,
        items,
        savedAt: new Date().toISOString(),
        thumbnailDataUrl: thumbnail,
      };

      const existingJson = localStorage.getItem('halloween_creations');
      let creationsList: SavedCreation[] = [];
      if (existingJson) {
        try {
          creationsList = JSON.parse(existingJson);
        } catch {
          creationsList = [];
        }
      }

      creationsList = creationsList.filter((c) => c.id !== creation.id);
      creationsList.unshift(creation);

      localStorage.setItem('halloween_creations', JSON.stringify(creationsList));
      soundEngine.playCelebration();
      showToast('Бүтээл таны "Миний бүтээлүүд"-д хадгалагдлаа!');
    } catch {
      showToast('Бүтээлийг хадгалахад алдаа гарлаа');
    }
  };

  // Download PNG image
  const handleDownloadImage = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    soundEngine.playChime();
    try {
      const safeName = (creationName.trim() || dessert.name)
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
      await exportSvgToPng(canvasRef.current, `halloween_${safeName}`);
      showToast('Зургийг амжилттай татаж авлаа!');
    } catch {
      showToast('Зураг татахад алдаа гарлаа');
    } finally {
      setIsExporting(false);
    }
  };

  // Finished trigger
  const handleOpenFinished = () => {
    setIsFinishedModalOpen(true);
    soundEngine.playCelebration();
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#9333ea', '#facc15', '#f8fafc', '#10b981', '#18181b'],
      });
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  const selectedItem = items.find((it) => it.id === selectedItemId);
  const selectedMeta = selectedItem ? ALL_DECORATIONS_MAP[selectedItem.decorationId] : null;

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-[#070a12] text-[#fafaf9] select-none touch-none">
      {/* 1. COMPACT TOP WORKSHOP NAVIGATION BAR */}
      <header className="flex items-center justify-between px-3 sm:px-5 py-2 bg-[#0a0e1c] border-b border-indigo-950/80 backdrop-blur-md z-30 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBackToDesserts}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-full transition-colors cursor-pointer shrink-0"
            title="Өөр амттан сонгох"
          >
            <ChevronLeft className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Амттан</span>
          </button>

          <span className="text-xs sm:text-sm font-semibold tracking-wide text-orange-400 font-gothic truncate max-w-[140px] sm:max-w-xs">
            {dessert.name}
          </span>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            ({items.length} чимэглэл)
          </span>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIdx <= 0}
            className={`p-1.5 sm:p-2 rounded-full text-xs font-medium transition-colors ${
              historyIdx > 0
                ? 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700 cursor-pointer'
                : 'text-slate-600 bg-slate-900/40 cursor-not-allowed border border-transparent'
            }`}
            title="Буцаах (Undo)"
          >
            <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIdx >= history.length - 1}
            className={`p-1.5 sm:p-2 rounded-full text-xs font-medium transition-colors ${
              historyIdx < history.length - 1
                ? 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-slate-700 cursor-pointer'
                : 'text-slate-600 bg-slate-900/40 cursor-not-allowed border border-transparent'
            }`}
            title="Сэргээх (Redo)"
          >
            <Redo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Clear All */}
          <button
            onClick={() => setIsClearModalOpen(true)}
            disabled={items.length === 0}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-full flex items-center gap-1 transition-colors ${
              items.length > 0
                ? 'text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 cursor-pointer'
                : 'text-slate-600 bg-slate-900/40 cursor-not-allowed border border-transparent'
            }`}
            title="Бүх чимэглэлийг арилгах"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Арилгах</span>
          </button>

          {/* Download PNG */}
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-full transition-colors cursor-pointer"
            title="PNG зураг татах"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Зураг татах</span>
          </button>

          {/* Save Creation */}
          <button
            onClick={handleSaveCreation}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/70 rounded-full transition-colors cursor-pointer"
            title="Бүтээлээ хадгалах"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Хадгалах</span>
          </button>

          {/* Finished CTA button */}
          <button
            onClick={handleOpenFinished}
            className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-300 hover:to-amber-400 rounded-full shadow-sm shadow-orange-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Бэлэн</span>
          </button>

          {/* Sound Mute */}
          <button
            onClick={toggleSound}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-full bg-slate-900/50 hover:bg-slate-800 transition-colors cursor-pointer"
            title={isMuted ? 'Дуу асаах' : 'Дуу хаах'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
          </button>
        </div>
      </header>

      {/* 2. COMPACT TOP SELECTION SHELF: Categories & Items */}
      <div className="w-full bg-[#0a0d18] border-b border-indigo-950/70 z-20 shrink-0">
        {/* Category Tabs Strip */}
        <div className="flex items-center gap-1 px-3 py-1.5 overflow-x-auto no-scrollbar border-b border-indigo-950/50">
          {DECORATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                soundEngine.playChime();
              }}
              className={`py-1 px-3 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Shelf Content */}
        <div className="px-3 py-2 overflow-x-auto flex items-center gap-2 no-scrollbar min-h-[64px]">
          {/* A. Frosting / Base Color Category */}
          {activeCategory === 'frosting' && (
            <div className="flex items-center gap-3">
              {/* Mode Switch: Кремэн өнгөлгөө VS Суурийн өнгө */}
              <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-900 border border-slate-700 shrink-0">
                <button
                  onClick={() => setColorMode('frosting')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors cursor-pointer ${
                    colorMode === 'frosting'
                      ? 'bg-orange-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Кремэн өнгөлгөө
                </button>
                <button
                  onClick={() => setColorMode('base')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors cursor-pointer ${
                    colorMode === 'base'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Суурийн өнгө
                </button>
              </div>

              {/* Sub-mode: Frosting Colors */}
              {colorMode === 'frosting' && (
                <div className="flex items-center gap-2 shrink-0">
                  {/* Custom Frosting Picker */}
                  <label
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-orange-500 cursor-pointer shrink-0 text-xs text-slate-300"
                    title="Өөрийн хүссэн өнгө сонгох"
                  >
                    <input
                      type="color"
                      value={customFrostingColor}
                      onChange={(e) => {
                        setCustomFrostingColor(e.target.value);
                        handleSelectFrosting(e.target.value);
                      }}
                      className="w-5 h-5 rounded-full cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-[11px] font-medium hidden sm:inline">Өөрийн өнгө</span>
                  </label>

                  {/* 18 Frosting Presets */}
                  {FROSTING_OPTIONS.map((f) => {
                    const isSelected = f.id === frostingId || f.hex.toLowerCase() === frostingId.toLowerCase();
                    return (
                      <button
                        key={f.id}
                        onClick={() => handleSelectFrosting(f.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-left transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-orange-950/80 border-orange-500 shadow-md ring-1 ring-orange-500'
                            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80'
                        }`}
                        title={f.name}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-slate-700 shrink-0 relative"
                          style={{
                            background: `radial-gradient(circle at 35% 35%, ${f.secondaryHex}, ${f.hex} 70%, ${f.dripHex})`,
                          }}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white absolute inset-0 m-auto drop-shadow" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-slate-200 whitespace-nowrap">
                          {f.name.replace(' крем', '').replace(' чимэглэл', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sub-mode: Base Dough / Sponge Colors */}
              {colorMode === 'base' && (
                <div className="flex items-center gap-2 shrink-0">
                  {/* Custom Base Color Picker */}
                  <label
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-500 cursor-pointer shrink-0 text-xs text-slate-300"
                    title="Суурийн хүссэн өнгө сонгох"
                  >
                    <input
                      type="color"
                      value={customBaseColor}
                      onChange={(e) => {
                        setCustomBaseColor(e.target.value);
                        handleSelectBaseColor(e.target.value);
                      }}
                      className="w-5 h-5 rounded-full cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-[11px] font-medium hidden sm:inline">Өөрийн өнгө</span>
                  </label>

                  {/* Base Dough Presets */}
                  {BASE_COLOR_OPTIONS.map((b) => {
                    const isSelected = b.id === baseColorId || b.hex.toLowerCase() === baseColorId.toLowerCase();
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleSelectBaseColor(b.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-left transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500'
                            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80'
                        }`}
                        title={b.name}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-slate-700 shrink-0 relative"
                          style={{
                            background: `radial-gradient(circle at 35% 35%, ${b.secondaryHex}, ${b.hex} 70%, ${b.darkHex})`,
                          }}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white absolute inset-0 m-auto drop-shadow" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-slate-200 whitespace-nowrap">
                          {b.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* B. Mythical Creatures category */}
          {activeCategory === 'creatures' && (
            <div className="flex items-center gap-2">
              {CREATURE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item.id)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-950 hover:border-orange-500 transition-all shrink-0 cursor-pointer shadow-sm group"
                  title={`${item.name} нэмэх`}
                >
                  <div className="w-8 h-8 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                    <DecorationVisual id={item.id} className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 group-hover:text-orange-300 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* C. Halloween category */}
          {activeCategory === 'halloween' && (
            <div className="flex items-center gap-2">
              {HALLOWEEN_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item.id)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-950 hover:border-purple-500 transition-all shrink-0 cursor-pointer shadow-sm group"
                  title={`${item.name} нэмэх`}
                >
                  <div className="w-8 h-8 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                    <DecorationVisual id={item.id} className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 group-hover:text-purple-300 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* D. Toppings category */}
          {activeCategory === 'toppings' && (
            <div className="flex items-center gap-2">
              {TOPPING_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item.id)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-950 hover:border-amber-500 transition-all shrink-0 cursor-pointer shadow-sm group"
                  title={`${item.name} нэмэх`}
                >
                  <div className="w-8 h-8 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                    <DecorationVisual id={item.id} className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 group-hover:text-amber-300 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* E. Sauces category */}
          {activeCategory === 'sauces' && (
            <div className="flex items-center gap-2">
              {SAUCE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item.id)}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-950 hover:border-red-500 transition-all shrink-0 cursor-pointer shadow-sm group"
                  title={`${item.name} нэмэх`}
                >
                  <div className="w-8 h-8 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                    <DecorationVisual id={item.id} className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 group-hover:text-red-300 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. MAXIMIZED DESSERT CANVAS STAGE (Full remaining screen height and width) */}
      <div
        className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative bg-[radial-gradient(ellipse_at_center,_#12182c_0%,_#060810_85%)] touch-none select-none"
        onClick={() => setSelectedItemId(null)}
      >
        {/* Glow backdrop */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-orange-950/20 blur-3xl pointer-events-none" />

        {/* Large Dessert Stage Container */}
        <div className="relative w-full h-full max-w-[780px] max-h-[780px] aspect-square flex items-center justify-center touch-none">
          <svg
            ref={canvasRef}
            viewBox="0 0 600 600"
            className="w-full h-full drop-shadow-2xl touch-none select-none"
            style={{ touchAction: 'none' }}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            {/* Dessert Base Layer with Dynamic Frosting AND Base Dough Colors */}
            <DessertVisual
              dessertId={dessert.id}
              frostingId={frostingId}
              baseColorId={baseColorId}
            />

            {/* Placed Decorations Layer (Sorted by zIndex) */}
            {[...items]
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((item) => {
                const isSelected = item.id === selectedItemId;
                const cx = (item.x / 100) * 600;
                const cy = (item.y / 100) * 600;
                const itemSize = 90 * item.scale;
                const half = itemSize / 2;

                return (
                  <g
                    key={item.id}
                    transform={`translate(${cx}, ${cy}) rotate(${item.rotation})`}
                    onPointerDown={(e) => startDragging(e, item.id)}
                    className="cursor-grab active:cursor-grabbing touch-none"
                    style={{ touchAction: 'none' }}
                  >
                    {/* Generous invisible touch hit area for comfortable effortless mobile dragging */}
                    <circle
                      cx="0"
                      cy="0"
                      r={Math.max(half + 18, 40)}
                      fill="transparent"
                      pointerEvents="all"
                    />

                    {/* Selection Spooky Ring */}
                    {isSelected && (
                      <g pointerEvents="none">
                        <circle
                          cx="0"
                          cy="0"
                          r={half + 8}
                          fill="none"
                          stroke="#ea580c"
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                          className="animate-spin"
                          style={{ animationDuration: '8s' }}
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={half + 12}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                      </g>
                    )}

                    {/* Item Visual placed centrally at origin */}
                    <g transform={`translate(${-half}, ${-half})`} pointerEvents="none">
                      <svg
                        width={itemSize}
                        height={itemSize}
                        viewBox="0 0 100 100"
                        style={{ overflow: 'visible' }}
                      >
                        <DecorationVisual id={item.decorationId} className="w-full h-full" />
                      </svg>
                    </g>
                  </g>
                );
              })}
          </svg>

          {/* Empty Canvas Prompt Overlay */}
          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <div className="p-3.5 rounded-[30px] bg-black/60 backdrop-blur-md border border-orange-500/30 max-w-xs animate-float-slow">
                <Sparkles className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
                <p className="text-xs sm:text-sm font-semibold text-slate-200">
                  Дээрх цэснээс сонгоод чимэглээрэй!
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Чимэглэлээ хүссэнээрээ чирч, эргүүлж, томруулж болно.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4. COMPACT FLOATING INSPECTOR TOOLBAR (When an item is selected) */}
        {selectedItem && selectedMeta && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-lg p-2.5 rounded-3xl bg-[#0c1020]/95 border border-orange-500/50 shadow-2xl backdrop-blur-md z-30 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="font-semibold text-orange-300 truncate max-w-[200px]">
                  {selectedMeta.name}
                </span>
              </div>

              {/* Nudge arrow buttons for precise positioning */}
              <div className="flex items-center gap-0.5 bg-slate-900 rounded-full px-1.5 py-0.5 border border-slate-800">
                <button
                  onClick={() => handleNudge(-3, 0)}
                  className="p-1 hover:text-orange-300 cursor-pointer"
                  title="Зүүн тийш шилжүүлэх"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNudge(0, -3)}
                  className="p-1 hover:text-orange-300 cursor-pointer"
                  title="Дээш шилжүүлэх"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNudge(0, 3)}
                  className="p-1 hover:text-orange-300 cursor-pointer"
                  title="Доош шилжүүлэх"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNudge(3, 0)}
                  className="p-1 hover:text-orange-300 cursor-pointer"
                  title="Баруун тийш шилжүүлэх"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => setSelectedItemId(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
                title="Хаах"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick buttons & Sliders in one compact row */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Scale Controls */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Хэмжээ:</span>
                  <span className="font-mono text-slate-300">
                    {Math.round(selectedItem.scale * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      updateSelectedItem((prev) => ({
                        ...prev,
                        scale: Math.max(0.4, Math.round((prev.scale - 0.1) * 10) / 10),
                      }));
                      commitItemChanges();
                    }}
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="range"
                    min="0.4"
                    max="2.5"
                    step="0.05"
                    value={selectedItem.scale}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateSelectedItem((prev) => ({ ...prev, scale: val }));
                    }}
                    onMouseUp={commitItemChanges}
                    onTouchEnd={commitItemChanges}
                    className="flex-1 accent-orange-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      updateSelectedItem((prev) => ({
                        ...prev,
                        scale: Math.min(2.5, Math.round((prev.scale + 0.1) * 10) / 10),
                      }));
                      commitItemChanges();
                    }}
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rotate Controls */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Эргүүлэх:</span>
                  <span className="font-mono text-slate-300">{selectedItem.rotation}°</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      updateSelectedItem((prev) => ({
                        ...prev,
                        rotation: (prev.rotation - 15 + 360) % 360,
                      }));
                      commitItemChanges();
                    }}
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                    title="-15°"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={selectedItem.rotation}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      updateSelectedItem((prev) => ({ ...prev, rotation: val }));
                    }}
                    onMouseUp={commitItemChanges}
                    onTouchEnd={commitItemChanges}
                    className="flex-1 accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      updateSelectedItem((prev) => ({
                        ...prev,
                        rotation: (prev.rotation + 15) % 360,
                      }));
                      commitItemChanges();
                    }}
                    className="p-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                    title="+15°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleBringForward}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer"
                  title="Урагшлуулах"
                >
                  <ArrowUp className="w-3 h-3 text-cyan-400" />
                  <span>Урагш</span>
                </button>
                <button
                  onClick={handleSendBackward}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer"
                  title="Хойшлуулах"
                >
                  <ArrowDown className="w-3 h-3 text-indigo-400" />
                  <span>Хойш</span>
                </button>
                <button
                  onClick={handleDuplicateSelected}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer"
                  title="Хувилах"
                >
                  <Copy className="w-3 h-3 text-emerald-400" />
                  <span>Хувилах</span>
                </button>
              </div>

              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 px-3 py-1 text-xs text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 border border-red-800/60 rounded-full cursor-pointer"
                title="Устгах"
              >
                <Trash2 className="w-3 h-3" />
                <span>Устгах</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TOAST MESSAGE NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/95 border border-orange-500/60 text-orange-200 text-xs shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2 duration-150">
          <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CLEAR ALL CONFIRMATION MODAL */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-[#0e1424] border border-red-900/60 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-950/80 border border-red-700 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-gothic">
                Бүх чимэглэлийг арилгах уу?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Таны амттан дээр тавьсан бүх чимэглэлүүд арилж, цэвэр суурь үлдэнэ.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="px-5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer"
              >
                Болих
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-full shadow-md cursor-pointer"
              >
                Тийм, бүгдийг арилга
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FINISHED CELEBRATION MODAL */}
      {isFinishedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-[35px] bg-[#0f1424] border border-orange-500/50 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-950/80 border-2 border-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-8 h-8 text-orange-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-orange-300 font-gothic">
                Гайхамшигтай бүтээл боллоо!
              </h3>
              <p className="text-xs text-slate-400">
                Шөнө дундын шидэт нарийн боовны урлан таны амттанг бахдан сайшааж байна.
              </p>
            </div>

            {/* Creation Name Input */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Бүтээлдээ нэр өгөх:</label>
              <input
                type="text"
                value={creationName}
                onChange={(e) => setCreationName(e.target.value)}
                placeholder="Жишээ: Шөнийн луут бялуу"
                className="w-full px-4 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Buttons in rounded-full oval shapes */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={async () => {
                  await handleSaveCreation();
                  setIsFinishedModalOpen(false);
                  onOpenMyCreations();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                Хадгалаад миний бүтээлүүд рүү очих
              </button>

              <button
                onClick={async () => {
                  await handleDownloadImage();
                }}
                className="w-full py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>PNG зураг болгон татах</span>
              </button>

              <button
                onClick={() => setIsFinishedModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors cursor-pointer"
              >
                Үргэлжлүүлэн засах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
