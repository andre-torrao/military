import React from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';
import { generateWorkout } from '../data/exercises';

export default function HomePage({ onStartWorkout, onProfile }) {
  const { userProfile, user } = useAuth();
  const goal = goals.find(g => g.id === userProfile?.goal) || goals[3];
  const firstName = (userProfile?.name || user?.user_metadata?.name || 'Utilizador').split(' ')[0];

  function handleGenerate() {
    const workout = generateWorkout(userProfile?.goal || 'military');
    onStartWorkout(workout);
  }

  const stats = [
    { label: 'Treinos', value: userProfile?.workouts_completed || 0 },
    { label: 'Minutos', value: userProfile?.total_minutes || 0 },
    { label: 'Dias/sem', value: userProfile?.days_per_week || 0 },
  ];

  const levelMap = { beginner: 'Iniciante', intermediate: 'Intermédio', advanced: 'Avançado' };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.greeting}>Olá, {firstName}</div>
          <div style={s.headerSub}>Pronto para treinar?</div>
        </div>
        <button style={s.avatarBtn} onClick={onProfile}>
          <div style={s.avatar}>{firstName[0].toUpperCase()}</div>
        </button>
      </div>

      {/* Goal banner */}
      <div style={{ ...s.goalBanner, background: `linear-gradient(135deg, ${goal.color}, ${theme.colors.primaryDark})` }}>
        <div>
          <div style={s.goalBannerLabel}>O teu objetivo</div>
          <div style={s.goalBannerTitle}>{goal.label}</div>
          <div style={s.goalBannerSub}>{goal.description}</div>
        </div>
        <div style={s.goalBannerBadge}>15 min</div>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        {stats.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statVal}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Level tag */}
      <div style={s.levelRow}>
        <div style={s.levelTag}>
          Nivel: <strong>{levelMap[userProfile?.level] || 'Iniciante'}</strong>
        </div>
        <div style={s.levelTag}>
          Meta: <strong>{userProfile?.days_per_week || 3}x por semana</strong>
        </div>
      </div>

      {/* Main CTA */}
      <button style={s.mainBtn} onClick={handleGenerate}>
        <div style={s.mainBtnInner}>
          <div style={s.mainBtnTitle}>Gerar Treino</div>
          <div style={s.mainBtnSub}>15 minutos · Personalizado para ti</div>
        </div>
        <div style={s.mainBtnArrow}>→</div>
      </button>

      {/* Protocols */}
      <div style={s.sectionTitle}>Todos os protocolos</div>
      <div style={s.protocolGrid}>
        {goals.map(g => (
          <button
            key={g.id}
            style={{ ...s.protocolCard, borderTop: `3px solid ${g.color}` }}
            onClick={() => onStartWorkout(generateWorkout(g.id))}
          >
            <div style={{ ...s.protocolDot, background: g.color }} />
            <div style={s.protocolName}>{g.label}</div>
            <div style={s.protocolSub}>{g.sublabel}</div>
          </button>
        ))}
      </div>

      {/* Tip */}
      <div style={s.tipBox}>
        <div style={s.tipTitle}>Dica</div>
        <div style={s.tipText}>
          A consistência supera a intensidade. 15 minutos por dia valem mais do que 2 horas uma vez por semana.
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '3rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.25rem 1rem', background: '#fff', borderBottom: `1px solid ${theme.colors.border}` },
  greeting: { fontSize: '22px', fontWeight: '800', color: theme.colors.text },
  headerSub: { fontSize: '13px', color: theme.colors.textMuted, marginTop: '2px' },
  avatarBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: theme.colors.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700' },
  goalBanner: { margin: '1.25rem', borderRadius: theme.radius.lg, padding: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', boxShadow: theme.shadow.green },
  goalBannerLabel: { fontSize: '11px', opacity: 0.8, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' },
  goalBannerTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '6px' },
  goalBannerSub: { fontSize: '13px', opacity: 0.85, lineHeight: '1.5', maxWidth: '220px' },
  goalBannerBadge: { background: 'rgba(255,255,255,0.2)', borderRadius: theme.radius.full, padding: '6px 14px', fontSize: '13px', fontWeight: '700', flexShrink: 0 },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', margin: '0 1.25rem 0.75rem' },
  statCard: { background: '#fff', borderRadius: theme.radius.md, padding: '1rem', textAlign: 'center', border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm },
  statVal: { fontSize: '26px', fontWeight: '800', color: theme.colors.primary },
  statLabel: { fontSize: '11px', color: theme.colors.textMuted, marginTop: '2px' },
  levelRow: { display: 'flex', gap: '8px', margin: '0 1.25rem 1.25rem' },
  levelTag: { background: theme.colors.primaryBg, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.full, padding: '5px 12px', fontSize: '12px', color: theme.colors.textSecondary },
  mainBtn: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 1.25rem 1.5rem', padding: '1.2rem 1.5rem', background: theme.colors.primary, color: '#fff', border: 'none', borderRadius: theme.radius.lg, cursor: 'pointer', width: 'calc(100% - 2.5rem)', boxShadow: theme.shadow.green, fontFamily: theme.font.sans },
  mainBtnInner: { textAlign: 'left' },
  mainBtnTitle: { fontSize: '18px', fontWeight: '800' },
  mainBtnSub: { fontSize: '12px', opacity: 0.85, marginTop: '2px' },
  mainBtnArrow: { fontSize: '24px', fontWeight: '300' },
  sectionTitle: { fontSize: '12px', fontWeight: '700', color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase', padding: '0 1.25rem', marginBottom: '0.75rem' },
  protocolGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px', margin: '0 1.25rem 1.5rem' },
  protocolCard: { background: '#fff', borderRadius: theme.radius.md, padding: '1rem', textAlign: 'left', border: `1px solid ${theme.colors.border}`, cursor: 'pointer', fontFamily: theme.font.sans, boxShadow: theme.shadow.sm },
  protocolDot: { width: '10px', height: '10px', borderRadius: '50%', marginBottom: '8px' },
  protocolName: { fontSize: '14px', fontWeight: '700', color: theme.colors.text, marginBottom: '2px' },
  protocolSub: { fontSize: '12px', color: theme.colors.textMuted },
  tipBox: { margin: '0 1.25rem', padding: '1rem 1.25rem', background: theme.colors.primaryBg, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border}` },
  tipTitle: { fontSize: '12px', fontWeight: '700', color: theme.colors.primary, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' },
  tipText: { fontSize: '13px', color: theme.colors.textSecondary, lineHeight: '1.6' },
};
