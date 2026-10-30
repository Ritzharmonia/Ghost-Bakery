import { DecorationItem, FrostingOption } from '../types';

export const FROSTING_OPTIONS: FrostingOption[] = [
  {
    id: 'vanilla',
    name: 'Ванильтай крем',
    hex: '#fef08a',
    secondaryHex: '#fef9c3',
    dripHex: '#fde047',
  },
  {
    id: 'chocolate',
    name: 'Шоколадтай крем',
    hex: '#5c2c16',
    secondaryHex: '#78350f',
    dripHex: '#451a03',
  },
  {
    id: 'dark-chocolate',
    name: 'Хар шоколадан крем',
    hex: '#1c1917',
    secondaryHex: '#292524',
    dripHex: '#0c0a09',
  },
  {
    id: 'pumpkin',
    name: 'Хулууны өнгөт крем',
    hex: '#ea580c',
    secondaryHex: '#f97316',
    dripHex: '#c2410c',
  },
  {
    id: 'white-icing',
    name: 'Цагаан мөсөн чимэглэл',
    hex: '#f8fafc',
    secondaryHex: '#ffffff',
    dripHex: '#e2e8f0',
  },
  {
    id: 'purple',
    name: 'Нил ягаан крем',
    hex: '#7e22ce',
    secondaryHex: '#a855f7',
    dripHex: '#6b21a8',
  },
  {
    id: 'blood-crimson',
    name: 'Цусны улаан крем',
    hex: '#991b1b',
    secondaryHex: '#b91c1c',
    dripHex: '#7f1d1d',
  },
  {
    id: 'toxic-green',
    name: 'Хортой ногоон крем',
    hex: '#22c55e',
    secondaryHex: '#4ade80',
    dripHex: '#16a34a',
  },
  {
    id: 'phantom-cyan',
    name: 'Сүнсний цэнхэр крем',
    hex: '#06b6d4',
    secondaryHex: '#22d3ee',
    dripHex: '#0891b2',
  },
  {
    id: 'strawberry',
    name: 'Гүзээлзгэний крем',
    hex: '#f43f5e',
    secondaryHex: '#fb7185',
    dripHex: '#e11d48',
  },
  {
    id: 'spiced-gold',
    name: 'Алтан шаргал крем',
    hex: '#eab308',
    secondaryHex: '#facc15',
    dripHex: '#ca8a04',
  },
  {
    id: 'emerald',
    name: 'Маргад ногоон крем',
    hex: '#047857',
    secondaryHex: '#059669',
    dripHex: '#065f46',
  },
  {
    id: 'lavender',
    name: 'Лаванда ягаан крем',
    hex: '#c084fc',
    secondaryHex: '#d8b4fe',
    dripHex: '#9333ea',
  },
  {
    id: 'sweet-pink',
    name: 'Чихрийн ягаан крем',
    hex: '#f472b6',
    secondaryHex: '#f9a8d4',
    dripHex: '#db2777',
  },
  {
    id: 'abyssal-navy',
    name: 'Харанхуйн хөх крем',
    hex: '#1e1b4b',
    secondaryHex: '#312e81',
    dripHex: '#0f172a',
  },
  {
    id: 'blackberry',
    name: 'Бөөрөлзгөний крем',
    hex: '#831843',
    secondaryHex: '#9d174d',
    dripHex: '#500724',
  },
  {
    id: 'silver-mist',
    name: 'Мөнгөлөг саарал крем',
    hex: '#94a3b8',
    secondaryHex: '#cbd5e1',
    dripHex: '#64748b',
  },
  {
    id: 'caramel-toffee',
    name: 'Карамель крем',
    hex: '#d97706',
    secondaryHex: '#f59e0b',
    dripHex: '#b45309',
  },
];

export interface BaseColorOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  darkHex: string;
}

