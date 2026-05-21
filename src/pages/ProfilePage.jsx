import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';
import { supabase } from '../supabase/client';

function WeeklyTracker({ userId }) {
  const [trainedDays, setTrainedDays] = useState([]);
  const days = ['Seg','Ter','Qua','Qui','Sex','Sab','Dom'];

  useEffect(() => {
    async function fetch() {
      const now = new Date();
      const monday = new Date(now);
      monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      monday.setHours(0,0,0,0);
      const { data } = await supabase.from('workout_logs').select('completed_at').eq('user_id', userId).gte('completed_at', monday.toISOString());
      if (data) setTrainedDays([...new Set(data.map(d => (new Date(d.completed_at).getDay() + 6) % 7))]);
    }
    if (userId) fetch();
  }, [userId]);

  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <div style={wt.wrap}>
      <div style={wt.title}>Esta semana</div>
      <div style={wt.row}>
        {days.map((d, i) => {
          const trained = trainedDays.includes(i);
          const isToday = i === todayIdx;
          return (
            <div key={d} style={wt.col}>
              <div style={{
                ...wt.circle,
                background: trained ? theme.colors.primary : '#fff',
                border: isToday ? `2px solid ${theme.colors.primary}` : '2px solid #EFEFEF',
                color: trained ? '#fff' : isToday ? theme.colors.primary : theme.colors.textMuted,
              }}>
                {trained ? '✓' : ''}
              </div>
              <div style={{ ...wt.label, color: isToday ? theme.colors.primary : theme.colors.textMuted, fontWeight: isToday ? '700' : '400' }}>{d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const wt = {
  wrap: { background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', boxShadow: theme.shadow.sm, marginBottom: '1.25rem' },
  title: { fontSize: '14px', fontWeight: '700', color: theme.colors.text, marginBottom: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between' },
  col: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  circle: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', transition: 'all 0.2s' },
  label: { fontSize: '10px' },
};

export default function ProfilePage({ onGoalChange }) {
  const { user, userProfile, logout, saveProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || user?.user_metadata?.name || '');
  const [age, setAge] = useState(userProfile?.age || '');
  const [daysPerWeek, setDaysPerWeek] = useState(userProfile?.days_per_week || 3);
  const [saving, setSaving] = useState(false);

  const goal = goals.find(g => g.id === userProfile?.goal) || goals[3];
  const levelMap = { beginner: 'Iniciante', intermediate: 'Intermedio', advanced: 'Avancado' };
  const firstName = (userProfile?.name || user?.user_metadata?.name || 'Utilizador').split(' ')[0];

  async function handleSave() {
    setSaving(true);
    await saveProfile(user.id, { ...userProfile, name, age: age ? parseInt(age) : null, days_per_week: parseInt(daysPerWeek) });
    setEditing(false); setSaving(false);
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTitle}>Perfil</div>
        <button style={s.editBtn} onClick={() => editing ? handleSave() : setEditing(true)}>
          {editing ? (saving ? 'A guardar...' : 'Guardar') : 'Editar'}
        </button>
      </div>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.avatarLarge}>{firstName[0].toUpperCase()}</div>
        {!editing ? (
          <>
            <div style={s.heroName}>{userProfile?.name || user?.user_metadata?.name || 'Utilizador'}</div>
            {userProfile?.age && <div style={s.heroSub}>{userProfile.age} anos · {levelMap[userProfile?.level] || 'Iniciante'}</div>}
          </>
        ) : (
          <div style={s.editFields}>
            <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" />
            <input style={s.input} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Idade" />
          </div>
        )}
      </div>

      {/* Stats */}
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

      <div style={s.content}>
        {/* Weekly tracker */}
        <WeeklyTracker userId={user?.id} />

        {/* Goal */}
        <div style={s.card}>
          <div style={s.cardTitle}>Objetivo</div>
          <div style={{ ...s.goalRow, borderLeft: `3px solid ${goal.color}` }}>
            <div style={{ ...s.goalDot, background: goal.color }} />
            <div>
              <div style={{ ...s.goalName, color: goal.color }}>{goal.label}</div>
              <div style={s.goalDesc}>{goal.description}</div>
            </div>
          </div>
          <button style={s.changeBtn} onClick={onGoalChange}>Mudar objetivo →</button>
        </div>

        {/* Info */}
        <div style={s.card}>
          <div style={s.cardTitle}>O teu plano</div>
          {[
            ['Nivel', levelMap[userProfile?.level] || '—'],
            ['Frequencia', !editing ? `${userProfile?.days_per_week || '—'}x por semana` : null],
            ['Duracao', '15 min/sessao'],
            ['Membro desde', userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }) : '—'],
          ].map(([k, v]) => (
            <div key={k} style={s.infoRow}>
              <span style={s.infoLabel}>{k}</span>
              {k === 'Frequencia' && editing
                ? <select style={s.select} value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}>
                    {[2,3,4,5,6].map(d => <option key={d} value={d}>{d}x por semana</option>)}
                  </select>
                : <span style={s.infoVal}>{v}</span>}
            </div>
          ))}
        </div>

        <button style={s.logoutBtn} onClick={logout}>Terminar sessao</button>
      </div>
    </div>
  );
}

const s = {
  page: { background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '90px', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3rem 1.5rem 0' },
  headerTitle: { fontSize: '28px', fontWeight: '900', color: theme.colors.text },
  editBtn: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans },
  hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', textAlign: 'center' },
  avatarLarge: { width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '900', marginBottom: '0.75rem', boxShadow: theme.shadow.green },
  heroName: { fontSize: '22px', fontWeight: '900', color: theme.colors.text, marginBottom: '4px' },
  heroSub: { fontSize: '13px', color: theme.colors.textMuted },
  editFields: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '0.5rem' },
  input: { padding: '0.75rem 1rem', borderRadius: theme.radius.md, border: '1.5px solid #EFEFEF', fontSize: '15px', color: theme.colors.text, fontFamily: theme.font.sans },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', padding: '0 1.5rem', marginBottom: '1.5rem' },
  statCard: { background: '#fff', borderRadius: theme.radius.lg, padding: '1rem', textAlign: 'center', boxShadow: theme.shadow.sm },
  statVal: { fontSize: '24px', fontWeight: '900', color: theme.colors.primary },
  statLabel: { fontSize: '11px', color: theme.colors.textMuted, marginTop: '2px' },
  content: { padding: '0 1.5rem' },
  card: { background: '#fff', borderRadius: theme.radius.lg, padding: '1.25rem', boxShadow: theme.shadow.sm, marginBottom: '1.25rem' },
  cardTitle: { fontSize: '14px', fontWeight: '700', color: theme.colors.text, marginBottom: '0.75rem' },
  goalRow: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: theme.radius.md, background: theme.colors.bg, marginBottom: '10px' },
  goalDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  goalName: { fontSize: '15px', fontWeight: '700', marginBottom: '2px' },
  goalDesc: { fontSize: '12px', color: theme.colors.textMuted, lineHeight: '1.4' },
  changeBtn: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans, padding: 0 },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #EFEFEF', fontSize: '14px' },
  infoLabel: { color: theme.colors.textSecondary },
  infoVal: { fontWeight: '600', color: theme.colors.text },
  select: { padding: '4px 8px', borderRadius: theme.radius.sm, border: '1px solid #EFEFEF', fontSize: '13px', color: theme.colors.text, fontFamily: theme.font.sans },
  logoutBtn: { width: '100%', background: '#FFF5F5', color: theme.colors.danger, border: '1px solid #FFCDD2', borderRadius: theme.radius.lg, padding: '1rem', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans },
};
