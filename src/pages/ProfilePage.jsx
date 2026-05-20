import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';
import { supabase } from '../supabase/client';

function WeeklyTracker({ userId }) {
  const [trainedDays, setTrainedDays] = useState([]);
  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  useEffect(() => {
    async function fetchWeek() {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0=Sun
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      const { data } = await supabase
        .from('workout_logs')
        .select('completed_at')
        .eq('user_id', userId)
        .gte('completed_at', monday.toISOString())
        .lte('completed_at', sunday.toISOString());

      if (data) {
        const days = data.map(d => new Date(d.completed_at).getDay());
        // Convert Sunday=0 to index 6, Mon=1 to index 0, etc.
        const normalized = days.map(d => (d + 6) % 7);
        setTrainedDays([...new Set(normalized)]);
      }
    }
    if (userId) fetchWeek();
  }, [userId]);

  // Today's index (Mon=0 ... Sun=6)
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <div style={wt.container}>
      <div style={wt.title}>Esta semana</div>
      <div style={wt.days}>
        {dayNames.map((day, i) => {
          const trained = trainedDays.includes(i);
          const isToday = i === todayIdx;
          return (
            <div key={day} style={wt.dayCol}>
              <div style={{
                ...wt.dayCircle,
                background: trained ? theme.colors.primary : '#fff',
                border: isToday
                  ? `2px solid ${theme.colors.primary}`
                  : `2px solid ${theme.colors.border}`,
                color: trained ? '#fff' : theme.colors.textMuted,
              }}>
                {trained ? '✓' : ''}
              </div>
              <div style={{ ...wt.dayLabel, color: isToday ? theme.colors.primary : theme.colors.textMuted, fontWeight: isToday ? '700' : '400' }}>
                {day}
              </div>
            </div>
          );
        })}
      </div>
      <div style={wt.legend}>
        <div style={wt.legendItem}><div style={{ ...wt.legendDot, background: theme.colors.primary }} /> Treinado</div>
        <div style={wt.legendItem}><div style={{ ...wt.legendDot, border: `2px solid ${theme.colors.primary}`, background: 'transparent' }} /> Hoje</div>
        <div style={wt.legendItem}><div style={{ ...wt.legendDot, background: theme.colors.border }} /> Sem treino</div>
      </div>
    </div>
  );
}

const wt = {
  container: { background: '#fff', borderRadius: theme.radius.md, padding: '1.25rem', border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm, marginBottom: '1.25rem' },
  title: { fontSize: '12px', fontWeight: '700', color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' },
  days: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' },
  dayCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  dayCircle: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', transition: 'all 0.2s' },
  dayLabel: { fontSize: '11px' },
  legend: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: theme.colors.textMuted },
  legendDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
};

