import React from 'react';
import { DessertId, FrostingOption } from '../types';
import { FROSTING_OPTIONS, BASE_COLOR_OPTIONS } from '../data/decorations';

interface DessertVisualProps {
  dessertId: DessertId;
  frostingId?: string;
  baseColorId?: string;
  className?: string;
}

export const DessertVisual: React.FC<DessertVisualProps> = ({
  dessertId,
  frostingId = 'vanilla',
  baseColorId,
  className = 'w-full h-full',
}) => {
  let primary = '#fef08a';
  let secondary = '#fef9c3';
  let drip = '#fde047';

  if (frostingId && frostingId.startsWith('#')) {
    primary = frostingId;
    secondary = frostingId;
    drip = frostingId;
  } else {
    const f = FROSTING_OPTIONS.find((o) => o.id === frostingId) || FROSTING_OPTIONS[0];
    primary = f.hex;
    secondary = f.secondaryHex;
    drip = f.dripHex;
  }

  // Base dough / sponge / pastry color
  let basePrimary = '#d97706';
  let baseSecondary = '#f59e0b';
  let baseDark = '#78350f';

  if (baseColorId && baseColorId.startsWith('#')) {
    basePrimary = baseColorId;
    baseSecondary = baseColorId;
    baseDark = baseColorId;
  } else if (baseColorId) {
    const b = BASE_COLOR_OPTIONS.find((o) => o.id === baseColorId);
    if (b) {
      basePrimary = b.hex;
      baseSecondary = b.secondaryHex;
      baseDark = b.darkHex;
    }
  } else {
    if (dessertId === 'chocolate-cupcake' || dessertId === 'layered-cake' || dessertId === 'witch-hat') {
      basePrimary = '#3b1d0f';
      baseSecondary = '#5c2c16';
      baseDark = '#1a0b04';
    } else if (dessertId === 'gothic-heart') {
      basePrimary = '#7f1d1d';
      baseSecondary = '#991b1b';
      baseDark = '#450a0a';
    }
  }

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shadow filters */}
        <filter id="gothic-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
        </filter>
        <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Plate gradients */}
        <radialGradient id="plate-silver" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a3042" />
          <stop offset="70%" stopColor="#171b26" />
          <stop offset="95%" stopColor="#3d465c" />
          <stop offset="100%" stopColor="#0d0f14" />
        </radialGradient>

        <radialGradient id="plate-ebony" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1826" />
          <stop offset="75%" stopColor="#0f0c14" />
          <stop offset="96%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#08060b" />
        </radialGradient>

        <linearGradient id="frosting-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondary} />
          <stop offset="60%" stopColor={primary} />
          <stop offset="100%" stopColor={drip} />
        </linearGradient>

        <linearGradient id="crust-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={baseSecondary} />
          <stop offset="100%" stopColor={baseDark} />
        </linearGradient>

        <linearGradient id="chocolate-base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={basePrimary} />
          <stop offset="100%" stopColor={baseDark} />
        </linearGradient>

        <linearGradient id="macaron-shell" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={baseSecondary} />
          <stop offset="100%" stopColor={basePrimary} />
        </linearGradient>
      </defs>

      {/* Plate / Platter base */}
      <g filter="url(#gothic-shadow)">
        <ellipse cx="300" cy="460" rx="250" ry="85" fill="#05070c" opacity="0.6" />
        <ellipse cx="300" cy="445" rx="230" ry="75" fill="url(#plate-silver)" stroke="#475569" strokeWidth="3" />
        {/* Filigree decorative rim */}
        <ellipse cx="300" cy="445" rx="215" ry="68" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
        <ellipse cx="300" cy="445" rx="195" ry="60" fill="#111624" />
      </g>

      {/* Render selected dessert */}
      {dessertId === 'pumpkin-pie' && (
        <g filter="url(#gothic-shadow)">
          {/* Pie dish */}
          <ellipse cx="300" cy="400" rx="170" ry="60" fill="url(#crust-grad)" stroke="#451a03" strokeWidth="3" />
          {/* Fluted flaked crust border */}
          <path
            d="M 130 400 Q 150 435 180 438 Q 210 442 250 445 Q 300 448 350 445 Q 390 442 420 438 Q 450 435 470 400 Q 460 365 420 360 Q 300 350 180 360 Z"
            fill="#b45309"
            stroke="#78350f"
            strokeWidth="4"
          />
          {/* Pumpkin filling */}
          <ellipse cx="300" cy="395" rx="145" ry="46" fill="#c2410c" />
          {/* Smooth pumpkin spice center */}
          <ellipse cx="300" cy="395" rx="130" ry="38" fill="#ea580c" />
          {/* Dynamic frosting / cream swirl on top */}
          <path
            d="M 230 395 C 230 360 270 330 300 330 C 330 330 370 360 370 395 C 370 415 340 425 300 425 C 260 425 230 415 230 395 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="3"
          />
          {/* Swirl spiral center */}
          <path
            d="M 300 330 Q 315 350 305 380 Q 295 405 320 405"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      )}

      {dessertId === 'ghost-cookie' && (
        <g filter="url(#gothic-shadow)">
          {/* Cookie base shadow and baked edge */}
          <path
            d="M 300 135 C 220 135 180 200 180 290 C 180 360 150 400 160 445 C 165 465 195 460 220 440 C 250 420 280 455 315 450 C 350 445 375 425 405 440 C 435 455 450 430 440 390 C 430 340 420 290 420 220 C 420 160 380 135 300 135 Z"
            fill={basePrimary}
            stroke={baseDark}
            strokeWidth="8"
          />
          {/* Dynamic icing surface */}
          <path
            d="M 300 145 C 230 145 195 205 195 285 C 195 350 165 390 175 430 C 180 445 205 440 228 425 C 255 408 285 438 315 435 C 345 432 368 412 395 425 C 420 438 432 418 425 385 C 415 338 405 285 405 225 C 405 170 370 145 300 145 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="3"
          />
          {/* Cookie outline highlight */}
          <path
            d="M 230 180 C 210 220 210 280 215 340"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Spooky Ghost face */}
          <ellipse cx="265" cy="245" rx="14" ry="24" fill="#0f0c14" />
          <ellipse cx="335" cy="245" rx="14" ry="24" fill="#0f0c14" />
          {/* Ghost eye shines */}
          <circle cx="262" cy="238" r="4" fill="#ffffff" />
          <circle cx="332" cy="238" r="4" fill="#ffffff" />
          {/* Spooky mouth */}
          <ellipse cx="300" cy="305" rx="16" ry="26" fill="#0f0c14" />
          {/* Cheek blushes */}
          <ellipse cx="240" cy="275" rx="12" ry="7" fill={drip} opacity="0.4" />
          <ellipse cx="360" cy="275" rx="12" ry="7" fill={drip} opacity="0.4" />
        </g>
      )}

      {dessertId === 'chocolate-cupcake' && (
        <g filter="url(#gothic-shadow)">
          {/* Gothic fluted paper cup */}
          <path
            d="M 200 330 L 230 455 L 370 455 L 400 330 Z"
            fill="#18181b"
            stroke="#3f3f46"
            strokeWidth="3"
          />
          {/* Ribs on the cupcake wrapper */}
          {[235, 255, 275, 295, 305, 325, 345, 365].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="330"
              x2={230 + (x - 200) * 0.7}
              y2="455"
              stroke="#52525b"
              strokeWidth="2"
            />
          ))}
          {/* Chocolate sponge rim */}
          <ellipse cx="300" cy="330" rx="110" ry="32" fill={basePrimary} stroke={baseDark} strokeWidth="4" />
          {/* Dynamic high swirl frosting (3 tiered swirls) */}
          {/* Tier 1 bottom swirl */}
          <path
            d="M 180 320 C 180 270 230 260 300 260 C 370 260 420 270 420 320 C 420 345 365 355 300 355 C 235 355 180 345 180 320 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="3"
          />
          {/* Tier 2 middle swirl */}
          <path
            d="M 215 270 C 215 225 250 205 300 205 C 350 205 385 225 385 270 C 385 290 350 300 300 300 C 250 300 215 290 215 270 Z"
            fill="url(#frosting-grad)"
            stroke={secondary}
            strokeWidth="2"
          />
          {/* Tier 3 top swirl & peak */}
          <path
            d="M 255 215 C 255 170 280 145 300 135 C 315 145 345 170 345 215 C 345 230 325 240 300 240 C 275 240 255 230 255 215 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="2"
          />
          {/* Curled icing peak */}
          <path
            d="M 300 135 Q 312 120 320 128"
            fill="none"
            stroke={secondary}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* High gloss reflections on frosting */}
          <path
            d="M 230 295 Q 260 270 310 275"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 260 240 Q 285 220 320 225"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      )}

      {dessertId === 'layered-cake' && (
        <g filter="url(#gothic-shadow)">
          {/* Bottom Tier (Tier 3) */}
          <rect x="180" y="340" width="240" height="90" rx="16" fill="url(#chocolate-base)" />
          <ellipse cx="300" cy="340" rx="120" ry="28" fill="url(#frosting-grad)" stroke={drip} strokeWidth="3" />
          <rect x="180" y="340" width="240" height="90" rx="12" fill="url(#frosting-grad)" stroke={drip} strokeWidth="3" opacity="0.95" />
          <ellipse cx="300" cy="430" rx="120" ry="28" fill={drip} opacity="0.4" />

          {/* Drips on Tier 3 */}
          <path
            d="M 180 345 Q 200 375 210 350 Q 230 385 245 350 Q 270 380 290 350 Q 320 390 340 350 Q 370 380 390 350 Q 410 375 420 345"
            fill="none"
            stroke={drip}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Middle Tier (Tier 2) */}
          <rect x="220" y="250" width="160" height="75" rx="10" fill="url(#frosting-grad)" stroke={drip} strokeWidth="3" />
          <ellipse cx="300" cy="250" rx="80" ry="22" fill={secondary} stroke={drip} strokeWidth="2" />
          <path
            d="M 220 255 Q 240 280 255 258 Q 280 285 300 258 Q 330 285 350 258 Q 370 278 380 255"
            fill="none"
            stroke={drip}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Top Tier (Tier 1) */}
          <rect x="255" y="180" width="90" height="60" rx="8" fill="url(#frosting-grad)" stroke={drip} strokeWidth="3" />
          <ellipse cx="300" cy="180" rx="45" ry="14" fill={secondary} stroke={drip} strokeWidth="2" />

          {/* Gothic filigree decorative lines */}
          <path
            d="M 260 210 Q 300 225 340 210"
            fill="none"
            stroke={secondary}
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            d="M 225 290 Q 300 310 375 290"
            fill="none"
            stroke={secondary}
            strokeWidth="2"
            opacity="0.8"
          />
        </g>
      )}

      {dessertId === 'spooky-donut' && (
        <g filter="url(#gothic-shadow)">
          {/* Golden fried donut dough */}
          <ellipse cx="300" cy="330" rx="170" ry="110" fill={baseDark} stroke="#1c0b02" strokeWidth="6" />
          <ellipse cx="300" cy="326" rx="160" ry="102" fill={basePrimary} />

          {/* Glaze / Frosting with organic drips */}
          <path
            d="M 150 320 C 150 250 210 230 300 230 C 390 230 450 250 450 320 C 450 360 435 385 410 395 C 385 405 380 375 350 395 C 320 415 310 380 290 405 C 265 425 240 385 210 405 C 180 425 160 380 150 320 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="3"
          />

          {/* Center hole dough inner border */}
          <ellipse cx="300" cy="325" rx="52" ry="36" fill="#78350f" />
          <ellipse cx="300" cy="330" rx="46" ry="32" fill="#111624" />

          {/* High gloss shine on glaze */}
          <path
            d="M 180 290 C 200 260 250 245 310 248"
            fill="none"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="340" cy="254" r="5" fill="#ffffff" opacity="0.7" />
        </g>
      )}

      {dessertId === 'witch-hat' && (
        <g filter="url(#gothic-shadow)">
          {/* Witch hat brim (crisp dark cookie base) */}
          <ellipse cx="300" cy="400" rx="175" ry="60" fill="url(#chocolate-base)" stroke="#3f3f46" strokeWidth="3" />
          <ellipse cx="300" cy="396" rx="165" ry="54" fill="url(#frosting-grad)" stroke={drip} strokeWidth="2" opacity="0.8" />

          {/* Crooked witch hat cone */}
          <path
            d="M 215 385 Q 235 240 280 170 Q 320 100 370 85 Q 355 125 325 185 Q 365 295 385 385 Z"
            fill="#18181b"
            stroke="#3f3f46"
            strokeWidth="4"
          />
          {/* Hat wrinkle folds */}
          <path
            d="M 245 320 Q 300 335 355 315"
            fill="none"
            stroke="#52525b"
            strokeWidth="3"
          />
          <path
            d="M 265 240 Q 310 255 340 235"
            fill="none"
            stroke="#52525b"
            strokeWidth="3"
          />

          {/* Ribbon sash around cone */}
          <path
            d="M 220 380 Q 300 405 380 380 L 375 355 Q 300 380 225 355 Z"
            fill="url(#frosting-grad)"
            stroke={secondary}
            strokeWidth="2"
          />
          {/* Golden/Silver buckle */}
          <rect x="282" y="358" width="36" height="28" rx="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          <rect x="290" y="364" width="20" height="16" rx="3" fill="#18181b" />
        </g>
      )}

      {dessertId === 'macaron' && (
        <g filter="url(#gothic-shadow)">
          {/* Bottom macaron shell */}
          <ellipse cx="300" cy="395" rx="150" ry="50" fill="url(#macaron-shell)" stroke={drip} strokeWidth="3" />
          {/* Ruffled foot (pied) bottom */}
          <path
            d="M 155 390 Q 200 405 250 400 Q 300 406 350 400 Q 400 405 445 390 Q 450 405 440 412 Q 300 435 160 412 Z"
            fill={drip}
            opacity="0.8"
          />

          {/* Rich creamy filling in middle */}
          <ellipse cx="300" cy="365" rx="142" ry="38" fill="url(#frosting-grad)" stroke={primary} strokeWidth="3" />
          <ellipse cx="300" cy="365" rx="138" ry="32" fill={secondary} />

          {/* Top macaron shell */}
          <ellipse cx="300" cy="315" rx="155" ry="60" fill="url(#macaron-shell)" stroke={drip} strokeWidth="3" />
          {/* Top macaron ruffled foot */}
          <path
            d="M 150 325 Q 200 340 250 335 Q 300 342 350 335 Q 400 340 450 325 Q 445 342 435 348 Q 300 368 165 348 Z"
            fill={drip}
            opacity="0.75"
          />
          {/* Satin domed highlight */}
          <path
            d="M 180 295 C 220 265 320 260 410 285"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>
      )}

      {dessertId === 'gingerbread-house' && (
        <g filter="url(#gothic-shadow)">
          {/* Crooked Gingerbread Walls */}
          <polygon
            points="180,430 420,430 400,280 200,280"
            fill={basePrimary}
            stroke={baseDark}
            strokeWidth="5"
          />
          {/* Front gable triangle */}
          <polygon
            points="190,280 410,280 300,160"
            fill={baseDark}
            stroke={baseDark}
            strokeWidth="5"
          />
          {/* Crooked chimney */}
          <polygon
            points="340,190 370,165 385,185 365,225"
            fill={baseDark}
            stroke={baseDark}
            strokeWidth="3"
          />
          {/* Chimney smoke */}
          <path
            d="M 375 160 Q 395 130 380 100 Q 405 80 395 50"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Roof eaves with heavy royal icing icicles */}
          <polygon
            points="160,290 300,140 440,290 415,295 300,165 185,295"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="3"
          />
          {/* Dripping icicles */}
          <path
            d="M 170 290 Q 180 325 190 295 Q 205 335 220 295 Q 240 340 260 295 Q 280 345 300 295 Q 320 340 340 295 Q 360 335 380 295 Q 400 325 410 290 Q 430 320 440 290"
            fill="none"
            stroke={secondary}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Arched Gothic Door */}
          <path
            d="M 270 430 L 270 360 C 270 335 330 335 330 360 L 330 430 Z"
            fill={baseDark}
            stroke={basePrimary}
            strokeWidth="3"
          />
          <circle cx="320" cy="385" r="4" fill="#fbbf24" />

          {/* Spooky candy window */}
          <circle cx="300" cy="240" r="24" fill="#fbbf24" stroke="#ffffff" strokeWidth="4" />
          <line x1="300" y1="216" x2="300" y2="264" stroke="#ffffff" strokeWidth="3" />
          <line x1="276" y1="240" x2="324" y2="240" stroke="#ffffff" strokeWidth="3" />
        </g>
      )}

      {dessertId === 'candy-orb' && (
        <g filter="url(#gothic-shadow)">
          {/* Wooden / striped stick */}
          <rect x="294" y="320" width="12" height="180" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          {/* Black gothic ribbon bow on stick */}
          <path
            d="M 275 350 C 250 335 250 370 285 360 L 300 362 L 315 360 C 350 370 350 335 325 350 Z"
            fill="#18181b"
            stroke="#71717a"
            strokeWidth="2"
          />

          {/* Giant glossy orb */}
          <circle cx="300" cy="240" r="110" fill="url(#frosting-grad)" stroke={drip} strokeWidth="4" />

          {/* Deep gothic swirl / marbling on sphere */}
          <path
            d="M 205 210 Q 260 280 360 210 Q 390 280 340 330"
            fill="none"
            stroke={drip}
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Curvature gloss highlight */}
          <ellipse cx="260" cy="180" rx="35" ry="18" fill="#ffffff" opacity="0.6" transform="rotate(-30 260 180)" />
          <circle cx="230" cy="205" r="7" fill="#ffffff" opacity="0.75" />
        </g>
      )}

      {dessertId === 'gothic-heart' && (
        <g filter="url(#gothic-shadow)">
          {/* Heart shaped base sponge */}
          <path
            d="M 300 420 C 180 340 130 270 145 200 C 160 140 230 135 300 200 C 370 135 440 140 455 200 C 470 270 420 340 300 420 Z"
            fill={baseDark}
            stroke={basePrimary}
            strokeWidth="8"
          />

          {/* Dynamic Heart Frosting Face */}
          <path
            d="M 300 405 C 190 330 145 265 158 205 C 170 152 232 148 300 210 C 368 148 430 152 442 205 C 455 265 410 330 300 405 Z"
            fill="url(#frosting-grad)"
            stroke={drip}
            strokeWidth="4"
          />

          {/* Victorian / Gothic vintage piped border shells */}
          <path
            d="M 300 405 C 190 330 145 265 158 205 C 170 152 232 148 300 210 C 368 148 430 152 442 205 C 455 265 410 330 300 405 Z"
            fill="none"
            stroke={secondary}
            strokeWidth="8"
            strokeDasharray="10 8"
          />

          {/* Inner heart piped line */}
          <path
            d="M 300 370 C 215 310 180 260 190 215 C 200 175 250 170 300 220 C 350 170 400 175 410 215 C 420 260 385 310 300 370 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Curved specular highlight */}
          <path
            d="M 180 195 C 190 165 230 160 265 180"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      )}
    </svg>
  );
};
