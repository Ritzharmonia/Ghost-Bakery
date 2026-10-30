export type DessertId =
  | 'pumpkin-pie'
  | 'ghost-cookie'
  | 'chocolate-cupcake'
  | 'layered-cake'
  | 'spooky-donut'
  | 'witch-hat'
  | 'macaron'
  | 'gingerbread-house'
  | 'candy-orb'
  | 'gothic-heart';

export interface FrostingOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  dripHex: string;
}

export type DecorationCategory = 'frosting' | 'creatures' | 'halloween' | 'toppings' | 'sauces';

export interface DecorationItem {
  id: string;
  name: string;
  category: DecorationCategory;
  defaultScale?: number;
  tags?: string[];
}

export interface PlacedItem {
  id: string;
  decorationId: string;
  x: number; // percentage from 0 to 100 within canvas
  y: number; // percentage from 0 to 100 within canvas
  scale: number; // scale multiplier 0.4 - 2.5
  rotation: number; // angle in degrees 0 - 360
  zIndex: number;
}

export interface DessertRecipe {
  id: DessertId;
  name: string;
  tagline: string;
  temperature: string;
  duration: string;
  servings: string;
  difficulty: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  bakerTip: string;
}

export interface DessertDefinition {
  id: DessertId;
  name: string;
  description: string;
  defaultFrostingId: string;
  defaultBaseColorId?: string;
  plateType: 'silver-filigree' | 'gold-rim-ebony' | 'spider-porcelain' | 'coffin-tray';
  recipe: DessertRecipe;
}

export interface SavedCreation {
  id: string;
  name: string;
  dessertId: DessertId;
  frostingId: string;
  baseColorId?: string;
  items: PlacedItem[];
  savedAt: string;
  thumbnailDataUrl?: string;
}

export type ActiveScreen = 'home' | 'choose' | 'workshop' | 'creations' | 'recipes';
