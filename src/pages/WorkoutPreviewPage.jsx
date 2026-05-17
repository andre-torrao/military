import React from 'react';
import { theme } from '../data/theme';
import ExerciseFigure from '../components/ExerciseFigure';

const diffColor = { Básico: '#10B981', Médio: '#F59E0B', Difícil: '#EF4444' };
const catLabel = { upper: 'Superior', lower: 'Inferior', core: 'Core', full: 'Total', cardio: 'Cardio', mobility: 'Mobilidade' };

export default function WorkoutPreviewPage({ workout, onStart, onRegenerate, onBack }) {
  const { config, exercises } = workout;

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.back} onClick={onBack}>← Voltar</button>
        <button style={s.regen} onClick={onRegenerate}>↺ Novo</button>
      </div>

      {/* Mission card */}
      <div style={{ ...s.missionCard, borderTop: `4px solid ${config.color}` }}>
        <div style={{ ...s.missionBadge, color: config.color, background: config.color + '15' }}>
          MISSÃO GERADA
        </div>
        <h2 style={s.missionName}>{config.name}</h2>
        <p style={s.missionFocus}>{config.focus}</p>
        <div style={s.missionMeta}>
          <span style={s.metaChip}>⏱ 15 min</span>
          <span style={s.metaChip}>🔁 {exercises.length} exercícios</span>
          <span style={s.metaChip}>⏸ {workout.rest}s descanso</span>
        </div>
      </div>

      {/* Exercise list */}
      <div style={s.list}>
        {exercises.map((ex, i) => (
          <div key={ex.id} style={s.card}>
            <div style={s.cardNum}>{String(i + 1).padStart(2, '0')}</div>
            <div style={s.illustration}>
              <ExerciseFigure exerciseId={ex.id} size="small" />
            </div>
            <div style={s.info}>
              <div style={s.infoTop}>
                <span style={s.exName}>{ex.name}</span>
                <span style={{ ...s.diff, color: diffColor[ex.difficulty], background: diffColor[ex.difficulty] + '18' }}>
                  {ex.difficulty}
                </span>
              </div>
              <div style={s.reps}>{ex.reps}</div>
              <div style={s.muscles}>
                {ex.muscles.slice(0, 2).map(m => (
                  <span key={m} style={s.muscleTag}>{m}</span>
                ))}
              </div>
              <div style={{ ...s.catTag, color: config.color }}>{catLabel[ex.category]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div style={s.footer}>
        <button style={{ ...s.startBtn, background: config.color }} onClick={onStart}>
          ▶ Iniciar Treino
        </button>
        <button style={s.regenBtn} onClick={onRegenerate}>
          ↺ Gerar novo treino
        </button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '2rem' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 1.25rem', background: '#fff',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  back: {
    background: 'none', border: 'none', color: theme.colors.primary,
    fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans,
  },
  regen: {
    background: theme.colors.bg, border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.sm, padding: '6px 12px',
    fontSize: '13px', color: theme.colors.textSecondary,
    cursor: 'pointer', fontFamily: theme.font.sans,
  },
  missionCard: {
    background: '#fff', margin: '1.25rem',
    borderRadius: theme.radius.lg, padding: '1.5rem',
    boxShadow: theme.shadow.sm, border: `1px solid ${theme.colors.border}`,
  },
  missionBadge: {
    display: 'inline-block', fontSize: '10px', fontWeight: '700',
    letterSpacing: '1.5px', padding: '4px 10px', borderRadius: theme.radius.full,
    marginBottom: '10px',
  },
  missionName: { fontSize: '22px', fontWeight: '800', color: theme.colors.text, margin: '0 0 6px' },
  missionFocus: { fontSize: '13px', color: theme.colors.textSecondary, margin: '0 0 1rem', lineHeight: '1.5' },
  missionMeta: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  metaChip: {
    background: theme.colors.bg, border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.full, padding: '4px 12px',
    fontSize: '12px', color: theme.colors.textSecondary, fontWeight: '500',
  },
  list: { padding: '0 1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' },
  card: {
    background: '#fff', borderRadius: theme.radius.md,
    padding: '12px', display: 'flex', alignItems: 'center', gap: '10px',
    border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm,
  },
  cardNum: { fontSize: '18px', fontWeight: '800', color: theme.colors.border, minWidth: '28px' },
  illustration: {
    width: '80px', height: '60px', flexShrink: 0,
    background: theme.colors.bg, borderRadius: theme.radius.sm,
    overflow: 'hidden', border: `1px solid ${theme.colors.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  info: { flex: 1, minWidth: 0 },
  infoTop: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' },
  exName: { fontSize: '14px', fontWeight: '700', color: theme.colors.text },
  diff: { fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: theme.radius.full, flexShrink: 0 },
  reps: { fontSize: '13px', color: theme.colors.primary, fontWeight: '600', marginBottom: '4px' },
  muscles: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '3px' },
  muscleTag: {
    fontSize: '10px', background: theme.colors.bg,
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.textMuted, padding: '2px 7px', borderRadius: theme.radius.full,
  },
  catTag: { fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' },
  footer: {
    padding: '1.5rem 1.25rem 0',
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  startBtn: {
    width: '100%', border: 'none', color: '#fff',
    padding: '1rem', borderRadius: theme.radius.md,
    fontSize: '16px', fontWeight: '800', cursor: 'pointer',
    fontFamily: theme.font.sans, boxShadow: theme.shadow.blue,
    letterSpacing: '0.5px',
  },
  regenBtn: {
    width: '100%', background: '#fff', color: theme.colors.textSecondary,
    border: `1.5px solid ${theme.colors.border}`,
    padding: '0.9rem', borderRadius: theme.radius.md,
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    fontFamily: theme.font.sans,
  },
};
