import React, { useState, useEffect, useRef, useCallback } from 'react';
import { theme } from '../data/theme';
import ExerciseFigure from '../components/ExerciseFigure';
import { supabase } from '../supabase/client';
import { useAuth } from '../context/AuthContext';

export default function WorkoutTimerPage({ workout, onComplete, onBack }) {
  const { user, incrementWorkoutStats } = useAuth();
  const totalEx = workout.exercises.length;
  const restTime = workout.rest;

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('exercise');
  const [timeLeft, setTimeLeft] = useState(workout.exercises[0].duration);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const phaseRef = useRef(phase);
  const idxRef = useRef(idx);
  const exRef = useRef(workout.exercises);
  const restRef = useRef(restTime);
  const totalRef = useRef(totalEx);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { idxRef.current = idx; }, [idx]);

  const tick = useCallback(() => {
    setTimeLeft(t => {
      if (t <= 1) {
        const p = phaseRef.current; const i = idxRef.current;
        if (p === 'exercise') {
          if (i < totalRef.current - 1) { setPhase('rest'); return restRef.current; }
          else { setRunning(false); setPhase('done'); return 0; }
        } else {
          const next = i + 1; setIdx(next); setPhase('exercise');
          return exRef.current[next].duration;
        }
      }
      return t - 1;
    });
    setElapsed(e => e + 1);
  }, []);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [running, tick]);

  useEffect(() => {
    if (phase === 'done' && user) {
      incrementWorkoutStats(user.id);
      supabase.from('workout_logs').insert({ user_id: user.id, goal: workout.goalId, workout_name: workout.config.name, duration_minutes: 15, completed_at: new Date().toISOString() });
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const ex = workout.exercises[idx];
  const maxTime = phase === 'rest' ? restTime : ex.duration;
  const R = 80; const circ = 2 * Math.PI * R;
  const dash = circ * (timeLeft / maxTime);
  const accentColor = phase === 'rest' ? theme.colors.primaryLight : workout.config.color;

  function skip() {
    const i = idxRef.current; const p = phaseRef.current;
    if (p === 'exercise' && i < totalEx - 1) { setPhase('rest'); setTimeLeft(restTime); }
    else if (p === 'rest') { const next = i + 1; setIdx(next); setPhase('exercise'); setTimeLeft(exRef.current[next].duration); }
  }

  if (phase === 'done') {
    return (
      <div style={s.donePage}>
        <div style={s.doneCard}>
          <div style={s.doneStar}>★</div>
          <h2 style={s.doneTitle}>Treino Concluido!</h2>
          <p style={s.doneSub}>{workout.config.name}</p>
          <div style={s.doneStats}>
            <div style={s.doneStat}><div style={s.doneStatVal}>{totalEx}</div><div style={s.doneStatLabel}>Exercicios</div></div>
            <div style={s.doneDiv} />
            <div style={s.doneStat}><div style={s.doneStatVal}>{fmt(elapsed)}</div><div style={s.doneStatLabel}>Tempo</div></div>
            <div style={s.doneDiv} />
            <div style={s.doneStat}><div style={s.doneStatVal}>15</div><div style={s.doneStatLabel}>Minutos</div></div>
          </div>
          <button style={s.doneBtn} onClick={onComplete}>Novo Treino</button>
          <button style={s.doneBtnSec} onClick={onBack}>Inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Top bar */}
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={onBack}>←</button>
        <div style={s.topTitle}>{phase === 'rest' ? 'Descanso' : ex.name}</div>
        <div style={{ ...s.topCount, background: accentColor + '20', color: accentColor }}>{idx+1}/{totalEx}</div>
      </div>

      {/* Progress */}
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${Math.round((idx/totalEx)*100)}%`, background: accentColor }} />
      </div>

      {/* Illustration — shown during exercise, large */}
      {phase === 'exercise' && (
        <div style={s.illustrationCard}>
          <ExerciseFigure exerciseId={ex.id} size="large" />
          <div style={{ ...s.phaseTag, background: accentColor }}>{ex.difficulty}</div>
        </div>
      )}
      {phase === 'rest' && (
        <div style={{ ...s.illustrationCard, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '8px' }}>
          <div style={s.restEmoji}>○</div>
          <div style={s.restNextLabel}>A seguir: {idx+1 < totalEx ? workout.exercises[idx+1].name : 'Ultimo exercicio!'}</div>
        </div>
      )}

      {/* Big timer */}
      <div style={s.timerWrap}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={R} fill="none" stroke="#EFEFEF" strokeWidth="12"/>
          <circle cx="100" cy="100" r={R} fill="none" stroke={accentColor} strokeWidth="12"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dasharray 0.95s linear' }}/>
          <text x="100" y="88" textAnchor="middle" fill={theme.colors.text} fontSize="48" fontWeight="900" fontFamily="Inter,sans-serif">{fmt(timeLeft)}</text>
          <text x="100" y="115" textAnchor="middle" fill={theme.colors.textMuted} fontSize="14" fontFamily="Inter,sans-serif">{phase === 'rest' ? 'recupera' : 'restante'}</text>
        </svg>
      </div>

      {/* Exercise info */}
      {phase === 'exercise' && (
        <div style={s.exInfo}>
          <div style={s.exName}>{ex.name}</div>
          <div style={{ ...s.repsChip, background: accentColor + '18', color: accentColor }}>{ex.reps}</div>
          <div style={s.cues}>
            {ex.cues.map((c, i) => (
              <div key={i} style={s.cue}><div style={{ ...s.cueDot, background: accentColor }}/>{c}</div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={s.controls}>
        <button style={{ ...s.playBtn, background: running ? '#FFF5F5' : accentColor, color: running ? theme.colors.danger : '#fff', boxShadow: running ? 'none' : theme.shadow.green }}
          onClick={() => setRunning(r => !r)}>
          {running ? '⏸' : '▶'}
        </button>
        <button style={s.skipBtn} onClick={skip}>Saltar →</button>
      </div>
    </div>
  );
}

const s = {
  page: { background: theme.colors.bg, fontFamily: theme.font.sans, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  topBar: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid #EFEFEF' },
  backBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: theme.colors.textMuted, fontFamily: theme.font.sans, padding: '4px 8px' },
  topTitle: { fontSize: '16px', fontWeight: '800', color: theme.colors.text },
  topCount: { borderRadius: theme.radius.full, padding: '4px 12px', fontSize: '13px', fontWeight: '700' },
  progressTrack: { width: '100%', height: '4px', background: '#EFEFEF' },
  progressFill: { height: '100%', transition: 'width 0.5s ease' },
  illustrationCard: { width: 'calc(100% - 3rem)', margin: '1.25rem 1.5rem 0', background: '#fff', borderRadius: theme.radius.xl, overflow: 'hidden', boxShadow: theme.shadow.md, position: 'relative', minHeight: '200px', display: 'flex' },
  phaseTag: { position: 'absolute', top: '12px', right: '12px', borderRadius: theme.radius.full, padding: '4px 12px', fontSize: '11px', fontWeight: '700', color: '#fff' },
  restEmoji: { fontSize: '56px', color: theme.colors.primary },
  restNextLabel: { fontSize: '15px', fontWeight: '700', color: theme.colors.text, textAlign: 'center', padding: '0 1rem' },
  timerWrap: { margin: '0.5rem 0 0' },
  exInfo: { textAlign: 'center', padding: '0 1.5rem', width: '100%' },
  exName: { fontSize: '22px', fontWeight: '900', color: theme.colors.text, marginBottom: '8px' },
  repsChip: { display: 'inline-block', borderRadius: theme.radius.full, padding: '6px 18px', fontSize: '14px', fontWeight: '700', marginBottom: '12px' },
  cues: { display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', padding: '0 0.5rem' },
  cue: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: theme.colors.textSecondary },
  cueDot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0 },
  controls: { display: 'flex', gap: '16px', alignItems: 'center', padding: '1.5rem 1.5rem 0', width: '100%', justifyContent: 'center' },
  playBtn: { width: '72px', height: '72px', borderRadius: '50%', border: 'none', fontSize: '28px', cursor: 'pointer', fontFamily: theme.font.sans, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
  skipBtn: { background: '#fff', border: '1.5px solid #EFEFEF', borderRadius: theme.radius.full, padding: '0.75rem 1.5rem', color: theme.colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans, boxShadow: theme.shadow.sm },
  donePage: { minHeight: '100vh', background: theme.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: theme.font.sans },
  doneCard: { background: '#fff', borderRadius: theme.radius.xl, padding: '2.5rem 2rem', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: theme.shadow.lg },
  doneStar: { fontSize: '56px', color: theme.colors.primary, marginBottom: '1rem' },
  doneTitle: { fontSize: '28px', fontWeight: '900', color: theme.colors.text, margin: '0 0 6px' },
  doneSub: { fontSize: '14px', color: theme.colors.textMuted, margin: '0 0 2rem' },
  doneStats: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  doneStat: { textAlign: 'center' },
  doneStatVal: { fontSize: '28px', fontWeight: '900', color: theme.colors.primary },
  doneStatLabel: { fontSize: '12px', color: theme.colors.textMuted, marginTop: '2px' },
  doneDiv: { width: '1px', height: '40px', background: '#EFEFEF' },
  doneBtn: { width: '100%', background: theme.colors.primary, color: '#fff', border: 'none', borderRadius: theme.radius.lg, padding: '1rem', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans, marginBottom: '10px', boxShadow: theme.shadow.green },
  doneBtnSec: { width: '100%', background: '#fff', color: theme.colors.textSecondary, border: '1.5px solid #EFEFEF', borderRadius: theme.radius.lg, padding: '0.9rem', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
};
