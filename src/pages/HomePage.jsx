import React from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';
import { generateWorkout, exercises } from '../data/exercises';
import ExerciseFigure from '../components/ExerciseFigure';

function CircleProgress({ pct, size = 56, stroke = 5, color = '#4CAF50' }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EFEFEF" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={color} fontFamily="Inter,sans-serif">
        {pct}%
      </text>
    </svg>
  );
}

export default function HomePage({ onStartWorkout }) {
  const { userProfile, user } = useAuth();
  const goal = goals.find(g => g.id === userProfile?.goal) || goals[3];
  const firstName = (userProfile?.name || user?.user_metadata?.name || 'Utilizador').split(' ')[0];
  const completed = userProfile?.workouts_completed || 0;
  const target = (userProfile?.days_per_week || 3) * 4;
  const progressPct = Math.min(100, Math.round((completed / Math.max(target, 1)) * 100));

  // Pick 3 recommended exercises based on goal
  const recommended = exercises.filter(e => e.goals.includes(userProfile?.goal || 'military')).slice(0, 3);

  const tagStyle = (goalId) => {
    const g = goals.find(x => x.id === goalId);
    return { background: g?.colorBg || '#F1F8E9', color: g?.color || '#4CAF50' };
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.welcomeText}>Bem-vindo</div>
          <div style={s.heroName}>{firstName}</div>
        </div>
        <div style={s.avatarWrap}>
          <div style={s.avatar}>{firstName[0].toUpperCase()}</div>
        </div>
      </div>

      {/* Current workout card */}
      <div style={{ ...s.currentCard, background: `linear-gradient(135deg, ${goal.color} 0%, ${goal.color}CC 100%)` }}>
        <div style={s.currentLeft}>
          <div style={s.currentTag}>{goal.tag}</div>
          <div style={s.currentTitle}>{goal.label}</div>
          <div style={s.currentMeta}>
            <span>15 min</span>
            <span style={s.dot}>·</span>
            <span>{userProfile?.level === 'beginner' ? 'Iniciante' : userProfile?.level === 'intermediate' ? 'Intermedio' : 'Avancado'}</span>
          </div>
          <button style={s.continueBtn} onClick={() => onStartWorkout(generateWorkout(userProfile?.goal || 'military'))}>
            <span>Iniciar treino</span>
            <span style={s.arrow}>→</span>
          </button>
        </div>
        <div style={s.currentRight}>
          <CircleProgress pct={progressPct} size={70} stroke={6} color="#fff" />
          <div style={s.progressLabel}>Progresso</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={s.statsRow}>
        {[
          { label: 'Treinos', value: userProfile?.workouts_completed || 0 },
          { label: 'Minutos', value: userProfile?.total_minutes || 0 },
          { label: 'Dias/sem', value: userProfile?.days_per_week || 0 },
        ].map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statVal}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div style={s.sectionHeader}>
        <div style={s.sectionTitle}>Recomendado</div>
        <button style={s.seeAll} onClick={() => onStartWorkout(generateWorkout(userProfile?.goal || 'military'))}>Ver todos</button>
      </div>

      <div style={s.recList}>
        {recommended.map(ex => {
          const g = goals.find(x => x.id === ex.goals[0]) || goal;
          return (
            <div key={ex.id} style={s.recCard} onClick={() => onStartWorkout(generateWorkout(userProfile?.goal || 'military'))}>
              <div style={s.recThumb}>
                <ExerciseFigure exerciseId={ex.id} size="small" />
              </div>
              <div style={s.recInfo}>
                <div style={s.recName}>{ex.name}</div>
                <div style={s.recMeta}>
                  <span style={s.recMetaItem}>15 min</span>
                  <span style={s.recMetaItem}>{ex.difficulty}</span>
                </div>
              </div>
              <div style={{ ...s.recTag, ...tagStyle(ex.goals[0]) }}>{g.tag}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  page: { background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '90px', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3rem 1.5rem 1.25rem' },
  welcomeText: { fontSize: '14px', color: theme.colors.textMuted, fontWeight: '500', marginBottom: '2px' },
  heroName: { fontSize: '28px', fontWeight: '900', color: theme.colors.text },
  avatarWrap: { position: 'relative' },
  avatar: { width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', boxShadow: theme.shadow.green },
  currentCard: { margin: '0 1.5rem 1.5rem', borderRadius: theme.radius.xl, padding: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: theme.shadow.green },
  currentLeft: { flex: 1 },
  currentTag: { display: 'inline-block', background: 'rgba(255,255,255,0.25)', borderRadius: theme.radius.full, padding: '3px 10px', fontSize: '11px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.5px' },
  currentTitle: { fontSize: '22px', fontWeight: '900', marginBottom: '6px' },
  currentMeta: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.85, marginBottom: '16px' },
  dot: { opacity: 0.6 },
  continueBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: theme.colors.primary, border: 'none', borderRadius: theme.radius.full, padding: '8px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans, boxShadow: theme.shadow.sm },
  arrow: { fontSize: '16px' },
  currentRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginLeft: '1rem' },
  progressLabel: { fontSize: '11px', opacity: 0.85, fontWeight: '600' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', margin: '0 1.5rem 1.5rem' },
  statCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '1rem', textAlign: 'center', boxShadow: theme.shadow.sm },
  statVal: { fontSize: '26px', fontWeight: '900', color: theme.colors.primary },
  statLabel: { fontSize: '11px', color: theme.colors.textMuted, marginTop: '2px', fontWeight: '500' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', marginBottom: '1rem' },
  sectionTitle: { fontSize: '18px', fontWeight: '800', color: theme.colors.text },
  seeAll: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  recList: { padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' },
  recCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: theme.shadow.sm, cursor: 'pointer' },
  recThumb: { width: '64px', height: '64px', borderRadius: theme.radius.md, background: theme.colors.bg, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  recInfo: { flex: 1 },
  recName: { fontSize: '15px', fontWeight: '700', color: theme.colors.text, marginBottom: '4px' },
  recMeta: { display: 'flex', gap: '12px' },
  recMetaItem: { fontSize: '12px', color: theme.colors.textMuted, display: 'flex', alignItems: 'center', gap: '3px' },
  recTag: { borderRadius: theme.radius.full, padding: '4px 10px', fontSize: '11px', fontWeight: '700', flexShrink: 0 },
};
