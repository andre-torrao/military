import React, { useState, useCallback } from 'react';
import WorkoutPreview from './components/WorkoutPreview';
import WorkoutTimer from './components/WorkoutTimer';
import { generateWorkout } from './data/exercises';
import './App.css';

const SCREENS = { HOME: 'home', PREVIEW: 'preview', TIMER: 'timer' };

function HomeScreen({ onGenerate }) {
  return (
    <div style={styles.home}>
      {/* Grid background */}
      <div style={styles.grid} />

      <div style={styles.homeContent}>
        {/* Logo / Header */}
        <div style={styles.emblem}>
          <svg viewBox="0 0 80 80" width="80" height="80">
            <polygon points="40,4 76,28 76,52 40,76 4,52 4,28" fill="none" stroke="#c8a96e" strokeWidth="1.5"/>
            <polygon points="40,14 66,30 66,50 40,66 14,50 14,30" fill="none" stroke="#4a7c5c" strokeWidth="0.8"/>
            <text x="40" y="36" textAnchor="middle" fill="#c8a96e" fontSize="10" fontFamily="monospace" fontWeight="bold">MIL</text>
            <text x="40" y="50" textAnchor="middle" fill="#c8a96e" fontSize="10" fontFamily="monospace" fontWeight="bold">CAL</text>
          </svg>
        </div>

        <div style={styles.tagline}>CLASSIFIED · TRAINING PROTOCOL</div>
        <h1 style={styles.title}>MILITARY<br/>CALISTHENICS</h1>
        <p style={styles.subtitle}>
          15-minute combat-ready workouts.<br/>
          No equipment. No excuses. Move out.
        </p>

        {/* Stats row */}
        <div style={styles.statsRow}>
          {[['15', 'EXERCISES'], ['4', 'PROTOCOLS'], ['15 MIN', 'MISSION TIME'], ['0', 'EQUIPMENT']].map(([v, l]) => (
            <div key={l} style={styles.stat}>
              <span style={styles.statVal}>{v}</span>
              <span style={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>

        <button style={styles.missionBtn} onClick={onGenerate}>
          ▶ GENERATE MISSION
        </button>

        <div style={styles.protocols}>
          {['ALPHA · Upper Assault', 'BRAVO · Full Circuit', 'CHARLIE · Core & Endurance', 'DELTA · Leg Annihilator'].map(p => (
            <div key={p} style={styles.protocolTag}>{p}</div>
          ))}
        </div>

        <p style={styles.footer}>
          Random protocol assigned each mission.<br/>
          <span style={{ color: '#3a5a3a' }}>Semper Fi.</span>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [workout, setWorkout] = useState(null);

  const handleGenerate = useCallback(() => {
    setWorkout(generateWorkout());
    setScreen(SCREENS.PREVIEW);
  }, []);

  const handleStart = useCallback(() => setScreen(SCREENS.TIMER), []);
  const handleBack = useCallback(() => setScreen(SCREENS.HOME), []);
  const handleComplete = useCallback(() => {
    setWorkout(generateWorkout());
    setScreen(SCREENS.PREVIEW);
  }, []);

  if (screen === SCREENS.HOME) return <HomeScreen onGenerate={handleGenerate} />;
  if (screen === SCREENS.PREVIEW) return (
    <WorkoutPreview
      workout={workout}
      onStart={handleStart}
      onRegenerate={handleGenerate}
    />
  );
  if (screen === SCREENS.TIMER) return (
    <WorkoutTimer
      workout={workout}
      onComplete={handleComplete}
      onBack={() => setScreen(SCREENS.PREVIEW)}
    />
  );
}

const styles = {
  home: {
    minHeight: '100vh', background: '#0a0f0a',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
    fontFamily: 'monospace',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(74,124,92,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(74,124,92,0.06) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  homeContent: {
    position: 'relative', zIndex: 1,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '420px',
  },
  emblem: { marginBottom: '1.5rem' },
  tagline: {
    fontSize: '9px', letterSpacing: '5px', color: '#3a5a3a',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '42px', fontWeight: 'bold', color: '#e2d9c8',
    letterSpacing: '4px', lineHeight: '1.1', margin: '0 0 1rem',
  },
  subtitle: {
    fontSize: '13px', color: '#5a7a5a', lineHeight: '1.7',
    margin: '0 0 2rem', letterSpacing: '0.5px',
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem', width: '100%', marginBottom: '2rem',
  },
  stat: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    padding: '0.75rem 0', background: '#0f1a0f',
    border: '1px solid #1e2a1e', borderRadius: '4px',
  },
  statVal: { fontSize: '20px', fontWeight: 'bold', color: '#c8a96e' },
  statLabel: { fontSize: '8px', color: '#3a5a3a', letterSpacing: '1px' },
  missionBtn: {
    background: '#c8a96e', border: 'none', color: '#0a0f0a',
    padding: '1.1rem 3rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold',
    letterSpacing: '4px', width: '100%', marginBottom: '1.5rem',
    transition: 'opacity 0.2s',
  },
  protocols: {
    display: 'flex', flexDirection: 'column', gap: '6px',
    width: '100%', marginBottom: '2rem',
  },
  protocolTag: {
    fontSize: '10px', color: '#3a5a3a', border: '1px solid #1a2a1a',
    padding: '0.4rem 1rem', borderRadius: '2px', letterSpacing: '2px',
    textAlign: 'left',
  },
  footer: {
    fontSize: '11px', color: '#2a3a2a', lineHeight: '1.8', letterSpacing: '0.5px',
  },
};
