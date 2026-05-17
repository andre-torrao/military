import React from 'react';

const figures = {
  pushup: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="95" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Body horizontal */}
      <rect x="30" y="75" width="110" height="12" rx="6" fill="#c8a96e"/>
      {/* Head */}
      <circle cx="150" cy="72" r="12" fill="#c8a96e"/>
      {/* Arms down */}
      <rect x="50" y="78" width="10" height="20" rx="4" fill="#c8a96e" transform="rotate(-10 55 78)"/>
      <rect x="110" y="78" width="10" height="20" rx="4" fill="#c8a96e" transform="rotate(10 115 78)"/>
      {/* Legs */}
      <rect x="18" y="80" width="30" height="10" rx="5" fill="#c8a96e"/>
      {/* Down position label */}
      <text x="100" y="25" textAnchor="middle" fontSize="11" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">PUSH-UP</text>
      <text x="100" y="42" textAnchor="middle" fontSize="9" fill="#9a8a72" fontFamily="monospace">CHEST TO DECK</text>
      {/* Arrow indicators */}
      <path d="M80 55 L80 68" stroke="#c8a96e" strokeWidth="1.5" markerEnd="url(#arr)" strokeDasharray="3,2"/>
      <path d="M120 55 L120 68" stroke="#c8a96e" strokeWidth="1.5" strokeDasharray="3,2"/>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#c8a96e"/>
        </marker>
      </defs>
    </svg>
  ),

  burpee: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phase 1: standing/jump */}
      <circle cx="160" cy="22" r="10" fill="#c8a96e"/>
      <rect x="155" y="32" width="10" height="28" rx="5" fill="#c8a96e"/>
      <path d="M155 40 L140 52 M165 40 L178 52" stroke="#c8a96e" strokeWidth="5" strokeLinecap="round"/>
      <path d="M155 60 L145 80 M165 60 L175 80" stroke="#c8a96e" strokeWidth="5" strokeLinecap="round"/>
      {/* Arrow */}
      <path d="M138 50 L118 50" stroke="#e2d9c8" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arrowB)"/>
      {/* Phase 2: plank */}
      <circle cx="105" cy="68" r="9" fill="#c8a96e"/>
      <rect x="40" y="73" width="60" height="10" rx="5" fill="#c8a96e"/>
      <rect x="44" y="78" width="8" height="18" rx="4" fill="#c8a96e"/>
      <rect x="88" y="78" width="8" height="18" rx="4" fill="#c8a96e"/>
      <rect x="22" y="82" width="22" height="8" rx="4" fill="#c8a96e"/>
      <rect x="10" y="95" width="180" height="3" rx="1" fill="#4a5568"/>
      <text x="100" y="14" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">BURPEE</text>
      <defs>
        <marker id="arrowB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6 Z" fill="#e2d9c8"/>
        </marker>
      </defs>
    </svg>
  ),

  pullup: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bar */}
      <rect x="20" y="18" width="160" height="8" rx="4" fill="#6b7280"/>
      <rect x="18" y="10" width="6" height="18" rx="3" fill="#4a5568"/>
      <rect x="176" y="10" width="6" height="18" rx="3" fill="#4a5568"/>
      {/* Figure hanging */}
      <circle cx="100" cy="42" r="13" fill="#c8a96e"/>
      {/* Arms up */}
      <path d="M94 30 L80 22" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      <path d="M106 30 L120 22" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      {/* Body */}
      <rect x="94" y="54" width="12" height="30" rx="6" fill="#c8a96e"/>
      {/* Legs */}
      <path d="M96 84 L88 108 M104 84 L112 108" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      <text x="100" y="118" textAnchor="middle" fontSize="9" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">CHIN OVER BAR</text>
    </svg>
  ),

  squat: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Squatting figure */}
      <circle cx="100" cy="28" r="14" fill="#c8a96e"/>
      {/* Torso leaning */}
      <rect x="94" y="40" width="12" height="24" rx="6" fill="#c8a96e" transform="rotate(10 100 52)"/>
      {/* Upper arms extended */}
      <path d="M92 46 L72 44 M108 46 L128 44" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round"/>
      {/* Thighs - parallel */}
      <path d="M96 62 L72 80 M104 62 L128 80" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round"/>
      {/* Lower legs */}
      <path d="M72 80 L68 108 M128 80 L132 108" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round"/>
      {/* Depth indicator */}
      <path d="M50 80 L150 80" stroke="#c8a96e" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      <text x="38" y="83" fontSize="8" fill="#9a8a72" fontFamily="monospace">PARALLEL</text>
      <text x="100" y="14" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">SQUAT</text>
    </svg>
  ),

  mountainclimber: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Plank position */}
      <circle cx="150" cy="55" r="11" fill="#c8a96e"/>
      <rect x="55" y="62" width="90" height="10" rx="5" fill="#c8a96e"/>
      {/* Arms */}
      <rect x="140" y="65" width="10" height="26" rx="4" fill="#c8a96e" transform="rotate(-5 145 65)"/>
      <rect x="58" y="65" width="10" height="26" rx="4" fill="#c8a96e"/>
      {/* Legs - one driven forward */}
      <path d="M55 68 L35 78 L32 108" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Knee driven in */}
      <path d="M70 68 L85 90 L92 108" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M85 90 L100 72" stroke="#c8a96e" strokeWidth="2" strokeDasharray="3,2"/>
      <text x="100" y="20" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">MOUNTAIN CLIMBER</text>
      <text x="100" y="35" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">DRIVE KNEE TO CHEST</text>
    </svg>
  ),

  plank: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Body - perfectly straight */}
      <rect x="28" y="72" width="120" height="12" rx="6" fill="#c8a96e"/>
      {/* Head */}
      <circle cx="158" cy="72" r="12" fill="#c8a96e"/>
      {/* Forearms */}
      <rect x="48" y="80" width="28" height="8" rx="4" fill="#c8a96e" transform="rotate(-5 62 84)"/>
      <rect x="90" y="80" width="28" height="8" rx="4" fill="#c8a96e" transform="rotate(-5 104 84)"/>
      {/* Feet */}
      <rect x="18" y="80" width="14" height="8" rx="3" fill="#c8a96e"/>
      {/* Straight line indicator */}
      <path d="M18 72 L170 72" stroke="#c8a96e" strokeWidth="1" strokeDasharray="5,3" opacity="0.4"/>
      <text x="100" y="30" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">PLANK</text>
      <text x="100" y="45" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">BODY RIGID AS A BOARD</text>
      {/* Squeeze indicators */}
      <text x="100" y="58" textAnchor="middle" fontSize="8" fill="#c8a96e" fontFamily="monospace">← SQUEEZE EVERYTHING →</text>
    </svg>
  ),

  dip: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Parallel bars */}
      <rect x="30" y="35" width="10" height="70" rx="4" fill="#4a5568"/>
      <rect x="160" y="35" width="10" height="70" rx="4" fill="#4a5568"/>
      <rect x="20" y="35" width="30" height="8" rx="4" fill="#6b7280"/>
      <rect x="150" y="35" width="30" height="8" rx="4" fill="#6b7280"/>
      {/* Figure in dip */}
      <circle cx="100" cy="30" r="13" fill="#c8a96e"/>
      <rect x="94" y="42" width="12" height="24" rx="6" fill="#c8a96e"/>
      {/* Arms bent */}
      <path d="M94 48 L38 43" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      <path d="M106 48 L162 43" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      {/* Legs hanging */}
      <path d="M96 66 L88 95 M104 66 L112 95" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round"/>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">ELBOWS BACK · FULL LOCKOUT</text>
    </svg>
  ),

  lunge: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="110" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Head */}
      <circle cx="100" cy="20" r="13" fill="#c8a96e"/>
      {/* Torso */}
      <rect x="94" y="32" width="12" height="30" rx="6" fill="#c8a96e"/>
      {/* Front leg - bent */}
      <path d="M98 62 L75 82 L72 110" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Back leg - extended back */}
      <path d="M102 62 L125 88 L140 110" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Knee near floor indicator */}
      <circle cx="140" cy="110" r="5" fill="none" stroke="#c8a96e" strokeWidth="1.5" strokeDasharray="2,1"/>
      <text x="100" y="8" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">LUNGE</text>
      <text x="148" y="108" fontSize="7" fill="#9a8a72" fontFamily="monospace">1" off deck</text>
    </svg>
  ),

  flutterkick: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Body lying on back */}
      <rect x="20" y="88" width="120" height="12" rx="6" fill="#c8a96e"/>
      {/* Head */}
      <circle cx="152" cy="90" r="11" fill="#c8a96e"/>
      {/* Arms by sides */}
      <rect x="22" y="96" width="40" height="7" rx="3" fill="#c8a96e"/>
      <rect x="72" y="96" width="40" height="7" rx="3" fill="#c8a96e"/>
      {/* Legs at 6 inches - alternating */}
      <path d="M20 88 L5 72" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round"/>
      <path d="M32 88 L18 60" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round"/>
      {/* 6" line */}
      <path d="M5 108 L5 72" stroke="#c8a96e" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/>
      <text x="14" y="90" fontSize="7" fill="#9a8a72" fontFamily="monospace">6"</text>
      <text x="100" y="22" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">FLUTTER KICK</text>
      <text x="100" y="36" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">ON YOUR SIX · LEGS 6" UP</text>
    </svg>
  ),

  jumpsquat: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="112" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Phase 1: squat down (left) */}
      <circle cx="50" cy="55" r="11" fill="#c8a96e" opacity="0.5"/>
      <path d="M44 66 L30 80 L26 112 M56 66 L70 80 L74 112" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M44 66 L30 66 M56 66 L70 66" stroke="#c8a96e" strokeWidth="5" strokeLinecap="round" opacity="0.5"/>
      {/* Arrow */}
      <path d="M88 65 L112 65" stroke="#e2d9c8" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arrowJS)"/>
      {/* Phase 2: jump (right) */}
      <circle cx="150" cy="18" r="12" fill="#c8a96e"/>
      <rect x="144" y="30" width="12" height="22" rx="6" fill="#c8a96e"/>
      <path d="M144 40 L130 48 M156 40 L170 48" stroke="#c8a96e" strokeWidth="5" strokeLinecap="round"/>
      <path d="M146 52 L138 72 M154 52 L162 72" stroke="#c8a96e" strokeWidth="5" strokeLinecap="round"/>
      {/* Air indicators */}
      <path d="M150 90 L150 78" stroke="#c8a96e" strokeWidth="1.5" strokeDasharray="2,2"/>
      <text x="100" y="8" textAnchor="middle" fontSize="9" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">JUMP SQUAT · MAX HEIGHT</text>
      <defs>
        <marker id="arrowJS" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#e2d9c8"/>
        </marker>
      </defs>
    </svg>
  ),

  diamondpushup: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Body */}
      <rect x="28" y="72" width="118" height="12" rx="6" fill="#c8a96e"/>
      <circle cx="154" cy="68" r="12" fill="#c8a96e"/>
      {/* Diamond hands */}
      <polygon points="88,90 100,82 112,90 100,98" fill="none" stroke="#c8a96e" strokeWidth="2"/>
      <rect x="84" y="82" width="8" height="18" rx="4" fill="#c8a96e" transform="rotate(-15 88 90)"/>
      <rect x="108" y="82" width="8" height="18" rx="4" fill="#c8a96e" transform="rotate(15 112 90)"/>
      {/* Feet */}
      <rect x="18" y="80" width="14" height="8" rx="3" fill="#c8a96e"/>
      <text x="100" y="25" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">DIAMOND PUSH-UP</text>
      <text x="100" y="40" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">◆ HANDS FORM DIAMOND</text>
    </svg>
  ),

  bearcrawl: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="112" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Figure in bear crawl */}
      <circle cx="150" cy="52" r="12" fill="#c8a96e"/>
      <rect x="60" y="62" width="85" height="12" rx="6" fill="#c8a96e" transform="rotate(-5 100 68)"/>
      {/* Four limbs on ground */}
      <rect x="130" y="72" width="10" height="32" rx="4" fill="#c8a96e"/>
      <rect x="68" y="70" width="10" height="32" rx="4" fill="#c8a96e"/>
      <rect x="100" y="72" width="10" height="28" rx="4" fill="#c8a96e"/>
      <rect x="48" y="72" width="10" height="28" rx="4" fill="#c8a96e"/>
      {/* Knee height indicator */}
      <path d="M145" y1="98" x2="145" y2="104" stroke="#c8a96e" strokeWidth="1" strokeDasharray="2,1"/>
      <text x="100" y="20" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">BEAR CRAWL</text>
      <text x="100" y="35" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">KNEES 2" OFF DECK</text>
      {/* Direction arrow */}
      <path d="M30 68 L18 68" stroke="#c8a96e" strokeWidth="2" markerEnd="url(#arrowBC)"/>
      <defs>
        <marker id="arrowBC" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6 Z" fill="#c8a96e"/>
        </marker>
      </defs>
    </svg>
  ),

  kneeraise: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="5" width="40" height="10" rx="5" fill="#6b7280"/>
      <rect x="18" y="5" width="164" height="5" rx="2" fill="#4a5568"/>
      <circle cx="100" cy="30" r="13" fill="#c8a96e"/>
      {/* Arms up */}
      <path d="M94 18 L80 10 M106 18 L120 10" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round"/>
      {/* Torso */}
      <rect x="94" y="42" width="12" height="22" rx="6" fill="#c8a96e"/>
      {/* Knees raised to chest */}
      <path d="M96 64 L80 80 L90 100" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M104 64 L120 80 L110 100" stroke="#c8a96e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="100" y="115" textAnchor="middle" fontSize="9" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">KNEES TO CHEST</text>
    </svg>
  ),

  sprint: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="112" width="180" height="4" rx="2" fill="#4a5568"/>
      {/* Running figure with high knees */}
      <circle cx="100" cy="22" r="14" fill="#c8a96e"/>
      {/* Torso */}
      <rect x="94" y="35" width="12" height="28" rx="6" fill="#c8a96e" transform="rotate(-8 100 49)"/>
      {/* Arm pump */}
      <path d="M92 42 L72 30 M108 42 L126 58" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round"/>
      {/* High knee */}
      <path d="M96 62 L75 72 L80 112" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Trailing leg */}
      <path d="M104 62 L120 84 L130 112" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Speed lines */}
      <path d="M55 35 L40 35 M50 48 L32 48 M55 61 L38 61" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <text x="100" y="10" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">SPRINT IN PLACE</text>
    </svg>
  ),

  vup: (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* V-Up peak position */}
      <circle cx="100" cy="45" r="13" fill="#c8a96e"/>
      {/* Torso up */}
      <path d="M100 58 L90 80" stroke="#c8a96e" strokeWidth="10" strokeLinecap="round"/>
      {/* Legs up */}
      <path d="M90 80 L60 52 M90 80 L120 52" stroke="#c8a96e" strokeWidth="8" strokeLinecap="round"/>
      {/* Arms reaching */}
      <path d="M96 52 L65 50 M104 52 L135 50" stroke="#c8a96e" strokeWidth="6" strokeLinecap="round"/>
      {/* V shape indicator */}
      <path d="M65 50 L90 80 L115 50" fill="none" stroke="#c8a96e" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
      <text x="100" y="20" textAnchor="middle" fontSize="10" fill="#e2d9c8" fontFamily="monospace" fontWeight="bold">V-UP</text>
      <text x="100" y="108" textAnchor="middle" fontSize="8" fill="#9a8a72" fontFamily="monospace">TOUCH FEET AT TOP</text>
      {/* Ground line */}
      <rect x="10" y="108" width="180" height="4" rx="2" fill="#4a5568"/>
    </svg>
  ),
};

export default function ExerciseFigure({ svgKey }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {figures[svgKey] || figures.pushup}
    </div>
  );
}
