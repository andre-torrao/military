import React from 'react';
import ExerciseFigure from './ExerciseFigure';

const difficultyColor = {
  Basic: '#4a7c5c',
  Medium: '#c8a96e',
  Hard: '#a04040',
};

const categoryLabel = {
  upper: 'UPPER',
  lower: 'LOWER',
  core: 'CORE',
  full: 'FULL BODY',
  cardio: 'CARDIO',
};

export default function WorkoutPreview({ workout, onStart, onRegenerate }) {
  return (
    <div style={styles.container}>
      {/* Mission header */}
      <div style={styles.missionHeader}>
        <div style={styles.missionBadge}>MISSION BRIEFING</div>
        <h2 style={styles.missionName}>{workout.template.name}</h2>
        <div style={styles.missionMeta}>
          <span style={styles.metaItem}>⏱ 15 MIN</span>
          <span style={styles.metaDivider}>·</span>
          <span style={styles.metaItem}>🔁 {workout.exercises.length} EXERCISES</span>
          <span style={styles.metaDivider}>·</span>
          <span style={styles.metaItem}>⏸ {workout.restBetween}s REST</span>
        </div>
      </div>

      {/* Exercise list */}
      <div style={styles.exerciseList}>
        {workout.exercises.map((ex, i) => (
          <div key={ex.id} style={styles.exerciseCard}>
            {/* Number */}
            <div style={styles.exNumber}>{String(i + 1).padStart(2, '0')}</div>

            {/* Illustration */}
            <div style={styles.illustration}>
              <ExerciseFigure svgKey={ex.svgKey} />
            </div>

            {/* Info */}
            <div style={styles.exInfo}>
              <div style={styles.exTop}>
                <span style={styles.exName}>{ex.name}</span>
                <span style={{
                  ...styles.difficulty,
                  color: difficultyColor[ex.difficulty],
                  borderColor: difficultyColor[ex.difficulty],
                }}>
                  {ex.difficulty.toUpperCase()}
                </span>
              </div>
              <div style={styles.exReps}>{ex.reps}</div>
              <div style={styles.muscles}>
                {ex.muscles.map(m => (
                  <span key={m} style={styles.muscleTag}>{m}</span>
                ))}
              </div>
              <div style={styles.exCues}>
                {ex.cues.slice(0, 2).map((c, ci) => (
                  <span key={ci} style={styles.cue}>▸ {c}</span>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={styles.category}>{categoryLabel[ex.category] || ex.category}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <button style={styles.startBtn} onClick={onStart}>
          ▶ EXECUTE MISSION
        </button>
        <button style={styles.regenBtn} onClick={onRegenerate}>
          ↺ NEW RANDOM MISSION
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#0a0f0a', minHeight: '100vh', color: '#e2d9c8',
    fontFamily: 'monospace', padding: '0 0 3rem',
  },
  missionHeader: {
    padding: '2rem 1.5rem 1.5rem',
    borderBottom: '1px solid #1e2a1e',
    textAlign: 'center',
  },
  missionBadge: {
    display: 'inline-block', fontSize: '10px', letterSpacing: '4px',
    color: '#5a7a5a', border: '1px solid #1e4a1e', padding: '0.3rem 0.8rem',
    borderRadius: '2px', marginBottom: '0.8rem',
  },
  missionName: {
    fontSize: '22px', fontWeight: 'bold', color: '#e2d9c8',
    letterSpacing: '2px', margin: '0 0 0.8rem',
  },
  missionMeta: { display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  metaItem: { fontSize: '11px', color: '#c8a96e', letterSpacing: '1px' },
  metaDivider: { color: '#3a4a3a' },
  exerciseList: { padding: '1rem 1rem' },
  exerciseCard: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.75rem', marginBottom: '0.75rem',
    background: '#0f1a0f', border: '1px solid #1e2a1e',
    borderRadius: '4px', position: 'relative',
    transition: 'border-color 0.2s',
  },
  exNumber: {
    fontSize: '18px', fontWeight: 'bold', color: '#1e3a1e',
    minWidth: '28px', textAlign: 'center',
  },
  illustration: {
    width: '90px', height: '60px', flexShrink: 0,
    background: '#0a130a', borderRadius: '3px',
    border: '1px solid #1a2a1a', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  exInfo: { flex: 1, minWidth: 0 },
  exTop: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' },
  exName: { fontSize: '14px', fontWeight: 'bold', color: '#e2d9c8', letterSpacing: '1px' },
  difficulty: {
    fontSize: '9px', border: '1px solid', padding: '1px 5px',
    borderRadius: '2px', letterSpacing: '1px', flexShrink: 0,
  },
  exReps: { fontSize: '12px', color: '#c8a96e', marginBottom: '4px', letterSpacing: '1px' },
  muscles: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' },
  muscleTag: {
    fontSize: '9px', background: '#0a1a0a', border: '1px solid #2a3a2a',
    color: '#5a7a5a', padding: '1px 5px', borderRadius: '2px', letterSpacing: '1px',
  },
  exCues: { display: 'flex', flexDirection: 'column', gap: '1px' },
  cue: { fontSize: '10px', color: '#4a6a4a' },
  category: {
    fontSize: '9px', color: '#3a5a3a', letterSpacing: '2px',
    writing: 'vertical-rl', writingMode: 'vertical-rl',
    textOrientation: 'mixed', flexShrink: 0,
  },
  cta: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '0.75rem', padding: '1.5rem',
  },
  startBtn: {
    background: '#c8a96e', border: 'none', color: '#0a0f0a',
    padding: '1rem 3rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold',
    letterSpacing: '4px', width: '100%', maxWidth: '360px',
  },
  regenBtn: {
    background: 'none', border: '1px solid #2a3a2a', color: '#9a8a72',
    padding: '0.75rem 2rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '12px', letterSpacing: '2px',
    width: '100%', maxWidth: '360px',
  },
};
