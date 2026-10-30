import React from 'react';

interface DecorationVisualProps {
  id: string;
  className?: string;
}

export const DecorationVisual: React.FC<DecorationVisualProps> = ({ id, className = 'w-16 h-16' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="item-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
        </filter>
        <radialGradient id="pearl-glow" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
        <radialGradient id="candy-corn-yellow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
        <radialGradient id="eyeball-iris" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <linearGradient id="sauce-choc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3e1d0d" />
          <stop offset="100%" stopColor="#1a0b04" />
        </linearGradient>
        <linearGradient id="sauce-straw" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="sauce-caram" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="dragon-skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>
        <linearGradient id="phoenix-fire" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>
      </defs>

      {/* MYTHICAL CREATURES */}
      {id === 'cr-dragon' && (
        <g filter="url(#item-shadow)">
          {/* Wings */}
          <path d="M 50 45 Q 25 15 5 28 Q 15 45 25 55 Q 12 65 20 75 Q 35 65 50 60" fill="#064e3b" stroke="#022c22" strokeWidth="1.5" />
          <path d="M 50 45 Q 75 15 95 28 Q 85 45 75 55 Q 88 65 80 75 Q 65 65 50 60" fill="#064e3b" stroke="#022c22" strokeWidth="1.5" />
          {/* Dragon Horns */}
          <path d="M 40 32 Q 28 10 18 16 Q 30 25 38 35 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          <path d="M 60 32 Q 72 10 82 16 Q 70 25 62 35 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          {/* Dragon Head */}
          <polygon points="50,25 36,45 42,75 50,82 58,75 64,45" fill="url(#dragon-skin)" stroke="#022c22" strokeWidth="2" />
          {/* Snout scales & spines */}
          <polygon points="50,20 47,30 53,30" fill="#10b981" />
          <polygon points="50,33 46,42 54,42" fill="#10b981" />
          {/* Fiery eyes */}
          <polygon points="40,46 47,48 42,54" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <polygon points="60,46 53,48 58,54" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <circle cx="43" cy="50" r="1.5" fill="#000000" />
          <circle cx="57" cy="50" r="1.5" fill="#000000" />
          {/* Nostrils smoke */}
          <circle cx="46" cy="74" r="1.5" fill="#022c22" />
          <circle cx="54" cy="74" r="1.5" fill="#022c22" />
          <path d="M 46 76 Q 40 85 35 88" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M 54 76 Q 60 85 65 88" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      )}

      {id === 'cr-phoenix' && (
        <g filter="url(#item-shadow)">
          {/* Blazing Wings */}
          <path d="M 50 50 Q 20 20 8 40 Q 25 50 35 62 Q 20 70 30 82 Q 42 68 50 62" fill="url(#phoenix-fire)" stroke="#7c2d12" strokeWidth="1.5" />
          <path d="M 50 50 Q 80 20 92 40 Q 75 50 65 62 Q 80 70 70 82 Q 58 68 50 62" fill="url(#phoenix-fire)" stroke="#7c2d12" strokeWidth="1.5" />
          {/* Tail Embers */}
          <path d="M 45 75 Q 35 95 40 98 Q 48 90 48 78" fill="#ea580c" />
          <path d="M 55 75 Q 65 95 60 98 Q 52 90 52 78" fill="#ea580c" />
          <path d="M 50 78 Q 50 96 50 100" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
          {/* Phoenix Body & Head */}
          <ellipse cx="50" cy="52" rx="10" ry="18" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
          <circle cx="50" cy="35" r="9" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          {/* Flame Crest */}
          <path d="M 50 26 Q 42 12 48 8 Q 52 18 55 26" fill="#fef08a" />
          <path d="M 50 26 Q 58 14 62 10 Q 56 20 52 26" fill="#facc15" />
          {/* Golden Beak */}
          <polygon points="46,36 54,36 50,44" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="46" cy="34" r="1.5" fill="#450a0a" />
          <circle cx="54" cy="34" r="1.5" fill="#450a0a" />
        </g>
      )}

      {id === 'cr-vampire' && (
        <g filter="url(#item-shadow)">
          {/* Vampire High Winged Cape Collar */}
          <path d="M 22 25 Q 30 65 20 85 L 80 85 Q 70 65 78 25 Q 50 48 22 25 Z" fill="#450a0a" stroke="#18181b" strokeWidth="2" />
          <path d="M 30 50 L 50 82 L 70 50 L 50 62 Z" fill="#881337" />
          {/* Pale Face */}
          <ellipse cx="50" cy="46" rx="16" ry="19" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Widow's Peak Hair */}
          <path d="M 34 40 C 34 22 66 22 66 40 C 66 32 58 30 50 38 C 42 30 34 32 34 40 Z" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
          {/* Hypnotic Red Eyes */}
          <circle cx="44" cy="45" r="3" fill="#dc2626" />
          <circle cx="56" cy="45" r="3" fill="#dc2626" />
          <circle cx="44" cy="45" r="1.5" fill="#000000" />
          <circle cx="56" cy="45" r="1.5" fill="#000000" />
          {/* Vampire Fangs */}
          <path d="M 44 56 Q 50 58 56 56" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <polygon points="44,56 46,62 48,56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
          <polygon points="52,56 54,62 56,56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
          {/* Blood drip on chin */}
          <circle cx="55" cy="65" r="1.5" fill="#dc2626" />
          {/* Crimson Bowtie & Gem */}
          <polygon points="44,70 56,70 50,75" fill="#dc2626" />
          <polygon points="44,80 56,80 50,75" fill="#dc2626" />
          <circle cx="50" cy="75" r="2" fill="#facc15" />
        </g>
      )}

      {id === 'cr-frankenstein' && (
        <g filter="url(#item-shadow)">
          {/* Neck bolts */}
          <rect x="25" y="62" width="10" height="6" fill="#64748b" stroke="#334155" strokeWidth="1" />
          <rect x="65" y="62" width="10" height="6" fill="#64748b" stroke="#334155" strokeWidth="1" />
          {/* Green Monster Head */}
          <rect x="30" y="24" width="40" height="48" rx="8" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
          {/* Jagged Flat Hair */}
          <path d="M 30 36 L 30 24 L 70 24 L 70 36 L 63 30 L 57 37 L 50 29 L 43 37 L 37 30 Z" fill="#0f172a" />
          {/* Forehead Stitches */}
          <line x1="38" y1="36" x2="52" y2="34" stroke="#14532d" strokeWidth="2" />
          <line x1="41" y1="33" x2="41" y2="38" stroke="#14532d" strokeWidth="1.5" />
          <line x1="48" y1="32" x2="48" y2="37" stroke="#14532d" strokeWidth="1.5" />
          {/* Heavy Brow & Drowsy Eyes */}
          <line x1="38" y1="44" x2="48" y2="45" stroke="#166534" strokeWidth="2" />
          <line x1="52" y1="45" x2="62" y2="44" stroke="#166534" strokeWidth="2" />
          <circle cx="43" cy="48" r="3" fill="#f8fafc" stroke="#166534" strokeWidth="1" />
          <circle cx="57" cy="48" r="3" fill="#f8fafc" stroke="#166534" strokeWidth="1" />
          <circle cx="43" cy="48" r="1.5" fill="#000000" />
          <circle cx="57" cy="48" r="1.5" fill="#000000" />
          {/* Stitched Mouth */}
          <line x1="40" y1="62" x2="60" y2="60" stroke="#14532d" strokeWidth="2" />
          <line x1="44" y1="59" x2="44" y2="64" stroke="#14532d" strokeWidth="1.5" />
          <line x1="50" y1="58" x2="50" y2="63" stroke="#14532d" strokeWidth="1.5" />
          <line x1="56" y1="58" x2="56" y2="63" stroke="#14532d" strokeWidth="1.5" />
        </g>
      )}

      {id === 'cr-werewolf' && (
        <g filter="url(#item-shadow)">
          {/* Wolf Head with Spiky Fur */}
          <path
            d="M 50 18 Q 38 12 30 22 Q 22 20 25 35 Q 16 42 22 55 Q 18 68 32 75 Q 40 85 50 88 Q 60 85 68 75 Q 82 68 78 55 Q 84 42 75 35 Q 78 20 70 22 Q 62 12 50 18 Z"
            fill="#3f2e21"
            stroke="#1c120c"
            strokeWidth="2"
          />
          {/* Inner Ears */}
          <polygon points="32,24 28,34 38,32" fill="#78350f" />
          <polygon points="68,24 72,34 62,32" fill="#78350f" />
          {/* Fierce Snout & Fangs */}
          <ellipse cx="50" cy="62" rx="14" ry="12" fill="#291e16" />
          <polygon points="46,55 54,55 50,60" fill="#0f0c08" />
          <polygon points="42,66 45,74 48,67" fill="#ffffff" />
          <polygon points="52,67 55,74 58,66" fill="#ffffff" />
          {/* Glowing Lunar Eyes */}
          <polygon points="36,44 45,46 40,51" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <polygon points="64,44 55,46 60,51" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <line x1="39" y1="45" x2="39" y2="50" stroke="#000000" strokeWidth="1.5" />
          <line x1="61" y1="45" x2="61" y2="50" stroke="#000000" strokeWidth="1.5" />
        </g>
      )}

      {id === 'cr-mummy' && (
        <g filter="url(#item-shadow)">
          {/* Mummy Head shape */}
          <ellipse cx="50" cy="50" rx="26" ry="32" fill="#d6d3d1" stroke="#78716c" strokeWidth="2" />
          {/* Criss-crossing Bandages */}
          <path d="M 25 32 Q 50 38 75 32" stroke="#a8a29e" strokeWidth="5" fill="none" />
          <path d="M 24 45 Q 50 40 76 46" stroke="#e7e5e4" strokeWidth="5" fill="none" />
          <path d="M 25 58 Q 50 62 75 56" stroke="#a8a29e" strokeWidth="6" fill="none" />
          <path d="M 28 70 Q 50 66 72 72" stroke="#e7e5e4" strokeWidth="6" fill="none" />
          <path d="M 26 22 Q 50 26 74 20" stroke="#e7e5e4" strokeWidth="5" fill="none" />
          {/* Dark Eye Gap */}
          <polygon points="34,42 66,42 64,52 36,52" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
          {/* Luminous Ancient Eyes */}
          <circle cx="43" cy="47" r="3.5" fill="#facc15" />
          <circle cx="57" cy="47" r="3.5" fill="#facc15" />
          <circle cx="43" cy="47" r="1.5" fill="#000000" />
          <circle cx="57" cy="47" r="1.5" fill="#000000" />
          {/* Dangling loose cloth piece */}
          <path d="M 72 72 Q 80 82 76 90 Q 72 88 70 78" fill="#d6d3d1" stroke="#78716c" strokeWidth="1" />
        </g>
      )}

      {id === 'cr-mermaid' && (
        <g filter="url(#item-shadow)">
          {/* Gothic Siren / Mermaid */}
          {/* Curving fish tail */}
          <path d="M 50 55 Q 65 70 58 85 Q 52 92 62 98 Q 48 95 44 88 Q 42 75 50 55" fill="#0d9488" stroke="#042f2e" strokeWidth="1.5" />
          {/* Tail Fin */}
          <path d="M 62 98 Q 75 92 78 100 Q 65 102 58 98 Q 52 105 45 102 Q 52 94 62 98" fill="#14b8a6" stroke="#042f2e" strokeWidth="1" />
          {/* Torso & Head */}
          <ellipse cx="50" cy="42" rx="12" ry="16" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="50" cy="26" r="11" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Dark cascading Siren hair */}
          <path d="M 38 24 Q 30 40 34 60 Q 40 50 38 32 Q 44 14 50 14 Q 56 14 62 32 Q 60 50 66 60 Q 70 40 62 24 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="1.5" />
          {/* Sea Crown / Tiara */}
          <polygon points="44,16 47,8 50,14 53,8 56,16" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          {/* Pearl Eyes */}
          <circle cx="46" cy="26" r="1.5" fill="#06b6d4" />
          <circle cx="54" cy="26" r="1.5" fill="#06b6d4" />
          {/* Shell Top */}
          <circle cx="45" cy="42" r="3.5" fill="#a855f7" stroke="#6b21a8" strokeWidth="1" />
          <circle cx="55" cy="42" r="3.5" fill="#a855f7" stroke="#6b21a8" strokeWidth="1" />
        </g>
      )}

      {id === 'cr-kraken' && (
        <g filter="url(#item-shadow)">
          {/* Giant Kraken Tentacles */}
          <path d="M 30 85 Q 15 50 25 30 Q 35 15 42 24 Q 32 35 38 55 Q 40 70 30 85" fill="#7e22ce" stroke="#3b0764" strokeWidth="2" />
          <path d="M 70 85 Q 85 50 75 30 Q 65 15 58 24 Q 68 35 62 55 Q 60 70 70 85" fill="#7e22ce" stroke="#3b0764" strokeWidth="2" />
          <path d="M 50 85 Q 40 45 50 25 Q 55 18 58 28 Q 50 48 50 85" fill="#9333ea" stroke="#3b0764" strokeWidth="2" />
          {/* Suction cups */}
          <circle cx="24" cy="38" r="3" fill="#fbcfe8" stroke="#db2777" strokeWidth="0.8" />
          <circle cx="28" cy="52" r="3.5" fill="#fbcfe8" stroke="#db2777" strokeWidth="0.8" />
          <circle cx="76" cy="38" r="3" fill="#fbcfe8" stroke="#db2777" strokeWidth="0.8" />
          <circle cx="72" cy="52" r="3.5" fill="#fbcfe8" stroke="#db2777" strokeWidth="0.8" />
          {/* Menacing Golden Kraken Eye */}
          <circle cx="50" cy="72" r="14" fill="#a855f7" stroke="#3b0764" strokeWidth="2" />
          <circle cx="50" cy="72" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <line x1="50" y1="65" x2="50" y2="79" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {id === 'cr-gargoyle' && (
        <g filter="url(#item-shadow)">
          {/* Stone Wings */}
          <polygon points="50,45 20,20 10,40 25,55 35,50" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          <polygon points="50,45 80,20 90,40 75,55 65,50" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          {/* Horned Stone Head */}
          <ellipse cx="50" cy="45" rx="16" ry="18" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <polygon points="38,32 30,14 42,24" fill="#334155" stroke="#1e293b" strokeWidth="1" />
          <polygon points="62,32 70,14 58,24" fill="#334155" stroke="#1e293b" strokeWidth="1" />
          {/* Stone Fangs & Glowing Red Eyes */}
          <circle cx="43" cy="42" r="3" fill="#ef4444" />
          <circle cx="57" cy="42" r="3" fill="#ef4444" />
          <polygon points="45,52 48,58 50,52" fill="#f8fafc" />
          <polygon points="50,52 52,58 55,52" fill="#f8fafc" />
          {/* Crouching stone claws */}
          <rect x="35" y="62" width="30" height="18" rx="6" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
        </g>
      )}

      {id === 'cr-cerberus' && (
        <g filter="url(#item-shadow)">
          {/* 3 Hellhound Heads */}
          {/* Left Head */}
          <g transform="translate(-14, 0)">
            <ellipse cx="44" cy="44" rx="11" ry="14" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
            <polygon points="36,32 32,20 40,28" fill="#292524" />
            <circle cx="40" cy="42" r="2" fill="#ea580c" />
            <polygon points="38,50 42,56 46,50" fill="#ffffff" />
          </g>
          {/* Right Head */}
          <g transform="translate(14, 0)">
            <ellipse cx="56" cy="44" rx="11" ry="14" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
            <polygon points="64,32 68,20 60,28" fill="#292524" />
            <circle cx="60" cy="42" r="2" fill="#ea580c" />
            <polygon points="54,50 58,56 62,50" fill="#ffffff" />
          </g>
          {/* Center Alpha Head */}
          <ellipse cx="50" cy="46" rx="14" ry="18" fill="#0c0a09" stroke="#44403c" strokeWidth="2" />
          <polygon points="40,30 36,16 46,26" fill="#1c1917" />
          <polygon points="60,30 64,16 54,26" fill="#1c1917" />
          <circle cx="45" cy="44" r="2.5" fill="#f97316" />
          <circle cx="55" cy="44" r="2.5" fill="#f97316" />
          <polygon points="45,54 48,62 51,54" fill="#ffffff" />
          <polygon points="49,54 52,62 55,54" fill="#ffffff" />
          {/* Spiked Collars */}
          <path d="M 30 66 Q 50 74 70 66" stroke="#b91c1c" strokeWidth="5" fill="none" />
          <polygon points="42,66 40,60 44,64" fill="#facc15" />
          <polygon points="50,68 50,62 52,66" fill="#facc15" />
          <polygon points="58,66 60,60 56,64" fill="#facc15" />
        </g>
      )}

      {id === 'cr-pegasus' && (
        <g filter="url(#item-shadow)">
          {/* Feathery Wings */}
          <path d="M 50 45 Q 25 20 8 35 Q 20 50 30 58 Q 40 60 50 54" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 50 45 Q 75 20 92 35 Q 80 50 70 58 Q 60 60 50 54" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Horse Head */}
          <polygon points="50,22 40,40 44,70 50,75 56,70 60,40" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Golden Spiral Horn */}
          <polygon points="50,5 47,24 53,24" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <line x1="48" y1="12" x2="52" y2="10" stroke="#ca8a04" strokeWidth="1" />
          <line x1="48" y1="18" x2="52" y2="16" stroke="#ca8a04" strokeWidth="1" />
          {/* Eyes & Nostrils */}
          <circle cx="44" cy="42" r="2.5" fill="#3b82f6" />
          <circle cx="56" cy="42" r="2.5" fill="#3b82f6" />
          <circle cx="47" cy="68" r="1.5" fill="#94a3b8" />
          <circle cx="53" cy="68" r="1.5" fill="#94a3b8" />
          {/* Starry Violet Mane */}
          <path d="M 40 30 Q 32 45 35 60 Q 42 50 42 35" fill="#c084fc" />
          <path d="M 60 30 Q 68 45 65 60 Q 58 50 58 35" fill="#c084fc" />
        </g>
      )}

      {id === 'cr-griffin' && (
        <g filter="url(#item-shadow)">
          {/* Majestic Eagle Wings */}
          <path d="M 50 48 Q 20 18 10 38 Q 28 48 36 60 Q 45 60 50 54" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
          <path d="M 50 48 Q 80 18 90 38 Q 72 48 64 60 Q 55 60 50 54" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
          {/* Golden Eagle Head */}
          <circle cx="50" cy="38" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          {/* Feathery crest & lion ears */}
          <polygon points="50,22 44,10 52,18" fill="#ca8a04" />
          <polygon points="50,22 56,10 48,18" fill="#ca8a04" />
          <polygon points="38,28 32,18 42,24" fill="#b45309" />
          <polygon points="62,28 68,18 58,24" fill="#b45309" />
          {/* Sharp hooked beak */}
          <path d="M 46 38 L 54 38 L 56 48 Q 50 54 44 48 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
          {/* Piercing raptor eyes */}
          <circle cx="44" cy="34" r="2.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <circle cx="56" cy="34" r="2.5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <circle cx="44" cy="34" r="1.2" fill="#000000" />
          <circle cx="56" cy="34" r="1.2" fill="#000000" />
        </g>
      )}

      {id === 'cr-medusa' && (
        <g filter="url(#item-shadow)">
          {/* Writhing Serpent Hair */}
          {/* Snake 1 */}
          <path d="M 35 30 Q 18 15 20 35 Q 22 45 15 50" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="50" r="3" fill="#15803d" />
          {/* Snake 2 */}
          <path d="M 65 30 Q 82 15 80 35 Q 78 45 85 50" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="85" cy="50" r="3" fill="#15803d" />
          {/* Snake 3 */}
          <path d="M 45 22 Q 40 8 48 5 Q 55 8 52 20" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="48" cy="5" r="2.5" fill="#15803d" />
          {/* Snake 4 */}
          <path d="M 55 22 Q 68 8 60 5" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Medusa Face */}
          <ellipse cx="50" cy="46" rx="16" ry="19" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
          {/* Golden Serpent Tiara */}
          <path d="M 38 32 Q 50 36 62 32" stroke="#facc15" strokeWidth="3" fill="none" />
          {/* Petrifying Yellow Eyes */}
          <ellipse cx="44" cy="44" rx="3.5" ry="5" fill="#facc15" />
          <ellipse cx="56" cy="44" rx="3.5" ry="5" fill="#facc15" />
          <line x1="44" y1="39" x2="44" y2="49" stroke="#000000" strokeWidth="1.8" />
          <line x1="56" y1="39" x2="56" y2="49" stroke="#000000" strokeWidth="1.8" />
          {/* Seductive Dark Lips */}
          <path d="M 44 58 Q 50 63 56 58" stroke="#14532d" strokeWidth="2" fill="none" />
        </g>
      )}

      {id === 'cr-witch' && (
        <g filter="url(#item-shadow)">
          {/* Flying Broom */}
          <line x1="12" y1="78" x2="88" y2="42" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="12,78 6,85 22,88 18,76" fill="#ca8a04" stroke="#a16207" strokeWidth="1" />
          {/* Witch Body & Flying Cape */}
          <path d="M 40 50 Q 20 62 32 75 L 58 60 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth="1.5" />
          {/* Witch Face */}
          <circle cx="54" cy="40" r="10" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M 60 40 Q 67 42 62 45" stroke="#16a34a" strokeWidth="2" fill="none" />
          <circle cx="56" cy="38" r="1.5" fill="#000000" />
          {/* Crooked Witch Hat */}
          <ellipse cx="54" cy="34" rx="18" ry="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <path d="M 44 33 Q 50 18 58 12 Q 62 6 70 8 Q 64 16 60 22 Q 66 28 64 33 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="52" y="30" width="6" height="4" fill="#facc15" />
        </g>
      )}

      {/* TOPPINGS */}
      {id === 'topping-choc-shavings' && (
        <g filter="url(#item-shadow)">
          <path d="M 25 35 Q 50 15 75 30 Q 55 45 35 40 Z" fill="#291205" stroke="#1c0b02" strokeWidth="1" />
          <path d="M 35 60 Q 60 40 85 55 Q 65 70 45 65 Z" fill="#3b1a08" stroke="#1c0b02" strokeWidth="1" />
          <path d="M 15 50 Q 40 30 65 45 Q 45 60 25 55 Z" fill="#1c0b02" />
          <path d="M 30 34 Q 50 20 70 32" stroke="#6f3d1b" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {id === 'topping-sprinkles' && (
        <g filter="url(#item-shadow)">
          <rect x="20" y="25" width="22" height="6" rx="3" fill="#ea580c" transform="rotate(-25 20 25)" />
          <rect x="55" y="20" width="22" height="6" rx="3" fill="#9333ea" transform="rotate(35 55 20)" />
          <rect x="30" y="60" width="22" height="6" rx="3" fill="#22c55e" transform="rotate(15 30 60)" />
          <rect x="65" y="65" width="22" height="6" rx="3" fill="#facc15" transform="rotate(-40 65 65)" />
          <rect x="42" y="42" width="20" height="6" rx="3" fill="#ffffff" transform="rotate(60 42 42)" stroke="#94a3b8" strokeWidth="0.5" />
          <rect x="15" y="70" width="18" height="5" rx="2.5" fill="#1e1b4b" transform="rotate(-10 15 70)" stroke="#a855f7" strokeWidth="0.5" />
        </g>
      )}

      {id === 'topping-sugar-pearls' && (
        <g filter="url(#item-shadow)">
          <circle cx="35" cy="40" r="14" fill="url(#pearl-glow)" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="31" cy="35" r="4" fill="#ffffff" />
          <circle cx="68" cy="35" r="11" fill="url(#pearl-glow)" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="65" cy="32" r="3" fill="#ffffff" />
          <circle cx="50" cy="65" r="13" fill="url(#pearl-glow)" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="46" cy="60" r="3.5" fill="#ffffff" />
        </g>
      )}

      {id === 'topping-mini-eyes' && (
        <g filter="url(#item-shadow)">
          <circle cx="38" cy="48" r="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="41" cy="48" r="9" fill="#0f172a" />
          <circle cx="43" cy="45" r="3.5" fill="#ffffff" />
          <circle cx="70" cy="55" r="13" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="72" cy="54" r="6.5" fill="#0f172a" />
          <circle cx="74" cy="52" r="2.5" fill="#ffffff" />
          <path d="M 23 44 Q 28 46 31 48" stroke="#ef4444" strokeWidth="0.8" fill="none" />
          <path d="M 60 52 Q 63 55 65 54" stroke="#ef4444" strokeWidth="0.7" fill="none" />
        </g>
      )}

      {id === 'topping-marshmallows' && (
        <g filter="url(#item-shadow)">
          <ellipse cx="40" cy="45" rx="16" ry="12" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />
          <path d="M 24 45 L 24 60 C 24 66 56 66 56 60 L 56 45 Z" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1.5" />
          <ellipse cx="68" cy="38" rx="14" ry="10" fill="#fce7f3" stroke="#fbcfe8" strokeWidth="1.5" transform="rotate(25 68 38)" />
          <ellipse cx="40" cy="45" rx="12" ry="8" fill="#ffffff" />
        </g>
      )}

      {id === 'topping-sugar-crystals' && (
        <g filter="url(#item-shadow)">
          <polygon points="30,20 45,35 35,50 20,40" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
          <polygon points="65,30 80,45 70,60 55,45" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
          <polygon points="40,55 55,70 45,85 30,70" fill="#fef08a" stroke="#facc15" strokeWidth="1" />
          <circle cx="48" cy="42" r="3" fill="#ffffff" />
          <circle cx="72" cy="38" r="2" fill="#ffffff" />
        </g>
      )}

      {id === 'topping-candy-corn' && (
        <g filter="url(#item-shadow)">
          <path d="M 50 15 L 75 75 C 75 82 25 82 25 75 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="1.5" />
          <path d="M 30 60 L 70 60 L 75 75 C 75 82 25 82 25 75 Z" fill="url(#candy-corn-yellow)" />
          <path d="M 50 15 L 59 36 L 41 36 Z" fill="#ffffff" />
          <path d="M 44 26 L 36 65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </g>
      )}

      {/* HALLOWEEN DECORATIONS */}
      {id === 'hw-ghost' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 50 15 C 32 15 22 30 22 55 C 22 75 16 80 24 85 C 30 88 36 82 42 85 C 48 88 54 82 60 85 C 66 88 72 82 78 85 C 84 80 78 72 78 55 C 78 30 68 15 50 15 Z"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <ellipse cx="40" cy="42" rx="4.5" ry="7" fill="#0f172a" />
          <ellipse cx="60" cy="42" rx="4.5" ry="7" fill="#0f172a" />
          <circle cx="39" cy="40" r="1.5" fill="#ffffff" />
          <circle cx="59" cy="40" r="1.5" fill="#ffffff" />
          <ellipse cx="50" cy="58" rx="5" ry="8" fill="#0f172a" />
          <ellipse cx="32" cy="50" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="68" cy="50" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4" />
        </g>
      )}

      {id === 'hw-pumpkin' && (
        <g filter="url(#item-shadow)">
          <path d="M 50 25 C 48 15 55 12 58 10 C 56 18 53 22 53 26 Z" fill="#15803d" stroke="#166534" strokeWidth="1" />
          <ellipse cx="50" cy="55" rx="38" ry="32" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <ellipse cx="50" cy="55" rx="26" ry="32" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <ellipse cx="50" cy="55" rx="14" ry="32" fill="#fb923c" />
          <polygon points="36,44 44,44 40,36" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
          <polygon points="56,44 64,44 60,36" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
          <polygon points="50,48 53,54 47,54" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
          <path
            d="M 32 62 Q 50 78 68 62 L 64 66 L 58 63 L 53 68 L 47 63 L 42 67 L 36 63 Z"
            fill="#fef08a"
            stroke="#b45309"
            strokeWidth="1"
          />
        </g>
      )}

      {id === 'hw-black-cat' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 25 75 C 25 45 45 35 60 55 C 65 62 70 70 75 75 Z"
            fill="#09090b"
            stroke="#27272a"
            strokeWidth="1.5"
          />
          <path
            d="M 75 75 C 85 70 95 50 88 35 C 84 27 76 34 80 42 C 84 50 78 65 70 73"
            fill="#09090b"
            stroke="#27272a"
            strokeWidth="1"
          />
          <circle cx="32" cy="46" r="16" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <polygon points="20,40 24,20 32,34" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <polygon points="34,34 42,20 46,40" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <ellipse cx="27" cy="44" rx="4" ry="5.5" fill="#facc15" />
          <ellipse cx="37" cy="44" rx="4" ry="5.5" fill="#facc15" />
          <line x1="27" y1="39" x2="27" y2="49" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="37" y1="39" x2="37" y2="49" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="48" x2="24" y2="50" stroke="#a1a1aa" strokeWidth="1" />
          <line x1="16" y1="52" x2="24" y2="52" stroke="#a1a1aa" strokeWidth="1" />
          <line x1="40" y1="50" x2="48" y2="48" stroke="#a1a1aa" strokeWidth="1" />
          <line x1="40" y1="52" x2="48" y2="52" stroke="#a1a1aa" strokeWidth="1" />
        </g>
      )}

      {id === 'hw-bat' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 50 48 C 45 35 35 25 15 28 C 10 40 18 55 12 70 C 24 64 34 68 40 60 C 45 66 48 66 50 62 C 52 66 55 66 60 60 C 66 68 76 64 88 70 C 82 55 90 40 85 28 C 65 25 55 35 50 48 Z"
            fill="#18181b"
            stroke="#3f3f46"
            strokeWidth="1.5"
          />
          <ellipse cx="50" cy="54" rx="8" ry="14" fill="#09090b" />
          <polygon points="44,44 46,34 50,42" fill="#09090b" />
          <polygon points="50,42 54,34 56,44" fill="#09090b" />
          <circle cx="47" cy="46" r="1.5" fill="#ef4444" />
          <circle cx="53" cy="46" r="1.5" fill="#ef4444" />
        </g>
      )}

      {id === 'hw-spider-web' && (
        <g filter="url(#item-shadow)" stroke="#e2e8f0" strokeWidth="1.5" fill="none">
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="22" y1="78" x2="78" y2="22" />
          <polygon points="50,25 68,32 75,50 68,68 50,75 32,68 25,50 32,32" strokeWidth="1" />
          <polygon points="50,38 59,42 62,50 59,58 50,62 41,58 38,50 41,42" strokeWidth="1" />
          <line x1="75" y1="50" x2="82" y2="70" strokeWidth="0.8" />
          <circle cx="82" cy="74" r="4" fill="#0f172a" stroke="none" />
          <circle cx="82" cy="71" r="2.5" fill="#0f172a" stroke="none" />
        </g>
      )}

      {id === 'hw-bones' && (
        <g filter="url(#item-shadow)">
          <path d="M 25 30 L 75 70 M 25 70 L 75 30" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
          <circle cx="23" cy="27" r="4.5" fill="#e2e8f0" />
          <circle cx="27" cy="23" r="4.5" fill="#e2e8f0" />
          <circle cx="77" cy="73" r="4.5" fill="#e2e8f0" />
          <circle cx="73" cy="77" r="4.5" fill="#e2e8f0" />
          <circle cx="23" cy="73" r="4.5" fill="#e2e8f0" />
          <circle cx="27" cy="77" r="4.5" fill="#e2e8f0" />
          <circle cx="77" cy="27" r="4.5" fill="#e2e8f0" />
          <circle cx="73" cy="23" r="4.5" fill="#e2e8f0" />
          <circle cx="50" cy="46" r="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="42" y="56" width="16" height="10" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <ellipse cx="44" cy="46" rx="4" ry="5" fill="#0f172a" />
          <ellipse cx="56" cy="46" rx="4" ry="5" fill="#0f172a" />
          <polygon points="50,51 48,56 52,56" fill="#0f172a" />
          <line x1="46" y1="61" x2="46" y2="66" stroke="#0f172a" strokeWidth="1" />
          <line x1="50" y1="61" x2="50" y2="66" stroke="#0f172a" strokeWidth="1" />
          <line x1="54" y1="61" x2="54" y2="66" stroke="#0f172a" strokeWidth="1" />
        </g>
      )}

      {id === 'hw-witch-hat' && (
        <g filter="url(#item-shadow)">
          <ellipse cx="50" cy="76" rx="38" ry="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <path
            d="M 30 74 Q 38 45 46 32 Q 54 18 68 15 Q 64 24 56 36 Q 66 55 70 74 Z"
            fill="#27272a"
            stroke="#3f3f46"
            strokeWidth="1.5"
          />
          <path d="M 31 74 Q 50 80 69 74 L 67 67 Q 50 73 33 67 Z" fill="#9333ea" />
          <rect x="45" y="67" width="10" height="8" rx="2" fill="#eab308" stroke="#713f12" strokeWidth="1" />
          <rect x="47" y="69" width="6" height="4" rx="1" fill="#18181b" />
        </g>
      )}

      {id === 'hw-tombstone' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 25 85 L 25 40 C 25 22 75 22 75 40 L 75 85 Z"
            fill="#475569"
            stroke="#1e293b"
            strokeWidth="2"
          />
          <path d="M 65 30 L 58 42 L 62 48" stroke="#1e293b" strokeWidth="1" fill="none" />
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="12"
            fontFamily="serif"
            fontWeight="bold"
            letterSpacing="2"
          >
            R.I.P.
          </text>
          <path d="M 20 85 L 28 78 L 36 85 L 48 76 L 60 85 L 72 77 L 80 85 Z" fill="#15803d" />
        </g>
      )}

      {id === 'hw-black-rose' && (
        <g filter="url(#item-shadow)">
          <path d="M 50 55 Q 48 75 52 90" stroke="#14532d" strokeWidth="2.5" fill="none" />
          <path d="M 49 70 L 42 66 L 49 74" fill="#14532d" />
          <circle cx="50" cy="40" r="22" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <path d="M 35 35 C 35 22 65 22 65 35 C 65 48 35 48 35 35 Z" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <path d="M 42 38 C 42 30 58 30 58 38 C 58 45 42 45 42 38 Z" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
          <circle cx="50" cy="38" r="4" fill="#450a0a" />
        </g>
      )}

      {id === 'hw-moon-stars' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 55 15 C 32 15 20 32 20 52 C 20 72 35 85 58 85 C 42 78 36 60 40 42 C 43 28 50 19 55 15 Z"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="1.5"
          />
          <polygon points="68,20 71,28 79,31 71,34 68,42 65,34 57,31 65,28" fill="#ffffff" />
          <polygon points="75,55 77,61 83,63 77,65 75,71 73,65 67,63 73,61" fill="#fef08a" />
        </g>
      )}

      {id === 'hw-eyeball' && (
        <g filter="url(#item-shadow)">
          <circle cx="50" cy="50" r="32" fill="#fafaf9" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 20 45 Q 32 48 38 45 M 24 58 Q 33 54 40 56 M 78 40 Q 68 44 62 42 M 76 56 Q 66 52 60 55" stroke="#ef4444" strokeWidth="1.2" fill="none" />
          <circle cx="50" cy="50" r="16" fill="url(#eyeball-iris)" stroke="#0369a1" strokeWidth="1" />
          <circle cx="50" cy="50" r="8" fill="#020617" />
          <circle cx="45" cy="45" r="3.5" fill="#ffffff" />
          <circle cx="54" cy="54" r="1.5" fill="#ffffff" />
        </g>
      )}

      {/* SAUCES & DRIZZLES */}
      {id === 'sauce-chocolate' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 15 45 Q 30 25 50 40 Q 70 20 85 45 Q 88 75 75 80 Q 55 88 40 78 Q 20 85 15 45 Z"
            fill="url(#sauce-choc)"
            stroke="#1c0b02"
            strokeWidth="1"
          />
          <circle cx="28" cy="88" r="5" fill="url(#sauce-choc)" />
          <circle cx="68" cy="85" r="4" fill="url(#sauce-choc)" />
          <path d="M 28 42 Q 45 32 60 40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
        </g>
      )}

      {id === 'sauce-strawberry' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 20 35 C 35 25 45 30 55 20 C 65 30 80 25 85 45 C 90 70 70 82 50 78 C 30 82 15 65 20 35 Z"
            fill="url(#sauce-straw)"
            stroke="#4c0519"
            strokeWidth="1"
          />
          <path d="M 35 76 Q 37 92 40 92 Q 43 92 44 78" fill="url(#sauce-straw)" />
          <path d="M 62 76 Q 64 88 66 88 Q 68 88 69 77" fill="url(#sauce-straw)" />
          <ellipse cx="40" cy="94" rx="3" ry="2" fill="url(#sauce-straw)" />
          <path d="M 30 38 Q 45 28 65 34" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" fill="none" />
        </g>
      )}

      {id === 'sauce-caramel' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 20 50 Q 35 30 50 50 Q 65 70 80 50 Q 75 75 50 82 Q 25 75 20 50 Z"
            fill="url(#sauce-caram)"
            stroke="#78350f"
            strokeWidth="1"
          />
          <path
            d="M 15 35 Q 35 60 50 35 Q 65 60 85 35"
            stroke="url(#sauce-caram)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 20 36 Q 35 58 50 36 Q 65 58 80 36"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            fill="none"
          />
        </g>
      )}

      {id === 'sauce-blackberry' && (
        <g filter="url(#item-shadow)">
          <path
            d="M 22 42 C 30 25 60 20 75 35 C 90 50 82 72 70 78 C 55 84 40 82 28 72 C 16 62 18 50 22 42 Z"
            fill="#3b0764"
            stroke="#1e1b4b"
            strokeWidth="1"
          />
          <circle cx="85" cy="30" r="3.5" fill="#581c87" />
          <circle cx="15" cy="65" r="4" fill="#3b0764" />
          <circle cx="68" cy="86" r="3" fill="#581c87" />
          <path d="M 32 38 Q 50 30 65 38" stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" fill="none" />
        </g>
      )}

      {id === 'sauce-puree' && (
        <g filter="url(#item-shadow)">
          <ellipse cx="50" cy="50" rx="35" ry="26" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <path
            d="M 30 50 Q 50 65 70 50 Q 50 35 30 50 Z"
            fill="#fb923c"
          />
          <path
            d="M 50 38 Q 58 48 50 56 Q 42 48 50 42"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};
