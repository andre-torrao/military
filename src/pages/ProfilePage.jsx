import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { theme, goals } from '../data/theme';

export default function ProfilePage({ onBack, onGoalChange }) {
  const { user, userProfile, logout, saveProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || user?.user_metadata?.name || '');
  const [age, setAge] = useState(userProfile?.age || '');
  const [daysPerWeek, setDaysPerWeek] = useState(userProfile?.days_per_week || 3);
  const [saving, setSaving] = useState(false);

  const goal = goals.find(g => g.id === userProfile?.goal) || goals[3];
  const levelMap = { beginner: '🌱 Iniciante', intermediate: '💪 Intermédio', advanced: '🔥 Avançado' };

  async function handleSave() {
    setSaving(true);
    await saveProfile(user.id, {
      ...userProfile,
      name,
      age: age ? parseInt(age) : null,
      daysPerWeek: parseInt(daysPerWeek),
    });
    setEditing(false);
    setSaving(false);
  }

  async function handleLogout() {
    await logout();
  }

  const stats = [
    { label: 'Treinos completos', value: userProfile?.workouts_completed || 0, icon: '🏋️', color: theme.colors.primary },
    { label: 'Minutos de treino', value: userProfile?.total_minutes || 0, icon: '⏱', color: theme.colors.success },
    { label: 'Dias por semana', value: userProfile?.days_per_week || 0, icon: '📅', color: theme.colors.accent },
  ];

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.back} onClick={onBack}>← Voltar</button>
        <h1 style={s.headerTitle}>Perfil</h1>
        <button style={s.editBtn} onClick={() => setEditing(!editing)}>
          {editing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* Avatar + info */}
      <div style={s.heroCard}>
        <div style={s.avatarLarge}>
          {(userProfile?.name || user?.user_metadata?.name || 'A')[0].toUpperCase()}
        </div>
        {!editing ? (
          <>
            <div style={s.heroName}>{userProfile?.name || user?.user_metadata?.name || 'Atleta'}</div>
            <div style={s.heroEmail}>{user?.email}</div>
            {userProfile?.age && <div style={s.heroAge}>{userProfile.age} anos</div>}
          </>
        ) : (
          <div style={s.editFields}>
            <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
            <input style={s.input} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Idade" min="14" max="80" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statIcon}>{st.icon}</div>
            <div style={{ ...s.statVal, color: st.color }}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Goal */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Objetivo atual</div>
        <div style={{ ...s.goalCard, borderLeft: `4px solid ${goal.color}` }}>
          <span style={s.goalIcon}>{goal.icon}</span>
          <div>
            <div style={{ ...s.goalName, color: goal.color }}>{goal.label}</div>
            <div style={s.goalDesc}>{goal.description}</div>
          </div>
        </div>
        <button style={s.changeGoalBtn} onClick={onGoalChange}>
          Mudar objetivo →
        </button>
      </div>

      {/* Plan */}
      <div style={s.section}>
        <div style={s.sectionTitle}>O teu plano</div>
        <div style={s.infoCard}>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Nível</span>
            <span style={s.infoVal}>{levelMap[userProfile?.level] || '—'}</span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Frequência</span>
            {!editing
              ? <span style={s.infoVal}>{userProfile?.days_per_week || '—'}x por semana</span>
              : <select style={s.select} value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}>
                  {[2,3,4,5,6].map(d => <option key={d} value={d}>{d}x por semana</option>)}
                </select>
            }
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Duração</span>
            <span style={s.infoVal}>15 min/sessão</span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Membro desde</span>
            <span style={s.infoVal}>
              {userProfile?.createdAt
                ? new Date(userProfile.createdAt).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })
                : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      {editing && (
        <div style={s.saveBtnWrap}>
          <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? 'A guardar...' : '✓ Guardar alterações'}
          </button>
        </div>
      )}

      {/* Account */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Conta</div>
        <div style={s.infoCard}>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Email</span>
            <span style={s.infoVal}>{user?.email}</span>
          </div>
        </div>
      </div>

      <div style={s.logoutWrap}>
        <button style={s.logoutBtn} onClick={handleLogout}>
          Terminar sessão
        </button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: theme.colors.bg, fontFamily: theme.font.sans, paddingBottom: '3rem' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 1.25rem', background: '#fff',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  back: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  headerTitle: { fontSize: '17px', fontWeight: '800', color: theme.colors.text, margin: 0 },
  editBtn: { background: 'none', border: 'none', color: theme.colors.primary, fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: theme.font.sans },
  heroCard: {
    background: '#fff', margin: '1.25rem',
    borderRadius: theme.radius.lg, padding: '1.5rem',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: theme.shadow.sm, border: `1px solid ${theme.colors.border}`,
  },
  avatarLarge: {
    width: '72px', height: '72px', borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', fontWeight: '800', marginBottom: '1rem',
  },
  heroName: { fontSize: '22px', fontWeight: '800', color: theme.colors.text, marginBottom: '4px' },
  heroEmail: { fontSize: '13px', color: theme.colors.textMuted, marginBottom: '4px' },
  heroAge: { fontSize: '13px', color: theme.colors.textMuted },
  editFields: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '0.5rem' },
  input: {
    padding: '0.75rem 1rem', borderRadius: theme.radius.md,
    border: `1.5px solid ${theme.colors.border}`, fontSize: '15px',
    color: theme.colors.text, fontFamily: theme.font.sans,
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
    gap: '10px', margin: '0 1.25rem 1.25rem',
  },
  statCard: {
    background: '#fff', borderRadius: theme.radius.md,
    padding: '1rem 0.5rem', textAlign: 'center',
    border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm,
  },
  statIcon: { fontSize: '18px', marginBottom: '6px' },
  statVal: { fontSize: '22px', fontWeight: '800', marginBottom: '2px' },
  statLabel: { fontSize: '10px', color: theme.colors.textMuted, lineHeight: '1.3' },
  section: { padding: '0 1.25rem', marginBottom: '1.25rem' },
  sectionTitle: { fontSize: '12px', fontWeight: '700', color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' },
  goalCard: {
    background: '#fff', borderRadius: theme.radius.md,
    padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px',
    border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm, marginBottom: '10px',
  },
  goalIcon: { fontSize: '28px' },
  goalName: { fontSize: '16px', fontWeight: '700', marginBottom: '3px' },
  goalDesc: { fontSize: '12px', color: theme.colors.textMuted, lineHeight: '1.4' },
  changeGoalBtn: {
    background: 'none', border: 'none', color: theme.colors.primary,
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    fontFamily: theme.font.sans, padding: 0,
  },
  infoCard: {
    background: '#fff', borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm,
    overflow: 'hidden',
  },
  infoRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', borderBottom: `1px solid ${theme.colors.border}`,
    fontSize: '14px',
  },
  infoLabel: { color: theme.colors.textSecondary },
  infoVal: { fontWeight: '600', color: theme.colors.text },
  select: {
    padding: '4px 8px', borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.border}`, fontSize: '13px',
    color: theme.colors.text, fontFamily: theme.font.sans,
  },
  saveBtnWrap: { padding: '0 1.25rem', marginBottom: '1.25rem' },
  saveBtn: {
    width: '100%', background: theme.colors.primary, color: '#fff',
    border: 'none', borderRadius: theme.radius.md, padding: '0.9rem',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: theme.font.sans,
  },
  logoutWrap: { padding: '0 1.25rem' },
  logoutBtn: {
    width: '100%', background: '#FEF2F2', color: theme.colors.danger,
    border: `1px solid #FECACA`, borderRadius: theme.radius.md,
    padding: '0.9rem', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: theme.font.sans,
  },
};