export const BASE_COLOR_OPTIONS: BaseColorOption[] = [
  {
    id: 'classic-amber',
    name: 'Алтан шаргал',
    hex: '#d97706',
    secondaryHex: '#f59e0b',
    darkHex: '#78350f',
  },
  {
    id: 'dark-choco',
    name: 'Хар шоколад',
    hex: '#291205',
    secondaryHex: '#451a03',
    darkHex: '#140702',
  },
  {
    id: 'red-velvet',
    name: 'Улаан хилэн',
    hex: '#7f1d1d',
    secondaryHex: '#991b1b',
    darkHex: '#450a0a',
  },
  {
    id: 'pumpkin-spice',
    name: 'Шидэт хулуу',
    hex: '#ea580c',
    secondaryHex: '#f97316',
    darkHex: '#9a3412',
  },
  {
    id: 'matcha-green',
    name: 'Матча ногоон',
    hex: '#15803d',
    secondaryHex: '#22c55e',
    darkHex: '#14532d',
  },
  {
    id: 'black-charcoal',
    name: 'Шөнийн нүүрс',
    hex: '#18181b',
    secondaryHex: '#27272a',
    darkHex: '#09090b',
  },
  {
    id: 'ghost-white',
    name: 'Цагаан гантиг',
    hex: '#e2e8f0',
    secondaryHex: '#f8fafc',
    darkHex: '#94a3b8',
  },
  {
    id: 'violet-taro',
    name: 'Нил ягаан таро',
    hex: '#6b21a8',
    secondaryHex: '#9333ea',
    darkHex: '#3b0764',
  },
  {
    id: 'berry-pink',
    name: 'Гүзээлзгэнэтэй',
    hex: '#db2777',
    secondaryHex: '#f472b6',
    darkHex: '#831843',
  },
];

export const DECORATION_CATEGORIES: { id: 'frosting' | 'creatures' | 'halloween' | 'toppings' | 'sauces'; name: string }[] = [
  { id: 'frosting', name: 'Кремэн өнгөлгөө' },
  { id: 'creatures', name: 'Домогт амьтад' },
  { id: 'halloween', name: 'Halloween чимэглэл' },
  { id: 'toppings', name: 'Амттангийн нэмэлтүүд' },
  { id: 'sauces', name: 'Амтлагч, соус' },
];

export const CREATURE_ITEMS: DecorationItem[] = [
  {
    id: 'cr-dragon',
    name: 'Шидэт Луу',
    category: 'creatures',
    defaultScale: 1.3,
  },
  {
    id: 'cr-phoenix',
    name: 'Галт шувуу (Финикс)',
    category: 'creatures',
    defaultScale: 1.25,
  },
  {
    id: 'cr-vampire',
    name: 'Цус сорогч Дракула',
    category: 'creatures',
    defaultScale: 1.2,
  },
  {
    id: 'cr-frankenstein',
    name: 'Франкенштейн',
    category: 'creatures',
    defaultScale: 1.2,
  },
  {
    id: 'cr-werewolf',
    name: 'Хүн чоно',
    category: 'creatures',
    defaultScale: 1.2,
  },
  {
    id: 'cr-mummy',
    name: 'Египет Мумми',
    category: 'creatures',
    defaultScale: 1.15,
  },
  {
    id: 'cr-mermaid',
    name: 'Готик Лусын дагина',
    category: 'creatures',
    defaultScale: 1.25,
  },
  {
    id: 'cr-kraken',
    name: 'Далайн Кракен тэмтрүүл',
    category: 'creatures',
    defaultScale: 1.25,
  },
  {
    id: 'cr-gargoyle',
    name: 'Чулуун Гаргайль',
    category: 'creatures',
    defaultScale: 1.2,
  },
  {
    id: 'cr-cerberus',
    name: 'Гурван толгойт Цербер',
    category: 'creatures',
    defaultScale: 1.3,
  },
  {
    id: 'cr-pegasus',
    name: 'Шидэт Эвэрт Пегас',
    category: 'creatures',
    defaultScale: 1.25,
  },
  {
    id: 'cr-griffin',
    name: 'Сүрлэг Грифон',
    category: 'creatures',
    defaultScale: 1.25,
  },
  {
    id: 'cr-medusa',
    name: 'Могой үст Медуза',
    category: 'creatures',
    defaultScale: 1.2,
  },
  {
    id: 'cr-witch',
    name: 'Шидэт Шулам',
    category: 'creatures',
    defaultScale: 1.2,
  },
];

