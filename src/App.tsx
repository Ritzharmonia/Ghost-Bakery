/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, DessertId, PlacedItem, SavedCreation } from './types';
import { DESSERTS, DESSERTS_MAP } from './data/desserts';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { DessertPicker } from './components/DessertPicker';
import { Workshop } from './components/Workshop';
import { RecipeBook } from './components/RecipeBook';
import { MyCreations } from './components/MyCreations';
import { soundEngine } from './utils/audio';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [activeDessertId, setActiveDessertId] = useState<DessertId>('pumpkin-pie');

  // Workshop editing state
  const [editingCreation, setEditingCreation] = useState<{
    id?: string;
    name?: string;
    frostingId?: string;
    baseColorId?: string;
    items?: PlacedItem[];
  } | null>(null);

  // Saved creations counter for header
  const [savedCount, setSavedCount] = useState<number>(0);

  // Initialize audio and count from localStorage
  const refreshSavedCount = () => {
    try {
      const raw = localStorage.getItem('halloween_creations');
      if (raw) {
        const list = JSON.parse(raw);
        setSavedCount(Array.isArray(list) ? list.length : 0);
      } else {
        setSavedCount(0);
      }
    } catch {
      setSavedCount(0);
    }
  };

  useEffect(() => {
    soundEngine.init();
    refreshSavedCount();
  }, [activeScreen]);

  // Handlers
  const handleSelectDessert = (id: DessertId) => {
    setActiveDessertId(id);
    setEditingCreation(null); // fresh start
    setActiveScreen('workshop');
  };

  const handleEditSavedCreation = (creation: SavedCreation) => {
    setActiveDessertId(creation.dessertId);
    setEditingCreation({
      id: creation.id,
      name: creation.name,
      frostingId: creation.frostingId,
      baseColorId: creation.baseColorId,
      items: creation.items,
    });
    setActiveScreen('workshop');
  };

  const currentDessert = DESSERTS_MAP[activeDessertId] || DESSERTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-[#fafaf9] selection:bg-orange-500 selection:text-black">
      {/* Top Bar Contract Navigation */}
      {activeScreen !== 'workshop' && (
        <Header
          activeScreen={activeScreen}
          onNavigate={(screen) => setActiveScreen(screen)}
          savedCount={savedCount}
        />
      )}

      {/* Main Screens */}
      {activeScreen === 'home' && (
        <HomeView
          onStartDecorating={() => setActiveScreen('choose')}
          onSelectDessert={handleSelectDessert}
          onOpenMyCreations={() => setActiveScreen('creations')}
          onOpenRecipeBook={() => setActiveScreen('recipes')}
        />
      )}

      {activeScreen === 'choose' && (
        <DessertPicker
          onSelectDessert={handleSelectDessert}
          onBackToHome={() => setActiveScreen('home')}
        />
      )}

      {activeScreen === 'workshop' && (
        <Workshop
          dessert={currentDessert}
          initialFrostingId={editingCreation?.frostingId}
          initialBaseColorId={editingCreation?.baseColorId}
          initialItems={editingCreation?.items}
          savedCreationId={editingCreation?.id}
          savedCreationName={editingCreation?.name}
          onBackToDesserts={() => setActiveScreen('choose')}
          onOpenMyCreations={() => {
            refreshSavedCount();
            setActiveScreen('creations');
          }}
          onOpenRecipeBook={() => setActiveScreen('recipes')}
        />
      )}

      {activeScreen === 'recipes' && (
        <RecipeBook
          initialDessertId={activeDessertId}
          onSelectForDecorating={(id) => {
            setActiveDessertId(id);
            setEditingCreation(null);
            setActiveScreen('workshop');
          }}
          onBackToHome={() => setActiveScreen('home')}
        />
      )}

      {activeScreen === 'creations' && (
        <MyCreations
          onEditCreation={handleEditSavedCreation}
          onStartNew={() => setActiveScreen('choose')}
          onBackToHome={() => setActiveScreen('home')}
        />
      )}
    </div>
  );
}
