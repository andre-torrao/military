import React from 'react';

const S = {
  skin: '#FBBF8A',
  skinDark: '#E8965A',
  shirt: '#1D4ED8',
  shirtDark: '#1E3A8A',
  shorts: '#1E293B',
  shoe: '#334155',
  ground: '#E2E8F0',
  groundLine: '#CBD5E1',
  bar: '#64748B',
  barSupport: '#94A3B8',
  accent: '#3B82F6',
  arrow: '#10B981',
};

function Stick({ children, viewBox = '0 0 220 160' }) {
  return (
    <svg viewBox={viewBox} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

// Reusable body parts
function Head({ cx, cy, r = 14 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={S.skin} stroke={S.skinDark} strokeWidth="1.5"/>
      <circle cx={cx - 4} cy={cy - 2} r={2} fill={S.skinDark}/>
      <circle cx={cx + 4} cy={cy - 2} r={2} fill={S.skinDark}/>
      <path d={`M${cx - 4} ${cy + 4} Q${cx} ${cy + 8} ${cx + 4} ${cy + 4}`} stroke={S.skinDark} strokeWidth="1.2" fill="none"/>
    </>
  );
}

const figures = {
  pushup: (
    <Stick>
      {/* Ground */}
      <rect x="10" y="130" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Phase: down */}
      <g opacity="0.35">
        <rect x="30" y="108" width="80" height="14" rx="7" fill={S.shirt}/>
        <Head cx={120} cy={108} r={11}/>
        <rect x="42" y="113" width="9" height="22" rx="4" fill={S.skin}/>
        <rect x="74" y="113" width="9" height="22" rx="4" fill={S.skin}/>
        <rect x="20" y="115" width="25" height="10" rx="5" fill={S.shorts}/>
        <rect x="18" y="123" width="10" height="8" rx="3" fill={S.shoe}/>
        <rect x="27" y="123" width="10" height="8" rx="3" fill={S.shoe}/>
      </g>
      {/* Phase: up (main) */}
      <rect x="35" y="88" width="85" height="16" rx="8" fill={S.shirt}/>
      <Head cx={128} cy={85} r={13}/>
      <rect x="48" y="96" width="10" height="34" rx="5" fill={S.skin} stroke={S.skinDark} strokeWidth="1"/>
      <rect x="82" y="96" width="10" height="34" rx="5" fill={S.skin} stroke={S.skinDark} strokeWidth="1"/>
      <rect x="20" y="98" width="28" height="12" rx="6" fill={S.shorts}/>
      <rect x="18" y="108" width="12" height="10" rx="4" fill={S.shoe}/>
      <rect x="29" y="108" width="12" height="10" rx="4" fill={S.shoe}/>
      {/* Arrows */}
      <path d="M65 75 L65 86" stroke={S.arrow} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowDown)"/>
      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={S.arrow} transform="rotate(90 4 4)"/>
        </marker>
      </defs>
      {/* Labels */}
      <text x="110" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">FLEXÕES</text>
      <text x="110" y="36" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Peito · Tríceps · Ombros</text>
      <text x="17" y="80" fontSize="9" fill="#94A3B8" fontFamily="Inter,sans-serif">INÍCIO</text>
      <text x="17" y="100" fontSize="9" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">CIMA</text>
    </Stick>
  ),

  squat: (
    <Stick>
      <rect x="10" y="145" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Standing (ghost) */}
      <g opacity="0.3">
        <Head cx={155} cy={25} r={12}/>
        <rect x="149" y="37" width="12" height="28" rx="6" fill={S.shirt}/>
        <path d="M149 65 L140 95 M161 65 L170 95" stroke={S.shorts} strokeWidth="10" strokeLinecap="round"/>
        <path d="M140 95 L136 145 M170 95 L174 145" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      </g>
      {/* Squat position */}
      <Head cx={110} cy={48} r={15}/>
      <rect x="103" y="63" width="14" height="22" rx="7" fill={S.shirt}/>
      {/* Arms extended forward */}
      <path d="M103 70 L72 66 M117 70 L148 66" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      {/* Thighs parallel */}
      <path d="M105 84 L72 110 M115 84 L148 110" stroke={S.shorts} strokeWidth="11" strokeLinecap="round"/>
      {/* Lower legs */}
      <path d="M72 110 L68 145 M148 110 L152 145" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      {/* Shoes */}
      <rect x="56" y="140" width="20" height="9" rx="4" fill={S.shoe}/>
      <rect x="140" y="140" width="20" height="9" rx="4" fill={S.shoe}/>
      {/* Parallel line */}
      <path d="M45 110 L165 110" stroke={S.accent} strokeWidth="1.2" strokeDasharray="5,4"/>
      <text x="168" y="114" fontSize="9" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">↔ PARALELO</text>
      <text x="110" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">AGACHAMENTO</text>
      <text x="110" y="34" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Quadríceps · Glúteos</text>
    </Stick>
  ),

  burpee: (
    <Stick viewBox="0 0 280 160">
      <rect x="10" y="148" width="260" height="4" rx="2" fill={S.groundLine}/>
      {/* Phase 1: Standing jump */}
      <Head cx={30} cy={22} r={11}/>
      <rect x="24" y="33" width="12" height="22" rx="6" fill={S.shirt}/>
      <path d="M24 40 L12 50 M36 40 L48 50" stroke={S.skin} strokeWidth="6" strokeLinecap="round"/>
      <path d="M26 55 L20 80 M34 55 L40 80" stroke={S.shorts} strokeWidth="8" strokeLinecap="round"/>
      <path d="M20 80 L16 110 M40 80 L44 110" stroke={S.skin} strokeWidth="6" strokeLinecap="round"/>
      <text x="30" y="125" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="Inter,sans-serif">1. Salto</text>
      {/* Arrow */}
      <path d="M60 75 L82 75" stroke={S.arrow} strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arr2)"/>
      {/* Phase 2: Plank */}
      <rect x="95" y="108" width="70" height="12" rx="6" fill={S.shirt}/>
      <Head cx={173} cy={105} r={11}/>
      <rect x="102" y="115" width="9" height="28" rx="4" fill={S.skin}/>
      <rect x="143" y="115" width="9" height="28" rx="4" fill={S.skin}/>
      <rect x="88" y="118" width="18" height="8" rx="4" fill={S.shorts}/>
      <text x="135" y="155" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="Inter,sans-serif">2. Prancha + Flexão</text>
      {/* Arrow2 */}
      <path d="M196 75 L218 75" stroke={S.arrow} strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arr3)"/>
      {/* Phase 3: Jump up */}
      <Head cx={245} cy={18} r={11}/>
      <rect x="239" y="29" width="12" height="20" rx="6" fill={S.shirt}/>
      <path d="M239 36 L228 44 M251 36 L262 44" stroke={S.skin} strokeWidth="6" strokeLinecap="round"/>
      <path d="M241 49 L234 72 M249 49 L256 72" stroke={S.shorts} strokeWidth="8" strokeLinecap="round"/>
      <path d="M234 72 L230 100 M256 72 L260 100" stroke={S.skin} strokeWidth="6" strokeLinecap="round"/>
      <text x="245" y="120" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="Inter,sans-serif">3. Salto final</text>
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={S.arrow}/>
        </marker>
        <marker id="arr3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={S.arrow}/>
        </marker>
      </defs>
      <text x="140" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">BURPEE</text>
    </Stick>
  ),

  plank: (
    <Stick>
      <rect x="10" y="130" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Body */}
      <rect x="25" y="98" width="125" height="16" rx="8" fill={S.shirt}/>
      <Head cx={158} cy={95} r={13}/>
      {/* Forearms */}
      <rect x="45" y="110" width="32" height="10" rx="5" fill={S.skin}/>
      <rect x="95" y="110" width="32" height="10" rx="5" fill={S.skin}/>
      {/* Feet */}
      <rect x="15" y="108" width="15" height="10" rx="4" fill={S.shoe}/>
      <rect x="25" y="108" width="15" height="10" rx="4" fill={S.shoe}/>
      {/* Straight line indicator */}
      <path d="M15 98 L172 98" stroke={S.accent} strokeWidth="1.5" strokeDasharray="6,4"/>
      {/* Squeeze indicators */}
      <path d="M90 80 L90 96" stroke={S.arrow} strokeWidth="2" strokeLinecap="round"/>
      <path d="M90 80 L84 86 M90 80 L96 86" stroke={S.arrow} strokeWidth="2" strokeLinecap="round"/>
      <text x="96" y="84" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">Aperta!</text>
      <text x="110" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">PRANCHA</text>
      <text x="110" y="38" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Core · Ombros · Glúteos</text>
      <text x="110" y="58" textAnchor="middle" fontSize="10" fill={S.accent} fontFamily="Inter,sans-serif">Corpo em linha reta ↔</text>
    </Stick>
  ),

  lunge: (
    <Stick>
      <rect x="10" y="148" width="200" height="4" rx="2" fill={S.groundLine}/>
      <Head cx={110} cy={25} r={14}/>
      <rect x="104" y="39" width="12" height="30" rx="6" fill={S.shirt}/>
      {/* Front leg */}
      <path d="M106 69 L78 100 L74 148" stroke={S.shorts} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="62" y="142" width="22" height="10" rx="4" fill={S.shoe}/>
      {/* Back leg */}
      <path d="M114 69 L142 100 L158 148" stroke={S.shorts} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="147" y="142" width="22" height="10" rx="4" fill={S.shoe}/>
      {/* Knee near floor */}
      <circle cx="158" cy="148" r="8" fill="none" stroke={S.accent} strokeWidth="2" strokeDasharray="3,2"/>
      <text x="170" y="148" fontSize="9" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">1cm</text>
      {/* Arms */}
      <path d="M104 50 L85 60 M116 50 L135 60" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      <text x="110" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">AVANÇO</text>
    </Stick>
  ),

  mountainclimber: (
    <Stick>
      <rect x="10" y="148" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Plank body */}
      <rect x="42" y="82" width="100" height="14" rx="7" fill={S.shirt}/>
      <Head cx={150} cy={78} r={12}/>
      {/* Hands */}
      <rect x="130" y="92" width="10" height="30" rx="4" fill={S.skin}/>
      <rect x="55" y="92" width="10" height="30" rx="4" fill={S.skin}/>
      {/* Leg back */}
      <path d="M42 90 L22 110 L18 148" stroke={S.shorts} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="142" width="18" height="10" rx="4" fill={S.shoe}/>
      {/* Knee driven in */}
      <path d="M58 90 L75 115 L85 148" stroke={S.shorts} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="75" y="142" width="18" height="10" rx="4" fill={S.shoe}/>
      {/* Knee arrow */}
      <path d="M100 90 L82 112" stroke={S.arrow} strokeWidth="2.5" strokeDasharray="4,3" strokeLinecap="round"/>
      <text x="102" y="88" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">Joelho ao peito!</text>
      <text x="110" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">MOUNTAIN CLIMBER</text>
      <text x="110" y="36" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Core · Cardio · Ombros</text>
    </Stick>
  ),

  pullup: (
    <Stick>
      {/* Bar */}
      <rect x="15" y="22" width="190" height="9" rx="4" fill={S.bar}/>
      <rect x="14" y="10" width="7" height="22" rx="3" fill={S.barSupport}/>
      <rect x="199" y="10" width="7" height="22" rx="3" fill={S.barSupport}/>
      {/* Arms up */}
      <path d="M100 31 L78 22" stroke={S.skin} strokeWidth="10" strokeLinecap="round"/>
      <path d="M110 31 L132 22" stroke={S.skin} strokeWidth="10" strokeLinecap="round"/>
      {/* Body */}
      <Head cx={105} cy={44} r={14}/>
      <rect x="99" y="58" width="12" height="32" rx="6" fill={S.shirt}/>
      {/* Legs */}
      <path d="M101 90 L92 120 M109 90 L118 120" stroke={S.shorts} strokeWidth="9" strokeLinecap="round"/>
      <path d="M92 120 L88 148 M118 120 L122 148" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      <rect x="78" y="143" width="18" height="9" rx="4" fill={S.shoe}/>
      <rect x="112" y="143" width="18" height="9" rx="4" fill={S.shoe}/>
      {/* Arrow up */}
      <path d="M135 80 L135 50" stroke={S.arrow} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrUp)"/>
      <text x="140" y="70" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">Queixo</text>
      <text x="140" y="81" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">sobre barra</text>
      <defs>
        <marker id="arrUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,8 L4,0 L8,8 Z" fill={S.arrow}/>
        </marker>
      </defs>
      <text x="110" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">BARRA FIXA — Costas · Bíceps</text>
    </Stick>
  ),

  jumpingsquat: (
    <Stick>
      <rect x="10" y="148" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Squat down ghost */}
      <g opacity="0.3">
        <Head cx={60} cy={60} r={11}/>
        <rect x="54" y="71" width="12" height="20" rx="6" fill={S.shirt}/>
        <path d="M56 91 L36 110 L32 148 M66 91 L86 110 L90 148" stroke={S.shorts} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="60" y="158" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="Inter,sans-serif">Agacha</text>
      </g>
      {/* Arrow */}
      <path d="M102 80 L125 80" stroke={S.arrow} strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arr4)"/>
      {/* Jump up main */}
      <Head cx={155} cy={18} r={13}/>
      <rect x="149" y="31" width="12" height="24" rx="6" fill={S.shirt}/>
      <path d="M149 40 L134 50 M161 40 L176 50" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      <path d="M151 55 L141 80 M159 55 L169 80" stroke={S.shorts} strokeWidth="9" strokeLinecap="round"/>
      <path d="M141 80 L136 108 M169 80 L174 108" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      <rect x="124" y="103" width="18" height="9" rx="4" fill={S.shoe}/>
      <rect x="162" y="103" width="18" height="9" rx="4" fill={S.shoe}/>
      {/* Height arrow */}
      <path d="M192 108 L192 18" stroke={S.arrow} strokeWidth="2" strokeLinecap="round"/>
      <path d="M188 22 L192 14 L196 22" fill={S.arrow}/>
      <text x="197" y="65" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">Máx</text>
      <defs>
        <marker id="arr4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={S.arrow}/>
        </marker>
      </defs>
      <text x="110" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">AGACHAMENTO COM SALTO</text>
    </Stick>
  ),

  dip: (
    <Stick>
      {/* Bars */}
      <rect x="18" y="40" width="12" height="80" rx="5" fill={S.barSupport}/>
      <rect x="12" y="38" width="24" height="10" rx="4" fill={S.bar}/>
      <rect x="190" y="40" width="12" height="80" rx="5" fill={S.barSupport}/>
      <rect x="184" y="38" width="24" height="10" rx="4" fill={S.bar}/>
      {/* Figure */}
      <Head cx={110} cy={32} r={13}/>
      <rect x="104" y="45" width="12" height="28" rx="6" fill={S.shirt}/>
      <path d="M104 55 L28 48" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      <path d="M116 55 L192 48" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      <path d="M106 73 L96 108 M114 73 L124 108" stroke={S.shorts} strokeWidth="9" strokeLinecap="round"/>
      <path d="M96 108 L92 138 M124 108 L128 138" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
      {/* Elbow angle */}
      <path d="M75 48 Q60 48 60 60" stroke={S.accent} strokeWidth="1.5" fill="none"/>
      <text x="42" y="58" fontSize="8" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">90°</text>
      <text x="110" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">DIPS</text>
      <text x="110" y="155" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Tríceps · Peito · Ombros</text>
    </Stick>
  ),

  hikneerun: (
    <Stick>
      <rect x="10" y="148" width="200" height="4" rx="2" fill={S.groundLine}/>
      <Head cx={110} cy={22} r={14}/>
      <rect x="104" y="36" width="12" height="28" rx="6" fill={S.shirt} transform="rotate(-8 110 50)"/>
      {/* Arm pump */}
      <path d="M104 45 L78 32" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      <path d="M116 45 L140 62" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      {/* High knee */}
      <path d="M106 63 L76 78 M76 78 L80 148" stroke={S.shorts} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="68" y="142" width="20" height="10" rx="4" fill={S.shoe}/>
      {/* Back leg */}
      <path d="M114 63 L132 90 L145 148" stroke={S.shorts} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="134" y="142" width="20" height="10" rx="4" fill={S.shoe}/>
      {/* Knee height line */}
      <path d="M50 78 L78 78" stroke={S.accent} strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="30" y="82" fontSize="8" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">↑ Anca</text>
      {/* Speed lines */}
      <path d="M160 45 L178 45 M158 58 L180 58 M162 71 L178 71" stroke={S.accent} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <text x="110" y="10" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">CORRIDA JOELHOS ALTOS</text>
    </Stick>
  ),

  flutterkick: (
    <Stick>
      <rect x="10" y="148" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Body lying down */}
      <rect x="22" y="118" width="115" height="16" rx="8" fill={S.shirt}/>
      <Head cx={148} cy={116} r={13}/>
      {/* Arms by sides */}
      <rect x="26" y="130" width="38" height="9" rx="4" fill={S.skin}/>
      <rect x="72" y="130" width="38" height="9" rx="4" fill={S.skin}/>
      {/* Legs at 15cm, alternating */}
      <path d="M22 120 L10 90" stroke={S.shorts} strokeWidth="11" strokeLinecap="round"/>
      <rect x="2" y="83" width="16" height="9" rx="4" fill={S.shoe}/>
      <path d="M34" y1="120" x2="25" y2="75" stroke={S.skin} strokeWidth="0"/>
      <path d="M34 120 L22 72" stroke={S.shorts} strokeWidth="11" strokeLinecap="round"/>
      <rect x="13" y="65" width="16" height="9" rx="4" fill={S.shoe}/>
      {/* Height indicator */}
      <path d="M170 148 L170 90" stroke={S.accent} strokeWidth="1.5" strokeDasharray="4,3"/>
      <path d="M166 94 L170 86 L174 94" fill={S.accent}/>
      <text x="175" y="120" fontSize="9" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">15cm</text>
      <text x="110" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">FLUTTER KICK</text>
      <text x="110" y="38" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Abdómen · Pernas alternadas</text>
      <text x="110" y="58" textAnchor="middle" fontSize="10" fill={S.accent} fontFamily="Inter,sans-serif">Costas planas no chão</text>
    </Stick>
  ),

  vup: (
    <Stick>
      <rect x="10" y="155" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Ghost: flat */}
      <g opacity="0.25">
        <rect x="30" y="128" width="110" height="12" rx="6" fill={S.shirt}/>
        <Head cx={148} cy={126} r={11}/>
        <path d="M30 128 L12 128" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
        <path d="M30 132 L12 155 M38 132 L18 155" stroke={S.shorts} strokeWidth="8" strokeLinecap="round"/>
      </g>
      {/* V-Up peak */}
      <Head cx={110} cy={52} r={14}/>
      {/* Torso up */}
      <path d="M108 66 L90 100" stroke={S.shirt} strokeWidth="12" strokeLinecap="round"/>
      {/* Legs up */}
      <path d="M90 100 L52 62 M90 100 L128 62" stroke={S.shorts} strokeWidth="11" strokeLinecap="round"/>
      <rect x="40" y="55" width="16" height="10" rx="4" fill={S.shoe}/>
      <rect x="120" y="55" width="16" height="10" rx="4" fill={S.shoe}/>
      {/* Arms reaching to feet */}
      <path d="M104 60 L58 58 M116 60 L136 58" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      {/* V shape */}
      <path d="M52 62 L90 100 L128 62" fill="none" stroke={S.accent} strokeWidth="1.5" strokeDasharray="5,4"/>
      <text x="110" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">V-UP</text>
      <text x="110" y="36" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Core Completo</text>
      <text x="110" y="125" textAnchor="middle" fontSize="10" fill={S.accent} fontFamily="Inter,sans-serif" fontWeight="600">Toca nos pés no topo!</text>
    </Stick>
  ),

  worldsgreateststretch: (
    <Stick>
      <rect x="10" y="150" width="200" height="4" rx="2" fill={S.groundLine}/>
      <Head cx={130} cy={38} r={13}/>
      {/* Torso rotated up */}
      <rect x="96" y="50" width="12" height="28" rx="6" fill={S.shirt} transform="rotate(20 102 64)"/>
      {/* Front leg bent deep */}
      <path d="M100 78 L72 105 L68 150" stroke={S.shorts} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="56" y="144" width="20" height="10" rx="4" fill={S.shoe}/>
      {/* Back leg extended */}
      <path d="M108 78 L148 105 L175 150" stroke={S.shorts} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="164" y="144" width="20" height="10" rx="4" fill={S.shoe}/>
      {/* Front hand on ground */}
      <path d="M95 72 L68 105" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      <circle cx="68" cy="106" r="5" fill={S.skin}/>
      {/* Arm rotating up */}
      <path d="M108 62 L138 38" stroke={S.skin} strokeWidth="8" strokeLinecap="round"/>
      <path d="M108 62 L108 38" stroke={S.accent} strokeWidth="1.5" strokeDasharray="3,3"/>
      <text x="110" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">WORLD'S GREATEST STRETCH</text>
      <text x="110" y="32" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="Inter,sans-serif">Ancas · Coluna · Mobilidade</text>
    </Stick>
  ),

  inchworm: (
    <Stick viewBox="0 0 260 160">
      <rect x="10" y="150" width="240" height="4" rx="2" fill={S.groundLine}/>
      {/* Phase 1: bent over */}
      <g>
        <Head cx={30} cy={52} r={11}/>
        <path d="M30 63 Q30 90 30 95" stroke={S.shirt} strokeWidth="10" strokeLinecap="round"/>
        <path d="M25 90 L14 150 M35 90 L46 150" stroke={S.shorts} strokeWidth="9" strokeLinecap="round"/>
        <path d="M30 95 L18 115" stroke={S.skin} strokeWidth="7" strokeLinecap="round"/>
        <circle cx="18" cy="116" r="5" fill={S.skin}/>
        <text x="30" y="158" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="Inter,sans-serif">Dobra</text>
      </g>
      <path d="M62 100 L88 100" stroke={S.arrow} strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#arr5)"/>
      {/* Phase 2: plank */}
      <g>
        <rect x="100" y="108" width="80" height="12" rx="6" fill={S.shirt}/>
        <Head cx={188} cy={104} r={11}/>
        <rect x="108" y="116" width="9" height="26" rx="4" fill={S.skin}/>
        <rect x="158" y="116" width="9" height="26" rx="4" fill={S.skin}/>
        <rect x="92" y="120" width="20" height="8" rx="4" fill={S.shoe}/>
        <text x="145" y="155" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="Inter,sans-serif">Anda com mãos</text>
      </g>
      <defs>
        <marker id="arr5" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={S.arrow}/>
        </marker>
      </defs>
      <text x="130" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">INCHWORM</text>
      <text x="130" y="34" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Isquiotibiais · Core · Mobilidade</text>
    </Stick>
  ),

  bearcrunch: (
    <Stick>
      <rect x="10" y="150" width="200" height="4" rx="2" fill={S.groundLine}/>
      {/* Bear position */}
      <Head cx={155} cy={60} r={12}/>
      <rect x="70" y="72" width="82" height="12" rx="6" fill={S.shirt} transform="rotate(-5 111 78)"/>
      {/* Four limbs */}
      <rect x="130" y="82" width="10" height="35" rx="4" fill={S.skin}/>
      <rect x="62" y="80" width="10" height="32" rx="4" fill={S.skin}/>
      <rect x="100" y="82" width="10" height="30" rx="4" fill={S.skin}/>
      <rect x="46" y="80" width="10" height="28" rx="4" fill={S.skin}/>
      {/* Knee to opposite elbow */}
      <path d="M100 82 L70 75" stroke={S.arrow} strokeWidth="2.5" strokeDasharray="5,3" strokeLinecap="round"/>
      <text x="110" y="58" fontSize="9" fill={S.arrow} fontFamily="Inter,sans-serif" fontWeight="600">Joelho → Cotovelo oposto</text>
      {/* Height indicator for knees */}
      <path d="M155" y1="115" x2="155" y2="150"/>
      <text x="110" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="Inter,sans-serif">BEAR CRUNCH</text>
      <text x="110" y="34" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="Inter,sans-serif">Core · Coordenação</text>
      <text x="110" y="145" textAnchor="middle" fontSize="9" fill={S.accent} fontFamily="Inter,sans-serif">Joelhos 5cm do chão</text>
    </Stick>
  ),
};

export default function ExerciseFigure({ exerciseId, size = 'normal' }) {
  const h = size === 'large' ? '200px' : size === 'small' ? '80px' : '140px';
  return (
    <div style={{ width: '100%', height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {figures[exerciseId] || figures.pushup}
    </div>
  );
}
