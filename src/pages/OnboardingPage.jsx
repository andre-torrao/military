import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';

export default function OnboardingPage({ onComplete }) {
  const { user, saveProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [loading, setLoading] = useState(false);

  const levels = [
    { id: 'beginner', label: 'Iniciante', sub: 'Pouca ou nenhuma experiência', icon: '🌱' },
    { id: 'intermediate', label: 'Intermédio', sub: 'Treino há 6+ meses', icon: '💪' },
    { id: 'advanced', label: 'Avançado', sub: 'Treino há 2+ anos', icon: '🔥' },
  ];

  const days = ['2', '3', '4', '5', '6'];

  async function handleFinish() {
    if (!selectedGoal || !level || !daysPerWeek) return;
    setLoading(true);
    const profile = {
      name: user.displayName || '',
      email: user.email,
      goal: selectedGoal,
      level,
      daysPerWeek: parseInt(daysPerWeek),
      age: age ? parseInt(age) : null,
      workoutsCompleted: 0,
      totalMinutes: 0,
      createdAt: new Date().toISOString(),
    };
    await saveProfile(user.uid, profile);
    onComplete(profile);
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Progress */}
        <div style={s.progressRow}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ ...s.progressDot, background: n <= step ? theme.colors.primary : theme.colors.border }} />
          ))}
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div>
            <h1 style={s.title}>Qual é o teu objetivo?</h1>
            <p style={s.sub}>Vamos personalizar os teus treinos de acordo com o que queres atingir.</p>
            <div style={s.goalGrid}>
              {goals.map(g => (
                <button
                  key={g.id}
                  style={{
                    ...s.goalCard,
                    border: selectedGoal === g.id
                      ? `2px solid ${g.color}`
                      : `2px solid ${theme.colors.border}`,
                    background: selectedGoal === g.id ? g.colorBg : '#fff',
                  }}
                  onClick={() => setSelectedGoal(g.id)}
                >
                  <span style={s.goalIcon}>{g.icon}</span>
                  <div>
                    <div style={{ ...s.goalLabel, color: selectedGoal === g.id ? g.color : theme.colors.text }}>
                      {g.label}
                    </div>
                    <div style={s.goalSub}>{g.sublabel}</div>
                  </div>
                  {selectedGoal === g.id && (
                    <div style={{ ...s.check, background: g.color }}>✓</div>
                  )}
                </button>
              ))}
            </div>
            {selectedGoal && (
              <div style={{ ...s.infoBox, borderColor: goals.find(g => g.id === selectedGoal)?.color }}>
                <p style={s.infoText}>{goals.find(g => g.id === selectedGoal)?.description}</p>
              </div>
            )}
            <button
              style={{ ...s.btn, opacity: selectedGoal ? 1 : 0.4 }}
              onClick={() => selectedGoal && setStep(2)}
              disabled={!selectedGoal}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Step 2: Level */}
        {step === 2 && (
          <div>
            <h1 style={s.title}>Qual o teu nível?</h1>
            <p style={s.sub}>Isto ajuda-nos a ajustar a intensidade dos treinos.</p>
            <div style={s.levelGrid}>
              {levels.map(l => (
                <button
                  key={l.id}
                  style={{
                    ...s.levelCard,
                    border: level === l.id
                      ? `2px solid ${theme.colors.primary}`
                      : `2px solid ${theme.colors.border}`,
                    background: level === l.id ? theme.colors.primaryBg : '#fff',
                  }}
                  onClick={() => setLevel(l.id)}
                >
                  <span style={s.levelIcon}>{l.icon}</span>
                  <div style={{ ...s.levelLabel, color: level === l.id ? theme.colors.primary : theme.colors.text }}>
                    {l.label}
                  </div>
                  <div style={s.levelSub}>{l.sub}</div>
                  {level === l.id && <div style={s.check}>✓</div>}
                </button>
              ))}
            </div>

            <div style={s.field}>
              <label style={s.label}>Idade (opcional)</label>
              <input
                style={s.input}
                type="number"
                placeholder="Ex: 28"
                value={age}
                min="14" max="80"
                onChange={e => setAge(e.target.value)}
              />
            </div>

            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(1)}>← Voltar</button>
              <button
                style={{ ...s.btn, flex: 1, opacity: level ? 1 : 0.4 }}
                onClick={() => level && setStep(3)}
                disabled={!level}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Days per week */}
        {step === 3 && (
          <div>
            <h1 style={s.title}>Quantos dias por semana?</h1>
            <p style={s.sub}>Quantas vezes queres treinar por semana?</p>
            <div style={s.daysGrid}>
              {days.map(d => (
                <button
                  key={d}
                  style={{
                    ...s.dayCard,
                    border: daysPerWeek === d
                      ? `2px solid ${theme.colors.primary}`
                      : `2px solid ${theme.colors.border}`,
                    background: daysPerWeek === d ? theme.colors.primary : '#fff',
                    color: daysPerWeek === d ? '#fff' : theme.colors.text,
                  }}
                  onClick={() => setDaysPerWeek(d)}
                >
                  <span style={s.dayNumber}>{d}</span>
                  <span style={s.dayLabel}>dias</span>
                </button>
              ))}
            </div>

            <div style={s.summaryBox}>
              <div style={s.summaryTitle}>O teu plano</div>
              <div style={s.summaryRow}>
                <span>🎯 Objetivo</span>
                <strong>{goals.find(g => g.id === selectedGoal)?.label}</strong>
              </div>
              <div style={s.summaryRow}>
                <span>💪 Nível</span>
                <strong>{levels.find(l => l.id === level)?.label}</strong>
              </div>
              {daysPerWeek && (
                <div style={s.summaryRow}>
                  <span>📅 Frequência</span>
                  <strong>{daysPerWeek}x por semana</strong>
                </div>
              )}
              <div style={s.summaryRow}>
                <span>⏱ Duração</span>
                <strong>15 min por sessão</strong>
              </div>
            </div>

            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(2)}>← Voltar</button>
              <button
                style={{ ...s.btn, flex: 1, opacity: daysPerWeek && !loading ? 1 : 0.4 }}
                onClick={handleFinish}
                disabled={!daysPerWeek || loading}
              >
                {loading ? 'A guardar...' : '🚀 Começar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh', background: theme.colors.bg,
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
    padding: '2rem 1rem', fontFamily: theme.font.sans,
  },
  container: {
    width: '100%', maxWidth: '480px',
    background: '#fff', borderRadius: theme.radius.xl,
    padding: '2rem', boxShadow: theme.shadow.lg,
    border: `1px solid ${theme.colors.border}`,
  },
  progressRow: {
    display: 'flex', gap: '8px', marginBottom: '2rem',
  },
  progressDot: {
    height: '5px', flex: 1, borderRadius: '9999px',
    transition: 'background 0.3s',
  },
  title: { fontSize: '24px', fontWeight: '800', color: theme.colors.text, margin: '0 0 8px' },
  sub: { fontSize: '14px', color: theme.colors.textSecondary, margin: '0 0 1.5rem', lineHeight: '1.6' },
  goalGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' },
  goalCard: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 16px', borderRadius: theme.radius.md,
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
    position: 'relative', fontFamily: theme.font.sans,
  },
  goalIcon: { fontSize: '24px', flexShrink: 0 },
  goalLabel: { fontSize: '15px', fontWeight: '700', marginBottom: '2px' },
  goalSub: { fontSize: '12px', color: theme.colors.textMuted },
  check: {
    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
    width: '22px', height: '22px', borderRadius: '50%',
    background: theme.colors.primary, color: '#fff',
    fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '700',
  },
  infoBox: {
    background: theme.colors.primaryBg, border: `1px solid`,
    borderRadius: theme.radius.md, padding: '12px 14px', marginBottom: '1.5rem',
  },
  infoText: { fontSize: '13px', color: theme.colors.textSecondary, margin: 0, lineHeight: '1.5' },
  btn: {
    width: '100%', background: theme.colors.primary, color: '#fff',
    border: 'none', borderRadius: theme.radius.md, padding: '0.9rem',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
    fontFamily: theme.font.sans, marginTop: '1rem', transition: 'opacity 0.2s',
  },
  btnRow: { display: 'flex', gap: '10px', marginTop: '1rem', alignItems: 'center' },
  btnSecondary: {
    background: '#fff', color: theme.colors.textSecondary,
    border: `1.5px solid ${theme.colors.border}`, borderRadius: theme.radius.md,
    padding: '0.9rem 1.2rem', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: theme.font.sans,
  },
  levelGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' },
  levelCard: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 16px', borderRadius: theme.radius.md,
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
    position: 'relative', fontFamily: theme.font.sans,
  },
  levelIcon: { fontSize: '22px' },
  levelLabel: { fontSize: '15px', fontWeight: '700', marginBottom: '2px' },
  levelSub: { fontSize: '12px', color: theme.colors.textMuted },
  field: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: theme.colors.text, marginBottom: '6px' },
  input: {
    width: '100%', padding: '0.75rem 1rem', borderRadius: theme.radius.md,
    border: `1.5px solid ${theme.colors.border}`, fontSize: '15px',
    color: theme.colors.text, fontFamily: theme.font.sans, boxSizing: 'border-box',
  },
  daysGrid: { display: 'flex', gap: '10px', marginBottom: '1.5rem' },
  dayCard: {
    flex: 1, padding: '1rem 0.5rem', borderRadius: theme.radius.md,
    cursor: 'pointer', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '4px', transition: 'all 0.2s',
    fontFamily: theme.font.sans,
  },
  dayNumber: { fontSize: '22px', fontWeight: '800' },
  dayLabel: { fontSize: '11px', fontWeight: '500' },
  summaryBox: {
    background: theme.colors.bg, borderRadius: theme.radius.md,
    padding: '1rem 1.25rem', marginBottom: '0.5rem',
    border: `1px solid ${theme.colors.border}`,
  },
  summaryTitle: { fontSize: '12px', fontWeight: '700', color: theme.colors.textMuted, marginBottom: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '6px 0', fontSize: '14px', color: theme.colors.textSecondary,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
};
