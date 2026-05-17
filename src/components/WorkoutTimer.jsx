import React, { useState, useEffect, useRef } from 'react';

export default function WorkoutTimer({ workout, onComplete, onBack }) {
  const totalExercises = workout.exercises.length;
  const restTime = workout.restBetween;

  // Phase: 'exercise' | 'rest' | 'done'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('exercise');
  const [timeLeft, setTimeLeft] = useState(workout.exercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef(null);

  const currentExercise = workout.exercises[currentIndex];
  const progress = ((currentIndex / totalExercises) + (phase === 'rest' ? 0.5 / totalExercises : 0));
  const pct = Math.round(progress * 100);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          // Advance phase
          if (phase === 'exercise') {
            if (currentIndex < totalExercises - 1) {
              setPhase('rest');
              return restTime;
            } else {
              setIsRunning(false);
              setPhase('done');
              clearInterval(intervalRef.current);
              return 0;
            }
          } else {
            // rest → next exercise
            const next = currentIndex + 1;
            setCurrentIndex(next);
            setPhase('exercise');
            return workout.exercises[next].duration;
          }
        }
        return t - 1;
      });
      setTotalElapsed(e => e + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, phase, currentIndex]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const ringRadius = 54;
  const ringCirc = 2 * Math.PI * ringRadius;
  const maxTime = phase === 'rest' ? restTime : currentExercise.duration;
  const ringProgress = timeLeft / maxTime;
  const ringDash = ringCirc * ringProgress;

  if (phase === 'done') {
    return (
      <div style={styles.doneScreen}>
        <div style={styles.doneIcon}>★</div>
        <h2 style={styles.doneTitle}>MISSION COMPLETE</h2>
        <p style={styles.doneSub}>{workout.template.name}</p>
        <div style={styles.doneStats}>
          <div style={styles.doneStat}>
            <span style={styles.doneStatVal}>{totalExercises}</span>
            <span style={styles.doneStatLabel}>EXERCISES</span>
          </div>
          <div style={styles.doneStat}>
            <span style={styles.doneStatVal}>{formatTime(totalElapsed)}</span>
            <span style={styles.doneStatLabel}>TIME</span>
          </div>
          <div style={styles.doneStat}>
            <span style={styles.doneStatVal}>{totalExercises * 15}</span>
            <span style={styles.doneStatLabel}>EST. REPS</span>
          </div>
        </div>
        <button style={styles.btnPrimary} onClick={onComplete}>NEW MISSION</button>
        <button style={styles.btnSecondary} onClick={onBack}>BACK TO BASE</button>
      </div>
    );
  }

  return (
    <div style={styles.timerScreen}>
      {/* Header */}
      <div style={styles.timerHeader}>
        <button style={styles.backBtn} onClick={onBack}>← ABORT</button>
        <span style={styles.missionLabel}>{workout.template.name}</span>
      </div>

      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${pct}%` }} />
        <span style={styles.progressText}>{currentIndex + 1}/{totalExercises}</span>
      </div>

      {/* Phase indicator */}
      <div style={{ ...styles.phaseTag, background: phase === 'rest' ? '#1a3a2a' : '#1a2a3a' }}>
        {phase === 'rest' ? '⏸ REST' : '⚡ EXECUTE'}
      </div>

      {/* Timer ring */}
      <div style={styles.ringContainer}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={ringRadius} fill="none" stroke="#1e2a1e" strokeWidth="8"/>
          <circle
            cx="70" cy="70" r={ringRadius}
            fill="none"
            stroke={phase === 'rest' ? '#4a7c5c' : '#c8a96e'}
            strokeWidth="8"
            strokeDasharray={`${ringDash} ${ringCirc}`}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dasharray 0.9s linear' }}
          />
          <text x="70" y="62" textAnchor="middle" fill="#e2d9c8" fontSize="28" fontWeight="bold" fontFamily="monospace">
            {formatTime(timeLeft)}
          </text>
          <text x="70" y="82" textAnchor="middle" fill="#9a8a72" fontSize="10" fontFamily="monospace">
            {phase === 'rest' ? 'RECOVER' : 'REMAINING'}
          </text>
        </svg>
      </div>

      {/* Exercise info */}
      {phase === 'exercise' && (
        <div style={styles.exerciseInfo}>
          <h2 style={styles.exerciseName}>{currentExercise.name}</h2>
          <div style={styles.repsTag}>{currentExercise.reps}</div>
          <p style={styles.exerciseDesc}>{currentExercise.description}</p>
          <div style={styles.cueList}>
            {currentExercise.cues.map((c, i) => (
              <span key={i} style={styles.cue}>▸ {c}</span>
            ))}
          </div>
        </div>
      )}
      {phase === 'rest' && (
        <div style={styles.exerciseInfo}>
          <h2 style={styles.nextLabel}>NEXT UP</h2>
          {currentIndex + 1 < totalExercises && (
            <>
              <h3 style={styles.nextName}>{workout.exercises[currentIndex + 1].name}</h3>
              <div style={styles.repsTag}>{workout.exercises[currentIndex + 1].reps}</div>
            </>
          )}
          <p style={styles.restHint}>Shake it out. Stay loose. Hydrate.</p>
        </div>
      )}

      {/* Controls */}
      <div style={styles.controls}>
        <button
          style={{ ...styles.ctrlBtn, background: isRunning ? '#3a2020' : '#1a3a1a' }}
          onClick={() => setIsRunning(r => !r)}
        >
          {isRunning ? '⏸ PAUSE' : '▶ GO'}
        </button>
        <button
          style={styles.ctrlBtnSm}
          onClick={() => {
            if (phase === 'exercise' && currentIndex < totalExercises - 1) {
              setPhase('rest');
              setTimeLeft(restTime);
            } else if (phase === 'rest') {
              const next = currentIndex + 1;
              setCurrentIndex(next);
              setPhase('exercise');
              setTimeLeft(workout.exercises[next].duration);
            }
          }}
        >
          SKIP ⏭
        </button>
      </div>
    </div>
  );
}

const styles = {
  timerScreen: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    minHeight: '100vh', background: '#0a0f0a', padding: '0 0 2rem',
    color: '#e2d9c8', fontFamily: 'monospace',
  },
  timerHeader: {
    width: '100%', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '1rem 1.5rem',
    borderBottom: '1px solid #1e2a1e',
  },
  backBtn: {
    background: 'none', border: '1px solid #3a4a3a', color: '#9a8a72',
    padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '12px',
  },
  missionLabel: { fontSize: '10px', color: '#5a7a5a', letterSpacing: '2px', textTransform: 'uppercase' },
  progressBar: {
    width: '100%', height: '6px', background: '#1e2a1e',
    position: 'relative', display: 'flex', alignItems: 'center',
  },
  progressFill: {
    height: '100%', background: 'linear-gradient(90deg, #4a7c5c, #c8a96e)',
    transition: 'width 0.5s ease', borderRadius: '0 3px 3px 0',
  },
  progressText: {
    position: 'absolute', right: '0.5rem', fontSize: '10px',
    color: '#9a8a72', fontFamily: 'monospace',
  },
  phaseTag: {
    marginTop: '1.5rem', padding: '0.4rem 1.2rem', borderRadius: '20px',
    fontSize: '11px', letterSpacing: '3px', color: '#c8a96e',
    border: '1px solid #2a3a2a',
  },
  ringContainer: { margin: '1rem 0' },
  exerciseInfo: { textAlign: 'center', padding: '0 1.5rem', maxWidth: '360px' },
  exerciseName: { fontSize: '28px', fontWeight: 'bold', color: '#e2d9c8', margin: '0 0 0.5rem', letterSpacing: '2px' },
  repsTag: {
    display: 'inline-block', background: '#1a3a1a', border: '1px solid #4a7c5c',
    color: '#c8a96e', padding: '0.3rem 1rem', borderRadius: '4px',
    fontSize: '13px', letterSpacing: '2px', margin: '0 0 1rem',
  },
  exerciseDesc: { color: '#9a8a72', fontSize: '13px', lineHeight: '1.6', margin: '0 0 1rem' },
  cueList: { display: 'flex', flexDirection: 'column', gap: '4px' },
  cue: { fontSize: '12px', color: '#c8a96e', textAlign: 'left' },
  nextLabel: { fontSize: '11px', color: '#5a7a5a', letterSpacing: '4px', margin: '0 0 0.5rem' },
  nextName: { fontSize: '22px', color: '#e2d9c8', margin: '0 0 0.5rem' },
  restHint: { color: '#5a7a5a', fontSize: '12px', marginTop: '1rem', fontStyle: 'italic' },
  controls: { display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' },
  ctrlBtn: {
    border: '1px solid #4a7c5c', color: '#c8a96e', padding: '0.8rem 2.5rem',
    borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace',
    fontSize: '16px', fontWeight: 'bold', letterSpacing: '3px',
    transition: 'all 0.2s',
  },
  ctrlBtnSm: {
    background: 'none', border: '1px solid #3a4a3a', color: '#9a8a72',
    padding: '0.8rem 1rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '12px',
  },
  doneScreen: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '100vh', background: '#0a0f0a',
    color: '#e2d9c8', fontFamily: 'monospace', padding: '2rem', textAlign: 'center',
  },
  doneIcon: { fontSize: '64px', marginBottom: '1rem', color: '#c8a96e' },
  doneTitle: { fontSize: '32px', letterSpacing: '6px', margin: '0 0 0.5rem', color: '#e2d9c8' },
  doneSub: { color: '#5a7a5a', fontSize: '12px', letterSpacing: '2px', margin: '0 0 2.5rem' },
  doneStats: { display: 'flex', gap: '2rem', marginBottom: '2.5rem' },
  doneStat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  doneStatVal: { fontSize: '28px', fontWeight: 'bold', color: '#c8a96e' },
  doneStatLabel: { fontSize: '10px', color: '#5a7a5a', letterSpacing: '2px' },
  btnPrimary: {
    background: '#c8a96e', border: 'none', color: '#0a0f0a',
    padding: '0.9rem 2.5rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold',
    letterSpacing: '3px', marginBottom: '0.8rem', width: '240px',
  },
  btnSecondary: {
    background: 'none', border: '1px solid #3a4a3a', color: '#9a8a72',
    padding: '0.7rem 2.5rem', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'monospace', fontSize: '12px', letterSpacing: '2px', width: '240px',
  },
};
