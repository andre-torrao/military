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
        const p = phaseRef.current;
        const i = idxRef.current;
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

  // Save on completion
  useEffect(() => {
    if (phase === 'done' && user) {
      incrementWorkoutStats(user.id);
      supabase.from('workout_logs').insert({
        user_id: user.id,
        goal: workout.goalId,
        workout_name: workout.config.name,
        duration_minutes: 15,
        completed_at: new Date().toISOString(),
      });
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  const ex = workout.exercises[idx];
  const maxTime = phase === 'rest' ? restTime : ex.duration;
  const pct = timeLeft / maxTime;
  const R = 70; const circ = 2 * Math.PI * R;
  const dash = circ * pct;
  const progressPct = Math.round((idx / totalEx) * 100);
  const accentColor = phase === 'rest' ? theme.colors.accent : workout.config.color;

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
            <div style={s.doneStatDiv} />
            <div style={s.doneStat}><div style={s.doneStatVal}>{fmt(elapsed)}</div><div style={s.doneStatLabel}>Tempo</div></div>
            <div style={s.doneStatDiv} />
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
      <div style={s.topBar}>
        <button style={s.abortBtn} onClick={onBack}>← Sair</button>
        <div style={s.topMeta}>{workout.config.name}</div>
        <div style={{ ...s.topCount, background: accentColor + '20', color: accentColor }}>{idx + 1}/{totalEx}</div>
      </div>

      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${progressPct}%`, background: accentColor }} />
      </div>

      <div style={{ ...s.phasePill, background: accentColor + '18', color: accentColor }}>
        {phase === 'rest' ? 'DESCANSO' : 'EXECUTAR'}
      </div>

      {/* Large timer */}
      <div style={s.timerSection}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={R} fill="none" stroke={theme.colors.border} strokeWidth="10"/>
          <circle cx="100" cy="100" r={R} fill="none" stroke={accentColor} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dasharray 0.95s linear' }}/>
          <text x="100" y="90" textAnchor="middle" fill={theme.colors.text} fontSize="44" fontWeight="800" fontFamily="Inter,sans-serif">{fmt(timeLeft)}</text>
          <text x="100" y="115" textAnchor="middle" fill={theme.colors.textMuted} fontSize="13" fontFamily="Inter,sans-serif">{phase === 'rest' ? 'recupera' : 'restante'}</text>
        </svg>
      </div>

      {/* Illustration during exercise */}
      {phase === 'exercise' && (
        <div style={s.illustrationBox}>
          <ExerciseFigure exerciseId={ex.id} size="large" />
        </div>
      )}

      {phase === 'exercise' && (
        <div style={s.exInfo}>
          <h2 style={s.exName}>{ex.name}</h2>
          <div style={{ ...s.repsChip, background: accentColor + '18', color: accentColor }}>{ex.reps}</div>
          <p style={s.exDesc}>{ex.description}</p>
          <div style={s.cues}>
            {ex.cues.map((c, i) => (
              <div key={i} style={s.cue}>
                <div style={{ ...s.cueDot, background: accentColor }} />
                {c}
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'rest' && (
        <div style={s.restInfo}>
          <div style={s.restLabel}>A SEGUIR</div>
          {idx + 1 < totalEx && (
            <>
              <div style={s.nextName}>{workout.exercises[idx + 1].name}</div>
              <div style={{ ...s.repsChip, background: accentColor + '18', color: accentColor }}>{workout.exercises[idx + 1].reps}</div>
            </>
          )}
          <div style={s.restSub}>Hidrata e prepara-te</div>
        </div>
      )}

      <div style={s.controls}>
        <button style={{ ...s.ctrlBtn, background: running ? '#FEF2F2' : theme.colors.primaryBg, color: running ? theme.colors.danger : theme.colors.primary }}
          onClick={() => setRunning(r => !r)}>
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button style={s.skipBtn} onClick={skip}>Saltar</button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: '#fff', fontFamily: theme.font.sans, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '2rem' },
  topBar: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: `1px solid ${theme.colors.border}` },
  abortBtn: { background: 'none', border: 'none', color: theme.colors.textMuted, fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  topMeta: { fontSize: '13px', fontWeight: '600', color: theme.colors.textSecondary },
  topCount: { fontSize: '13px', fontWeight: '800', padding: '4px 12px', borderRadius: theme.radius.full },
  progressTrack: { width: '100%', height: '5px', background: theme.colors.border },
  progressFill: { height: '100%', borderRadius: '0 3px 3px 0', transition: 'width 0.5s ease' },
  phasePill: { marginTop: '1.25rem', padding: '6px 20px', borderRadius: theme.radius.full, fontSize: '11px', fontWeight: '800', letterSpacing: '2px' },
  timerSection: { margin: '0.75rem 0 0.25rem' },
  illustrationBox: { width: '90%', maxWidth: '380px', background: theme.colors.bg, borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.border}`, padding: '0.5rem', marginBottom: '0.75rem' },
  exInfo: { textAlign: 'center', padding: '0 1.5rem', width: '100%', maxWidth: '400px' },
  exName: { fontSize: '24px', fontWeight: '800', color: theme.colors.text, margin: '0 0 8px' },
  repsChip: { display: 'inline-block', padding: '5px 16px', borderRadius: theme.radius.full, fontSize: '14px', fontWeight: '700', marginBottom: '10px' },
  exDesc: { fontSize: '14px', color: theme.colors.textSecondary, lineHeight: '1.6', margin: '0 0 10px' },
  cues: { display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', padding: '0 1rem' },
  cue: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: theme.colors.textSecondary },
  cueDot: { width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0 },
  restInfo: { textAlign: 'center', padding: '0 1.5rem' },
  restLabel: { fontSize: '11px', fontWeight: '800', color: theme.colors.textMuted, letterSpacing: '2px', marginBottom: '8px' },
  nextName: { fontSize: '24px', fontWeight: '800', color: theme.colors.text, marginBottom: '8px' },
  restSub: { fontSize: '14px', color: theme.colors.textMuted, marginTop: '10px' },
  controls: { display: 'flex', gap: '12px', marginTop: '1.5rem', padding: '0 1.25rem', width: '100%' },
  ctrlBtn: { flex: 2, padding: '0.9rem', borderRadius: theme.radius.md, border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer', fontFamily: theme.font.sans },
  skipBtn: { flex: 1, padding: '0.9rem', borderRadius: theme.radius.md, background: theme.colors.bg, border: `1.5px solid ${theme.colors.border}`, color: theme.colors.textSecondary, fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  donePage: { minHeight: '100vh', background: theme.colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: theme.font.sans },
  doneCard: { background: '#fff', borderRadius: theme.radius.xl, padding: '2.5rem 2rem', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: theme.shadow.lg, border: `1px solid ${theme.colors.border}` },
  doneStar: { fontSize: '48px', color: theme.colors.primary, marginBottom: '1rem' },
  doneTitle: { fontSize: '28px', fontWeight: '800', color: theme.colors.text, margin: '0 0 6px' },
  doneSub: { fontSize: '14px', color: theme.colors.textMuted, margin: '0 0 2rem' },
  doneStats: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  doneStat: { textAlign: 'center' },
  doneStatVal: { fontSize: '28px', fontWeight: '800', color: theme.colors.primary },
  doneStatLabel: { fontSize: '12px', color: theme.colors.textMuted, marginTop: '2px' },
  doneStatDiv: { width: '1px', height: '40px', background: theme.colors.border },
  doneBtn: { width: '100%', background: theme.colors.primary, color: '#fff', border: 'none', borderRadius: theme.radius.md, padding: '1rem', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans, marginBottom: '10px' },
  doneBtnSec: { width: '100%', background: '#fff', color: theme.colors.textSecondary, border: `1.5px solid ${theme.colors.border}`, borderRadius: theme.radius.md, padding: '0.9rem', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
};
