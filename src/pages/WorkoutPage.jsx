import React, { useState } from 'react';
import { theme, goals } from '../data/theme';
import { exercises, generateWorkout } from '../data/exercises';
import ExerciseFigure from '../components/ExerciseFigure';

export default function WorkoutPage({ onStartWorkout }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const filtered = selectedGoal
    ? exercises.filter(e => e.goals.includes(selectedGoal))
    : exercises;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerTitle}>Treinos</div>
        <div style={s.headerSub}>Escolhe o teu protocolo</div>
      </div>

      {/* Goal filter pills */}
      <div style={s.pillsWrap}>
        <div style={s.pills}>
          <button
            style={{ ...s.pill, background: !selectedGoal ? theme.colors.primary : '#fff', color: !selectedGoal ? '#fff' : theme.colors.textMuted }}
            onClick={() => setSelectedGoal(null)}>
            Todos
          </button>
          {goals.map(g => (
            <button key={g.id}
              style={{ ...s.pill, background: selectedGoal === g.id ? g.color : '#fff', color: selectedGoal === g.id ? '#fff' : theme.colors.textMuted }}
              onClick={() => setSelectedGoal(selectedGoal === g.id ? null : g.id)}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Protocol cards */}
      <div style={s.protocols}>
        {goals.map(g => (
          <div key={g.id} style={{ ...s.protocolCard, borderLeft: `4px solid ${g.color}` }}
            onClick={() => onStartWorkout(generateWorkout(g.id))}>
            <div>
              <div style={s.protocolTop}>
                <span style={{ ...s.protocolTag, background: g.colorBg, color: g.color }}>{g.tag}</span>
              </div>
              <div style={s.protocolName}>{g.label}</div>
              <div style={s.protocolDesc}>{g.description}</div>
              <div style={s.protocolMeta}>15 min · 5 exercicios</div>
            </div>
            <div style={{ ...s.protocolArrow, background: g.color }}>→</div>
          </div>
        ))}
      </div>

      {/* Exercise library */}
      <div style={s.sectionHeader}>
        <div style={s.sectionTitle}>Biblioteca de exercicios</div>
        <div style={s.sectionCount}>{filtered.length} exercicios</div>
      </div>
      <div style={s.exList}>
        {filtered.map(ex => {
          const g = goals.find(x => x.id === ex.goals[0]);
          return (
            <div key={ex.id} style={s.exCard}>
              <div style={s.exThumb}>
                <ExerciseFigure exerciseId={ex.id} size="small" />
              </div>
              <div style={s.exInfo}>
                <div style={s.exName}>{ex.name}</div>
                <div style={s.exMeta}>{ex.reps} · {ex.difficulty}</div>
                <div style={s.exMuscles}>{ex.muscles.slice(0,2).join(' · ')}</div>
              </div>
              {g && <div style={{ ...s.exTag, background: g.colorBg, color: g.color }}>{g.tag}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  page: { background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '90px', minHeight: '100vh' },
  header: { padding: '3rem 1.5rem 1rem' },
  headerTitle: { fontSize: '28px', fontWeight: '900', color: theme.colors.text },
  headerSub: { fontSize: '14px', color: theme.colors.textMuted, marginTop: '2px' },
  pillsWrap: { overflowX: 'auto', paddingBottom: '4px', marginBottom: '1.25rem' },
  pills: { display: 'flex', gap: '8px', padding: '0 1.5rem', width: 'max-content' },
  pill: { borderRadius: theme.radius.full, padding: '7px 16px', fontSize: '13px', fontWeight: '600', border: '1.5px solid #EFEFEF', cursor: 'pointer', fontFamily: theme.font.sans, whiteSpace: 'nowrap', transition: 'all 0.2s' },
  protocols: { padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' },
  protocolCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: theme.shadow.sm, cursor: 'pointer' },
  protocolTop: { marginBottom: '6px' },
  protocolTag: { borderRadius: theme.radius.full, padding: '3px 10px', fontSize: '11px', fontWeight: '700' },
  protocolName: { fontSize: '17px', fontWeight: '800', color: theme.colors.text, marginBottom: '4px' },
  protocolDesc: { fontSize: '12px', color: theme.colors.textMuted, lineHeight: '1.5', marginBottom: '6px' },
  protocolMeta: { fontSize: '12px', color: theme.colors.textMuted, fontWeight: '500' },
  protocolArrow: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', flexShrink: 0, marginLeft: '1rem' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', marginBottom: '1rem' },
  sectionTitle: { fontSize: '18px', fontWeight: '800', color: theme.colors.text },
  sectionCount: { fontSize: '13px', color: theme.colors.textMuted },
  exList: { padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' },
  exCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: theme.shadow.sm },
  exThumb: { width: '60px', height: '60px', borderRadius: theme.radius.md, background: theme.colors.bg, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  exInfo: { flex: 1 },
  exName: { fontSize: '14px', fontWeight: '700', color: theme.colors.text, marginBottom: '3px' },
  exMeta: { fontSize: '12px', color: theme.colors.textMuted, marginBottom: '2px' },
  exMuscles: { fontSize: '11px', color: theme.colors.primary, fontWeight: '600' },
  exTag: { borderRadius: theme.radius.full, padding: '4px 10px', fontSize: '11px', fontWeight: '700', flexShrink: 0 },
};