export const TOPPING_ITEMS: DecorationItem[] = [
  {
    id: 'topping-choc-shavings',
    name: 'Шоколадны үйрмэг',
    category: 'toppings',
    defaultScale: 1.0,
  },
  {
    id: 'topping-sprinkles',
    name: 'Өнгө өнгийн цацлага',
    category: 'toppings',
    defaultScale: 1.0,
  },
  {
    id: 'topping-sugar-pearls',
    name: 'Чихрийн сувд',
    category: 'toppings',
    defaultScale: 0.9,
  },
  {
    id: 'topping-mini-eyes',
    name: 'Жижиг нүдэн чихэр',
    category: 'toppings',
    defaultScale: 0.85,
  },
  {
    id: 'topping-marshmallows',
    name: 'Зефир',
    category: 'toppings',
    defaultScale: 1.1,
  },
  {
    id: 'topping-sugar-crystals',
    name: 'Элсэн чихрийн талст',
    category: 'toppings',
    defaultScale: 0.95,
  },
  {
    id: 'topping-candy-corn',
    name: 'Чихэрлэг эрдэнэ шиш',
    category: 'toppings',
    defaultScale: 1.0,
  },
];

export const HALLOWEEN_ITEMS: DecorationItem[] = [
  {
    id: 'hw-ghost',
    name: 'Жижиг сүнс',
    category: 'halloween',
    defaultScale: 1.2,
  },
  {
    id: 'hw-pumpkin',
    name: 'Хулуу',
    category: 'halloween',
    defaultScale: 1.2,
  },
  {
    id: 'hw-black-cat',
    name: 'Хар муур',
    category: 'halloween',
    defaultScale: 1.15,
  },
  {
    id: 'hw-bat',
    name: 'Сарьсан багваахай',
    category: 'halloween',
    defaultScale: 1.2,
  },
  {
    id: 'hw-spider-web',
    name: 'Аалзны тор',
    category: 'halloween',
    defaultScale: 1.3,
  },
  {
    id: 'hw-bones',
    name: 'Сахлын яс',
    category: 'halloween',
    defaultScale: 1.0,
  },
  {
    id: 'hw-witch-hat',
    name: 'Шуламын малгай',
    category: 'halloween',
    defaultScale: 1.15,
  },
  {
    id: 'hw-tombstone',
    name: 'Булшны чулуу',
    category: 'halloween',
    defaultScale: 1.25,
  },
  {
    id: 'hw-black-rose',
    name: 'Хар сарнай',
    category: 'halloween',
    defaultScale: 1.1,
  },
  {
    id: 'hw-moon-stars',
    name: 'Сар, од',
    category: 'halloween',
    defaultScale: 1.2,
  },
  {
    id: 'hw-eyeball',
    name: 'Нүдэн чимэглэл',
    category: 'halloween',
    defaultScale: 1.0,
  },
];

export const SAUCE_ITEMS: DecorationItem[] = [
  {
    id: 'sauce-chocolate',
    name: 'Шоколадны соус',
    category: 'sauces',
    defaultScale: 1.3,
  },
  {
    id: 'sauce-strawberry',
    name: 'Гүзээлзгэний сироп',
    category: 'sauces',
    defaultScale: 1.3,
  },
  {
    id: 'sauce-caramel',
    name: 'Карамель',
    category: 'sauces',
    defaultScale: 1.3,
  },
  {
    id: 'sauce-blackberry',
    name: 'Бөөрөлзгөний чанамал',
    category: 'sauces',
    defaultScale: 1.25,
  },
  {
    id: 'sauce-puree',
    name: 'Жимсний нухаш',
    category: 'sauces',
    defaultScale: 1.2,
  },
];

export const ALL_DECORATIONS_MAP: Record<string, DecorationItem> = [
  ...CREATURE_ITEMS,
  ...TOPPING_ITEMS,
  ...HALLOWEEN_ITEMS,
  ...SAUCE_ITEMS,
].reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, DecorationItem>);
