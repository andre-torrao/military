import React from 'react';
import { theme } from '../data/theme';

const tabs = [
  { id: 'home',    label: 'Inicio',   icon: HomeIcon },
  { id: 'workout', label: 'Treino',   icon: WorkoutIcon },
  { id: 'stats',   label: 'Stats',    icon: StatsIcon },
  { id: 'profile', label: 'Perfil',   icon: ProfileIcon },
];

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4CAF50' : '#9CA3AF'}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );
}
function WorkoutIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4CAF50' : '#9CA3AF'}>
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
    </svg>
  );
}
function StatsIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4CAF50' : '#9CA3AF'}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  );
}
function ProfileIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4CAF50' : '#9CA3AF'}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );
}

export default function NavBar({ active, onChange }) {
  return (
    <div style={s.bar}>
      {tabs.map(tab => (
        <button key={tab.id} style={{ ...s.tab, color: active === tab.id ? '#4CAF50' : '#9CA3AF' }} onClick={() => onChange(tab.id)}>
          <tab.icon active={active === tab.id} />
          <span style={{ ...s.label, color: active === tab.id ? '#4CAF50' : '#9CA3AF', fontWeight: active === tab.id ? '700' : '500' }}>
            {tab.label}
          </span>
          {active === tab.id && <div style={s.dot} />}
        </button>
      ))}
    </div>
  );
}

const s = {
  bar: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: '#fff', borderTop: '1px solid #EFEFEF', display: 'flex', justifyContent: 'space-around', padding: '10px 0 18px', zIndex: 100, boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' },
  tab: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px', position: 'relative', fontFamily: 'Inter,sans-serif' },
  label: { fontSize: '11px' },
  dot: { position: 'absolute', bottom: '-4px', width: '4px', height: '4px', borderRadius: '50%', background: '#4CAF50' },
};