export default function ProfilePage({ onBack, onGoalChange }) {
  const { user, userProfile, logout, saveProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || user?.user_metadata?.name || '');
  const [age, setAge] = useState(userProfile?.age || '');
  const [daysPerWeek, setDaysPerWeek] = useState(userProfile?.days_per_week || 3);
  const [saving, setSaving] = useState(false);

  const goal = goals.find(g => g.id === userProfile?.goal) || goals[3];
  const levelMap = { beginner: 'Iniciante', intermediate: 'Intermédio', advanced: 'Avançado' };
  const firstName = (userProfile?.name || user?.user_metadata?.name || 'Utilizador').split(' ')[0];

  async function handleSave() {
    setSaving(true);
    await saveProfile(user.id, {
      ...userProfile,
      name,
      age: age ? parseInt(age) : null,
      days_per_week: parseInt(daysPerWeek),
    });
    setEditing(false);
    setSaving(false);
  }

  const stats = [
    { label: 'Treinos', value: userProfile?.workouts_completed || 0, color: theme.colors.primary },
    { label: 'Minutos', value: userProfile?.total_minutes || 0, color: theme.colors.primary },
    { label: 'Dias/sem', value: userProfile?.days_per_week || 0, color: theme.colors.primary },
  ];

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.back} onClick={onBack}>← Voltar</button>
        <h1 style={s.headerTitle}>Perfil</h1>
        <button style={s.editBtn} onClick={() => editing ? handleSave() : setEditing(true)}>
          {editing ? (saving ? 'A guardar...' : 'Guardar') : 'Editar'}
        </button>
      </div>

      {/* Avatar + info */}
      <div style={s.heroCard}>
        <div style={s.avatarLarge}>{firstName[0].toUpperCase()}</div>
        {!editing ? (
          <div style={s.heroName}>{userProfile?.name || user?.user_metadata?.name || 'Utilizador'}</div>
        ) : (
          <div style={s.editFields}>
            <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" />
            <input style={s.input} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Idade" min="14" max="80" />
          </div>
        )}
        {userProfile?.age && !editing && (
          <div style={s.heroAge}>{userProfile.age} anos · {levelMap[userProfile?.level] || 'Iniciante'}</div>
        )}
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={{ ...s.statVal, color: st.color }}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly tracker */}
      <div style={s.section}>
        <WeeklyTracker userId={user?.id} />
      </div>

      {/* Goal */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Objetivo atual</div>
        <div style={{ ...s.goalCard, borderLeft: `4px solid ${goal.color}` }}>
          <div style={{ ...s.goalDot, background: goal.color }} />
          <div>
            <div style={{ ...s.goalName, color: goal.color }}>{goal.label}</div>
            <div style={s.goalDesc}>{goal.description}</div>
          </div>
        </div>
        <button style={s.changeGoalBtn} onClick={onGoalChange}>Mudar objetivo →</button>
      </div>

      {/* Plan */}
      <div style={s.section}>
        <div style={s.sectionTitle}>O teu plano</div>
        <div style={s.infoCard}>
          {[
            ['Nivel', levelMap[userProfile?.level] || '—'],
            ['Frequencia', editing ? null : `${userProfile?.days_per_week || '—'}x por semana`],
            ['Duracao', '15 min/sessao'],
            ['Membro desde', userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }) : '—'],
          ].map(([k, v]) => (
            <div key={k} style={s.infoRow}>
              <span style={s.infoLabel}>{k}</span>
              {k === 'Frequencia' && editing
                ? <select style={s.select} value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}>
                    {[2,3,4,5,6].map(d => <option key={d} value={d}>{d}x por semana</option>)}
                  </select>
                : <span style={s.infoVal}>{v}</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div style={s.section}>
        <button style={s.logoutBtn} onClick={logout}>Terminar sessao</button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '3rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: '#fff', borderBottom: `1px solid ${theme.colors.border}` },
  back: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  headerTitle: { fontSize: '17px', fontWeight: '800', color: theme.colors.text, margin: 0 },
  editBtn: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  heroCard: { background: '#fff', margin: '1.25rem', borderRadius: theme.radius.lg, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: theme.shadow.sm, border: `1px solid ${theme.colors.border}` },
  avatarLarge: { width: '72px', height: '72px', borderRadius: '50%', background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', marginBottom: '1rem' },
  heroName: { fontSize: '22px', fontWeight: '800', color: theme.colors.text, marginBottom: '4px' },
  heroAge: { fontSize: '13px', color: theme.colors.textMuted },
  editFields: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '0.5rem' },
  input: { padding: '0.75rem 1rem', borderRadius: theme.radius.md, border: `1.5px solid ${theme.colors.border}`, fontSize: '15px', color: theme.colors.text, fontFamily: theme.font.sans },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', margin: '0 1.25rem 1.25rem' },
  statCard: { background: '#fff', borderRadius: theme.radius.md, padding: '1rem 0.5rem', textAlign: 'center', border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm },
  statVal: { fontSize: '24px', fontWeight: '800', marginBottom: '2px' },
  statLabel: { fontSize: '10px', color: theme.colors.textMuted },
  section: { padding: '0 1.25rem', marginBottom: '1.25rem' },
  sectionTitle: { fontSize: '12px', fontWeight: '700', color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' },
  goalCard: { background: '#fff', borderRadius: theme.radius.md, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm, marginBottom: '10px' },
  goalDot: { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0 },
  goalName: { fontSize: '16px', fontWeight: '700', marginBottom: '3px' },
  goalDesc: { fontSize: '12px', color: theme.colors.textMuted, lineHeight: '1.4' },
  changeGoalBtn: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans, padding: 0 },
  infoCard: { background: '#fff', borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm, overflow: 'hidden' },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${theme.colors.border}`, fontSize: '14px' },
  infoLabel: { color: theme.colors.textSecondary },
  infoVal: { fontWeight: '600', color: theme.colors.text },
  select: { padding: '4px 8px', borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.border}`, fontSize: '13px', color: theme.colors.text, fontFamily: theme.font.sans },
  logoutBtn: { width: '100%', background: '#FEF2F2', color: theme.colors.danger, border: `1px solid #FECACA`, borderRadius: theme.radius.md, padding: '0.9rem', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans },
};
